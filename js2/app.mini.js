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

window.APIID = 'AKfycbzsyBWc4GsJBqj3vlTr8l0k_uZFoYV_nGbnEO_9khBgBqgAoKrs4pX6hQ9gTfQ8CeRo'
window.script_url = "https://script.google.com/macros/s/" + APIID + "/exec";
window.SHEETNAME = "dictionaries" 

// "unpkg":["https://unpkg.com/tableexport.jquery.plugin/tableExport.min.js",
// "https://unpkg.com/bootstrap-table@1.22.1/dist/bootstrap-table-locale-all.min.js"]
require.config({paths: {
    "ace":"./ace/src",
    "lib":"./js2",
    "data":"./data",
    "tablednd":"./cdnjs.cloudflare.com/ajax/libs/TableDnD/0.9.1/jquery.tablednd.js",

},
shim : {

}});

require([
    'ace/ace', 
    'ace/ext/searchbox',
    'lib/startdict/d',
    'lib/sw-register.mini',
    'lib/bar-main.mini',
    'lib/dialog-select-word.mini',
    'lib/dialog-phien-am.mini',
    'lib/bar-selected.mini',
    'lib/app-toast.mini',
    'lib/bar-mini',
    'lib/dialog-plugin.mini',
    'lib/commands.mini',
    'lib/app-installer.mini',
    'lib/bar-left-side.mini',
    'lib/file-system-apis.mini',
    'lib/idb-keyval-iife.mini',
    'lib/dialog-result-search-word.mini',
    'lib/dialog-bo.mini',
    'lib/dialog-add-word.mini',
    'lib/user.mini',
    'lib/dialog-users-translate.mini',
    'lib/dialog-rename.mini',
    'lib/gtranslate.mini',
    'lib/detect-virtual-keyboard.mini',
    ], function(ace) {
    
    // window.editor = ace.edit('id-editor')

});
