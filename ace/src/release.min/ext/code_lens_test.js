"undefined"!=typeof process&&(require("amd-loader"),require("../test/mockdom"));var ace=require("../ace"),codeLens=require("./code_lens"),assert=require("../test/assertions");function click(e){e.dispatchEvent(new window.CustomEvent("click",{bubbles:!0}))}require("./error_marker");var editor=null;module.exports={setUp:function(){editor&&editor.destroy();var e=document.createElement("div");e.style.left="20px",e.style.top="30px",e.style.width="300px",e.style.height="100px",document.body.appendChild(e),(editor=ace.edit(e)).on("destroy",function(){document.body.removeChild(e)})},tearDown:function(){editor&&editor.destroy(),editor=null},"test code lens":function(){editor.session.setValue("a\nb|c\nd"+"\n".repeat(100)+"\txxx");var o="codeLensAction",r=null,e=(editor.commands.addCommand({name:o,exec:function(e,t){r=t}}),codeLens.registerCodeLensProvider(editor,{provideCodeLenses:function(e,t){t(null,[{start:{row:1},command:{id:o,title:"1",arguments:"line"}},{start:{row:1},command:{id:o,title:"2",arguments:"column"}},{start:{row:e.getLength()-1},command:{id:o,title:"last",arguments:"last"}}])}}),editor.$updateLenses(),editor.renderer.$loop._flush(),editor.container.querySelector(".ace_codeLens"));assert.equal(e.textContent,"1 | 2"),assert.equal(e.childNodes.length,3),click(e.childNodes[0]),assert.equal(r,"line"),click(e.childNodes[2]),assert.equal(r,"column"),editor.gotoLine(10),editor.renderer.$loop._flush(),e=editor.container.querySelector(".ace_codeLens"),assert.ok(!e),editor.gotoLine(200),editor.renderer.$loop._flush(),e=editor.container.querySelector(".ace_codeLens"),assert.equal(e.textContent,"last"),editor.setSession(ace.createEditSession("\n".repeat(100))),editor.renderer.$loop._flush(),e=editor.container.querySelector(".ace_codeLens"),assert.ok(!e)},"test async code lens":function(t){editor.session.setValue("a\nb\nc"),new Promise(function(o){codeLens.registerCodeLensProvider(editor,{provideCodeLenses:function(e,t){setTimeout(function(){t(null,[{start:{row:1},command:{title:"code lens"}}]),o()})}}),editor.$updateLenses()}).then(function(){editor.renderer.$loop._flush();var e=editor.container.querySelector(".ace_codeLens");assert.equal(e.textContent,"code lens"),t()}).catch(t)},"test multiple code lens providers":function(t){editor.session.setValue("a\nb\nc\nd"),new Promise(function(o){codeLens.registerCodeLensProvider(editor,{provideCodeLenses:function(e,t){t(null,[{start:{row:1},command:{title:"1"}}])}}),codeLens.registerCodeLensProvider(editor,{provideCodeLenses:function(e,t){setTimeout(function(){t(null,[{start:{row:2},command:{title:"2"}}]),o()})}}),editor.$updateLenses()}).then(function(){editor.renderer.$loop._flush();var e=editor.container.querySelectorAll(".ace_codeLens");assert.equal(e[0].textContent,"1"),assert.equal(e[1].textContent,"2"),t()}).catch(t)},"test multiple code lens providers on the same line":function(){editor.session.setValue("a\nb\nc"),codeLens.registerCodeLensProvider(editor,{provideCodeLenses:function(e,t){t(null,[{start:{row:1},command:{title:"1"}}])}}),codeLens.registerCodeLensProvider(editor,{provideCodeLenses:function(e,t){t(null,[{start:{row:1},command:{title:"2"}}])}}),editor.$updateLenses(),editor.renderer.$loop._flush();var e=editor.container.querySelector(".ace_codeLens");assert.equal(e.textContent,"1 | 2")},"test code lens behavior with multiple sessions":function(){editor.session.setValue("a\nb"),codeLens.registerCodeLensProvider(editor,{provideCodeLenses:function(e,t){t(null,[{start:{row:1},command:{title:e.doc.$lines[0]}}])}}),editor.$updateLenses(),editor.renderer.$loop._flush();var e=editor.container.querySelector(".ace_codeLens"),e=(assert.equal(e.textContent,"a"),editor.setSession(ace.createEditSession("c\nd")),editor.$updateLenses(),editor.renderer.$loop._flush(),editor.container.querySelector(".ace_codeLens"));assert.equal(e.textContent,"c")}},"undefined"!=typeof module&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();