"undefined"!=typeof process&&require("amd-loader");var Document=require("./document").Document,Range=require("./range").Range,assert=require("./test/assertions");module.exports={"test: insert text in line":function(){var e=new Document(["12","34"]),n=[],t=(e.on("change",function(e){n.push(e)}),e.insert({row:0,column:1},"juhu"),assert.equal(e.getValue(),["1juhu2","34"].join("\n")),n.concat());e.revertDeltas(t),assert.equal(e.getValue(),["12","34"].join("\n")),e.applyDeltas(t),assert.equal(e.getValue(),["1juhu2","34"].join("\n"))},"test: insert new line":function(){var e=new Document(["12","34"]),n=[],t=(e.on("change",function(e){n.push(e)}),e.insertMergedLines({row:0,column:1},["",""]),assert.equal(e.getValue(),["1","2","34"].join("\n")),n.concat());e.revertDeltas(t),assert.equal(e.getValue(),["12","34"].join("\n")),e.applyDeltas(t),assert.equal(e.getValue(),["1","2","34"].join("\n"))},"test: insert lines at the beginning":function(){var e=new Document(["12","34"]),n=[],t=(e.on("change",function(e){n.push(e)}),e.insertFullLines(0,["aa","bb"]),assert.equal(e.getValue(),["aa","bb","12","34"].join("\n")),n.concat());e.revertDeltas(t),assert.equal(e.getValue(),["12","34"].join("\n")),e.applyDeltas(t),assert.equal(e.getValue(),["aa","bb","12","34"].join("\n"))},"test: insert lines at the end":function(){var e=new Document(["12","34"]),n=[];e.on("change",function(e){n.push(e)}),e.insertFullLines(2,["aa","bb"]),assert.equal(e.getValue(),["12","34","aa","bb"].join("\n"))},"test: insertInLine":function(){var e=new Document(["12","34"]),n=[];e.on("change",function(e){n.push(e)}),e.insertInLine({row:0,column:1},"a"),assert.equal(e.getValue(),["1a2","34"].join("\n")),e.insertInLine({row:10,column:1/0},"b"),assert.equal(e.getValue(),["1a2","34b"].join("\n")),e.insertInLine({row:void 0,column:1/0},"x"),assert.equal(e.getValue(),["1a2","34b","x"].join("\n")),e.insertInLine({row:-1,column:1/0},"z"),assert.equal(e.getValue(),["1a2z","34b","x"].join("\n")),e.removeInLine(0,1,2),assert.equal(e.getValue(),["12z","34b","x"].join("\n")),e.removeInLine(0,2,10),assert.equal(e.getValue(),["12","34b","x"].join("\n")),e.removeNewLine(1),assert.equal(e.getValue(),["12","34bx"].join("\n")),e.removeNewLine(1),assert.equal(e.getValue(),["12","34bx"].join("\n"))},"test: insert lines in the middle":function(){var e=new Document(["12","34"]),n=[],t=(e.on("change",function(e){n.push(e)}),e.insertFullLines(1,["aa","bb"]),assert.equal(e.getValue(),["12","aa","bb","34"].join("\n")),n.concat());e.revertDeltas(t),assert.equal(e.getValue(),["12","34"].join("\n")),e.applyDeltas(t),assert.equal(e.getValue(),["12","aa","bb","34"].join("\n"))},"test: insert multi line string at the start":function(){var e=new Document(["12","34"]),n=[],t=(e.on("change",function(e){n.push(e)}),e.insert({row:0,column:0},"aa\nbb\ncc"),assert.equal(e.getValue(),["aa","bb","cc12","34"].join("\n")),n.concat());e.revertDeltas(t),assert.equal(e.getValue(),["12","34"].join("\n")),e.applyDeltas(t),assert.equal(e.getValue(),["aa","bb","cc12","34"].join("\n"))},"test: insert multi line string at the end":function(){var e=new Document(["12","34"]),n=[],t=(e.on("change",function(e){n.push(e)}),e.insert({row:1,column:2},"aa\nbb\ncc"),assert.equal(e.getValue(),["12","34aa","bb","cc"].join("\n")),n.concat());e.revertDeltas(t),assert.equal(e.getValue(),["12","34"].join("\n")),e.applyDeltas(t),assert.equal(e.getValue(),["12","34aa","bb","cc"].join("\n"))},"test: insert multi line string in the middle":function(){var e=new Document(["12","34"]),n=[],t=(e.on("change",function(e){n.push(e)}),e.insert({row:0,column:1},"aa\nbb\ncc"),assert.equal(e.getValue(),["1aa","bb","cc2","34"].join("\n")),n.concat());e.revertDeltas(t),assert.equal(e.getValue(),["12","34"].join("\n")),e.applyDeltas(t),assert.equal(e.getValue(),["1aa","bb","cc2","34"].join("\n"))},"test: delete in line":function(){var e=new Document(["1234","5678"]),n=[],t=(e.on("change",function(e){n.push(e)}),e.remove(new Range(0,1,0,3)),assert.equal(e.getValue(),["14","5678"].join("\n")),n.concat());e.revertDeltas(t),assert.equal(e.getValue(),["1234","5678"].join("\n")),e.applyDeltas(t),assert.equal(e.getValue(),["14","5678"].join("\n"))},"test: delete new line":function(){var e=new Document(["1234","5678"]),n=[],t=(e.on("change",function(e){n.push(e)}),e.remove(new Range(0,4,1,0)),assert.equal(e.getValue(),["12345678"].join("\n")),n.concat());e.revertDeltas(t),assert.equal(e.getValue(),["1234","5678"].join("\n")),e.applyDeltas(t),assert.equal(e.getValue(),["12345678"].join("\n"))},"test: delete multi line range line":function(){var e=new Document(["1234","5678","abcd"]),n=[],t=(e.on("change",function(e){n.push(e)}),e.remove(new Range(0,2,2,2)),assert.equal(e.getValue(),["12cd"].join("\n")),n.concat());e.revertDeltas(t),assert.equal(e.getValue(),["1234","5678","abcd"].join("\n")),e.applyDeltas(t),assert.equal(e.getValue(),["12cd"].join("\n"))},"test: delete full lines":function(){var e=new Document(["1234","5678","abcd"]),n=[];e.on("change",function(e){n.push(e)}),e.remove(new Range(1,0,3,0)),assert.equal(e.getValue(),["1234",""].join("\n"))},"test: remove lines should return the removed lines":function(){var e=new Document(["1234","5678","abcd"]).removeFullLines(1,2);assert.equal(e.join("\n"),["5678","abcd"].join("\n"))},"test: should handle unix style new lines":function(){var e=new Document(["1","2","3"]);assert.equal(e.getValue(),["1","2","3"].join("\n"))},"test: should handle windows style new lines":function(){var e=new Document(["1","2","3"].join("\r\n"));e.setNewLineMode("unix"),assert.equal(e.getValue(),["1","2","3"].join("\n")),assert.equal(e.getNewLineMode(),"unix"),assert.ok(e.isNewLine("\r")),assert.ok(e.isNewLine("\n")),assert.ok(e.isNewLine("\r\n")),assert.notOk(e.isNewLine("\n\r"))},"test: set new line mode to 'windows' should use '\\r\\n' as new lines":function(){var e=new Document(["1","2","3"].join("\n"));e.setNewLineMode("windows"),assert.equal(e.getValue(),["1","2","3"].join("\r\n"))},"test: set new line mode to 'unix' should use '\\n' as new lines":function(){var e=new Document(["1","2","3"].join("\r\n"));e.setNewLineMode("unix"),assert.equal(e.getValue(),["1","2","3"].join("\n"))},"test: set new line mode to 'auto' should detect the incoming nl type":function(){var e=new Document(["1","2","3"].join("\n"));e.setNewLineMode("auto"),assert.equal(e.getValue(),["1","2","3"].join("\n")),(e=new Document(["1","2","3"].join("\r\n"))).setNewLineMode("auto"),assert.equal(e.getValue(),["1","2","3"].join("\r\n")),e.replace(new Range(0,0,2,1),["4","5","6"].join("\n")),assert.equal(["4","5","6"].join("\n"),e.getValue())},"test: set value":function(){var e=new Document("1"),e=(assert.equal("1",e.getValue()),e.setValue(e.getValue()),assert.equal("1",e.getValue()),new Document("1\n2"));assert.equal("1\n2",e.getValue()),e.setValue(e.getValue()),assert.equal("1\n2",e.getValue())},"test: empty document has to contain one line":function(){var e=new Document("");assert.equal(e.$lines.length,1)},"test: ignore empty delta":function(){var e=new Document("");e.on("change",function(){throw"should ignore empty delta"}),e.insert({row:0,column:0},""),e.insert({row:1,column:1},""),e.remove({start:{row:1,column:1},end:{row:1,column:1}})},"test: inserting huge delta":function(){for(var e=new Document(""),n="",t=19999,a=0;a<4*t;a++)n+=a+"\n";var s=0;function u(e){s++,assert.equal(e.lines.length,2e4)}e.on("change",u),e.setValue(n),e.off("change",u),assert.equal(s,4),assert.equal(e.getValue(),n);for(a=40018;39978<=a;a--)n=e.getLines(0,a).join("\n"),e.setValue("\nab"),assert.equal(e.getValue(),"\nab"),e.insert({row:1,column:1},n),assert.equal(e.getValue(),"\na"+n+"b")},"test: indexToPosition":function(){function e(e){for(var n,t,a=new Document(e),s=e.indexOf("|"),u=-2;u<e.length+4;u++)"\r"!=e[u-1]&&(n=a.indexToPosition(u),t=a.getTextRange({start:{row:0,column:0},end:n}),assert.equal(t,e.substring(0,u)),assert.equal(a.positionToIndex(n),u),s<=u)&&(assert.deepEqual(a.indexToPosition(u-s,1),n),assert.equal(a.positionToIndex(n,1),u-s))}e("abc\n|defx\ngh"),e("abc\r\n|defx\r\ngh")}},"undefined"!=typeof module&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();