"use strict";

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
                ["button", {class:'btn btn-outline-dark'}, 
                ["i",{class:"material-icons"},"search"]],
                ["span",{class:'d-sm-none'},"Search content"],
            ],
            ['li',{
                    class:'btn m-0 p-0 start-0 top-0', 
                    'data-cmd-as':"reply"
                },
                ["button", {class:'btn btn-outline-dark'}, 
                ["i",{class:"material-icons"},"find_replace"]],
                ["span",{class:'d-sm-none'},"Search & replace"],
            ],
            ['li',{
                    class:'btn m-0 p-0 start-0 top-0', 
                    'data-cmd-as':"searchtu",
                    'data-bs-toggle':"offcanvas",
                    'data-bs-target':"#dialogResultSearchWord",
                },
                ["button", {class:'btn btn-outline-dark'}, 
                ["i",{class:"material-icons"},"search"],["span",{},"Từ"]],
                ["span",{class:'d-sm-none'},"Dictionaries"],
            ],
            ['li',{
                    class:'btn m-0 p-0 start-0 top-0', 
                    'data-bs-toggle':"modal",
                    'data-bs-target':"#dialogSystemWords",
                    'data-cmd-as':'systemWord'
                },
                ["button", {class:'btn btn-outline-dark'}, 
                ['i',{class:'material-icons'},"search"],["span",{},"Bộ"]],
                ["span",{class:'d-sm-none'},"Systems word"],
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
   ["button", {
        ref: "",
        'data-cmd-as': 'plugin'
    }, ["i",{class:"material-icons"},"extension"]],
]
var barMini = function(editor, parentNode,refs) {
    buildDom(dom,parentNode, refs)
};

(function(){
    this.callback = function(editor) {
        
    };
}).call(barMini.prototype);
exports.barMini = barMini;