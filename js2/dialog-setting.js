"use strict";
(function(GLOBAL){

var net = require("ace/lib/net");
var event = require("ace/lib/event");
var whitespace = require("ace/ext/whitespace");

var buildDom = require("ace/lib/dom").buildDom;
var Editor = require("ace/editor").Editor;
var config = require("ace/config");
var OptionPanel = require("ace/ext/options").OptionPanel;

window.OptionPanel = OptionPanel
function builtModal(){
    var dom =['div',{
                'class':'modal',
                'id':'dialogSetting',
                'tabindex':"-1",
                'role':"dialog",
                'aria-labelledby':"dialogSettingTitle",
                'aria-hidden':"true"
            },
            ['div',{class:"modal-dialog modal-lg", role:"document"},
                ['div',{class:"modal-content bd-gray-900"},
                    ['div',{class:"modal-header"},
                        ['div',{class:"nav-item", id:"titleDialogSetting"},'Setting'],
                        ['button',{'type':"button",'class':"btn-secondary-close",'data-bs-dismiss':"modal", 'aria-label':"Close"}],
                    ],
                    ['div',{class:"modal-body", id:"bodyDialogSetting"}],
                    ['div',{class:"modal-footer"},
                        ['button',{'type':"button",'class':"btn btn-secondary",'data-bs-dismiss':"modal", 'aria-label':"Close"},'Close']
                    ],
                ],
            ]
    ]
    //console.log(buildDom(dom,$('#modals2')[0],{}));
    //  $('#modals2')[0].append(buildDom(dom,null,{}))
    
    // var old = $('#modals2')[0].innerHTML
    // buildDom(dom,$('#modals2')[0],{})
    // old += $('#modals2')[0].innerHTML
    // $('#modals2')[0].innerHTML = old

    var container = document.querySelector('body')
    var optionsPanel = document.createElement("div");
    buildDom(dom, optionsPanel, {})
    container.insertBefore(optionsPanel, container.firstChild);
}
     
var setting = function(editor) {
    builtModal()

    
    config.setLoader(function(moduleName, cb) {
        //console.log('setLoader ',moduleName);
        require([moduleName], function(module) {
            cb(null, module);
        });
    });

    // var doclist = require("lib/kitchen-sink/doclist");

    var modelist = require("ace/ext/modelist");
    var doclist = {}
    doclist.docs = modelist.modes.map(function(x){ 
        return { caption: x.caption, value: x.mode }; 
    });
    //console.log(doclist);

    var util = require("lib/kitchen-sink/util");
    var saveOption = util.saveOption;

    var element = $('#dialogSetting')[0]
    //OptionPanel(editor)


    

    var OptionPanel = require("ace/ext/options").OptionPanel;
    var optionsPanel = new OptionPanel(editor);

    window.optionsPanel = optionsPanel
    // optionsPanel.add({Main:{
    //     "Version Dictionaries": {
    //         type: "select",
    //         path: "mergeUndoDeltas",
    //         value:"always",
    //         items: [
    //            { caption : "Always",  value : "always" },
    //            { caption : "Never",   value : "false" },
    //            { caption : "Timed",   value : "true" }
    //         ]
    //     }
    // }})

    //var optionsPanelContainer = document.getElementById("bodyDialogSetting");
    var optionsPanelContainer = document.getElementById("settingPlace");
    optionsPanel.render();

    optionsPanel.setOption("fontSize","18");
    optionsPanel.render();

    optionsPanelContainer.insertBefore(optionsPanel.container, optionsPanelContainer.firstChild);
    optionsPanel.on("setOption", function(e) {
        // console.log(e);
        // e.value = e.value===''?false:e.value
        util.saveOption('ace.'+e.name, e.value);
    });
    
    var _defaultOptions = [
        {name:'fontSize',value:'18'},
        {name:'theme',value:'monokai'},
        {name:'wrap',value:'free'},
        {name:'indentedSoftWrap',value:false}
    ]
    if(localStorage.getItem('app.setttingDefault')==null){
        _defaultOptions.map(k=>{
            var i = k.name
            var value = k.value
            //console.log('[_defaultOptions] ',i,value);
            if (value != undefined) {
                if ((i == "mode" || i == "theme") && !/[/]/.test(value))
                    value = "ace/" + i + "/" + value;
                optionsPanel.setOption(i, value);
                editor.setOption(i,value);
            }
        })
        localStorage.setItem('app.setttingDefault',true)
    }

    //try{
        for (var i in optionsPanel.options) {
            var k = 'ace.'+i
            var value = util.getOption(k);
            //var value = util.getOption(i);
            value = value===''?false:value
            if (value != undefined) {
                //console.log('[setting] ',i,value,!/[/]/.test(value));
                if ((i == "mode" || i == "theme") && !/[/]/.test(value))
                    value = "ace/" + i + "/" + value;
                optionsPanel.setOption(i, value);
                editor.setOption(i,value);
            }
        }
    // }catch(error){
    //     console.log(error.message);
    // }
    
    
    optionsPanel.render();

    var r = document.querySelector(':root');
    r.style.setProperty('--app-font-size', editor.getOption('fontSize')+'px'||'18px');

    
    //optionsPanel.setOption("theme", util.getOption("theme") || "ace/theme/monokai")
    //try{
        //editor.setOption("doc",util.getOption("doc") || "JavaScript");
        //optionsPanel.setOption("doc", util.getOption("doc") || "JavaScript");
    //}catch(e){
    //    console.log(e);
    //}
    //optionsPanel.setOption("mode", util.getOption("mode") || "markdown");
    //optionsPanel.setOption("theme", util.getOption("theme") || "ace/theme/chaos");

    // for (var i in optionsPanel.options) {
    //     var value = util.getOption(i);
        
    //     if (value != undefined) {
    //         if ((i == "mode" || i == "theme") && !/[/]/.test(value))
    //             value = "ace/" + i + "/" + value;
    //         optionsPanel.setOption(i, value);
    //         editor.setOption(i,value);
    //         //console.log(i+' '+value);
    //     }
    // }
    // optionsPanel.render();

    

    $('#dialogSetting')[0].addEventListener('hidden.bs.modal', event => {
        var r = document.querySelector(':root');
        r.style.setProperty('--app-font-size', editor.getOption('fontSize')+'px'||'15px');
    })
};

// (function(){
//     this.callback = function(editor) {
        
//     };
// }).call(setting.prototype);
// exports.setting = setting;
setting(window.editor)
})(this)