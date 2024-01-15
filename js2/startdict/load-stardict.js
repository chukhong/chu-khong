    var bufferTable
(function (GLOBAL) {
    var buffBegin =0 , buffNext = 100
    var currentTarget

    words.onscroll = scrollFunction
    function scrollFunction() {
        if(words.scrollTop+words.offsetHeight+1>=words.scrollHeight){
            //console.log('loading...');
            loadWords(bufferTable,buffBegin,buffNext)
            if(buffBegin + buffNext<bufferTable.length)
                buffBegin += buffNext
        }
    }
    function loadWords(arr,begin=0,next=100) {
        arr.map((v,i)=>{
          if(i>=begin && i<begin+next){
            var li = d.create('li',{},words)
            var a = d.create('a',{
              href:'#',
              'data-dictpos':JSON.stringify(v.dictpos),
              'data-offset':v.offset,
              innerText:v.term},li)
            a.onclick = eventMeanning
          }
        })
    }
    function loadWordChunk(arr) {
        arr.map((v,i)=>{
            var li = d.create('li',{},words)
            var a = d.create('a',{
              href:'#',
              'data-dictpos':JSON.stringify(v.dictpos),
              'data-offset':v.offset,
              innerText:v.term},li)
            a.onclick = meanning
        })
    }

    function eventMeanning(e){
        e.preventDefault();
        var ele = e.target
        var dictpos = JSON.parse(ele.dataset.dictpos)

        jszipWorker.postMessage({fn:'findMeaning',data:{dictpos:dictpos,target:currentTarget}})
        return false
    }

    loadStardict.onchange = jsZipLoad


    var file_array = []
    function jsZipLoad(evt){    
        evt.preventDefault();
        file_array = []
        var file_list = evt.target.files
        for(var i = 0; i < file_list.length; i++) {
            file_array.push(file_list[i]);
        }
        //console.log(file_array)
        jszipWorker.postMessage({fn:'loadList',data:file_array});
    }

    function eventloadWordList(event){
        var ele = event.target
        var f = {name:ele.innerText.trim()}
        currentTarget = f.name.replace(/\W/g,'')
 
        if(f){
            d.id('words').innerHTML=''
            buffBegin = 0
            dictStatus.style.display = 'block'
            jszipWorker.postMessage({fn:'loadWordList',data:f});
        }
    }

    var jszipWorker = new Worker("jszip-worker.js");
    var eventReceiver = {
        builtDataFromJszip:function (data){
            //console.log(data)
            var zipTitle = d.create("h4", {});
            var id = data.fileName.replace(/\W/g,'')
            var a = d.create('a',{href:'#',id:id,textContent : data.fileName},zipTitle)
            a.onclick = eventloadWordList
            zipResult.append(zipTitle);
            zipTitle.append(d.create("span", {
                "class": "small",
                textContent:data.timeLoad
            }));
            var $fileContent = d.create("ul",{style:"display:none"});
            data.fileContent.map(i=>{
                $fileContent.append(d.create("li", {
                    textContent : i
                }));
            })
            zipResult.append($fileContent);
        },
        preLoadWords:function(data){
            bufferTable = data.raw_index
            currentTarget = data.target
            loadWords(bufferTable)
        },
        getMeaning:function(data){
            if(data.append)
                meanningShow.innerHTML += data.data
            if(!data.append)
                meanningShow.innerHTML = data.data
        },
        showStatus:function(data){
            dictStatus.innerText = data
        },
        percentLoad:function(data){
            d.id('myBar').style.width = data
            if(data == '100%'){
                d.id('myProgress').style.display = 'none'
            }
        },
        getFindWord:function(data){
            console.log(data)
        }

    }
    jszipWorker.onmessage = function(event){
        var {data} = event
        try{
            eventReceiver[data.fn](data.data)
        }catch(e){
            console.log(event)
            console.error(e)
        }
    }
    async function mergeArrayBuffersList(objList){
        function appendBuffer(buffer1, buffer2) {
          var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
          tmp.set(new Uint8Array(buffer1), 0);
          tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
          return tmp;
        }
        function fetchAsArrayBuffer(url){
            return fetch(url)
            .then((response) => response.arrayBuffer())
            .then(data=>{
                //console.log(data)
                return data
            })
        }
        var allBuff = new Uint8Array();
        for(var iName in await objList){
            var data = objList[iName]
            data.sort()
            //console.log(data)
            // var cc = await fetchAsBlob('/dicts/'+iName+'.zip') 
            // allBuff = allBuff.concat(allBuff)
            for  (var j=0;j<data.length; await j++){
                var c,i = data[j]
                c = await fetchAsArrayBuffer('/dicts/'+iName+i) 
                //allBuff += c
                allBuff = appendBuffer(allBuff,c)
                //allBuff.push(c)
            }
            var b= new File([allBuff], iName+'.zip')
            file_array.push(b)
        }
        //return allBuff
    }
 
    function fetchAsBlob(url){
        return fetch(url)
        .then((response) => response.blob())
        .then(data=>{
            //console.log(data)
            return data
        })
    }

    d.init(async ()=>{
        var searchForm = searchInput.parentNode.parentNode
        //# findword
        searchForm.onsubmit = (evt)=>{
            evt.preventDefault()
            meanningShow.innerHTML = ''
            jszipWorker.postMessage({fn:'findWord',data:searchInput.value});
            return false
        }

        var partsZip = {}

        fetch('/stardict/listdist')
        .then((response) => response.json())
        .then(async (data)=>{
            for  (var j=0;j<data.length; await j++){
                var c,b,i = data[j]
                ,fileName = i.substr(0,i.length-4)
                ,ext = i.substr(i.length-4,i.length)
                if(ext!='.zip'){
                    //partsZip.push({ext:ext,fileName:fileName})
                    if(!partsZip[fileName])
                        partsZip[fileName] = []
                    partsZip[fileName].push(ext)
                }
            }
            for  (var j=0;j<data.length; await j++){
                var c,b,i = data[j]
                ,fileName = i.substr(0,i.length-4)
                ,ext = i.substr(i.length-4,i.length)
                //,findName = partsZip.find(i=>{if(i.fileName==fileName) return i})
                if(!partsZip[fileName] && ext=='.zip'){
                    c = await fetchAsBlob('/dicts/'+i)
                    b = new File([c], i,{type:c.type})
                    file_array.push(b)
                }
            }
            await mergeArrayBuffersList(partsZip)
            //alert("ok")
            //console.log(file_array);

            jszipWorker.postMessage({fn:'loadList',data:file_array});
        })
    })
}(this));