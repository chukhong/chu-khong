"use strict";
var buildDom = require("ace/lib/dom").buildDom;

//var {d}= require("lib/startdict/d")
require("lib/startdict/d")
    
require("lib/startdict/dictzip")
require("lib/startdict/pako_inflate")
require("lib/startdict/inflate")
require("lib/startdict/jszip.min")
require("lib/startdict/stardict")

window.userDicts = []

var {userDictSote} = require("lib/idb-keyval-iife")

window.userDictSote = userDictSote

var util = require("lib/kitchen-sink/util");

var bufferTable

var buffBegin =0 , buffNext = 100
var currentTarget


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

//loadStardict.onchange = jsZipLoad


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
            c = await fetchAsArrayBuffer('/Dicts/'+iName+i) 
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
        
function merge_options(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}
    

function builtModal(editor,fns1){
    
    var 
    dom =['div',{
        //'class':'offcanvas offcanvas-end bd-gray-900 overflow-scroll',
        'class':'offcanvas offcanvas-end bd-gray-900 d-flex flex-column align-items-stretch flex-shrink-0 bg-white',
        'id':'dialogResultSearchWord',
        'tabindex':"-1",
        'aria-labelledby':"offcanvasRightLabel",
        },
        ['div',{class:"navbar navbar-dark bd-navbar sticky-top offcanvas-header"},
                ['div',{class:"modal-header"},
                    ['div',{class:"nav-item", id:"titleDialogResultSearchWord"},
                        ['form',{
                                id:'search-from-dict',
                                action:'#',
                            },
                            ['input',{id:"search-input",'type':'search'},''],
                            ['button',{
                                id:'btn-search-word',
                                'type':'submit',
                                'data-dict-cmd-as':'formSubmit',
                                'class':'btn'},
                                ["i",{class:"material-icons"},"search"]],
                            ['button',{'data-dict-cmd-as':'copy','type':'button','class':'btn'},
                                ["i",{class:"material-icons"},"content_copy"]],
                            ['button',{'data-dict-cmd-as':'history','type':'button','class':'btn'},
                                ["i",{class:"material-icons"},"history"]],
                            ['button',{'data-cmd-as':'addWord','type':'button','class':'btn'},
                                ["i",{class:"material-icons"},"add"],
                                ["i",{class:"material-icons"},"mode_edit"]],
                        ],
                    ],
                ],
                ['button',{'type':"button",'class':"btn-close",'data-bs-dismiss':"offcanvas", 'aria-label':"Close"}],
        ], 
        ['div',{
            //class:"offcanvas-body m-0 p-0",
            class:"offcanvas-body m-0 p-0 bd-yellow-200 list-group list-group-flush border-bottom scrollarea",
            id:"bodyDialogResultSearchWord"},
            ['div',{id:'zip-title'}],
            ['div',{id:'zip-result','class':'d-none'}],
// <div class="progress" style="height: 1px;">
//   <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
// </div>
            ['div',{id:"myProgress",class:'myProgress progress','style':'height: 1px;'},
                ['div',{id:"myBar",class:'myBar progress-bar',role:'progressbar','aria-valuenow':"0", 'aria-valuemin':"0",'aria-valuemax':"100"},''],
                ['div',{id:"dictStatus"
                ,class:'d-none'
                },''],
            ],
            ['div',{id:"words",class:'d-none'},''],
            ['div',{id:"dictStatus"},''],
            ['div',{
                    id:"meanningUser",
                    // class:'bd-yellow-200',
                    },
            ''],
            ['div',{
                    id:"meanningShow",
                    class:'bd-yellow-200',
                    //class:'list-group-item list-group-item-action py-3 lh-sm',
                    'data-dict-cmd-mouseup-as':'searchWordSelect'
                },''],
        ],
    ] 
    // var old = $('#modals2')[0].innerHTML
    // buildDom(dom,$('#modals2')[0],{})
    // old += $('#modals2')[0].innerHTML
    // $('#modals2')[0].innerHTML = old
    
    var container = document.querySelector('body')
    var optionsPanel = document.createElement("div");
    buildDom(dom, optionsPanel, {})
    container.insertBefore(optionsPanel, container.firstChild);
}
function builtModalChooseDicts(editor,parentNode,arrList){
    var list = arrList.map(i=>{
        return  ["div",{"class":"form-check"},
              ["input",{"class":"form-check-input","type":"checkbox","id":"check-"+i,value:i,'data-dict-cmd-as':'checkDownloadDict','data-article-id':i}],
              ["label",{"class":"form-check-label","for":"check-"+i},i]
            ]
    })
    var dom=
    ["div",{"class":"modal","tabindex":"-1",id:"selectDicts"},
      ["div",{"class":"modal-dialog"},
        ["div",{"class":"modal-content"},
          ["div",{"class":"modal-header"},
            ["h5",{"class":"modal-title"},"Select dict"],
            ["button",{"type":"button","class":"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},""],
          ],
          ["div",{"class":"modal-body"},
           list
          ],
          ["div",{"class":"modal-footer"},
            ["button",{"type":"button","class":"btn btn-secondary","data-bs-dismiss":"modal"},"Close"],
          ],
        ]
      ]
    ]
    
    var optionsPanel = document.createElement("div");
    buildDom(dom, optionsPanel, {})
    parentNode.insertBefore(optionsPanel, parentNode.firstChild);

    //event
    var selectDicts = $('#selectDicts')[0]
    //hide.bs.modal
    selectDicts.addEventListener('hide.bs.modal', async event => {
          // do something...
        var data = []
        $('#selectDicts input').each((i,e)=>{
            //console.log(e.checked,e.value)
            if(e.checked)
                data.push(e.value)
        })
        util.saveOption('listDict',JSON.stringify(data))
        loadDictFromChoose(data)
        
    })



}
async function loadDictFromChoose(data){
    
    var listPath = data.map(i=>{return '/chu-khong/Dicts/' + i})
    //caches.open('workbox-precache-v2-'+location.href)
    caches.open('mysite-dynamic')
    .then(function (cache) {
      cache.addAll(listPath);
    });

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
            c = await fetchAsBlob('/chu-khong/Dicts/'+i)
            b = new File([c], i,{type:c.type})
            file_array.push(b)
        }
    }
    await mergeArrayBuffersList(partsZip)

    jszipWorker.postMessage({fn:'loadList',data:file_array});
}

