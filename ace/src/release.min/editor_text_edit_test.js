"undefined"!=typeof process&&(require("amd-loader"),require("./test/mockdom"));var EditSession=require("./edit_session").EditSession,Editor=require("./editor").Editor,JavaScriptMode=require("./mode/javascript").Mode,UndoManager=require("./undomanager").UndoManager,MockRenderer=require("./test/mockrenderer").MockRenderer,assert=require("./test/assertions"),whitespace=require("./ext/whitespace");module.exports={"test: delete line from the middle":function(){var e=new EditSession(["a","b","c","d"].join("\n")),t=new Editor(new MockRenderer,e);t.moveCursorTo(1,1),t.removeLines(),assert.equal(e.toString(),"a\nc\nd"),assert.position(t.getCursorPosition(),1,0),t.removeLines(),assert.equal(e.toString(),"a\nd"),assert.position(t.getCursorPosition(),1,0),t.removeLines(),assert.equal(e.toString(),"a"),assert.position(t.getCursorPosition(),0,1),t.removeLines(),assert.equal(e.toString(),""),assert.position(t.getCursorPosition(),0,0)},"test: delete multiple selected lines":function(){var e=new EditSession(["a","b","c","d"].join("\n")),t=new Editor(new MockRenderer,e);t.moveCursorTo(1,1),t.getSelection().selectDown(),t.removeLines(),assert.equal(e.toString(),"a\nd"),assert.position(t.getCursorPosition(),1,0)},"test: delete first line":function(){var e=new EditSession(["a","b","c"].join("\n")),t=new Editor(new MockRenderer,e);t.removeLines(),assert.equal(e.toString(),"b\nc"),assert.position(t.getCursorPosition(),0,0)},"test: delete last should also delete the new line of the previous line":function(){var e=new EditSession(["a","b","c",""].join("\n")),t=new Editor(new MockRenderer,e);t.moveCursorTo(3,0),t.removeLines(),assert.equal(e.toString(),"a\nb\nc"),assert.position(t.getCursorPosition(),2,1),t.removeLines(),assert.equal(e.toString(),"a\nb"),assert.position(t.getCursorPosition(),1,1)},"test: indent block":function(){var e=new EditSession(["a12345","b12345","c12345"].join("\n")),t=new Editor(new MockRenderer,e),o=(t.moveCursorTo(1,3),t.getSelection().selectDown(),t.indent(),assert.equal(["a12345","    b12345","    c12345"].join("\n"),e.toString()),assert.position(t.getCursorPosition(),2,7),t.getSelectionRange());assert.position(o.start,1,7),assert.position(o.end,2,7),e.setValue("   x"),e.setOption("useSoftTabs",!1),t.selection.moveTo(0,3),t.indent(),assert.equal("\tx",e.toString())},"test: indent selected lines":function(){var e=new EditSession(["a12345","b12345","c12345"].join("\n")),t=new Editor(new MockRenderer,e);t.moveCursorTo(1,0),t.getSelection().selectDown(),t.indent(),assert.equal(["a12345","    b12345","c12345"].join("\n"),e.toString())},"test: no auto indent if cursor is before the {":function(){var e=new EditSession("{",new JavaScriptMode),t=new Editor(new MockRenderer,e);t.moveCursorTo(0,0),t.onTextInput("\n"),assert.equal(["","{"].join("\n"),e.toString())},"test: outdent block":function(){var e=new EditSession(["        a12345","    b12345","        c12345"].join("\n")),t=new Editor(new MockRenderer,e),o=(t.moveCursorTo(0,5),t.getSelection().selectDown(),t.getSelection().selectDown(),t.blockOutdent(),assert.equal(e.toString(),["    a12345","b12345","    c12345"].join("\n")),assert.position(t.getCursorPosition(),2,1),t.getSelectionRange()),o=(assert.position(o.start,0,1),assert.position(o.end,2,1),t.blockOutdent(),assert.equal(e.toString(),["a12345","b12345","c12345"].join("\n")),t.getSelectionRange());assert.position(o.start,0,0),assert.position(o.end,2,0)},"test: outent without a selection should update cursor":function(){var e=new EditSession("        12"),t=new Editor(new MockRenderer,e);t.moveCursorTo(0,3),t.blockOutdent("  "),assert.equal(e.toString(),"    12"),assert.position(t.getCursorPosition(),0,0)},"test: comment lines should perserve selection":function(){var e=new EditSession(["  abc","cde"].join("\n"),new JavaScriptMode),t=new Editor(new MockRenderer,e),e=(whitespace.detectIndentation(e),t.moveCursorTo(0,2),t.getSelection().selectDown(),t.toggleCommentLines(),assert.equal(["//   abc","// cde"].join("\n"),e.toString()),t.getSelectionRange());assert.position(e.start,0,5),assert.position(e.end,1,5)},"test: uncomment lines should perserve selection":function(){var e=new EditSession(["//   abc","//cde"].join("\n"),new JavaScriptMode),t=new Editor(new MockRenderer,e);e.setTabSize(2),t.moveCursorTo(0,1),t.getSelection().selectDown(),t.getSelection().selectRight(),t.getSelection().selectRight(),t.toggleCommentLines(),assert.equal(["  abc","cde"].join("\n"),e.toString()),assert.range(t.getSelectionRange(),0,0,1,1)},"test: toggle comment lines twice should return the original text":function(){var e=new EditSession(["  abc","cde","fg"],new JavaScriptMode),t=new Editor(new MockRenderer,e);t.moveCursorTo(0,0),t.getSelection().selectDown(),t.getSelection().selectDown(),t.toggleCommentLines(),t.toggleCommentLines(),assert.equal(["  abc","cde","fg"].join("\n"),e.toString())},"test: comment lines - if the selection end is at the line start it should stay there":function(){var e=new EditSession(["abc","cde"].join("\n"),new JavaScriptMode),t=new Editor(new MockRenderer,e),e=(t.moveCursorTo(0,0),t.getSelection().selectDown(),t.toggleCommentLines(),assert.range(t.getSelectionRange(),0,3,1,0),new EditSession(["abc","cde"].join("\n"),new JavaScriptMode));(t=new Editor(new MockRenderer,e)).moveCursorTo(1,0),t.getSelection().selectUp(),t.toggleCommentLines(),assert.range(t.getSelectionRange(),0,3,1,0)},"test: move lines down should keep selection on moved lines":function(){var e=new EditSession(["11","22","33","44"].join("\n")),t=new Editor(new MockRenderer,e);t.moveCursorTo(0,1),t.getSelection().selectDown(),t.moveLinesDown(),assert.equal(["33","11","22","44"].join("\n"),e.toString()),assert.position(t.getCursorPosition(),2,1),assert.position(t.getSelection().getSelectionAnchor(),1,1),assert.position(t.getSelection().getSelectionLead(),2,1),t.moveLinesDown(),assert.equal(["33","44","11","22"].join("\n"),e.toString()),assert.position(t.getCursorPosition(),3,1),assert.position(t.getSelection().getSelectionAnchor(),2,1),assert.position(t.getSelection().getSelectionLead(),3,1),t.moveLinesDown(),assert.equal(["33","44","11","22"].join("\n"),e.toString()),assert.position(t.getCursorPosition(),3,1),assert.position(t.getSelection().getSelectionAnchor(),2,1),assert.position(t.getSelection().getSelectionLead(),3,1)},"test: move lines up should keep selection on moved lines":function(){var e=new EditSession(["11","22","33","44"].join("\n")),t=new Editor(new MockRenderer,e);t.moveCursorTo(2,1),t.getSelection().selectDown(),t.moveLinesUp(),assert.equal(e.toString(),["11","33","44","22"].join("\n")),assert.position(t.getCursorPosition(),2,1),assert.position(t.getSelection().getSelectionAnchor(),1,1),assert.position(t.getSelection().getSelectionLead(),2,1),t.moveLinesUp(),assert.equal(e.toString(),["33","44","11","22"].join("\n")),assert.position(t.getCursorPosition(),1,1),assert.position(t.getSelection().getSelectionAnchor(),0,1),assert.position(t.getSelection().getSelectionLead(),1,1)},"test: move line without active selection should not move cursor relative to the moved line":function(){var e=new EditSession(["11","22","33","44"].join("\n")),t=new Editor(new MockRenderer,e);t.moveCursorTo(1,1),t.clearSelection(),t.moveLinesDown(),assert.equal(["11","33","22","44"].join("\n"),e.toString()),assert.position(t.getCursorPosition(),2,1),t.clearSelection(),t.moveLinesUp(),assert.equal(["11","22","33","44"].join("\n"),e.toString()),assert.position(t.getCursorPosition(),1,1)},"test: copy lines down should keep selection":function(){var e=new EditSession(["11","22","33","44"].join("\n")),t=new Editor(new MockRenderer,e);t.moveCursorTo(1,1),t.getSelection().selectDown(),t.copyLinesDown(),assert.equal(["11","22","33","22","33","44"].join("\n"),e.toString()),assert.position(t.getCursorPosition(),4,1),assert.position(t.getSelection().getSelectionAnchor(),3,1),assert.position(t.getSelection().getSelectionLead(),4,1)},"test: copy lines up should keep selection":function(){var e=new EditSession(["11","22","33","44"].join("\n")),t=new Editor(new MockRenderer,e);t.moveCursorTo(1,1),t.getSelection().selectDown(),t.copyLinesUp(),assert.equal(["11","22","33","22","33","44"].join("\n"),e.toString()),assert.position(t.getCursorPosition(),2,1),assert.position(t.getSelection().getSelectionAnchor(),1,1),assert.position(t.getSelection().getSelectionLead(),2,1)},"test: input a tab with soft tab should convert it to spaces":function(){var e=new EditSession(""),t=new Editor(new MockRenderer,e);e.setTabSize(2),e.setUseSoftTabs(!0),t.onTextInput("\t"),assert.equal(e.toString(),"  "),e.setTabSize(5),t.onTextInput("\t"),assert.equal(e.toString(),"       ")},"test: input tab without soft tabs should keep the tab character":function(){var e=new EditSession(""),t=new Editor(new MockRenderer,e);e.setUseSoftTabs(!1),t.onTextInput("\t"),assert.equal(e.toString(),"\t")},"test: undo/redo for delete line":function(){var e=new EditSession(["111","222","333"]),t=new UndoManager,o=(e.setUndoManager(t),e.toString()),n=new Editor(new MockRenderer,e),s=(n.removeLines(),e.toString()),r=(assert.equal(s,"222\n333"),e.$syncInformUndoManager(),n.removeLines(),e.toString()),n=(assert.equal(r,"333"),e.$syncInformUndoManager(),n.removeLines(),e.toString());assert.equal(n,""),e.$syncInformUndoManager(),t.undo(),e.$syncInformUndoManager(),assert.equal(e.toString(),r),t.undo(),e.$syncInformUndoManager(),assert.equal(e.toString(),s),t.undo(),e.$syncInformUndoManager(),assert.equal(e.toString(),o),t.undo(),e.$syncInformUndoManager(),assert.equal(e.toString(),o)},"test: remove left should remove character left of the cursor":function(){var e=new EditSession(["123","456"]),t=new Editor(new MockRenderer,e);t.moveCursorTo(1,1),t.remove("left"),assert.equal(e.toString(),"123\n56")},"test: remove left should remove line break if cursor is at line start":function(){var e=new EditSession(["123","456"]),t=new Editor(new MockRenderer,e);t.moveCursorTo(1,0),t.remove("left"),assert.equal(e.toString(),"123456")},"test: remove left should remove tabsize spaces if cursor is on a tab stop and preceeded by spaces":function(){var e=new EditSession(["123","        456"]),t=(e.setUseSoftTabs(!0),e.setTabSize(4),new Editor(new MockRenderer,e));t.moveCursorTo(1,8),t.remove("left"),assert.equal(e.toString(),"123\n    456")},"test: transpose at line start should be a noop":function(){var e=new EditSession(["123","4567","89"]),t=new Editor(new MockRenderer,e);t.moveCursorTo(1,0),t.transposeLetters(),assert.equal(e.getValue(),["123","4567","89"].join("\n"))},"test: transpose in line should swap the charaters before and after the cursor":function(){var e=new EditSession(["123","4567","89"]),t=new Editor(new MockRenderer,e);t.moveCursorTo(1,2),t.transposeLetters(),assert.equal(e.getValue(),["123","4657","89"].join("\n"))},"test: transpose at line end should swap the last two characters":function(){var e=new EditSession(["123","4567","89"]),t=new Editor(new MockRenderer,e);t.moveCursorTo(1,4),t.transposeLetters(),assert.equal(e.getValue(),["123","4576","89"].join("\n"))},"test: transpose with non empty selection should be a noop":function(){var e=new EditSession(["123","4567","89"]),t=new Editor(new MockRenderer,e);t.moveCursorTo(1,1),t.getSelection().selectRight(),t.transposeLetters(),assert.equal(e.getValue(),["123","4567","89"].join("\n"))},"test: transpose should move the cursor behind the last swapped character":function(){var e=new EditSession(["123","4567","89"]),e=new Editor(new MockRenderer,e);e.moveCursorTo(1,2),e.transposeLetters(),assert.position(e.getCursorPosition(),1,3)},"test: remove to line end":function(){var e=new EditSession(["123","4567","89"]),t=new Editor(new MockRenderer,e);t.moveCursorTo(1,2),t.removeToLineEnd(),assert.equal(e.getValue(),["123","45","89"].join("\n"))},"test: remove to line end at line end should remove the new line":function(){var e=new EditSession(["123","4567","89"]),t=new Editor(new MockRenderer,e);t.moveCursorTo(1,4),t.removeToLineEnd(),assert.position(t.getCursorPosition(),1,4),assert.equal(e.getValue(),["123","456789"].join("\n"))},"test: transform selection to uppercase":function(){var e=new EditSession(["ajax","dot","org"]),t=new Editor(new MockRenderer,e);t.moveCursorTo(1,0),t.getSelection().selectLineEnd(),t.toUpperCase(),assert.equal(e.getValue(),["ajax","DOT","org"].join("\n"))},"test: transform word to uppercase":function(){var e=new EditSession(["ajax","dot","org"]),t=new Editor(new MockRenderer,e);t.moveCursorTo(1,0),t.toUpperCase(),assert.equal(e.getValue(),["ajax","DOT","org"].join("\n")),assert.position(t.getCursorPosition(),1,0)},"test: transform selection to lowercase":function(){var e=new EditSession(["AJAX","DOT","ORG"]),t=new Editor(new MockRenderer,e);t.moveCursorTo(1,0),t.getSelection().selectLineEnd(),t.toLowerCase(),assert.equal(e.getValue(),["AJAX","dot","ORG"].join("\n"))},"test: transform word to lowercase":function(){var e=new EditSession(["AJAX","DOT","ORG"]),t=new Editor(new MockRenderer,e);t.moveCursorTo(1,0),t.toLowerCase(),assert.equal(e.getValue(),["AJAX","dot","ORG"].join("\n")),assert.position(t.getCursorPosition(),1,0)}},"undefined"!=typeof module&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();