"use strict";
(function (GLOBAL) {
    

//#dialogSelectWord .modal-title
var buildDom = require("ace/lib/dom").buildDom;
function builtModal(){
    var dom =['div',{
                'class':'modal',
                'id':'dialogSelectWord',
                'tabindex':"-1",
                'role':"dialog",
                'aria-labelledby':"dialogSystemWordsTitle",
                'aria-hidden':"true"
            },
            ['div',{class:"modal-dialog modal-lg", role:"document"},
                ['div',{class:"modal-content bd-gray-900"},
                    ['div',{class:"modal-header"},
                        ['div',{class:"modal-title nav-item", id:"dialogSelectWordTitle"},'System Words'],
                        ['button',{'type':"button",'class':"btn-secondary-close",'data-bs-dismiss':"modal", 'aria-label':"Close"}],
                    ],
                    ['div',{class:"modal-body", id:"bodyDialogSelectWord"}],
                    ['div',{class:"modal-footer"},
                        ['button',{'type':"button",'class':"btn btn-secondary",'data-bs-dismiss':"modal", 'aria-label':"Close"},'Close']
                    ],
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

const dom = ["div", { class: "menu",
        // 'data-bs-toggle':"offcanvas",
        // 'data-bs-target':"#barExpand",
    },
    ["button", {
        class:'d-md-none',
        'data-bs-toggle':"offcanvas",
        'data-bs-target':"#barExpand",
        'aria-label':"Close",
        'aria-expanded':"false",
    }, ["i",{class:"material-icons"},"clear"]],

    
    
]
var basicFN = function(editor) {
    builtModal()
    var parentNode = document.getElementById("barExpand")
    buildDom(dom,parentNode, refs)
};

basicFN(window.editor)

})(this)