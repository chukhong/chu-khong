"undefined"!=typeof process&&require("amd-loader");var EditSession=require("../edit_session").EditSession,Tokenizer=require("../tokenizer").Tokenizer,XmlMode=require("./xml").Mode,assert=require("../test/assertions");module.exports={setUp:function(){this.mode=new XmlMode},"test: getTokenizer() (smoke test)":function(){var e=this.mode.getTokenizer(),e=(assert.ok(e instanceof Tokenizer),e.getLineTokens("<juhu>","start").tokens);assert.equal("meta.tag.punctuation.tag-open.xml",e[0].type)},"test: toggle comment lines should not do anything":function(){var e=new EditSession(["    abc","  cde","fg"]);this.mode.toggleCommentLines("start",e,0,1),assert.equal(["  \x3c!--  abc--\x3e","  \x3c!--cde--\x3e","fg"].join("\n"),e.toString())},"test: next line indent should be the same as the current line indent":function(){assert.equal("     ",this.mode.getNextLineIndent("start","     abc")),assert.equal("",this.mode.getNextLineIndent("start","abc")),assert.equal("\t",this.mode.getNextLineIndent("start","\tabc"))}},"undefined"!=typeof module&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();