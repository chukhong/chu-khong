var sms = {
    "log": function (str) {
        postMessage(str);
    },
    "error": function (str) {
        postMessage("Error: " + str);
    }
}

importScripts("jszip.min.js");

importScripts("dictzip_sync.js");
importScripts("dictzip.js");
importScripts("inflate.js");
importScripts("pako_inflate.js");
importScripts("stardict_sync.js");

var catcheFile = {}

var readUTF8String = (function () {
    var decoder = new TextDecoder("utf-8");
    return function (bytes) {
        return decoder.decode(bytes);
    };
})();
var countLoad = 1
var countPartLoad = 1
function processPartPercent(packetLen,totalLen){
    var percent = countLoad*100/totalLen
    var percent1 = (countPartLoad*100/packetLen)/percent
    var prePercent = ((countLoad-1)*100)/totalLen
    var r =prePercent+percent1
    //console.log('percent %s',r)
    sms.log({fn:'percentLoad',data:r+'%'})
    countPartLoad++ 
}
function processPercent(lengthTotal){
    var percent = countLoad*100/lengthTotal
    sms.log({fn:'percentLoad',data:percent+'%'})
    countLoad++
}

function handleFile(f,length) {
    var fname = f.name.replace(/\W/g,'')

    // var extend = f.name.substr(f.name.length-4,f.name.length)
    // if(extend!='.zip')
    //     return
    // console.log("--name " + f.name)

    var send = {fileName:f.name}
    send.fileContent = []
    var dateBefore = new Date();
    JSZip.loadAsync(f)                                   // 1) read the Blob
    .then(async function(zip) {
        
        zip.forEach(function (relativePath, zipEntry) {  // 2) print entries
            //console.log("--name " + zipEntry.name)
            send.fileContent.push(zipEntry.name)
        });
        //console.log(send.fileContent)
        sms.log({fn:'showStatus',data:'Unzip '+f.name})
        var file_list = zip.files, file_array = [];
        
        countPartLoad = 1
        for(var i in await zip.files) {
            //console.log("--name " + i)
            //String/Array of bytes/ArrayBuffer/Uint8Array/Buffer/Blob/Promise
            var content = await zip.file(i).async('Blob')
            content.name = i
            //console.log(i)
            
            processPartPercent(send.fileContent.length,length)
            
            sms.log({fn:'showStatus',data:'Unzip '+i})
            file_array.push(content);
        }

        doStardict(file_array,fname)
        processPercent(length)
        var dateAfter = new Date();
        send.timeLoad = " (loaded in " + (dateAfter - dateBefore) + "ms)"
        sms.log({fn:'builtDataFromJszip',data:send});
    }, function (e) {
        console.error(e)
        sms.error("Error reading " + f.name + ": " + e.message)
    });
}


function doStardict (files,target) {
    var dictFile,dictDZ = files.find(i=>{if(i.name.toLocaleLowerCase().indexOf('dict.dz')!=-1) return i})
    if(!dictDZ){
        dictFile = files.find(i=>{if(i.name.toLocaleLowerCase().indexOf('.dict')!=-1) return i})
        //console.log(dict)
        dictFile = readFileDictAsText(dictFile)
    }
    if(!catcheFile[target])
        catcheFile[target] = {}
    catcheFile[target] = files

    try {
        var dict = new StarDict(files),
            synonyms = [], index = [];

       var raw_synonyms = dict.synonyms({
                "include_offset": true,
                "include_wid": true,
                "include_term": true
        });
        //console.log(raw_synonyms)
        sms.log({fn:'showStatus',data:"Processing synonym offsets..."});
        raw_synonyms.forEach(function (syn) {
            synonyms.push(syn.offset);
        });
        //console.log(synonyms)
        delete raw_synonyms;

        var raw_index = dict.index({
                "include_offset": true,
                "include_dictpos": true,
                "include_term": true
        });
        sms.log({fn:'showStatus',data:"Processing index offsets..."});
        raw_index.forEach(function (idx) {
            index.push(idx.offset);
        });


        catcheFile[target] = {raw_index:raw_index,dictDZ:dictDZ,dictFile:dictFile,target:target}
        var buff = catcheFile[target]
        var data = {raw_index:buff.raw_index,target:buff.target}
        sms.log({fn:'preLoadWords',data:data})

        //console.log(raw_index)
        // console.log("Retrieving some synonym...");
        // var some_syn = synonyms.length/2 | 0,
        //     syn_obj = dict.synonyms({
        //         "start_offset": synonyms[some_syn]
        //     })[0],
        //     idx = dict.index({
        //         "start_offset": index[syn_obj.wid]
        //     })[0],
        //     entry = dict.entry(idx.dictpos);
        // console.log("Entry for " + syn_obj.term + " (" + idx.term + "):");
        // entry.forEach(function (data) {
        //     if("mgtxykwhr".indexOf(data.type) != -1)
        //         console.log(data.type + ": " + data.content);
        // });
    } catch (err) {
        console.error(err);
        console.error("StarDict error: " + err.message);
    }
}


