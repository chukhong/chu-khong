"use strict";
(function(GLOBAL){
//console.log('[load] app toast');
//(function (GLOBAL) {
var buildDom = require("ace/lib/dom").buildDom;
function builtModal(){
    var 
    dom = ['div',{class:'toast-container position-fixed bottom-0 end-0 p-3'},
        ['div',
            {
                id:'app-toast',
                class:"toast",'role':"alert",'aria-live':"assertive",'aria-atomic':"true"
            },
            ['div',{class:'toast-header'},
                ['strong',{class:'me-auto'},'App Chu Khong ACE'],
                ['small',{}],
                ['button',{'type':"button",'class':"btn-close",'data-bs-dismiss':"toast",'aria-label':"Close"}]
            ],
            ['div',{class:'toast-body'},'Hello, world! This is a toast message']
        ]
    ]
    var container = document.querySelector('body')
    var optionsPanel = document.createElement("div");
    buildDom(dom, optionsPanel, {})
    container.insertBefore(optionsPanel, container.firstChild);
}
var basicFN = function(app) {
    builtModal()

    var header = $('#app-toast .toast-header strong')[0]
    var body = $('#app-toast .toast-body')[0]
    var self = $('#app-toast')

    window.app.toast = {
        message:(title,message)=>{
            header.innerHTML = title
            body.innerHTML = message
            return window.app.toast
        },
        show:()=>{
            self.toast('show')
        },
        hide:()=>{
            self.toast('hide')
        }
    }

};
// (function(){
//     this.callback = function(editor) {
        
//     };
// }).call(basicFN.prototype);
//exports.appToast = basicFN
basicFN()
})(this)