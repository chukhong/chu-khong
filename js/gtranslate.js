"use strict";
var {boFull} = require("data/boFull");
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
                ['strong',{class:'me-auto'},'Bootstrap'],
                ['small',{}],
                ['button',{'type':"button",'class':"btn-close",'data-bs-dismiss':"toast",'aria-label':"Close"}]
            ],
            ['div',{class:'toast-body'},'Hello, world! This is a toast message']
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
 
var basicFN = function(d,editor) {
    builtModal()
    var 
    eventReceiver = {
        gtranslate:(data)=>{
            //console.log(data);
            // $('#app-toast .toast-body').html(data)
            // $('#app-toast .toast-header strong').html('Error')
            // $('#app-toast').toast('show')
            editor.onPaste(data)
        },
        'gtranslate-toasts':(data)=>{
            //console.log(data);
            $('#app-toast .toast-body').html(data)
            $('#app-toast .toast-header strong').html('Error')
            $('#app-toast').toast('show')
        }
    }
    function initEvent(event) {
        try{
            //console.log(d.event)
            var {data} = event || d.event
            //console.log(data)
            if(data && data.fn)
            eventReceiver[data.fn](data.data)
        }catch(e){
            console.log(d.event)
            console.error(e)
        }
    } 
    //g-translate
    window.addEventListener("message", (event) => {
        initEvent(event)
    }, false);
    //d.init(initEvent)
};

(function(){
    this.callback = function(editor) {
        
    };
}).call(basicFN.prototype);
exports.gtranslate = basicFN;
