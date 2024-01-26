"use strict";
(function(){

var buildDom = require("ace/lib/dom").buildDom;
function builtModal(){
    var dom =['div',{
                'class':'modal',
                'id':'dialogRename',
                'tabindex':"-1",
                'role':"dialog",
                'aria-hidden':"true"
            },
            
            ['div',{class:"modal-dialog modal-lg",id:"dialogFormRename", role:"document"},
                ['div',{class:"modal-content bd-gray-900"},
                    ['div',{class:"modal-header m-0 p-0 px-3 navbar navbar-expand-lg"},
                            ['h4',{class:"modal-title"},
                            'Rename'
                            ],
                        ['button',{'type':"button",'class':"btn-secondary-close",'data-bs-dismiss':"modal", 'aria-label':"Close"}],
                    ],
                    ['div',{class:"modal-body", id:"bodyDialogRename"},
                        ["div",{id:'formSaveRename'},//,"style":"visibility:hidden"
                            ["label",{"for":"inputRename","class":"px-3"},""],
                            ["input",{"type":"text",id:"inputRename"}],
                           
                        ]
                    ],
                    ['div',{class:"modal-footer"},
                        ['button',{
                            'type':"button",
                            'class':"btn btn-primary mx-3",
                            'data-cmd-rename':'save'
                        },'save'],
                        ['button',{'type':"button",'class':"btn btn-secondary",'data-bs-dismiss':"modal", 'aria-label':"Close"},'Close']
                    ],
                ],
            ]
            
    ]

    var container = document.querySelector('body')
    var optionsPanel = document.createElement("div");
    buildDom(dom, optionsPanel, {})
    container.insertBefore(optionsPanel, container.firstChild);

}

var 
fns = {
    save:()=>{
        fileName.innerText = inputRename.value
        localDeviceRename()
        gdRenameFile()
        $('#dialogRename').modal('hide')
    }
},
basicFN = function(editor) {
    builtModal()
    $('#dialogRename').on('shown.bs.modal', initShow)
    function initShow (){
        inputRename.value = fileName.innerText.trim()
    }
    $(document).on("click", "[data-cmd-rename]", (function (event) {
        var cmd = $(this).data("cmdRename");
        //alert(cmd)
        if (fns[cmd]) {
            fns[cmd](event)
            //event.preventDefault();
        } else {
            console.log(`
        // ${cmd} not defined
        ${cmd}:()=>{}
    `)
        }
    }));
};

// (function(){
//     this.callback = function(editor) {
        
//     };
// }).call(basicFN.prototype);
// exports.dialogRename = basicFN;
basicFN(window.editor)
})(this)
