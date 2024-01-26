"undefined"!=typeof process&&(require("amd-loader"),require("../test/mockdom")),require("../multi_select");var editor,sel,EditSession=require("./../edit_session").EditSession,Editor=require("./../editor").Editor,Range=require("./../range").Range,MockRenderer=require("./../test/mockrenderer").MockRenderer,emacs=require("./emacs"),assert=require("./../test/assertions");function initEditor(e){e=new EditSession(e.split("\n"));(editor=new Editor(new MockRenderer,e)).setKeyboardHandler(emacs.handler),sel=editor.selection}function print(e){return JSON.stringify(e,null,2)}function pluck(e,o){return e.map(function(e){return e[o]})}module.exports={"test: detach removes emacs commands from command manager":function(){initEditor(""),assert.ok(!!editor.commands.byName.keyboardQuit,"setup error: emacs commands not installed"),editor.keyBinding.removeKeyboardHandler(editor.getKeyboardHandler()),assert.ok(!editor.commands.byName.keyboardQuit,"emacs commands not removed")},"test: keyboardQuit clears selection":function(){initEditor("foo"),editor.selectAll(),editor.execCommand("keyboardQuit"),assert.ok(editor.selection.isEmpty(),"selection non-empty")},"test: exchangePointAndMark without mark set":function(){initEditor("foo"),sel.setRange(Range.fromPoints({row:0,column:1},{row:0,column:3})),editor.execCommand("exchangePointAndMark"),assert.deepEqual({row:0,column:1},editor.getCursorPosition(),print(editor.getCursorPosition()))},"test: exchangePointAndMark with mark set":function(){initEditor("foo"),editor.pushEmacsMark({row:0,column:1}),editor.pushEmacsMark({row:0,column:2}),editor.execCommand("exchangePointAndMark",{count:4}),assert.deepEqual({row:0,column:2},editor.getCursorPosition(),print(editor.getCursorPosition())),assert.deepEqual([{row:0,column:1},{row:0,column:0}],editor.session.$emacsMarkRing,print(editor.session.$emacsMarkRing))},"test: exchangePointAndMark with selection":function(){initEditor("foo"),editor.pushEmacsMark({row:0,column:1}),editor.pushEmacsMark({row:0,column:2}),sel.setRange(Range.fromPoints({row:0,column:0},{row:0,column:1}),!0),editor.execCommand("exchangePointAndMark"),assert.deepEqual({row:0,column:1},editor.getCursorPosition(),print(editor.getCursorPosition())),assert.deepEqual([{row:0,column:1},{row:0,column:2}],editor.session.$emacsMarkRing,print(editor.session.$emacsMarkRing))},"test: exchangePointAndMark with multi selection":function(){initEditor("foo\nhello world\n123");var e=[[{row:0,column:0},{row:0,column:3}],[{row:1,column:0},{row:1,column:5}],[{row:1,column:6},{row:1,column:11}]];e.forEach(function(e){sel.addRange(Range.fromPoints(e[0],e[1]))}),assert.equal("foo\nhello\nworld",editor.getSelectedText()),editor.execCommand("exchangePointAndMark"),assert.equal("foo\nhello\nworld",editor.getSelectedText()),assert.deepEqual(pluck(e,0),pluck(sel.getAllRanges(),"cursor"),"selections dir not inverted")},"test: exchangePointAndMark with multi cursors":function(){initEditor("foo\nhello world\n123");var e=[[{row:0,column:0},{row:0,column:3}],[{row:1,column:0},{row:1,column:5}],[{row:1,column:6},{row:1,column:11}]];e.forEach(function(e){editor.pushEmacsMark(e[1]),sel.addRange(Range.fromPoints(e[0],e[0]))}),assert.deepEqual(pluck(e,0),pluck(sel.getAllRanges(),"cursor"),print(sel.getAllRanges())),editor.execCommand("exchangePointAndMark"),assert.deepEqual(pluck(e,1),pluck(sel.getAllRanges(),"cursor"),"not inverted: "+print(sel.getAllRanges()))},"test: setMark with multi cursors":function(){initEditor("foo\nhello world\n123");var e=[{row:0,column:0},{row:1,column:0},{row:1,column:6}];e.forEach(function(e){sel.addRange(Range.fromPoints(e,e))}),editor.execCommand("setMark"),assert.deepEqual(e,editor.session.$emacsMarkRing,print(editor.session.$emacsMarkRing))},"test: killLine":function(){initEditor("foo  \n Hello world\n  \n  123"),sel.setRange(new Range(0,0,0,2)),editor.endOperation(),editor.execCommand("killLine"),assert.equal(editor.getValue(),"fo\n Hello world\n  \n  123"),editor.execCommand("killLine"),assert.equal(editor.getValue(),"fo Hello world\n  \n  123"),editor.execCommand("killLine"),assert.equal(editor.getValue(),"fo\n  \n  123"),editor.execCommand("killLine"),assert.equal(editor.getValue(),"fo\n  123"),editor.execCommand("killLine"),assert.equal(editor.getValue(),"fo  123"),editor.execCommand("killLine"),assert.equal(editor.getValue(),"fo"),editor.execCommand("killLine"),editor.execCommand("yank"),assert.equal(editor.getValue(),"foo  \n Hello world\n  \n  123")}},"undefined"!=typeof module&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();