"undefined"!=typeof process&&require("amd-loader"),require("../test/mockdom");var ace=require("../ace"),assert=require("assert"),EditSession=require("../edit_session").EditSession,UndoManager=require("../undomanager").UndoManager,whitespace=require("./whitespace");module.exports={timeout:1e4,"test tab detection":function(e){var t=new EditSession(["define({","\tfoo:1,","\tbar:2,","\tbaz:{,","\t\tx:3","\t}","})"]),n=whitespace.$detectIndentation(t.doc.$lines);assert.equal(n.ch,"\t"),assert.equal(n.length,void 0),t.insert({row:0,column:0},"  "),n=whitespace.$detectIndentation(t.doc.$lines),assert.equal(n.ch,"\t"),assert.equal(n.length,void 0),t.doc.removeInLine(0,0,2),t.insert({row:0,column:0},"x\n    y\n        z\n"),n=whitespace.$detectIndentation(t.doc.$lines),assert.equal(n.ch,"\t"),assert.equal(n.length,4),t.setValue(""),n=whitespace.$detectIndentation(t.doc.$lines),assert.ok(!n),e()},"test empty session":function(e){var t=new EditSession(["define({","foo:1,","})"]),n=whitespace.$detectIndentation(t.doc.$lines);assert.ok(!n),t.insert({row:1,column:0},"    x\n    "),n=whitespace.$detectIndentation(t.doc.$lines),assert.equal(n.ch," "),assert.equal(n.length,4),e()},"!test one line":function(e){var t=new EditSession(["define({","    foo:1,","})"]),t=whitespace.$detectIndentation(t.doc.$lines);assert.equal(t.ch," "),assert.equal(t.length,4),e()},"test 1 width indents":function(e){var t=new EditSession(["define({","    foo:1,","})","define({","    bar:1,","})","     t","      t","     t","      t","     t","      t","     t","      t"]),t=(whitespace.$detectIndentation(t.doc.$lines),new EditSession(["{"," foo:1,"," bar: {","  baz:2"," }","}"])),t=whitespace.$detectIndentation(t.doc.$lines);assert.equal(t.ch," "),assert.equal(t.length,1),e()},"test trimTrailingSpace":function(e){var n=new EditSession(["a","\t b \t","    ","\t","\t\tx\t\t"," ","   "]);function t(e,t){whitespace.trimTrailingSpace(n,t),assert.equal(e,n.getValue()),n.markUndoGroup(),n.getUndoManager().undo()}n.setUndoManager(new UndoManager),t("a\n\t b\n    \n\t\n\t\tx\n \n   "),t("a\n\t b\n\n\n\t\tx\n\n",{trimEmpty:!0}),n.selection.fromJSON([{start:{row:2,column:3},end:{row:4,column:4}}]),t("a\n\t b\n\n\n\t\tx\t\n\n",{keepCursorPosition:!0,trimEmpty:!0}),n.selection.fromJSON([{start:{row:2,column:3},end:{row:4,column:4},isBackwards:!0}]),t("a\n\t b\n   \n\n\t\tx\n\n",{keepCursorPosition:!0,trimEmpty:!0}),n.selection.$initRangeList(),n.selection.fromJSON([{start:{row:2,column:3},end:{row:2,column:3}},{start:{row:1,column:1},end:{row:1,column:1}},{start:{row:2,column:2},end:{row:2,column:2}},{start:{row:0,column:5},end:{row:0,column:5},isBackwards:!1},{start:{row:6,column:1},end:{row:6,column:1},isBackwards:!1}]),t("a\n\t b\n   \n\n\t\tx\n\n ",{trimEmpty:!0,keepCursorPosition:!0}),n.setValue("some text"),n.selection.fromJSON([{start:{row:0,column:4},end:{row:0,column:4}}]),t("some text",{keepCursorPosition:!0,trimEmpty:!0}),e()},"test convertIndentation":function(){var e="\ta\n\t\tb\n\t\t\n\t\tc",t=ace.edit(null,{value:e});t.commands.addCommands(whitespace.commands),t.execCommand("detectIndentation"),t.execCommand("convertIndentation","s8"),assert.equal(t.getValue(),e.replace(/\t/g,"        ")),t.execCommand("setIndentation","s4"),t.execCommand("convertIndentation","t1"),assert.equal(t.getValue(),e.replace(/\t/g,"\t\t")),t.execCommand("convertIndentation",{text:"space"}),t.execCommand("trimTrailingSpace",{trimEmpty:!0}),assert.equal(t.getValue(),e.replace(/\t/g,"  ").replace(/ *$/gm,""))}},"undefined"!=typeof module&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();