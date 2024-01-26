"undefined"!=typeof process&&require("amd-loader");var editor,changes,textarea,assert=require("./../test/assertions"),Range=require("../range").Range,ace=(require("./../test/mockdom"),require("../ace")),vim=require("./vim"),user=require("../test/user");function testSelection(e,n){assert.equal(getSelection(e)+"",n+"")}function setSelection(e,n){"number"==typeof n[0]&&(n=[n]),e.selection.fromJSON(n.map(function(e){var n={row:e[0],column:e[1]},e=2==e.length?n:{row:e[2],column:e[3]};return 0<Range.comparePoints(n,e)?{start:e,end:n,isBackwards:!0}:{start:n,end:e,isBackwards:!0}}))}function getSelection(e){e=e.multiSelect.toJSON();return 1<(e=(e=e.length?e:[e]).map(function(e){var n,o;return e.isBackwards?(n=e.end,o=e.start):(o=e.end,n=e.start),Range.comparePoints(n,o)?[n.row,n.column,o.row,o.column]:[n.row,n.column]})).length?e:e[0]}function testValue(e,n){assert.equal(e.getValue(),n)}function applyEvent(e){if("function"==typeof e)return e();var n,o=e._,t=new CustomEvent(o);for(n in e.key||{})t[n]=e.key[n];e.modifier&&e.modifier.split("-").map(function(e){e&&(t[e+"Key"]=!0)}),/input|select|composition/.test(o)&&(textarea.value=e.value,textarea.setSelectionRange(e.range[0],e.range[1])),textarea.dispatchEvent(t),null!=e.value&&assert.equal(textarea.value,e.value),null!=e.range&&(assert.equal(textarea.selectionStart,e.range[0]),assert.equal(textarea.selectionEnd,e.range[1])),editor.resize(!0)}module.exports={setUp:function(){editor||(editor=ace.edit(null),document.body.appendChild(editor.container),editor.container.style.height="200px",editor.container.style.width="300px",editor.container.style.position="absolute",editor.container.style.outline="solid",editor.resize(!0),editor.on("change",function(e){changes.push(e)}),editor.setKeyboardHandler(vim.handler)),textarea=editor.textInput.getElement(),changes=[],editor.focus()},tearDown:function(){editor&&(editor.destroy(),editor.container.remove(),editor=textarea=null)},"test: multiselect and composition":function(){editor.setValue("hello world\n\thello world"),editor.execCommand("gotoend"),[{_:"keydown",range:[12,12],value:"\thello world\n\n",key:{code:"ControlLeft",key:"Control",keyCode:17},modifier:"ctrl-"},{_:"keydown",range:[12,12],value:"\thello world\n\n",key:{code:"AltLeft",key:"Alt",keyCode:18},modifier:"ctrl-alt-"},{_:"keydown",range:[6,11],value:"hello world\n\n",key:{code:"KeyL",key:"ﬁ",keyCode:76},modifier:"ctrl-alt-"},{_:"keydown",range:[6,11],value:"hello world\n\n",key:{code:"KeyC",key:"c",keyCode:67}},{_:"input",range:[7,7],value:"hello c\n\n"},{_:"keydown",range:[7,7],value:"hello c\n\n",key:{code:"KeyX",key:"x",keyCode:88}},{_:"input",range:[8,8],value:"hello cx\n\n"},{_:"keydown",range:[6,6],value:"hello x\n\n",key:{code:"Escape",key:"Escape",keyCode:27}},{_:"keydown",range:[6,6],value:"hello x\n\n",key:{code:"ShiftLeft",key:"Shift",keyCode:16},modifier:"shift-"},{_:"keydown",range:[6,6],value:"hello x\n\n",key:{code:"BracketRight",key:"Dead",keyCode:229},modifier:"shift-"},{_:"compositionstart",range:[6,6],value:"hello x\n\n"},{_:"compositionupdate",range:[6,6],value:"hello x\n\n"},{_:"compositionend",range:[7,7],value:"hello ^x\n\n"},{_:"input",range:[7,7],value:"hello ^x\n\n"},function(){testSelection(editor,[[0,0],[1,1]])},{_:"keydown",range:[7,7],value:"hello ^x\n\n",key:{code:"Escape",key:"Escape",keyCode:27}},{_:"keydown",key:{code:"KeyH",key:"˛",keyCode:72},modifier:"ctrl-alt-"},{_:"keydown",range:[1,6],value:"\thello x\n\n",key:{code:"AltRight",key:"Alt",keyCode:18},modifier:"alt-"},{_:"keydown",range:[1,6],value:"\thello x\n\n",key:{code:"Digit4",key:"$",keyCode:52},modifier:"alt-"},{_:"input",range:[2,2],value:"\t$ x\n\n"},function(){testSelection(editor,[[1,5,1,8],[0,4,0,7]])},{_:"keydown",key:{code:"Escape",key:"Escape",keyCode:27}},function(){testSelection(editor,[[1,7],[0,6]])},{_:"keydown",key:{code:"Escape",key:"Escape",keyCode:27}}].forEach(function(e){applyEvent(e)}),assert.equal(editor.getValue(),"hello x\n\thello x")},"test: vim virtual selection":function(){editor.setValue("hello world\n\thello world"),editor.execCommand("gotoend"),[{_:"keydown",range:[12,12],value:"\thello world\n\n",key:{code:"ControlLeft",key:"Control",keyCode:17},modifier:"ctrl-"},{_:"keydown",range:[12,12],value:"\thello world\n\n",key:{code:"AltLeft",key:"Alt",keyCode:18},modifier:"ctrl-alt-"},{_:"keydown",range:[6,11],value:"hello world\n\n",key:{code:"KeyL",key:"ﬁ",keyCode:76},modifier:"ctrl-alt-"},{_:"keydown",range:[6,11],value:"hello world\n\n",key:{code:"KeyC",key:"c",keyCode:67}},{_:"input",range:[7,7],value:"hello c\n\n"},{_:"keydown",range:[7,7],value:"hello c\n\n",key:{code:"KeyX",key:"x",keyCode:88}},{_:"input",range:[8,8],value:"hello cx\n\n"},{_:"keydown",range:[6,6],value:"hello x\n\n",key:{code:"Escape",key:"Escape",keyCode:27}},{_:"keydown",range:[6,6],value:"hello x\n\n",key:{code:"ShiftLeft",key:"Shift",keyCode:16},modifier:"shift-"},{_:"keydown",range:[6,6],value:"hello x\n\n",key:{code:"BracketRight",key:"Dead",keyCode:229},modifier:"shift-"},{_:"compositionstart",range:[6,6],value:"hello x\n\n"},{_:"compositionupdate",range:[6,6],value:"hello x\n\n"},{_:"compositionend",range:[7,7],value:"hello ^x\n\n"},{_:"input",range:[7,7],value:"hello ^x\n\n"},function(){testSelection(editor,[[0,0],[1,1]])},{_:"keydown",range:[7,7],value:"hello ^x\n\n",key:{code:"Escape",key:"Escape",keyCode:27}},{_:"keydown",key:{code:"KeyH",key:"˛",keyCode:72},modifier:"ctrl-alt-"},{_:"keydown",range:[1,6],value:"\thello x\n\n",key:{code:"AltRight",key:"Alt",keyCode:18},modifier:"alt-"},{_:"keydown",range:[1,6],value:"\thello x\n\n",key:{code:"Digit4",key:"$",keyCode:52},modifier:"alt-"},{_:"input",range:[2,2],value:"\t$ x\n\n"},function(){testSelection(editor,[[1,5,1,8],[0,4,0,7]])},{_:"keydown",key:{code:"Escape",key:"Escape",keyCode:27}},function(){testSelection(editor,[[1,7],[0,6]])},{_:"keydown",key:{code:"Escape",key:"Escape",keyCode:27}}].forEach(function(e){applyEvent(e)}),assert.equal(editor.getValue(),"hello x\n\thello x")},"test: vim visual selection":function(){editor.setValue("xxx\nccc\n\nzzz\nccc"),setSelection(editor,[2,0]),[{_:"input",range:[1,1],value:"V\n\n"},{_:"keyup",range:[1,1],value:"V\n\n",key:{code:"KeyV",key:"V",keyCode:86},modifier:"shift-"},{_:"keyup",range:[1,1],value:"V\n\n",key:{code:"ShiftLeft",key:"Shift",keyCode:16}},{_:"keydown",range:[1,1],value:"V\n\n",key:{code:"KeyK",key:"k",keyCode:75}},{_:"keypress",range:[1,1],value:"V\n\n",key:{code:"KeyK",key:"k",keyCode:107}},{_:"input",range:[2,2],value:"Vk\n\n"},{_:"keyup",range:[2,2],value:"Vk\n\n",key:{code:"KeyK",key:"k",keyCode:75}},{_:"keydown",range:[2,2],value:"Vk\n\n",key:{code:"KeyC",key:"c",keyCode:67}},{_:"keypress",range:[2,2],value:"Vk\n\n",key:{code:"KeyC",key:"c",keyCode:99}},{_:"input",range:[3,3],value:"Vkc\n\n"},{_:"keyup",range:[3,3],value:"Vkc\n\n",key:{code:"KeyC",key:"c",keyCode:67}},{_:"keydown",range:[3,3],value:"Vkc\n\n",key:{code:"KeyO",key:"o",keyCode:79}},{_:"keypress",range:[3,3],value:"Vkc\n\n",key:{code:"KeyO",key:"o",keyCode:111}},{_:"input",range:[4,4],value:"Vkco\n\n"},{_:"keyup",range:[4,4],value:"Vkco\n\n",key:{code:"KeyO",key:"o",keyCode:79}},function(){testValue(editor,"xxx\nozzz\nccc"),testSelection(editor,[1,1])},{_:"keydown",range:[0,0],value:"ozzz\n\n",key:{code:"Escape",key:"Escape",keyCode:27}},{_:"keyup",range:[0,0],value:"ozzz\n\n",key:{code:"Escape",key:"Escape",keyCode:27}},{_:"keydown",range:[0,0],value:"ozzz\n\n",key:{code:"ControlLeft",key:"Control",keyCode:17},modifier:"ctrl-"},{_:"keydown",range:[0,1],value:"ozzz\n\n",key:{code:"KeyV",key:"v",keyCode:86},modifier:"ctrl-"},{_:"select",range:[0,1],value:"ozzz\n\n"},{_:"keyup",range:[0,1],value:"ozzz\n\n",key:{code:"KeyV",key:"v",keyCode:86},modifier:"ctrl-"},{_:"keyup",range:[0,1],value:"ozzz\n\n",key:{code:"ControlLeft",key:"Control",keyCode:17}},{_:"keydown",range:[0,1],value:"ccc\n\n",key:{code:"ArrowDown",key:"ArrowDown",keyCode:40}},{_:"select",range:[0,1],value:"ccc\n\n"},{_:"keyup",range:[0,1],value:"ccc\n\n",key:{code:"ArrowDown",key:"ArrowDown",keyCode:40}},function(){testValue(editor,"xxx\nozzz\nccc"),testSelection(editor,[[2,1,2,0],[1,1,1,0]])},{_:"keydown",range:[0,1],value:"ccc\n\n",key:{code:"Period",key:".",keyCode:190}},{_:"keypress",range:[0,1],value:"ccc\n\n",key:{code:"Period",key:".",keyCode:46}},{_:"input",range:[1,1],value:".cc\n\n"},{_:"keyup",range:[1,1],value:".cc\n\n",key:{code:"Period",key:".",keyCode:190}},function(){testValue(editor,"xxx\no"),testSelection(editor,[1,0])}].forEach(function(e){applyEvent(e)})},"test vim gq":function(){editor.setValue("1\n2\nhello world\n"+"xxx ".repeat(20)+"\nyyy\n\nnext\nparagraph"),editor.selection.moveTo(2,5),editor.focus(),user.type("gqgq"),assert.deepEqual(editor.getCursorPosition(),{row:2,column:0}),assert.equal(editor.session.getLine(2),"hello world"),user.type("gqj"),assert.deepEqual(editor.getCursorPosition(),{row:3,column:0}),assert.equal(editor.session.getLine(3),"xxx xxx xxx "),user.type("gq}"),assert.deepEqual(editor.getCursorPosition(),{row:4,column:0}),assert.equal(editor.session.getLine(3),"xxx xxx xxx yyy"),user.type("gqG"),user.type("gqgg"),user.type(":set tw=15\n"),user.type("gg"),user.type("V"),user.type("gq"),assert.equal(editor.session.getLine(0),"1 2 hello world"),assert.equal(editor.session.getLine(5),"xxx xxx xxx xxx yyy"),user.type(":6\n"),user.type("gqq"),assert.equal(editor.session.getLine(6),"yyy")},"test vim search":function(){editor.renderer.setOption("animatedScroll",!1),editor.setValue("very\nlong\n\ntext\n".repeat(10)+"needle "+"some\nmore\ntext\n".repeat(6),-1),editor.focus();var e=editor.renderer.layerConfig.height/editor.renderer.lineHeight;function n(){return editor.endOperation(),editor.renderer.$loop._flush(),editor.renderer.scrollTop/editor.renderer.lineHeight}user.type("Escape","gg"),assert.equal(n(),0),user.type("/","needle"),assert.ok(n()>40-e),editor.endOperation(),user.type("Escape"),assert.equal(n(),0),user.type("/","needle","Enter"),assert.ok(n()>40-e),assert.ok(n()<40),user.type("6","/","more","Enter"),editor.endOperation(),assert.ok(n()>56-e)}},"undefined"!=typeof module&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();