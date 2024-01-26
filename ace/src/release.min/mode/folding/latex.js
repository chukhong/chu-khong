"use strict";var oop=require("../../lib/oop"),BaseFoldMode=require("./fold_mode").FoldMode,Range=require("../../range").Range,TokenIterator=require("../../token_iterator").TokenIterator,keywordLevels={"\\subparagraph":1,"\\paragraph":2,"\\subsubsubsection":3,"\\subsubsection":4,"\\subsection":5,"\\section":6,"\\chapter":7,"\\part":8,"\\begin":9,"\\end":10},FoldMode=exports.FoldMode=function(){};oop.inherits(FoldMode,BaseFoldMode),function(){this.foldingStartMarker=/^\s*\\(begin)|\s*\\(part|chapter|(?:sub)*(?:section|paragraph))\b|{\s*$/,this.foldingStopMarker=/^\s*\\(end)\b|^\s*}/,this.getFoldWidgetRange=function(e,t,r){var n=e.doc.getLine(r),o=this.foldingStartMarker.exec(n);return o?o[1]?this.latexBlock(e,r,o[0].length-1):o[2]?this.latexSection(e,r,o[0].length-1):this.openingBracketBlock(e,"{",r,o.index):(o=this.foldingStopMarker.exec(n))?o[1]?this.latexBlock(e,r,o[0].length-1):this.closingBracketBlock(e,"}",r,o.index+o[0].length):void 0},this.latexBlock=function(e,t,r,n){var o={"\\begin":1,"\\end":-1},a=new TokenIterator(e,t,r),i=a.getCurrentToken();if(i&&("storage.type"==i.type||"constant.character.escape"==i.type)){var s=o[i.value],g=function(){var e="lparen"==a.stepForward().type?a.stepForward().value:"";return-1===s&&(a.stepBackward(),e)&&a.stepBackward(),e},l=[g()],r=-1===s?a.getCurrentTokenColumn():e.getLine(t).length,p=t;for(a.step=-1===s?a.stepBackward:a.stepForward;i=a.step();)if(i&&("storage.type"==i.type||"constant.character.escape"==i.type)){var c=o[i.value];if(c){var d=g();if(c===s)l.unshift(d);else if(l.shift()!==d||!l.length)break}}if(!l.length)return 1==s&&(a.stepBackward(),a.stepBackward()),n?a.getCurrentTokenRange():(t=a.getCurrentTokenRow(),-1===s?new Range(t,e.getLine(t).length,p,r):new Range(p,r,t,a.getCurrentTokenColumn()))}},this.latexSection=function(e,t,r){var n=new TokenIterator(e,t,r),o=n.getCurrentToken();if(o&&"storage.type"==o.type){for(var a=keywordLevels[o.value]||0,i=0,s=t;o=n.stepForward();)if("storage.type"===o.type){var g=keywordLevels[o.value]||0;if(9<=g){if(i||(s=n.getCurrentTokenRow()-1),(i+=9==g?1:-1)<0)break}else if(a<=g)break}for(i||(s=n.getCurrentTokenRow()-1);t<s&&!/\S/.test(e.getLine(s));)s--;return new Range(t,e.getLine(t).length,s,e.getLine(s).length)}}}.call(FoldMode.prototype);