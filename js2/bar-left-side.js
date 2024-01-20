"use strict";
(function(GLOBAL){


var {gDriveScript} = require("lib/g-drive-script");


var buildDom = require("ace/lib/dom").buildDom;
const dom = [
    ["div",{"class":"offcanvas-header border-bottom"},
        ["h5",{"class":"offcanvas-title","id":"bdSidebarOffcanvasLabel"},"File And Folder"],
        ["button",{"type":"button","class":"btn-close","data-bs-dismiss":"offcanvas","aria-label":"Close","data-bs-target":"#leftSidebar"},""],
    ],
    ["div",{"class":"offcanvas-body"},
        ["div",{"class":"menu list-group list-group-flush scrollarea"},
            ["div",{"id":"buttonDiv","class":"list-group-item py-3 lh-sm","style":"display: none;"},""],
                ["div",{"class":"expand-container","style":"display: none;"},
                    ["ul",{},
                        // ["li",{"onclick":"readEditDownload(this, 'read')"},"Read"],
                        ["li",{"onclick":"readEditDownload(this, 'edit')"},"Edit"],
                        ["li",{"onclick":"readEditDownload(this, 'download')"},"Download"],
                        ["li",{"onclick":"gdDeleteFile(this)"},"Delete"],
                    ],
                ],                        
            ["ul",{"class":"list-group"},
                ["li",{"class":"list-group-item"},
                    ["div",{"href":"#","class":"list-group-item","aria-current":"true"},
                        ["div",{"class":"d-flex w-100 justify-content-between"},
                            ["span",{"class":"mb-1"},"Local device"],
                            ["a",{'href':'#'},["small",{'data-cmd-left-side-as':'localDeviceNewFile'},"+ file"]],
                        ],
                    ],
                    ["ul",{"class":"list-group"},
                        ["li",{"class":"list-group-item"},
                            ["a",{"data-cmd-left-side-as":"openFile"},
                                ["i",{"class":"material-icons"},"folder"],["a",{'href':'#',"class":"mx-1"},"Open file"],
                            ],
                        ],
                        ["li",{"class":"list-group-item"},"history"],
                    ],
                ],
                ["li",{"class":"list-group-item"},
                    ["div",{"href":"#","class":"list-group-item","aria-current":"true"},
                        ["div",{"class":"d-flex w-100 justify-content-between"},
                        ["h5",{"class":"mb-1"},"Google Driver"],
                        ["a",{'href':'#'},["small",{'data-cmd-left-side-as':'gdNewFile'},"+ file"]],
                        ],
                    ],
                    ["li",{"class":"signin list-group-item"},
                        ["a",{"class":""},"Sign In"]
                    ],
                    ["li",{"class":"signout list-group-item"},
                        ["a",{"class":""},"Sign Out"]
                    ],
                    ["li",{"class":"list-group-item list"},
                        ["ul",{"class":"list-group"},
                            ["div",{"style":"text-align: center;"},"Sign In First"],
                        ],
                    ]
                ],
            ],
            
            // ["button",{"class":"auth-buttons py-3 lh-sm"},
               
            // ],
            ["div",{"class":"list-group list-group-flush scrollarea"},
                
            ],
            ["div",{"class":"actions d-none"},
                ["button",{"class":"upload","onclick":"gdUpload()"},"Backup"],
            ],
        
            ["div",{"class":"px-2","id":"appversion"},""],
        ],
    ]
]

var editor,
fns = {
    openFile:()=>{

    },
    googleDrive:()=>{
        
    },
    gdNewFile:()=>{
        fileName.innerHTML = 'New file'
        //d.q('[data-cmd-as=save]').removeAttribute('')
        editor.setValue('new content')
        editor.id=''
        gdUpload()
        d.q('[data-cmd-as=save]').setAttribute('onclick', 'gdUpload()');

        $('#leftSidebar').offcanvas('hide')
    },
    localDeviceNewFile:()=>{
        fileName.innerHTML = 'New file'
        //d.q('[data-cmd-as=save]').removeAttribute('onclick')
        d.q('[data-cmd-as=save]').setAttribute('onclick','localDeviceDownloadFile()')
        editor.setValue('')
        editor.id=''
        $('#leftSidebar').offcanvas('hide')
    }
},

barLeftSide = function(app,_editor) {
    var parentNode = document.getElementById("leftSidebar")
    editor = _editor
    buildDom(dom,parentNode)
    $(document).on("click", "[data-cmd-left-side-as]", (function(event) {
        var cmd = $(this).data("cmdLeftSideAs");
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
    // window.addEventListener('load',(event)=>{
    //     gDriveScript(editor,parentNode)
    // })
    gDriveScript(editor,parentNode,app)
    
    //default localfile
    fns.localDeviceNewFile()
};
barLeftSide(window.app,window.editor)
// (function(){
//     this.callback = function(editor) {
        
//     };
// }).call(barLeftSide.prototype);
// exports.barLeftSide = barLeftSide;
})(this)