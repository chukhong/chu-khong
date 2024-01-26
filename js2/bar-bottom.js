"use strict";
(function (GLOBAL) {

var buildDom = require("ace/lib/dom").buildDom;

const dom = ["div", { class: "menu" },
    ["button", {
        'data-cmd-as': 'insertTab'
    }, ["i",{class:"material-icons"},"keyboard_tab"]],
    ["button", {
        'data-cmd-as': 'insertEnter'
    }, ["i",{class:"material-icons"},"subdirectory_arrow_left"]],
    ["button", {
        ref: "undoButton",
        'data-cmd-as': 'undo'
    }, ["i",{class:"material-icons"},"undo"]],
    ["button", {
        ref: "redoButton",
        'data-cmd-as': 'redo' 
    }, ["i",{class:"material-icons"},"redo"]],
    ["div", {class:'btn-group dropup'}, 
        ['button',{
            'class':'btn btn-outline-dark d-sm-none',
            'type':'button',
            'data-cmd-as':'search',
            // 'data-toggle':'swap',
            // 'data-target':'#btnSwapSearch',
            'id':'btnSwapSearch'
            },
            ["i",{class:"material-icons"},"search"]
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
            },
            ['li',{
                    class:'btn m-0 p-0 start-0 top-0', 
                    'data-cmd-as':"search"
                },
                ["a", {class:'dropdown-item btn btn-outline-dark w-100 text-start'}, 
                    ["i",{class:"material-icons"},"search"],
                    ["span",{class:'d-sm-none'},"Tìm nội dung"],
                ],
            ],
            ['li',{
                    class:'btn m-0 p-0 start-0 top-0', 
                    'data-cmd-as':"reply"
                },
                ["a", {class:'dropdown-item btn btn-outline-dark w-100 text-start'}, 
                    ["i",{class:"material-icons"},"find_replace"],
                    ["span",{class:'d-sm-none'},"Tìm/Thay Thế"],
                ],
            ],
            ['li',{
                    class:'btn m-0 p-0 start-0 top-0', 

                },
                ["a", {
                    "class":'dropdown-item btn btn-outline-dark w-100 text-start',
                    'data-cmd-as':"searchtu",
                    'data-toggle':'active',
                    'data-target':'#btnSearchTu',
                    // 'data-bs-toggle':"offcanvas",
                    // 'data-bs-target':"#dialogResultSearchWord",
                    'id':'btnSearchTu'
                    }, 
                    ["i",{class:"material-icons"},"search"],
                    ["span",{class:'d-none d-sm-inline'},"Từ"],
                    ["span",{class:'d-sm-none px-1'},"Tra từ điển"],
                ],
                    
            ],
            ['li',{
                    class:'btn m-0 p-0 start-0 top-0', 
                    'data-bs-toggle':"modal",
                    'data-bs-target':"#dialogSystemWords",
                },
                ["a",{
                    class:'dropdown-item btn btn-outline-dark w-100 text-start',
                    'data-toggle':'swap',
                    'data-target':'#btnSwapSearch',
                    'data-cmd-as':'systemWord'
                    }, 
                    ['i',{class:'material-icons'},"search"],
                    ["span",{class:'d-none d-sm-inline'},"Bộ"],
                    ["span",{class:'d-sm-none px-1'},"Tra Bộ"],
                ],
            ]
        ]
    ],
    ["button", {
        'data-cmd-as': 'moveleft'
    }, ["i",{class:"material-icons"},"arrow_back"]],
    ["button", {
        'data-cmd-as': 'moveright'
    }, ["i",{class:"material-icons"},"arrow_forward"]],
   ["button", {
        ref: "saveButton",
        'data-cmd-as': 'save'
    }, ["i",{class:"material-icons"},"save"]],
    // ["button", {
    //     ref: "",
    //     //'data-cmd-as': 'plugin'
    //     'data-toggle':'modal-left-click',
    //     'data-target':'#dialogListPlugin'
    // }, ["i",{class:"material-icons"},"extension"]],
    ["div",{"class":"btn-group dropup",'data-target':'#dialogListPlugin'},
        ["button",
            {"type":"button",
            "class":"btn btn-secondary dropdown-toggle",
            "data-bs-toggle":"dropdown",
            "aria-expanded":"false"
            },
            ["i",{class:"material-icons"},"extension"]
        ],
        ["ul",{"class":"dropdown-menu",'id':'ulListPlugin'},
            // ["li",{},
            // ["a",{"class":"dropdown-item","href":"#"},"Action"],
            // ],
            // ["li",{},
            // ["a",{"class":"dropdown-item","href":"#"},"Action two"],
            // ],
            // ["li",{},
            // ["a",{"class":"dropdown-item","href":"#"},"Action three"],
            // ],
        ],
    ]
]
var barMini = function(app,editor,refs) {
    var parentNode = document.getElementById("minitoolbar")
    buildDom(dom,parentNode,refs)
    // $("[data-toggle='swap']").on("click", function (e) {
    //     e.preventDefault();
    //     var targetModal = $(this).data('target');
    //     $(targetModal).html($(this).html())
    //     $(targetModal).data('cmdAs',$(this).data('cmdAs'))
    //     console.log(targetModal);
    // })
};

// (function(){
//     this.callback = function(editor) {
        
//     };
// }).call(barMini.prototype);
// exports.barMini = barMini;
barMini(window.app,window.editor,window.refs)
})(this)
