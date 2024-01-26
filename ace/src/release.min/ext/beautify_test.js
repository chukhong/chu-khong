"undefined"!=typeof process&&require("amd-loader");var assert=require("assert"),EditSession=require("../edit_session").EditSession,beautify=require("./beautify"),PHPMode=require("../mode/php").Mode,CSSMode=require("../mode/css").Mode;module.exports={timeout:1e4,"test beautify first line empty":function(){var e=new EditSession(["","hello world"],new PHPMode);e.setUseSoftTabs(!1),beautify.beautify(e),assert.equal(e.getValue(),"hello world")},"test beautify block tag indentation":function(){var e=new EditSession(["<div>","<h1>hello</h1>","world</div>"],new PHPMode);e.setUseSoftTabs(!1),beautify.beautify(e),assert.equal(e.getValue(),"<div>\n\t<h1>hello</h1>\n\tworld\n</div>")},"test beautify block tag line breaks and indentation":function(){var e=new EditSession(["<html><body><div></div></body></html>"],new PHPMode);e.setUseSoftTabs(!1),beautify.beautify(e),assert.equal(e.getValue(),"<html>\n<body>\n\t<div></div>\n</body>\n</html>")},"test beautify empty block tag":function(){var e=new EditSession(["\t<div></div>"],new PHPMode);e.setUseSoftTabs(!1),beautify.beautify(e),assert.equal(e.getValue(),"<div></div>")},"test beautify inline tag indentation":function(){var e=new EditSession(["<div>","<span>hello world</span>","</div>"],new PHPMode);e.setUseSoftTabs(!1),beautify.beautify(e),assert.equal(e.getValue(),"<div>\n\t<span>hello world</span>\n</div>")},"test beautify multiline inline tag indentation":function(){var e=new EditSession(["<div>","<span>","hello world","</span>","</div>"],new PHPMode);e.setUseSoftTabs(!1),beautify.beautify(e),assert.equal(e.getValue(),"<div>\n\t<span>\n\t\thello world\n\t</span>\n</div>")},"test beautify singleton tag indentation":function(){var e=new EditSession(["<div>","hello<br>","world","</div>"],new PHPMode);e.setUseSoftTabs(!1),beautify.beautify(e),assert.equal(e.getValue(),"<div>\n\thello<br>\n\tworld\n</div>")},"test beautify unknown singleton indentation":function(){var e=new EditSession(["<div>","hello<single />","world","</div>"],new PHPMode);e.setUseSoftTabs(!1),beautify.beautify(e),assert.equal(e.getValue(),"<div>\n\thello<single />\n\tworld\n</div>")},"test beautify curly indentation":function(){var e=new EditSession(["<?php","if ($foo===array()) {","$i++;","}","if (($foo ||","$bar)) {","true;","}"],new PHPMode);e.setUseSoftTabs(!1),beautify.beautify(e),assert.equal(e.getValue(),"<?php\nif ($foo === array()) {\n\t$i++;\n}\nif (($foo ||\n\t$bar)) {\n\ttrue;\n}")},"test beautify adding bracket whitespace":function(){var e=new EditSession(["<?php","if(true){","\t$i++;","}"],new PHPMode);e.setUseSoftTabs(!1),beautify.beautify(e),assert.equal(e.getValue(),"<?php\nif (true) {\n\t$i++;\n}")},"test beautify removing bracket whitespace":function(){var e=new EditSession(["<?php","if ( true ) {","\t$i++;","}"],new PHPMode);e.setUseSoftTabs(!1),beautify.beautify(e),assert.equal(e.getValue(),"<?php\nif (true) {\n\t$i++;\n}")},"test beautify adding keyword whitespace":function(){var e=new EditSession(["<?php","if ($foo===true) {","\t$i++;","}"],new PHPMode);e.setUseSoftTabs(!1),beautify.beautify(e),assert.equal(e.getValue(),"<?php\nif ($foo === true) {\n\t$i++;\n}")},"test beautify if without paren":function(){var e=new EditSession(["<?php","if ($foo)","$i++;","if ($foo) $j++","print $i"],new PHPMode);e.setUseSoftTabs(!1),beautify.beautify(e),assert.equal(e.getValue(),"<?php\nif ($foo)\n\t$i++;\nif ($foo) $j++\nprint $i")},"test beautify switch indentation":function(){var e=new EditSession(["<?php","switch ($i) {","case 1;","case 2;","print $foo;","break;","case 2;","print $bar;","}"],new PHPMode);e.setUseSoftTabs(!1),beautify.beautify(e),assert.equal(e.getValue(),"<?php\nswitch ($i) {\n\tcase 1;\n\tcase 2;\n\t\tprint $foo;\n\t\tbreak;\n\tcase 2;\n\t\tprint $bar;\n}")},"test beautify multiline string":function(){var e=new EditSession(["<?php","\tprint 'hello","\t\tworld'"],new PHPMode);e.setUseSoftTabs(!1),beautify.beautify(e),assert.equal(e.getValue(),"<?php\nprint 'hello\n\t\tworld'")},"test beautify remove spaces before semicolons":function(){var e=new EditSession(['<?php echo "hello world";?>',"<?php",'$foo = "hello " ;$bar = "world";',"print $foo.$bar;"],new PHPMode);e.setUseSoftTabs(!1),beautify.beautify(e),assert.equal(e.getValue(),'<?php echo "hello world"; ?>\n<?php\n$foo = "hello "; $bar = "world";\nprint $foo.$bar;')},"test beautify tag whitepace":function(){var e=new EditSession(['<form   id=""   action = ""   method="get"  >',"\t<br   />","</form  >"],new PHPMode);e.setUseSoftTabs(!1),beautify.beautify(e),assert.equal(e.getValue(),'<form id="" action="" method="get">\n\t<br />\n</form>')},"test beautify css in php":function(){var e=new EditSession(["<style>h1{font-size: 20px;}p{font-size:14px; padding:10px;}</style>"],new PHPMode);e.setUseSoftTabs(!1),beautify.beautify(e),assert.equal(e.getValue(),"<style>\n\th1 {\n\t\tfont-size: 20px;\n\t}\n\n\tp {\n\t\tfont-size: 14px;\n\t\tpadding: 10px;\n\t}\n</style>")},"test beautify css":function(){var e=new EditSession("",new CSSMode);e.setUseSoftTabs(!0),e.setValue(".x    y:h{    animation: appear 1.5s ease-in-out     ease-in-out;     border:  solid    red;}"),beautify.beautify(e),assert.equal(e.getValue(),".x y:h {\n    animation: appear 1.5s ease-in-out ease-in-out;\n    border: solid red;\n}")},"test beautify comments":function(){var e=new EditSession(["<?php\n","if(true) //break me\n","{}\n","?>\n","\x3c!--\n","\thello\n","\t\tworld\n","--\x3e"],new PHPMode);e.setUseSoftTabs(!1),beautify.beautify(e),assert.equal(e.getValue(),"<?php\nif (true) //break me\n{}\n?>\n\x3c!--\n\thello\n\t\tworld\n--\x3e")},"test beautify js array of objects":function(){var e=new EditSession(["<script>\n","var foo = [","\t{ \n",'\t\tbar: "hello", \n',"\t\tbar2: {}\n","\t},{\n",'\t\t"bar": true\n',"\t}\n","];\n","<\/script>"],new PHPMode);e.setUseSoftTabs(!1),beautify.beautify(e),assert.equal(e.getValue(),'<script>\n\tvar foo = [{\n\t\tbar: "hello",\n\t\tbar2: {}\n\t}, {\n\t\t"bar": true\n\t}];\n<\/script>')},"test beautify js object":function(){var e=new EditSession(['<script>{"a": "1", "b": "2"}<\/script>'],new PHPMode);e.setUseSoftTabs(!1),beautify.beautify(e),assert.equal(e.getValue(),'<script>\n\t{\n\t\t"a": "1",\n\t\t"b": "2"\n\t}\n<\/script>')},"test beautify php default behaviour with line breaks after comma":function(){var e=new EditSession(["<?php\n","class Test {","public int $id, $num;","}"],new PHPMode);e.setUseSoftTabs(!1),beautify.beautify(e),assert.equal(e.getValue(),"<?php\nclass Test {\n\tpublic int $id,\n\t$num;\n}")},"test beautify php with no line breaks after comma":function(){var e=new EditSession(["<?php\n","class Test {","public int $id, $num;","}"],new PHPMode);e.setUseSoftTabs(!1),beautify.formatOptions.lineBreaksAfterCommasInCurlyBlock=!1,beautify.beautify(e),assert.equal(e.getValue(),"<?php\nclass Test {\n\tpublic int $id, $num;\n}")}},"undefined"!=typeof module&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();