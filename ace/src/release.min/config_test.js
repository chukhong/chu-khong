"undefined"!=typeof process&&require("amd-loader");var dom=require("./config"),config=require("./config"),assert=require("./test/assertions");module.exports={"test: path resolution":function(){config.set("packaged","true");var e=config.moduleUrl("kr_theme","theme");assert.equal(e,"theme-kr_theme.js"),config.set("basePath","a/b"),e=config.moduleUrl("m/theme","theme"),assert.equal(e,"a/b/theme-m.js"),e=config.moduleUrl("m/theme","ext"),assert.equal(e,"a/b/ext-theme.js"),config.set("workerPath","c/"),e=config.moduleUrl("foo/1","worker"),assert.equal(e,"c/worker-1.js"),config.setModuleUrl("foo/1","a/b1.js"),e=config.moduleUrl("foo/1","theme"),assert.equal(e,"a/b1.js"),e=config.moduleUrl("snippets/js"),assert.equal(e,"a/b/snippets/js.js"),config.setModuleUrl("snippets/js","_.js"),e=config.moduleUrl("snippets/js"),assert.equal(e,"_.js"),e=config.moduleUrl("ace/ext/textarea"),assert.equal(e,"a/b/ext-textarea.js")},"test: define options":function(){var e={};config.defineOptions(e,"test_object",{opt1:{set:function(e){this.x=e},value:7},initialValue:{set:function(e){this.x=e},initialValue:8},opt2:{get:function(e){return this.x}},forwarded:"model"}),e.model={},config.defineOptions(e.model,"model",{forwarded:{value:1}}),config.resetOptions(e),config.resetOptions(e.model),assert.equal(e.getOption("opt1"),7),assert.equal(e.getOption("opt2"),7),e.setOption("opt1",8),assert.equal(e.getOption("opt1"),8),assert.equal(e.getOption("opt2"),8),assert.equal(e.getOption("forwarded"),1),assert.equal(e.getOption("new"),void 0),e.setOption("new",0),assert.equal(e.getOption("new"),void 0),assert.equal(e.getOption("initialValue"),8),e.setOption("initialValue",7),assert.equal(e.getOption("opt2"),7),config.setDefaultValues("test_object",{opt1:1,forwarded:2}),config.resetOptions(e),assert.equal(e.getOption("opt1"),1),assert.equal(e.getOption("forwarded"),2)}},"undefined"!=typeof module&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();