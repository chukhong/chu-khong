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
d.autoLoadId = () => {
    var globals = d.querySelectorAll('[id]');

    function toTitleCase(str) {
        var c = str.replace(/(\w+)/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1);
        }).replace(/([^\w])/g, '');
        return c.charAt(0).toLowerCase() + c.substr(1);
    };
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
    if(cb) 
        d.fns.push(cb)
}
d.loadFns = function(event){
    d.fns.map(i=>{
        i(event)
    })
}

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
})(this)
