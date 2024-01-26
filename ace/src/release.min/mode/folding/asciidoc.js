"use strict";var oop=require("../../lib/oop"),BaseFoldMode=require("./fold_mode").FoldMode,Range=require("../../range").Range,FoldMode=exports.FoldMode=function(){};oop.inherits(FoldMode,BaseFoldMode),function(){this.foldingStartMarker=/^(?:\|={10,}|[\.\/=\-~^+]{4,}\s*$|={1,5} )/,this.singleLineHeadingRe=/^={1,5}(?=\s+\S)/,this.getFoldWidget=function(e,t,i){var n=e.getLine(i);return this.foldingStartMarker.test(n)?"="==n[0]?!this.singleLineHeadingRe.test(n)&&e.getLine(i-1).length!=e.getLine(i).length?"":"start":"dissallowDelimitedBlock"==e.bgTokenizer.getState(i)?"end":"start":""},this.getFoldWidgetRange=function(t,e,i){var n=t.getLine(i),g=n.length,o=t.getLength(),r=i,l=i;if(n.match(this.foldingStartMarker)){var a,d=["=","-","~","^","+"],s="markup.heading",f=this.singleLineHeadingRe;if(c(i)==s){for(var h,u=k();++i<o;)if(c(i)==s)if(k()<=u)break;if(r<(l=a&&a.value.match(this.singleLineHeadingRe)?i-1:i-2))for(;r<l&&(!c(l)||"["==a.value[0]);)l--;if(r<l)return h=t.getLine(l).length,new Range(r,g,l,h)}else if("dissallowDelimitedBlock"==t.bgTokenizer.getState(i)){for(;0<i--&&-1!=t.bgTokenizer.getState(i).lastIndexOf("Block"););if((l=i+1)<r)return h=t.getLine(i).length,new Range(l,5,r,g-5)}else{for(;++i<o&&"dissallowDelimitedBlock"!=t.bgTokenizer.getState(i););if(r<(l=i))return h=t.getLine(i).length,new Range(r,5,l,h-5)}}function c(e){return(a=t.getTokens(e)[0])&&a.type}function k(){var e=a.value.match(f);return e?e[0].length:1==(e=d.indexOf(a.value[0])+1)&&t.getLine(i-1).length!=t.getLine(i).length?1/0:e}}}.call(FoldMode.prototype);