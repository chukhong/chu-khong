"use strict";
(function (GLOBAL) {
var changeHtmlToArray = () => {
	var t = editor.getValue()
	t = t
		.replace(/></g, '>\n<')
		.replace(/\<\/\w+\>/g, '],')
		.replace(/(\<)(\w+)(.*)(\>)/g, '[\"$2\",{$3},"')
		//.replace(/\>/g,'}],')
		.replace(/(\s+)([\w\-]+)\=/g, ',"$2":')
		.replace(/\{\,/g, '{')
		.replace(/\,\"\]/g, ',""]')
		.replace(/(\w)(\]\,)/g, '$1"$2')
		.replace(/"$/gm, '')
	if(/([^"\n]\])/gim.test(t)){	
		var r =/([^"\n]\])/gim.exec(t)
		r.map(i=>{
			var i1= i.replace(/\]/,'\"\]')
			t = t.replace(new RegExp(i,'g'),i1)
		})
	}
	editor.setValue(t)
	editor.setOption('mode',"ace/mode/javascript");
	$('#dialogListPlugin').modal('hide')
}
window.changeHtmlToArray = changeHtmlToArray
console.log('[load] changeHTMLToArrayJs');
})(this)