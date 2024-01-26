"undefined"!=typeof process&&(require("amd-loader"),require("./test/mockdom"));var Editor=require("./editor").Editor,MockRenderer=require("./test/mockrenderer").MockRenderer,JavascriptMode=require("./mode/javascript").Mode,snippetManager=(require("./multi_select"),require("./ext/language_tools"),require("./snippets").snippetManager),assert=require("./test/assertions"),config=require("./config"),loadModule=config.loadModule;module.exports={setUp:function(e){this.editor=new Editor(new MockRenderer),e()},tearDown:function(){config.loadModule=loadModule},"test: textmate style format strings":function(){snippetManager.tmStrFormat("hello",{guard:"(..)(.)(.)",flag:"g",fmt:"a\\UO\\l$1\\E$2"})},"test: parse snipmate file":function(){var e=snippetManager.parseSnippetFile("name a\nregex /(?:(=)|(:))?\\s*)/\\(?f/\\)/\n\t{$0}\n\t\n\n#function\nsnippet f function\n\tfunction");assert.equal(JSON.stringify([{name:"a",guard:"(?:(=)|(:))?\\s*)",trigger:"\\(?f",endTrigger:"\\)",endGuard:"",content:"{$0}\n"},{tabTrigger:"f",name:"f function",content:"function"}],null,4),JSON.stringify(e,null,4))},"test: parse snippet":function(){var e=snippetManager.tokenizeTmSnippet("-\\$$2a${1:x${$2:y$3\\}\\n\\}$TM_SELECTION}"),e=(assert.equal(e.length,14),assert.equal(e[4],e[13]),assert.equal(e[2].tabstopId,2),snippetManager.tokenizeTmSnippet("\\}${var/as\\/d/\\ul\\//g}s"));snippetManager.resolveVariables(e,this.editor),assert.equal(e.length,7),assert.equal(e[1],e[5]),assert.equal(e[6],"s"),assert.equal(e[1].text,"var"),assert.equal(e[1].fmt.length,3),assert.equal(e[1].fmt[0].changeCase,"u"),assert.equal(e[1].fmt[1],"l"),assert.equal(e[1].fmt[2],"\\/"),assert.equal(e[1].guard,"as\\/d"),assert.equal(e[1].flag,"g")},"test: register snippets in json format":function(){config.loadModule=function(){},this.editor.setOption("enableSnippets",!0),this.editor.session.setMode(new JavascriptMode),snippetManager.register({"Snippet 1":{prefix:"xy",body:["x","$0","y"]},"Snippet 2":{prefix:"s",body:"$0expanded"}},"javascript"),this.editor.execCommand("paste","xy"),this.editor.onCommandKey(null,0,9),this.editor.execCommand("paste","s"),this.editor.onCommandKey(null,0,9),assert.equal(this.editor.getValue(),"x\nexpanded\ny"),assert.position(this.editor.getCursorPosition(),1,0)},"test: expand snippet with nested tabstops":function(){this.editor.setValue(""),snippetManager.insertSnippet(this.editor,"-${1}-${1:t\n1}--${2:2 ${3} 2}-${3:3 $1 3}-${4:4 $2 4}"),assert.equal(this.editor.getValue(),["-t","1-t","1--2 3 t","1 3 2-3 t","1 3-4 2 3 t","1 3 2 4"].join("\n")),assert.equal(this.editor.getSelectedText(),"t\n1\nt\n1\nt\n1\nt\n1\nt\n1"),this.editor.tabstopManager.tabNext(),assert.equal(this.editor.getSelectedText(),"2 3 t\n1 3 2\n2 3 t\n1 3 2"),this.editor.tabstopManager.tabNext(),assert.equal(this.editor.getSelectedText(),"3 t\n1 3\n3 t\n1 3\n3 t\n1 3"),this.editor.tabstopManager.tabNext(),assert.equal(this.editor.getSelectedText(),"4 2 3 t\n1 3 2 4"),this.editor.tabstopManager.tabNext(),assert.equal(this.editor.getSelectedText(),""),this.editor.setValue(""),snippetManager.insertSnippet(this.editor,"-${1:a$2}-${2:b$1}"),assert.equal(this.editor.getValue(),"-ab-ba"),assert.equal(this.editor.getSelectedText(),"ab\na"),this.editor.tabstopManager.tabNext(),assert.equal(this.editor.getSelectedText(),"b\nba"),this.editor.tabstopManager.tabNext(),assert.equal(this.editor.getSelectedText(),"")},"test prevent infinite recursion":function(){var e=this.editor;e.setValue(""),e.setValue(""),e.insertSnippet("CASE ${1:v} ${4:WHEN ${5:p} $10 $2$3\n$4\nTHEN ${6:r}  } ${7:ELSE ${8:d}} END"),assert.equal(this.editor.getValue(),"CASE v WHEN p  \n\nTHEN r   ELSE d END")},"test: nested format strings":function(){var e=this.editor;e.setValue(""),e.insertSnippet(["$1 --  ${1/(.)(\\d)?(\\w\\w?)?/","${3:?","    letter is ${3/(.)/\\u$1/}, ${2:?number is $2: number is missing}:","    letter is missing ${2:? but number is $2: number is missing too}},","    prefix is $1; text is ${0:/upcase};/g}","$0"].join("\n")),assert.equal(e.getValue().length,6),e.execCommand("insertstring","q"),assert.equal(e.getValue().length,82),e.execCommand("insertstring","1"),assert.equal(e.getValue().length,78),e.execCommand("insertstring","w"),assert.equal(e.getValue().length,70),e.execCommand("insertstring","a"),e.execCommand("insertstring","l"),e.execCommand("insertstring","s"),e.execCommand("insertstring","t"),assert.equal(e.getValue(),["q1walst --  ","","    letter is Wa, number is 1,","    prefix is q; text is Q1WA;","","    letter is St,  number is missing,","    prefix is l; text is LST;",""].join("\n"))},"test: format if/else":function(){var e=this.editor,t=["${CURRENT_LINE/.*/1 ${0:else}/i}","${CURRENT_LINE/.*/2 ${0:-else}/i}","${CURRENT_LINE/.*/3 ${0:+if}/i}","${CURRENT_LINE/.*/4 ${0:?if:else}/i}","${CURRENT_LINE/.*/5 ${0:/downcase}/i}"].join("\n");e.setValue(""),e.insertSnippet(t),assert.equal(e.getValue(),"1 else\n2 else\n3 \n4 else\n5 "),e.setValue("ACE"),e.insertSnippet(t),assert.equal(e.getValue(),"1 ACE\n2 ACE\n3 if\n4 if\n5 ace")},"test: file paths":function(){var e=this.editor;snippetManager.variables.FILEPATH=function(){return"/dir/base name.ext"},e.setValue(""),e.insertSnippet("${TM_FILENAME/^(.)|(?:[-_\\s](.))|(\\.\\w*$)/${1:/upcase}${2:/upcase}/g}\n$FILENAME_BASE\n$DIRECTORY\n$FILEPATH\n$FILENAME"),assert.equal(e.getValue(),"BaseName\nbase name\n/dir/\n/dir/base name.ext\nbase name.ext")},"test: selected text":function(){var e=this.editor;e.setValue("foo\nbar"),e.selectAll(),e.insertSnippet("<div>\n\t${1:$TM_SELECTED_TEXT}\n</div>"),e.insertSnippet("<div>\n\t${1:$TM_SELECTED_TEXT}\n</div>"),e.insertSnippet("<span>${1:$TM_SELECTED_TEXT}</span>"),assert.equal(e.getValue(),["<div>","    <div>","        <span>foo","        bar</span>","    </div>","</div>"].join("\n"))},"test: date variables":function(){var e=this.editor,t=(e.setValue("foo\nbar"),e.selectAll(),Date),n=new Date(0);n.setHours(4),n.setMinutes(0),Date=function(){return n};try{e.insertSnippet(["$CURRENT_YEAR","$CURRENT_YEAR_SHORT","$CURRENT_MONTH","$CURRENT_MONTH_NAME","$CURRENT_MONTH_NAME_SHORT","$CURRENT_DATE","$CURRENT_DAY_NAME","$CURRENT_DAY_NAME_SHORT","$CURRENT_HOUR","$CURRENT_MINUTE","$CURRENT_SECOND"].join("\n"))}finally{Date=t}assert.equal(e.getValue(),"1970\n70\n01\nJanuary\nJan\n01\nThursday\nThu\n04\n00\n00")},"test: choice":function(){var e=this.editor;e.setValue(""),e.insertSnippet("${3:${1|and\\|\\,\\\\,another,trigger|}  ${2:$1}}"),assert.equal(e.getValue(),"and|,\\  and|,\\"),e.execCommand("insertstring","q"),assert.equal(e.getValue(),"q  q"),this.editor.tabstopManager.tabNext(),e.execCommand("insertstring","s"),assert.equal(e.getValue(),"q  s"),this.editor.tabstopManager.tabNext(),e.execCommand("insertstring","t"),assert.equal(e.getValue(),"t")},"test: deletion":function(){var e=this.editor;e.setValue(""),e.insertSnippet("CASE ${1:value} ${4:WHEN ${5:option2} THEN ${6:result2}} ${7:ELSE ${8:default}} END"),e.onCommandKey(null,0,9),e.onCommandKey(null,0,8),e.onCommandKey(null,0,9),assert.equal(e.getSelectedText(),"ELSE default"),e.onCommandKey(null,4,9),assert.equal(e.getSelectedText(),""),e.onCommandKey(null,4,9),assert.equal(e.getSelectedText(),"value"),assert.ok(e.tabstopManager),e.onCommandKey(null,0,27),assert.ok(!e.tabstopManager)},"test: multiple cursors":function(){var e=this.editor;e.setValue("\n"),e.selection.splitIntoLines(),e.insertSnippet("a-${1:1}-\na-$1-\n${2:x}"),e.insertSnippet("b=$1-\na-${1:2}-\n${2:y}"),e.tabstopManager.tabNext(),assert.equal(e.getCopyText(),"y\ny\ny\ny"),e.tabstopManager.tabNext(),e.tabstopManager.tabNext(),assert.equal(e.getCopyText(),"x\nx"),e.tabstopManager.tabNext(-4),e.execCommand("insertstring","."),e.tabstopManager.tabNext(2),assert.equal(e.tabstopManager,null),assert.equal(e.getValue(),"a-.-\na-.-\nx\na-.-\na-.-\nx")},"test: insert snippet inside snippet":function(){var e=this.editor;function t(e,t){assert.equal(e.join().replace(/Range: | -/g,""),t)}e.session.setValue(""),e.insertSnippet("1+${1:-}\n1+$1\ne+${2:end}"),e.insertSnippet("2+${1:-}\n2+$1\n3+${2:3}");e=e.tabstopManager.tabstops;t(e[0],"[6/5]> [6/5]"),t(e[1],"[0/2]> [2/3],[3/2]> [5/3]"),t(e[2],"[4/2]> [4/3],[3/4]> [3/5],[0/4]> [0/5],[1/2]> [1/3]"),t(e[3],"[5/2]> [5/3],[2/2]> [2/3]"),t(e[4],"[5/3]> [5/3],[2/3]> [2/3]"),t(e[5],"[6/2]> [6/5]")},"test: linking":function(){var e=this.editor;e.setOption("enableMultiselect",!1),e.setValue(""),e.insertSnippet("${1:x} $1 $1"),assert.equal(e.getValue(),"x x x"),e.execCommand("insertstring","qt"),assert.equal(e.getValue(),"qt qt qt"),this.editor.tabstopManager.tabNext(),e.execCommand("insertstring","."),assert.equal(e.getValue(),"qt qt qt.")}},"undefined"!=typeof module&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();