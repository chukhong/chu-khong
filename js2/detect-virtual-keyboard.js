"use strict";
(function(GLOBAL) {
    window.onload = WindowOnload;
    window.onresize = WindowResize;
    
    function WindowOnload() {
        document.body.setAttribute("height", window.innerHeight);
        document.body.setAttribute("width", window.innerWidth);
        if(window.innerHeight < window.innerWidth) { /* Page loaded in landscape */ }
    }
    
    function WindowResize() {
        const previousWidth = parseInt(document.body.getAttribute("width"));
        const newWidth = window.innerWidth;
        const previousHeight = parseInt(document.body.getAttribute("height"));
        const newHeight = window.innerHeight;
    
        if(previousWidth === newWidth) {
            if(previousHeight > newHeight+50) { /* Keyboard was displayed */ console.log("shown"); }
            else if (previousHeight+50 < newHeight) { /* Keyboard was hidden */ console.log("hidden"); }
        }
    
        document.body.setAttribute("height", window.innerHeight);
        document.body.setAttribute("width", window.innerWidth);
    }
})(this)