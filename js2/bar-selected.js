"use strict";
(function(GLOBAL){


var buildDom = require("ace/lib/dom").buildDom;
function builtModal(editor){
    var 
    dom =['div',{
        'class':'offcanvas offcanvas-top',
        'style':'height:45px!important',
        'id':'offcanvasTop',
        'tabindex':"-1",
        'aria-labelledby':"offcanvasTopLabel",
        },
        ['div',{class:"offcanvas-body m-0 p-0", id:"commandsSelected"},
        ],
    ] 
    // var old = $('#allcanvas')[0].innerHTML
    // buildDom(dom,$('#allcanvas')[0],{})
    // old += $('#allcanvas')[0].innerHTML
    // $('#allcanvas')[0].innerHTML = old

    var container = document.querySelector('body')
    var optionsPanel = document.createElement("div");
    buildDom(dom, optionsPanel, {})
    container.insertBefore(optionsPanel, container.firstChild);

}

const dom = ["div", { class: "menu" },
    ["button", {
        'data-bs-dismiss':"offcanvas",
    }, ["i",{class:'material-icons'},"keyboard_arrow_left"]],
    ["button", {
        'data-bs-dismiss':"offcanvas",
        'data-cmd-as': 'selectall',
    }, ["i",{class:'material-icons'},"select_all"]],
    ["button", {
        'data-bs-dismiss':"offcanvas",
        'data-cmd-as': 'copy'
    }, ["i",{class:'material-icons'},"content_copy"]],
    ["button", {
        'data-bs-dismiss':"offcanvas",
        'data-cmd-as': 'cut'
    }, ["i",{class:'material-icons'},"content_cut"]],
    ["button", {
        'data-bs-dismiss':"offcanvas",
        'data-cmd-as': 'paste'
    }, ["i",{class:'material-icons'},"content_paste"]],
    ["button", {
        'data-bs-dismiss':"offcanvas",
        // 'data-bs-target':"#dialogAddWord",
        // 'data-bs-toggle':"modal",
        'data-cmd-as': 'addWord'
    }, ["i",{class:'material-icons'},"add"], ["spand",{class:'badge text-bg-secondary'},"word"]],
]
var barSelected = function(editor) {
    builtModal(editor)
    var refs = {},
    parentNode = document.getElementById("commandsSelected")
    buildDom(dom,parentNode, refs)
};

// (function(){
//     this.callback = function(editor) {
        
//     };
// }).call(barSelected.prototype);
// exports.barSelected = barSelected;
barSelected(window.editor)
})(this)