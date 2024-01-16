"use strict";
(function (GLOBAL) {

const _app = {
    appName: 'Text Editor',
    file: {
        handle: null,
        name: null,
        isModified: false,
    },
    options: {
        captureTabs: true,
        fontFamily: 'Arial, fangsong',
        fontSize: 'medium',
        iconSize:'medium',
        monoSpace: false,
        wordWrap: true,
    },
    hasNativeFS: 'chooseFileSystemEntries' in window ||
                    'showOpenFilePicker' in window,
    isMac: navigator.userAgent.includes('Mac OS X'),
    };
window.app = _app
window.refs = window.refs || {}

var ace = require("ace/ace")
window.editor = ace.edit('id-editor');
window.editor.focus();

// var session = window.editor.getSession();
// session.setUseWrapMode(true);

var buildDom = require("ace/lib/dom").buildDom;
const dom = ["div", { class: "menu"},
    ["button", {
        class:'btn',
        'data-bs-toggle':"offcanvas",
        'data-bs-target':"#leftSidebar",
        'aria-expanded':"false",
        'aria-label':"Close",
    }, ["i",{class:"material-icons"},"menu"]],
    ['button',{
        'id':'fileName',
        'class':'btn overflow-hidden',
        'style':'width:40px; white-space: nowrap;',
        'data-toggle':'modal-left-click',
        'data-target':'#dialogRename'
        },'New File.txt'],
    ["button", {
        class:'btn',
        'data-bs-toggle':"offcanvas",
        'data-bs-target':"#offcanvasTop",
    }, ["i",{class:"material-icons"},"mode_edit"]],

    ["div", {class:'btn-group'}, 
        ['button',{
            'class':'btn btn-outline-dark d-sm-none',
            'type':'button',
            'data-cmd-as':'translateOffline',
            'data-toggle':'modal-contextmenu',
            'data-target':'#dialogAddWord'
            },
            ["i",{class:"material-icons"},"translate"]
        ],
        ['button',{
            'class':'btn btn-outline-dark dropdown-toggle dropdown-toggle-split d-sm-none',
            'aria-expanded':'true',
            'type':'button',
            'data-bs-toggle':'dropdown',
            },
        ],
        ['ul',{
                class:'d-sm-position-absolute dropdown-menu d-sm-inline-block m-0 p-0',
                // class:'dropdown-menu position-absolute'
            },
            ['li',{
                    class:'btn m-0 p-0', 
                    'data-cmd-as':"translateOffline",
                    'data-toggle':'modal-contextmenu',
                    'data-target':'#dialogAddWord'
                },
                ["button", {class:'btn btn-outline-dark',

                    }, 
                ["i",{class:"material-icons"},"translate"]],
                ["span",{class:'d-sm-none'},"Translate data owner"],
            ],
            ['li',{
                    class:'btn m-0 p-0', 
                    'data-cmd-as':"gTranslate"
                },
                ["button", {class:'btn btn-outline-dark'}, 
                ["i",{class:"material-icons"},"g_translate"]],
                ["span",{class:'d-sm-none'},"Google Translate"],
            ]
        ]
    ],
    ["div", {class:'btn-group'}, 
        ['button',{
            'class':'btn btn-outline-dark d-sm-none',
            'type':'button',
            'data-cmd-as':'upLowCases',
            },
            ["i",{class:"material-icons"},"text_format"]
        ],
        ['button',{
            'class':'btn btn-outline-dark dropdown-toggle dropdown-toggle-split d-sm-none',
            'aria-expanded':'true',
            'type':'button',
            'data-bs-toggle':'dropdown',
            },
        ],
        ['ul',{
                class:'d-sm-position-absolute dropdown-menu d-sm-inline-block m-0 p-0',
                // class:'dropdown-menu position-absolute'
            },
            ['li',{
                    class:'btn m-0 p-0', 
                    'data-cmd-as':"upLowCases"
                },
                ["button", {class:'btn btn-outline-dark'}, 
                ["i",{class:"material-icons"},"text_format"]],
                ["span",{class:'d-sm-none'},"upcase/lowcase"],
            ],
            ['li',{
                    class:'btn m-0 p-0', 
                    'data-cmd-as':"spellcheck"
                },
                ["button", {class:'btn btn-outline-dark'}, 
                ["i",{class:"material-icons"},"spellcheck"]],
                ["span",{class:'d-sm-none'},"spell check"],
            ],
            ['li',{
                    class:'btn m-0 p-0', 
                    'data-cmd-as':"linearWords"
                },
                ["button", {class:'btn btn-outline-dark'}, 
                ["i",{class:"material-icons"},"linear_scale"]],
                ["span",{class:'d-sm-none'},"linear Words"],
            ]
        ]
    ],
    ["div", {class:'btn-group'}, 
        ["button", {
            class:"position-relative btn btn-outline-dark d-sm-none",
            'data-cmd-as': 'changeWords34'
            }, 
            ["i",{class:"material-icons"},"swap_calls"],
            ["span",{class:"position-absolute top-50 start-0 translate-left badge rounded-pill"},"3-4"],
        ],
        ['button',{
            'class':'btn btn-outline-dark dropdown-toggle dropdown-toggle-split d-sm-none',
            'aria-expanded':'true',
            'type':'button',
            'data-bs-toggle':'dropdown',
            },
        ],
        ['ul',{
                class:'d-sm-position-absolute dropdown-menu dropdown-menu-end d-sm-inline-block m-0 p-0',
                // class:'dropdown-menu position-absolute'
            },
            ['li',{
                    class:'btn m-0 p-0', 
                    'data-cmd-as':"changeWords34"
                },
                ["button", {class:'position-relative btn btn-outline-dark'}, 
                    ["i",{class:"material-icons"},"swap_calls"],
                    ["span",{class:"position-absolute top-50 start-0 translate-left badge rounded-pill ps-2"},"3-4"]
                ],
                ["span",{class:'d-sm-none'}," swap 3 or swap 4"],
            ],
            ['li',{
                    class:'btn m-0 p-0', 
                    'data-cmd-as':"changeWordscua"
                },
                ["button", {class:'position-relative btn btn-outline-dark'}, 
                    ["i",{class:"material-icons"},"swap_calls"],
                    ["span",{class:"position-absolute top-50 start-0 translate-left badge rounded-pill ps-2"},"của"]
                ],
                ["span",{class:'d-sm-none'}," swap của"],
            ],
            ['li',{
                    class:'btn m-0 p-0', 
                    'data-cmd-as':"changeWordsla"
                },
                ["button", {class:'position-relative btn btn-outline-dark'}, 
                    ["i",{class:"material-icons"},"swap_calls"],
                    ["span",{class:"position-absolute top-50 start-0 translate-left badge rounded-pill ps-3"},"là"]
                ],
                ["span",{class:'d-sm-none'}," swap là"],
            ]
        ],
    ],
    ["div", {
        class:'btn-group'
        }, 
        ["button", {class:"position-relative btn btn-outline-dark d-md-none",'data-cmd-as': 'keyboardHanViet'}, 
            ["i",{class:"material-icons",
            },"keyboard"],
            ["span",{class:"position-absolute top-50 start-0 translate-left badge rounded-pill ms-1"},"漢"],
        ],
        ['button',{
            'class':'btn btn-outline-dark dropdown-toggle dropdown-toggle-split d-md-none',
            'aria-expanded':'true',
            'type':'button',
            'data-bs-toggle':'dropdown',
            },
        ],
        ['ul',{
            class:'btn d-md-position-absolute dropdown-menu dropdown-menu-end d-md-inline-block m-0 p-0',
            //class:'text-bg-secondary d-md-position-absolute dropdown-menu dropdown-menu-end d-md-inline-block m-0 p-0',
            // class:'dropdown-menu position-absolute'
            },
            ['li',{
                    class:'btn m-0 p-0', 
                    // 'data-cmd-as':"changeWords34"
                },
                ["button", {
                    'class':"position-relative btn btn-outline-dark",
                    'data-cmd-as': 'keyboardHanViet'
                    }, 
                    ["i",{class:"material-icons",},"keyboard"],
                    ["span",{class:"position-absolute top-50 start-0 translate-left badge rounded-pill ms-1"},"漢"],
                ],
            ],
            ['li',{
                    class:'btn m-0 p-0', 
                    // 'data-cmd-as':"changeWords34"
            },
                ["button", {
                    class:'position-relative btn btn-outline-dark',
                    'data-cmd-as': 'keyboardHanNom'
                    }, 
                    ["i",{class:"material-icons"},"keyboard"],
                    ["span",{class:"position-absolute top-50 start-0 translate-left badge rounded-pill ms-1"},"喃"]
                ],
            ],
            ['li',{
                    class:'btn m-0 p-0', 
                    // 'data-cmd-as':"changeWords34"
            },
                ["button", {
                    class:'position-relative btn btn-outline-dark ',//d-sm-none',
                    'data-cmd-as': 'keyboardPhiemAm',
                    'data-toggle':'modal-contextmenu',
                    'data-target':'#dialogPhienAm'
                    }, 
                    ["i",{class:"material-icons"},"keyboard"],
                    ["span",{class:"position-absolute top-50 start-0 translate-left badge rounded-pill"},"Âm"] //漢越
                ],
            ],
            ['li',{
                    class:'btn m-0 p-0', 
                    // 'data-cmd-as':"changeWords34"
            },
                ["button", {
                    class:'position-relative btn btn-outline-dark',//d-sm-none',
                    'data-cmd-as': 'keyboardGianThe'
                    }, 
                    ["i",{class:"material-icons"},"keyboard"],
                    ["span",{class:"position-absolute top-50 start-0 translate-left badge rounded-pill ms-1"},"简"]
                ],
            ],
            ['li',{
                    class:'btn m-0 p-0', 
                    // 'data-cmd-as':"changeWords34"
            },
                ["button", {
                    class:'position-relative btn btn-outline-dark',//d-sm-none',
                    'data-cmd-as': 'keyboardPhonThe'
                    }, 
                    ["i",{class:"material-icons"},"keyboard"],
                    ["span",{class:"position-absolute top-50 start-0 translate-left badge rounded-pill ms-1"},"繁"]
                ],
            ]
        ],

    ],
    ["button", {
        class:'position-relative btn btn-outline-dark d-none',//d-sm-none',
        id:'butInstall'
        }, 
        ["i",{class:"material-icons"},"download"],
    ],
]
var 
barMain = function(app,editor) {
    var parentNode = document.getElementById("barMain")
    buildDom(dom,parentNode)
};

// (function(){
//     this.callback = function(editor) {
        
//     };
// }).call(barMain.prototype);
// exports.barMain = barMain;

barMain(window.app,window.editor)
})(this)