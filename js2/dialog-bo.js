"use strict";
(function(GLOBAL){


var {boFull} = require("data/boFull");
var buildDom = require("ace/lib/dom").buildDom;
function builtModal(){
    var dom =['div',{
                'class':'modal',
                'id':'dialogSystemWords',
                'tabindex':"-1",
                'role':"dialog",
                'aria-labelledby':"dialogSystemWordsTitle",
                'aria-hidden':"true"
            },
            ['div',{class:"modal-dialog modal-lg modal-fullscreen", role:"document"},
                ['div',{class:"modal-content bd-gray-900"},
                    ['div',{class:"modal-header m-0 p-0"},
                        ['div',{class:"nav-item", id:"titleDialogSystemWords"},'System Words'],
                        ['button',{'type':"button",'class':"btn-secondary-close",'data-bs-dismiss':"modal", 'aria-label':"Close"}],
                    ],
                    ['div',{class:"modal-body m-0 p-0 p-y-1", id:"bodyDialogSystemWords"}],
                    // ['div',{class:"modal-footer"},
                    //     ['button',{'type':"button",'class':"btn btn-secondary",'data-bs-dismiss':"modal", 'aria-label':"Close"},'Close']
                    // ],
                ],
            ]
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
function builtTemplate(parentNode,titleNode,data,nameCmd,id){
    nameCmd = nameCmd||'bo'
    id=id||''
    var 
    lis = [],
    divs = []
    for(var i in data){
        var
        li = ['li',{class:'nav-item',role:'presentation'},
                    ['button',{
                        class:'btn btn-outline-primary', 
                        id:'v-pills-'+id+i+'-tab',
                        'data-bs-toggle': "pill",
                        'data-bs-target':"#v-pills-"+id+i,
                        'data-cmd-bo-as':nameCmd+','+i,
                        'type':"button",
                        'role':"tab",
                        // aria-controls="v-pills-settings" aria-selected="false"
                        'aria-controls':"v-pills-"+id+i,
                        'aria-selected':"false"},i]
                ],
        div2 = ['div',
                {'class':"tab-pane fade", 
                'id':"v-pills-"+id+i, 'role':"tabpanel", 
                'aria-labelledby':"v-pills-"+id+i+"-tab", 
                'tabindex':'0'},
                '...']
        lis.push(li)
        divs.push(div2)
    }
    divs.push(['div',
                {'class':"",
                
                'id':"v-pills-Content"},
                'Content'])
    var ul = ['ul',{
                    'class':'nav nav-pills me-3',
                    'id':'pills-system-word',
                    'role':'tablist',
                    'aria-orientation':"vertical"
                    },
                lis
            ],
    div =['div',{class:"tab-content",id:"v-pills-tabContent"},divs],
    //dom= ["div",{},ul,div]
    //dom= ["div",{},div]
    dom = div
    parentNode.innerHTML =''
    buildDom(dom,parentNode,{})
    titleNode.innerHTML =''
    buildDom(ul,titleNode,{})
}
function builtTemplateWithChild(parentNode,data,nameCmd,id){
    nameCmd = nameCmd||'bo'
    id=id||''
    var 
    lis = [],
    divs = []
    if(!Array.isArray(data)){
        var data1  = []
        for(var i in data)
            data1.push(i)
        data = data1
    }
    data.map((k,i)=>{
        var
        index = i+1,
        li = ['li',{class:'nav-item',role:'presentation'},
                    ['button',{
                        class:'btn btn-outline-primary', 
                        id:'v-pills-'+id+index+'-tab',
                        'data-bs-toggle': "pill",
                        'data-bs-target':"#v-pills-"+id+index,
                        'data-cmd-bo-as':nameCmd+','+index,
                        // 'type':"button",
                        // 'role':"tab",
                        'aria-controls':"v-pills-"+id+index,
                        'aria-selected':"false"},k]
                ]
        var b = k.trim().split(' ')
        if(b.length==3)
            li = ['li',{class:'nav-item',role:'presentation'},
                    ['button',{
                        'class':'btn btn-outline-secondary',
                        'disabled':'disabled',
                        'aria-controls':"v-pills-"+id+index,
                        'aria-selected':"false"},k]
                ]
        lis.push(li)
        console.log(k.split(' '));
    })
    var ul = ['ul',{
                    'class':'nav nav-pills me-3',
                    'id':'pills-system-word',
                    'role':'tablist',
                    'aria-orientation':"vertical"
                    },
                lis
            ],
    dom= ["div",{},ul]
    parentNode.innerHTML =''
    buildDom(dom,parentNode,{})
}
function builtContent(parentNode,keyNum){
    var data = boFull[keyNum]
    parentNode = $('#v-pills-Content')[0]
    parentNode.innerHTML=''
    //parentNode.innerHTML='hello '+keyNum

    var 
    lis = []
    for(var i in data){
        var childs = []
        lis.push(['button',{class:'col btn btn-primary','disabled':'disabled'},i])
        //var childs = []
        data[i].map(el=>{
            var char = ['button',{
                class:'col btn btn-outline-secondary', 
                'data-cmd-bo-as':'getContent,'+el,
                'type':"button"},el]
            childs.push(char)
        })     
        
        //var
        //li = ['div',{class:'col'},['button',{class:'col btn btn-primary'},i],childs]
        //li = ['div',{class:'col'},['button',{class:'col btn btn-primary'},i],childs]
        //lis.push(li)
        lis.push(childs)

    }
    //var dom = ["div",{class:'row'},lis]
    var dom = lis
    //console.log(dom);
    parentNode.innerHTML =''
    buildDom(dom,parentNode,{})

}        
var dialogBo = function(editor) {
    builtModal()
    var
    parentNode = $('#bodyDialogSystemWords')[0],
    
    titleNode = $('#titleDialogSystemWords')[0]
    builtTemplate(parentNode,titleNode,boFull.bo)
    var fns={
        bo:(e)=>{
            // console.log(e.data);
            // console.log(boFull.bo[e.data]);
            builtTemplateWithChild($("#v-pills-"+e.data)[0],boFull.bo[e.data],'showContent','child-')
            $('#v-pills-Content')[0].innerHTML=''
        },
        showContent:(e)=>{
            var s = e.target.innerHTML.trim().split(' ')
            //builtContent(parentNode,s[1])
            builtContent($("#v-pills-child-"+e.data)[0],s[1])
        },
        getContent:(e)=>{
            $('#dialogSystemWords').modal('hide')
            editor.onPaste(e.target.innerHTML.trim())
            //$('#dialogSystemWords').modal.dismiss()
            //console.log(e.data);
        }
    }
    $(document).on("click", "[data-cmd-bo-as]", (function(event) {
      var cmd = $(this).data("cmdBoAs");
      cmd = cmd.split(',')
      event.data = cmd[1]
      //alert(cmd)
      if (fns[cmd[0]]) {
        fns[cmd[0]](event)
        //event.preventDefault();
      }
    }));
};

// (function(){
//     this.callback = function(editor) {
        
//     };
// }).call(dialogBo.prototype);
// window.dialogBo = dialogBo;
// window.builtModal = builtModal;
dialogBo(window.editor)
})(this)