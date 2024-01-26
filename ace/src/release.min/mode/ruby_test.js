"undefined"!=typeof process&&require("amd-loader");var EditSession=require("../edit_session").EditSession,Mode=require("./ruby").Mode,assert=require("../test/assertions");module.exports={setUp:function(){this.mode=new Mode},"test getNextLineIndent":function(){assert.equal(this.mode.getNextLineIndent("start","class Foo","  "),"  "),assert.equal(this.mode.getNextLineIndent("start","  def thing(wut)","  "),"    "),assert.equal(this.mode.getNextLineIndent("start","  fork do","  "),"    "),assert.equal(this.mode.getNextLineIndent("start","  fork do |wut| ","  "),"    "),assert.equal(this.mode.getNextLineIndent("start","  something = :ruby","  "),"  "),assert.equal(this.mode.getNextLineIndent("start","  if something == 3","  "),"    "),assert.equal(this.mode.getNextLineIndent("start","  else","  "),"    ")},"test: checkOutdent":function(){assert.ok(this.mode.checkOutdent("start","        en","d")),assert.ok(this.mode.checkOutdent("start","        els","e")),assert.ok(this.mode.checkOutdent("start","        ","}")),assert.equal(this.mode.checkOutdent("start","  end","\n"),!1),assert.equal(this.mode.checkOutdent("start","foo = ba","r"),!1)},"test: auto outdent":function(){var e=new EditSession(["class Phil","  Foo = 'bar'","  def to_json(*a)","    {","      'json_class'   => self.class.name, # = 'Range'","      'data'         => [ first, last, exclude_end? ]","      }","  end"]);this.mode.autoOutdent("start",e,6),assert.equal("    }",e.getLine(6)),this.mode.autoOutdent("start",e,7),assert.equal("  end",e.getLine(7))},"test: different delimiters in percent strings":function(){var e=this.mode.getTokenizer(),t=e.getLineTokens("%q<t(es)t>","start").tokens;assert.equal("string",t[1].type),assert.equal("t(es)t",t[1].value),t=e.getLineTokens("%q<t(es)t]#comment","start").tokens,assert.equal("string",t[t.length-1].type),assert.equal("t(es)t]#comment",t[t.length-1].value),t=e.getLineTokens("%%test 1\\%%%","start").tokens,assert.equal("string",t[1].type),assert.equal("test 1",t[1].value),assert.equal("constant.language.escape",t[2].type),assert.equal("string.end",t[3].type),assert.notEqual("string",t[4].type),t=e.getLineTokens("%s|test|","start").tokens,assert.equal("constant.other.symbol.ruby",t[0].type),assert.equal("constant.other.symbol.ruby",t[t.length-1].type),t=e.getLineTokens("%S{test}","start").tokens,assert.equal("constant.other.symbol.ruby",t[0].type),assert.equal("constant.other.symbol.ruby",t[t.length-1].type)},"test: nested and unescaped pairs of delimiters":function(){var e=this.mode.getTokenizer(),t=e.getLineTokens("%(t(es)t)(","start").tokens;assert.equal("string.end",t[t.length-2].type),assert.equal("paren.lparen",t[t.length-1].type),t=e.getLineTokens("%q(t(es)t(","start").tokens,assert.notEqual("paren.lparen",t[t.length-1].type),t=e.getLineTokens("%{tes{t} \\{test\\}}t","start").tokens,assert.notEqual("string",t[t.length-1].type),assert.equal("string.end",t[t.length-2].type),assert.equal("constant.language.escape",t[t.length-3].type),t=e.getLineTokens("%s[te[s]|t][","start").tokens,assert.equal("constant.other.symbol.ruby",t[t.length-2].type),assert.notEqual("constant.other.symbol.ruby",t[t.length-1].type),t=e.getLineTokens("%s[te[s]|t[","start").tokens,assert.equal("constant.other.symbol.ruby",t[t.length-1].type),assert.equal(1,t.length),t=e.getLineTokens("%S[te[s]|t][","start").tokens,assert.equal("constant.other.symbol.ruby",t[t.length-2].type),assert.notEqual("constant.other.symbol.ruby",t[t.length-1].type),t=e.getLineTokens("%S[te[s]|t[","start").tokens,assert.equal("constant.other.symbol.ruby",t[t.length-1].type),assert.equal(1,t.length)},"test: percent Regexp strings":function(){var e=this.mode.getTokenizer(),t=e.getLineTokens('%r(#{ "interpolated" } regexp)',"start").tokens;assert.equal("string.regexp",t[0].type),assert.equal("paren.start",t[1].type),assert.equal("paren.rparen",t[t.length-2].type),assert.equal("string.regexp",t[t.length-1].type),t=e.getLineTokens("%r((a|b)*)#comment","start").tokens,assert.equal("string.regexp",t[0].type),assert.notEqual("string.regexp",t[t.length-1].type)},"test: uppercase letter in percent strings should allow interpolation and escaped characters":function(){var e=this.mode.getTokenizer(),t=e.getLineTokens("%Q(interpolated string #{1 + 1})","start").tokens;assert.equal("string.end",t[t.length-1].type),assert.equal("string.start",t[0].type),assert.equal("paren.start",t[2].type),assert.notEqual("string",t[3].type),assert.equal("1",t[3].value),t=e.getLineTokens("%q(interpolated string #{1 + 1})","start").tokens,assert.equal("string.end",t[t.length-1].type),assert.equal("string.start",t[0].type),assert.equal("string",t[1].type),assert.equal("interpolated string #{1 + 1}",t[1].value)},"test: different Heredoc tests":function(){var e=this.mode.getTokenizer(),t=e.getLineTokens("herDocs = [<<'FOO', <<BAR, <<-BAZ, <<~`EXEC`] #comment","start"),t=(assert.equal(8,t.state.length),e.getLineTokens("  FOO #{literal}",t.state));assert.equal("string",t.tokens[0].type),assert.equal(8,t.state.length),t=e.getLineTokens("FOO",t.state),assert.equal("support.class",t.tokens[0].type),assert.equal(6,t.state.length),t=e.getLineTokens("  BAR",t.state),assert.equal("string",t.tokens[0].type),assert.equal(6,t.state.length),t=e.getLineTokens("BAR",t.state),assert.equal("support.class",t.tokens[0].type),assert.equal(4,t.state.length),t=e.getLineTokens("  BAZ indented",t.state),assert.equal("string",t.tokens[0].type),assert.equal(4,t.state.length),t=e.getLineTokens("    BAZ",t.state),assert.equal("support.class",t.tokens[1].type),assert.equal(2,t.state.length),t=e.getLineTokens("        echo hi",t.state),assert.equal("string",t.tokens[0].type),assert.equal(2,t.state.length),t=e.getLineTokens("    EXEC",t.state),assert.equal("support.class",t.tokens[1].type),assert.equal("start",t.state)}},"undefined"!=typeof module&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();