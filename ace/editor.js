var editor
window.addEventListener("load",()=>{


    editor = ace.edit("ace_editor_demo");
    editor.setTheme("ace/theme/monokai");

    // load default format

    fetch('format.md')
    .then(response => response.text())
    .then(data=>{
        editor.setValue(data)
        editor.focus();
        editor.navigateFileEnd();
    })

    // load help

    fetch('format.md')
    .then(response => response.text())
    .then(data=>{
        $('#bodyHelp').html(data)
    })

    editor.session.setMode("ace/mode/markdown");


// editor.commands.addCommand({
//     name: 'myCommand',
//     bindKey: {win: 'Ctrl-M',  mac: 'Command-M'},
//     exec: function(editor) {
//         //...
//     },
//     readOnly: true, // false if this command should not apply in readOnly mode
//     // multiSelectAction: "forEach", optional way to control behavior with multiple cursors
//     // scrollIntoView: "cursor", control how cursor is scolled into view after the command
// });
    var myClipboar = ''

    // defind all command

    var fns = {
        undo:()=>{editor.undo()},
        redo:()=>{editor.redo()},
        copy:()=>{
            myClipboar = editor.getCopyText(); 
            navigator.clipboard.writeText(myClipboar)
            editor.onCopy(); 
            // console.log('onCopy');
        },
        cut:()=>{
            myClipboar = editor.getCopyText(); 
            navigator.clipboard.writeText(myClipboar)
            editor.onCut(); 
            // console.log('cut');
        },
        paste:(event)=>{
            navigator
            .clipboard
            .readText()
            .then((clipText) => (editor.onPaste(clipText,event)));
            //editor.onPaste(myClipboar,event); 
            // console.log('paste');
            // console.log(myClipboar);

        },
        flag:()=>{

        },
        search:()=>{
            editor.execCommand('find')
        },
        reply:()=>{
            editor.execCommand('replace')  
        },
        searchWord:()=>{
            //#bodyDialogResultSearchWord
            $("#wordSelected").html(editor.getCopyText())
            $("#dialogResultSearchWord").modal("show")
        },

        translateOffline:()=>{
            var
            currentLine =  editor.selection.getCursor().row
            ,previousLine = currentLine-1
            ,text = editor.selection.doc.$lines[previousLine]
            editor.onPaste("translateOffline "+text)
        },
        gTranslate:()=>{
            var
            currentLine =  editor.selection.getCursor().row
            ,previousLine = currentLine-1
            ,text = editor.selection.doc.$lines[previousLine]
            editor.onPaste("gTranslate "+text)
        },
    }

    // bind commands

    $(document).on("click", "[data-cmd-as]", (function(event) {
      var cmd = $(this).data("cmdAs");
      if (cmd) {
        fns[cmd](event)
        //event.preventDefault();
      }
    }));

    //----------------------
    // INIT 
    editor.setOptions({
        fontFamily: `'Nom Na Tong',-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";`,
        fontSize: $('select[name="fontSize"]').val(),
        fontStyle: "normal"
        //font: $('select[name="fontSize"]').val() +`/normal 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace`
    });
    
    //------------------------
    //# EVENT

    // SETTING
    $('select[name="fontSize"]').on('change',e=>{
        editor.setOptions({
            fontSize: $('select[name="fontSize"]').val(),
            // fontStyle: "normal"
            //font: $('select[name="fontSize"]').val() +` 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace`
        });
    })

    // editor capture  word
    editor.on("mouseup", function() {
        var text = editor.getCopyText()
        if(text.length)
            console.log(text);
    })

    // mouse right

    $("[data-toggle='modal-contextmenu']").on("contextmenu", function(e) {
      e.preventDefault();
      var targetModal = $(this).data('target');
      $(targetModal).modal("show");
    })

    // event click
    $("[data-toggle='toggle-find']").on("click", function(e) {
      //e.preventDefault();
      $("[data-toggle='toggle-find']").each((i,el)=>{
        //$(el).addClass('hidden')
        var targetModal = $(el).data('target');
        $(targetModal).addClass('hidden')
      })
        var targetModal = $(this).data('target');
        //$(targetModal).show();
        $(targetModal).toggleClass('hidden')
        $('#dialogOptionFind').modal("hide");
    })

    // event keyboard click

    $("[data-toggle='toggle-keyboard']").on("click", function(e) {
      //e.preventDefault();
      $("[data-toggle='toggle-keyboard']").each((i,el)=>{
        var targetModal = $(el).data('target');
        $(targetModal).addClass('hidden')
      })
      var targetModal = $(this).data('target');
       $(targetModal).toggleClass('hidden')
       $('#dialogOptionKeyboard').modal("hide");
    })

    // event translate click

    $("[data-toggle='toggle-translate']").on("click", function(e) {
      //e.preventDefault();
      $("[data-toggle='toggle-translate']").each((i,el)=>{
        //$(el).addClass('hidden')
        var targetModal = $(el).data('target');
        $(targetModal).addClass('hidden')
      })
        var targetModal = $(this).data('target');
        //$(targetModal).show();
        $(targetModal).toggleClass('hidden')
        $('#dialogOptionTranslate').modal("hide");
    })

})