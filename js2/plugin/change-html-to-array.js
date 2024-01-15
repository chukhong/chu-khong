"use strict";
(function (GLOBAL) {
var changeHtmlToArray = () => {
	var t = editor.getCopyText()
	t = t.replace(/\<\/\w+\>/g, '],')
		.replace(/(\<)(\w+)(.*)(\>)/g, '[\"$2\",{$3},"')
		//.replace(/\>/g,'}],')
		.replace(/(\s+)([\w\-]+)\=/g, ',"$2":')
		.replace(/\{\,/g, '{')
		.replace(/\,\"\]/g, ',""]')
		.replace(/(\w)(\]\,)/g, '$1"$2')
	editor.onPaste(t)
	$('#dialogListPlugin').modal('hide')
}
window.changeHtmlToArray = changeHtmlToArray
console.log('[load] changeHTMLToArrayJs');
})(this)