"use strict";window.changeHtmlToArray=()=>{var e=(e=editor.getCopyText()).replace(/\<\/\w+\>/g,"],").replace(/(\<)(\w+)(.*)(\>)/g,'["$2",{$3},"').replace(/(\s+)([\w\-]+)\=/g,',"$2":').replace(/\{\,/g,"{").replace(/\,\"\]/g,',""]').replace(/(\w)(\]\,)/g,'$1"$2');editor.onPaste(e),$("#dialogListPlugin").modal("hide")},console.log("[load] changeHTMLToArrayJs");