var partsZip = {}
var jszipWorker = new Worker("js/startdict/jszip-worker.js");
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
            
           
            var template = `<div class='list-group-item py-3 lh-sm bd-yellow-200'>
            <div class="d-flex w-100 justify-content-end">
              <small class="text-muted">{dictName}</small>
            </div>
            <div class='justify-content-between'>{data}</div>
            </div>`
            //console.log(data);
            data.dictName = data.dictName.replace('zip','')

            var tmp = template
            tmp = tmp.replace('{data}',data.data).replace('{dictName}',data.dictName) 
            if(data.append)
                d.id('meanningShow').innerHTML += tmp
            if(!data.append)
                d.id('meanningShow').innerHTML = tmp

             searchUserDict($('#search-input').val().trim())
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
            //console.log(data)
        }

    }
    jszipWorker.onmessage = function(event){
        var {data} = event
        try{
            //console.log(data.fn)
            eventReceiver[data.fn](data.data)
        }catch(e){
            console.log(event)
            console.error(e)
        }
    }
window.loadUserDict = function(){
    fetch('/dictionaries/getAll')
    .then(r=>r.json())
    .then(r=>{
        //console.log(r);
        if(Array.isArray(r)){
            window.userDicts = r
            userDictSote.set('dictionaries',r)
        }else
        throw new Error('Had some error')
    })
    .catch(e=>{
        userDictSote
        .get('dictionaries')
        .then((r)=>{
            window.userDicts = r
        })
    })
}
function searchUserDict(key){
    var template = `<div class='list-group-item py-3 lh-sm bd-yellow-200'>
    <div class="d-flex w-100 justify-content-end">
      <small class="text-muted">{dictName}</small>
    </div>
    <div class='justify-content-between'>{data}</div>
    </div>`    
    console.log(key);
    //console.log(userDicts);
    $('#meanningUser')[0].innerHTML=''
    var objToString = (obj)=>{var s='';for(var i in obj){s +=`<b>${i}</b>:${obj[i]}<br>`} return s;}
    window.userDicts.map(k=>{
        var i = [
            //k[0]
            k[1]
            //,k[2]
            ,k[3],k[4],k[5]]
        if(i[0]==key||i[2]==key){
            //i.shift()
            if(i[2].indexOf('{')==0){
                i[2] = objToString(JSON.parse(i[2]))
            }
            $('#meanningUser')[0].innerHTML+= template.replace('{dictName}',k[0]).replace('{data}',i.join('<br>'))
        }
    })
}
var stardict = function(d,editor,parentNode,ref) {

    builtModal(editor)

    loadUserDict()

    // d.autoLoadId()
    // d.loadFns()

    var fns={
        formSubmit:(evt)=>{
            //$('#search-from-dict')[0].onsubmit = (evt)=>{
                var key = $('#search-input').val().trim()
                //console.log('searchForm.onsubmit '+key);
                evt.preventDefault()
                d.id('meanningShow').innerHTML = ''
                d.id('meanningUser').innerHTML = ''
                

                jszipWorker.postMessage({fn:'findWord',data:key});
                return false
            //}
            //alert('ok')
        },
        copy:()=>{
            navigator
            .clipboard
            .writeText($('#search-input').val())
            editor.onCopy(); 
        },
        checkDownloadDict:(event)=>{

        }
    }

    //EVENT click FOR DICIS
    $(document).on("click", "[data-dict-cmd-as]", (function(event) {
      var cmd = $(this).data("dictCmdAs");
      //alert(cmd)
      if (fns[cmd]) {
        fns[cmd](event)
        //event.preventDefault();
      }else{
        console.log(`
            // ${cmd} not defined
            ${cmd}:()=>{}
        `)
      }
    }));
    //EVENT mouseup FOR DICIS
    var fnsMouseup = {
        //in get text from #meanningShow
        searchWordSelect:(e)=>{
            if(window.getSelection().toString()=='') return
            $('#search-input').val(window.getSelection().toString())
            $('#btn-search-word')[0].click()

            return false
        },
    }
    $(document).on("mouseup", "[data-dict-cmd-mouseup-as]", (function(event) {
      var cmd = $(this).data("dictCmdMouseupAs");
      //alert(cmd)
      if (fnsMouseup[cmd]) {
        fnsMouseup[cmd](event)
        //event.preventDefault();
      }else{
        console.log(`
            // ${cmd} not defined
            ${cmd}:()=>{}
        `)
      }
    }));



    //fetch('/stardict/listdist')
    //fetch('/chu-khong/js/listdist.json')
    // .then((response) => {
    //   if (response.ok) {
    //     return response.json();
    //   }
    //   throw new Error('Something went wrong');
    // })
    
    var url = script_url + "?q=" + JSON.stringify({ 
        SHEETNAME: "listdict",
         action: "filter", 
         data:{}
        })
    fetch(url, {
        method: "GET",
        mode: 'cors',
        headers: {
            "Content-Type": "text/plain;charset=utf-8",
        },
    })
    .then((response) => response.json())
    .then(async (_data)=>{
        //console.log(data);
        var data = _data.data.map(i=>{return i.NAME})
        builtModalChooseDicts(editor,parentNode,data)
        
        var myListDict = util.getOption('listDict')
        if(!myListDict|| myListDict == '[]')
            $('#selectDicts').modal('show')
        else{
            myListDict = JSON.parse(myListDict)
            // $('#selectDicts input').each((i,e)=>{
            //     e.
            // })
            myListDict.map(i=>{
                //$('#check-'+i)[0].checked = true
                $(`input[value="${i}"]`)[0].checked=true
            })
            loadDictFromChoose(myListDict)
        }
        
    })
    .catch(error=>{
        console.log(error);
        // var myListDict = util.getOption('listDict')
        // if(myListDict){
        //     myListDict = JSON.parse(myListDict)
        //     loadDictFromChoose(myListDict)
        // }
        var myListDict = util.getOption('listDict')
        if(myListDict){
            myListDict = JSON.parse(myListDict)
            builtModalChooseDicts(editor,parentNode,myListDict)
            myListDict.map(i=>{
                $(`input[value="${i}"]`)[0].checked=true
            })
            loadDictFromChoose(myListDict)
        }
        $('#app-toast .toast-header strong').html('Error')
        $('#app-toast .toast-body').html(error)
        $('#app-toast').toast('show')
    })
};

(function(){
    this.callback = function(editor) {
        
    };
}).call(stardict.prototype);
exports.stardict = stardict