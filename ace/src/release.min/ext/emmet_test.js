"undefined"!=typeof process&&require("amd-loader"),require("../test/mockdom");var Mode=require("../mode/html").Mode,ace=require("../ace"),assert=require("assert");require("./emmet"),module.exports={"test doesn't break tab when emmet is not loaded":function(){var e=ace.edit(null,{mode:new Mode,enableEmmet:!0,useSoftTabs:!1});window.emmet=null,e.onCommandKey({},0,9),assert.equal(e.getValue(),"\t");try{var t=0;window.emmet={actions:{run:function(){t++}},resources:{setVariable:function(){t++}}},e.onCommandKey({},0,9),assert.equal(t,2)}finally{window.emmet=null}}},"undefined"!=typeof module&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();