"use strict";
(function (GLOBAL) {
var buildDom = require("ace/lib/dom").buildDom;
var dom =['div',{
                'class':'modal',
                'id':'dialogListPlugin',
                'tabindex':"-1",
                'role':"dialog",
                'aria-hidden':"true"
            },
            
            ['div',{class:"modal-dialog modal-lg",id:"dialogListPluginForm", role:"document"},
                ['div',{class:"modal-content bd-gray-900"},
                    ['div',{class:"modal-header navbar navbar-expand-lg"},
                            ['h1',{class:"modal-title mt-3"},
                            'Plugin'
                            ],
                        ['button',{'type':"button",'class':"btn-secondary-close",'data-bs-dismiss':"modal", 'aria-label':"Close"}],
                    ],
                    ['div',{class:"modal-body", id:"bodydialogListPlugin"},
                        ["div",{},//,"style":"visibility:hidden"
                            ['ul',{id:'listPlugin'}]
                        ]
                    ],
                    ['div',{class:"modal-footer"},
                        ['button',{'type':"button",'class':"btn btn-secondary",'data-bs-dismiss':"modal", 'aria-label':"Close"},'Close']
                    ],
                ],
            ]
            
    ]
function toTitleCase(str) {
    var c = str.replace(/(\w+)/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1);
    }).replace(/([^\w])/g, '');
    return c.charAt(0).toLowerCase() + c.substr(1);
};
var baiscFN = function(app,editor) {
    var parentNode = d.q("body")

    buildDom(dom,parentNode)

    //hide Plugin when not localhost
    if(location.hostname !='localhost'){
        var btn = d.q('[data-target="#dialogListPlugin"]')
        btn.setAttribute('class','d-none')
    }
    // $('#dialogListPlugin')
    // .on('shown.bs.modal',()=>{
        fetch(new Request('/stardict/dirPublic/?list=chu-khong/js2/plugin'))
        .then(res=>res.text())
        .then(res=>{
            var listCache = []
            eval(res)
            console.log(listCache);
            listPlugin.innerHTML = ''
            ulListPlugin.innerHTML = ''
            listCache.map(item=>{
                var url = item
                fetch(new Request(url))
                .then(res=>res.text())
                .then(res=>{
                    eval(res)
                })
                item = item.replace("/chu-khong/js2/plugin/",'').replace('.js','')
                var id = toTitleCase(item)
                //require("lib/plugin/"+item)
                //console.log("lib/plugin/"+item);
                // listPlugin.innerHTML += `<button type="button" onclick='${id}(this)'>${item}</button>`
                ulListPlugin.innerHTML+=`<li><a class="dropdown-item" href="#" onclick='${id}(this)'>${item}</a></li>`
            })
            
        })
    //})
};
baiscFN(window.app,window.editor)

})(this)