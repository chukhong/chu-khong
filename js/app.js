/*
-1 dang nhap
-2 nguoi dung them tu
3 tra tu cua nguoi dung
4 sap xep quyen uu tien tra tu
5 dich bang tu da soan sang
6 luu/ google drive
7 open file
8 help
-9 setting
10 history of search word
11 tu dien dep, xoa cac event onmouseup, onmouseover, onmouseout

12 editor.session
13 markdown editor
14 view markdown

15 webapp
16 google translate can choose language 
17 choose language panel
*/

    //琢等字𠀤从此
    //玉不琢不成器 

window.APIID = 'AKfycbx1sE1YkK02m45oC1jZemiIX46REihXdHEjX6eskDJOp50CWLWoySCKPM57fi2tpGFG'
window.script_url = "https://script.google.com/macros/s/" + APIID + "/exec";
window.SHEETNAME = "dictionaries" 

// "unpkg":["https://unpkg.com/tableexport.jquery.plugin/tableExport.min.js",
// "https://unpkg.com/bootstrap-table@1.22.1/dist/bootstrap-table-locale-all.min.js"]
require.config({paths: {
    "ace":"./ace/src",
    "lib":"./js",
    "data":"./data",
    "tablednd":"./cdnjs.cloudflare.com/ajax/libs/TableDnD/0.9.1/jquery.tablednd.js",

},
shim : {

}});

require([
    "ace/ace", 
    "ace/ext/searchbox",
    "lib/app-toast",
    "lib/bar-main",
    //"lib/g-drive-script",
    "lib/bar-left-side",
    "lib/bar-mini",
    "lib/bar-expand",
    "lib/bar-selected",
    "lib/dialog-bo",
    "lib/dialog-users-translate",
    "lib/fns",

    // "lib/ace.c9.io.demo.test",
    //"ace/build/src/ace",
    "ace/editor",
    // "ace/ext/options",
    "lib/setting",
    "lib/dialog-result-search-word",
    "lib/startdict/d",
    "lib/dialog-add-word",
    "lib/gtranslate",
    "lib/user",
    
    "lib/register-sw",
    
    "lib/app-installer",
    "lib/idb-keyval-iife",
    "lib/file-system-apis",
    "lib/dialog-phien-am",
    "lib/dialog-rename",
    

    ], function(ace) {

    window.editor = ace.edit('id-editor');
    //var {d} = require("lib/startdict/d")
    require("lib/startdict/d")
    

    
    var {app} = require('lib/file-system-apis');
    var {barMain} = require('lib/bar-main');
    var {barLeftSide} = require('lib/bar-left-side');
    var {barMini} = require('lib/bar-mini');
    var {barExpand} = require('lib/bar-expand');
    var {barSelected} = require('lib/bar-selected');
    var {fns} = require('lib/fns');
    var {dialogBo} = require("lib/dialog-bo")
    var {setting} = require("lib/setting")
    var {gtranslate} = require("lib/gtranslate")
    var {dialogResultSearchWord} = require("lib/dialog-result-search-word")
    var {dialogAddWord} = require("lib/dialog-add-word")
    var {dialogUsersTranslate} = require("lib/dialog-users-translate")
    var {user} = require("lib/user")
    var {appInstaller} = require("lib/app-installer")
    var {dialogPhienAm} = require("lib/dialog-phien-am")
    var {dialogRename} = require("lib/dialog-rename")
    
    window.app = app


    /********************************/
    /****Configuring the editor******/
    /********************************/

    // pass options to ace.edit
    // ace.edit(editor, {
    //     mode: "ace/mode/markdown",
    //     selectionStyle: "text"
    // })
    // // use setOptions method to set several options at once
    // editor.setOptions({
    //     autoScrollEditorIntoView: true,
    //     copyWithEmptySelection: true,
    // });
    // // use setOptions method
    // editor.setOption("mergeUndoDeltas", "always");

    // // some options are also available as methods e.g. 
    //editor.setTheme("ace/theme/monokai");

    // to get the value of the option use
    //editor.getOption("optionName");

    //editor.session.setMode("ace/mode/markdown");

    var refs ={}
    
    var {appToast} = require("lib/app-toast")
    appToast(app)

    barMain(editor,document.getElementById("barMain"))
    barExpand(editor)
    barMini(editor,document.getElementById("minitoolbar"),refs)
    barLeftSide(editor,document.getElementById("leftSidebar"),app)
    app.addEvent()
    barSelected(editor)
    dialogBo(editor)
    dialogPhienAm(editor)
    dialogRename(editor)
    
    fns(editor,'#minitoolbar',refs)


    dialogResultSearchWord(d,editor,$('body')[0])
    
    dialogAddWord(d,editor)
    dialogUsersTranslate(d,editor)

    gtranslate(d,editor)

    

    editor.focus();
    setting(editor)
    user(d,editor)

    appInstaller(d,editor);

    
    //window.addEventListener('load',(event)=>{
        // d.autoLoadId()
        // d.event = event
        // d.loadFns(event)
    //)
    window.Editor = editor;

});
