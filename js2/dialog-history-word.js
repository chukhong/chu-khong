"use strict";
(function (GLOBAL) {
    

//#dialogSelectWord .modal-title
var buildDom = require("ace/lib/dom").buildDom;
function builtModal(){
    var dom =['div',{
                'class':'modal',
                'id':'dialogHistoryWord',
                'tabindex':"-1",
                'role':"dialog",
                'aria-labelledby':"dialogSystemWordsTitle",
                'aria-hidden':"true"
            },
            ['div',{class:"modal-dialog modal-dialog-scrollable", role:"document"},
                ['div',{class:"modal-content "},
                    ['div',{class:"modal-header"},
                        ['div',{class:"modal-title nav-item", id:"dialogHistoryWordTitle"},'History Words'],
                        ['button',{'type':"button",'class':"btn-close",'data-bs-dismiss':"modal", 'aria-label':"Close"}],
                    ],
                    ['div',{class:"modal-body", id:"bodyDialogHistoryWord"}],
                    // ['div',{class:"modal-footer"},
                    //     ['button',{'type':"button",'class':"btn btn-secondary",'data-bs-dismiss':"modal", 'aria-label':"Close"},'Close']
                    // ],
                ],
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
var commands = {
    click:(event)=>{
        //console.log(event);
        searchInput.value = event.target.innerText
        
        //$('#dialogHistoryWord').modal('hide')
        btnSearchWord.click()
    }
}
function onShow(){
    console.log('onshow');
    var historyWords = window.historyWords
    var body = d.q('#bodyDialogHistoryWord')
    var dom = ['div']
    historyWords.map(item=>{
        dom.push(['li',{},['a',{href:'#','data-history-cmd':'click'},item]])

    })
    body.innerHTML =  buildDom(['ul',{},dom]).innerHTML
    //EVENT click FOR DICIS
    $(document).on("click", "[data-history-cmd]", (function (event) {
        var cmd = $(this).data('historyCmd');
        //alert(cmd)
        if (commands[cmd]) {
            commands[cmd](event)
            //event.preventDefault();
        } else {
            console.log(`
            // ${cmd} not defined
            ${cmd}:()=>{}
        `)
        }
    }));
}
var basicFN = function(editor) {
    builtModal()
    $('#dialogHistoryWord').on('shown.bs.modal', onShow)
};



basicFN(window.editor)

})(this)