function dzreaderLoad (fileDictDZ,dictpos,append=false) {
    var dzreader = new DictZipFile(
        fileDictDZ,
        jszlib_inflate_buffer
    );
    dzreader.load().then(function () {
        return dzreader.read(dictpos[0],dictpos[1]);
    }, function (err) {
        console.error(err);
        console.error("DictZipFile load error: " + err.message);
    }).then(function (buffer) {
        var view = new Uint8Array(buffer);
        view = readUTF8String(view).replace(/\r\n|\r|\n/g,'<br>')
        sms.log({fn:'getMeaning',data:{data:view,append:append}})

    }, function (err) {
        console.error("DictZipFile read error: " + err.message);
    });
};
async function readFileDictAsText(dict){
    this.load = function() {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = function (evt) {
                try {
                    //readPosition(evt.target.result);
                    return resolve(evt.target.result);
                } catch(err) {
                    reject(err);
                }
            };
            //reader.readAsText(dict);
            reader.readAsArrayBuffer(dict);
        });
    };
    var b = new File([dict], 'tmp.dict')
    return await this.load(b)
}
function doFileDict(dict,p,append=false,dictName){
    //console.log(dict)
    dict.then(data=>{
        var r = data.slice(p[0],p[0]+p[1])
        ,view = readUTF8String(r)
        sms.log({fn:'getMeaning',data:{data:view,append:append,dictName:dictName}})
    })
}
var eventReceiver = {
    loadList:function (files){
        try {
            console.log(files)
            for (var i = 0; i < files.length; i++) {
                handleFile(files[i],files.length);
            }
        } catch (e) {
            console.error(e);
            sms.error("jszip error: " + e.message);
        }
    },
    loadWordList:function(f){
        var fname = f.name.replace(/\W/g,'')
        var buff = catcheFile[fname]
        if(buff && buff.length!=0){
            var data = {raw_index:buff.raw_index,target:buff.target}
            sms.log({fn:'preLoadWords',data:data})
            return;
        }
    },
    findMeaning: function(data,append=false){
        //console.log(dictName);
        var {dictpos,target} = data
        var dictDZ = catcheFile[target].dictDZ
        var dictFile = catcheFile[target].dictFile
        //console.log(catcheFile[target])
        if(dictDZ)
            dzreaderLoad(dictDZ,dictpos,append)
        if(dictFile)
            doFileDict(dictFile,dictpos,append,target)
    },
    findWord:function(key){
        var results = []
        this.selectTypeDZorDictFile = function (src){
            if(src.dictDZ)
                return src.dictDZ
            return src.dictFile
        }
        this.search = function(src,key,target){
            //var dict = this.selectTypeDZorDictFile(src)
            //console.log(src)
            var r = src.raw_index.find(i=>{if(i.term==key) return i})
            //console.log(key,r)
            if(r){
                r.target = target
                results = results.concat(r)
            }
        }
        //console.log(key);
        for(target in catcheFile){
            this.search(catcheFile[target],key,target)
        }
        if(results.length!==0){
            results.map(i=>{
                //var dictName =results //[i]
                eventReceiver.findMeaning(i,true)
            })
        }
        sms.log({fn:'getFindWord',data:results})
    }
}
onmessage = function (oEvent) {
    var {data} = oEvent
    try{
        eventReceiver[data.fn](data.data)
    }catch(e){
        console.error(e)
    }
}