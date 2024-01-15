"use strict";
(function (GLOBAL) {
const d = document;
d.id = (id) => {
    return d.getElementById(id)
};
d.create = (tag, objs, parent) => {
    var c = d.createElement(tag);
    //for (var attr in objs) c[attr] ? c.setAttribute(attr, objs[attr]) : (c[attr] = objs[attr]);
    if (objs)
        for (var attr in objs){
        	if(c[attr]){
        	 	c.setAttribute(attr, objs[attr])
        	}else{
        		c[attr] = objs[attr];
        		c.setAttribute(attr, objs[attr])
        	}
        } 
    if (parent) parent.append(c);
    return c
};
function toTitleCase(str) {
    var c = str.replace(/(\w+)/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1);
    }).replace(/([^\w])/g, '');
    return c.charAt(0).toLowerCase() + c.substr(1);
};

d.autoLoadId = () => {
    var globals = d.querySelectorAll('[id]');
    globals.forEach(e => {
        var id = toTitleCase(e.id);
        window[id] = d.id(e.id)
        window[id].q = window[id].querySelector
        window[id].qAll = window[id].querySelectorAll
    })
}
d.q = d.querySelector;
d.qAll = d.querySelectorAll;

d.event = null
d.fns = []
d.init = function(cb){
    observeDOM(document.querySelector('body'), function(m){ 
        var addedNodes = [], removedNodes = [];
    
        m.forEach(record => record.addedNodes.length & addedNodes.push(...record.addedNodes))
        
        m.forEach(record => record.removedNodes.length & removedNodes.push(...record.removedNodes))

        // bind for what is object
        d.autoLoadId()
        //console.log('Added:', addedNodes, 'Removed:', removedNodes);
        
    });
    
    if(cb) 
        d.fns.push(cb)

    d.autoLoadId()
    d.loadFns({})
}
d.loadFns = function(event){
    d.fns.map(i=>{
        i(event)
    })
}
var 
observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    return function( obj, callback ){
        if( !obj || obj.nodeType !== 1 ) return; 

        if( MutationObserver ){
        // define a new observer
            var mutationObserver = new MutationObserver(callback)

            // have the observer observe for changes in children
            mutationObserver.observe( obj, { 
                childList: true,
                subtree: true,
                })
            return mutationObserver
        }
        
        // browser support fallback
        else if( window.addEventListener ){
        obj.addEventListener('DOMNodeInserted', callback, false)
        obj.addEventListener('DOMNodeRemoved', callback, false)
        }
    }
})()


    //exports.d = d;
    /*
     * Expose the function on the window object
     */

    //use amd or just through the window object.
    if (window) {
        if (typeof window.define == "function" && window.define.amd) {
            window.define("d", function() {
                return d;
            });
        } else if (window) {
            window.d = d;
        }
        //exports.d = d;
    }
    GLOBAL.d = d
    d.init()
})(this)
