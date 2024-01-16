"use strict";
(function(GLOBAL){

var basicFN = function(editor) {
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

// (function(){
//     this.callback = function(editor) {
        
//     };
// }).call(basicFN.prototype);
// exports.gtranslate = basicFN;
basicFN(window.editor)
})(this)