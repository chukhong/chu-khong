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

var buildTemplate = (parentNode)=>{
    var listJS = 
    [
    // "/cdnjs.cloudflare.com/ajax/libs/es5-shim/4.0.5/es5-shim.min.js",
    // "/cdn.jsdelivr.net/jquery/1.11.1/jquery.min.js",
    // "/cdn.jsdelivr.net/lodash/2.4.1/lodash.js",
    // "/cdn.jsdelivr.net/bootstrap/3.2.0/js/bootstrap.min.js",
    // "/cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
    ],

    listCss = [
        "/cdn.jsdelivr.net/highlight.js/9.1.0/styles/github.min.css",
        "/cdn.jsdelivr.net/npm/@docsearch/css@3.css",
        "/cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css",
        "/editor-ace/css/google-icon-editor-local.css",
    ],
    dom=listJS.map(i=>{
        return ['script',{src:i}]
    })
    dom = dom.concat(listCss.map(i=>{return ['link',{rel:'stylesheet',href:i}]}))

    var last = [
        ["script",{src:"/cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"}]
    ]

    if(!navigator.onLine){
        // var optionsPanel = document.createElement("div");
        // buildDom(dom, optionsPanel, {})
        // parentNode.insertBefore(optionsPanel, parentNode.firstChild);
        dom.map(i=>{
            console.log(i);
            d.create(i[0],i[1],parentNode)
        })
        // last.map(i=>{
        //     console.log(i);
        //     d.create(i[0],i[1],d.q('body'))
        // })

    }
    function detestLoad(evt){
        console.log(evt);
    }
    d.qAll('script').onload = detestLoad
    // .forEach(i=>{
    //     //console.log(i);
    //     i.onerror = detestLoad// (event)=>{detestLoad(event)}
    // })

}
buildTemplate(d.q('head'))

// require(["ace/ace", 
//     "ace/lib/dom",
//     "lib/startdict/d",
//     // "lib/locallibs",
//     ], function(ace) {
//     var buildDom = require("ace/lib/dom").buildDom;
//     // var editor = ace.edit('editor');
    
//     var {d} = require("lib/startdict/d")
//     buildTemplate(d.q('head'),buildDom,d)

// });
