"use strict";

var buildDom = require("ace/lib/dom").buildDom;
//var {hanViet} = require("data/hanViet");

// console.log(url);
function builtModal(){
    var dom =['div',{
                'class':'modal',
                'id':'dialogPhienAm',
                'tabindex':"-1",
                'role':"dialog",
                'aria-labelledby':"dialogSystemWordsTitle",
                'aria-hidden':"true"
            },
            ['form',{id:'formPriority','action':'#',method:'post'},
                ['div',{class:"modal-dialog modal-lg",id:"dialogFormPhienAm", role:"document"},
                    ['div',{class:"modal-content bd-gray-900"},
                        ['div',{class:"modal-header navbar navbar-expand-lg"},
                             ['h1',{class:"modal-title mt-3"},
                             'Change Phien Am'
                             ],
                            //  ['h1',{class:"modal-title spinner mx-3","style":"width:30px;height:30px",id:"spinnerFormPriority"},
                            //  ''
                            //  ],
                            ['button',{'type':"button",'class':"btn-secondary-close",'data-bs-dismiss':"modal", 'aria-label':"Close"}],
                        ],
                        ['div',{class:"modal-body", id:"bodyDialogPhienAm"},
                            ['div',{},
                                ["label",{"for":"filterAm","class":"px-3"},"Search"],
                                ["input",{"type":"text",id:"filterAm"}],
                                ['button',{
                                    'type':"button",
                                    'class':"btn btn-primary mx-3",
                                    'data-cmd-am-as':'filterWord'
                                },'Search'],
                            ],
                            ["div",{id:'showPhienAmFilter'},''],
                            ["div",{id:'formSaveChangeAm',"style":"visibility:hidden"},
                                ["label",{"for":"amChange","class":"px-3"},""],
                                ["input",{"type":"text",id:"amChange"}],
                                ['button',{
                                    'type':"button",
                                    'class':"btn btn-primary mx-3",
                                    'data-cmd-am-as':'save'
                                },'save'],
                            ]
                        ],
                        ['div',{class:"modal-footer"},
                            ['button',{'type':"button",'class':"btn btn-secondary",'data-bs-dismiss':"modal", 'aria-label':"Close"},'Close']
                        ],
                    ],
                ]
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
var 
fns = {
    filterWord:()=>{
        var
        showPhienAmFilter = document.querySelector('#showPhienAmFilter'),
        findKey = document.querySelector('#filterAm').value,
        dom,
        c = hanViet.filter(e=>{
            var w = e[1].split(/\,\s|\,|\;\s|\;/)
            return w.indexOf(findKey)!=-1
        })

        if(c.length!=0){
            c = c.map(e=>{return e[0] })
            dom = c.map(e=>{return ['button',{'type':"button",'class':'btn btn-secondary','data-cmd-am-as':'getAm'},e]})
        }

        if(c.length==0){
            c=[findKey]
            dom = c.map(e=>{return ['button',{'type':"button",'class':'btn btn-secondary','data-cmd-am-as':'getAm'},e]})
        }

        $('#dialogSelectWord .modal-body').html('')
        //var target = $('#dialogSelectWord .modal-body')[0]
        showPhienAmFilter.innerHTML=''
        buildDom(dom,showPhienAmFilter, {})

       
    },
    getAm:(event)=>{
        var formSaveChangeAm = document.querySelector('#formSaveChangeAm')
        console.log('getAm',event.target.innerHTML);
        var findKey = event.target.innerHTML.trim(),
        c = hanViet.find(e=>{
            return e[0]==findKey
        })
        console.log(c);
        
        formSaveChangeAm.style.visibility = 'visible' //hidden
        var label = document.querySelector('label[for="amChange"]')
        var amChange = document.querySelector('#amChange')
        amChange.value = c[1]
        label.innerHTML = c[0]
    },
    save:()=>{
        var formSaveChangeAm = document.querySelector('#formSaveChangeAm')
        formSaveChangeAm.style.visibility = 'hidden'

        var label = document.querySelector('label[for="amChange"]')
        var findKey = label.innerHTML.trim()
        var amChange = document.querySelector('#amChange')
        hanViet.find(e=>{
            if(e[0]==findKey){
                e[1] = amChange.value
                return e
            }
        })
        localStorage.setItem('hanViet',JSON.stringify(hanViet))
    }
}   
var dialogPhienAm = function(editor) {
    builtModal()
    
    //$('#table').bootstrapTable()
    // $('#table').bootstrapTable('hideColumn', 'EMAIL')
    // $('#table').bootstrapTable('hideColumn', 'ID')
    //ajaxRequest()
    //$('#table').tableDnD()
  
    
    $('#dialogPhienAm').on('shown.bs.modal', initShow)
    function initShow (){
 
    }

    $(document).on("click", "[data-cmd-am-as]", (function(event) {
        var cmd = $(this).data("cmdAmAs");
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
};

(function(){
    this.callback = function(editor) {
        
    };
}).call(dialogPhienAm.prototype);
exports.dialogPhienAm = dialogPhienAm;
