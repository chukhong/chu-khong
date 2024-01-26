"use strict";var Range=require("./range").Range,TokenIterator=function(t,e,n){this.$session=t,this.$row=e,this.$rowTokens=t.getTokens(e);t=t.getTokenAt(e,n);this.$tokenIndex=t?t.index:-1};!function(){this.stepBackward=function(){for(--this.$tokenIndex;this.$tokenIndex<0;){if(--this.$row,this.$row<0)return this.$row=0,null;this.$rowTokens=this.$session.getTokens(this.$row),this.$tokenIndex=this.$rowTokens.length-1}return this.$rowTokens[this.$tokenIndex]},this.stepForward=function(){var t;for(this.$tokenIndex+=1;this.$tokenIndex>=this.$rowTokens.length;){if(this.$row+=1,t=t||this.$session.getLength(),this.$row>=t)return this.$row=t-1,null;this.$rowTokens=this.$session.getTokens(this.$row),this.$tokenIndex=0}return this.$rowTokens[this.$tokenIndex]},this.getCurrentToken=function(){return this.$rowTokens[this.$tokenIndex]},this.getCurrentTokenRow=function(){return this.$row},this.getCurrentTokenColumn=function(){var t=this.$rowTokens,e=this.$tokenIndex,n=t[e].start;if(void 0===n)for(n=0;0<e;)n+=t[--e].value.length;return n},this.getCurrentTokenPosition=function(){return{row:this.$row,column:this.getCurrentTokenColumn()}},this.getCurrentTokenRange=function(){var t=this.$rowTokens[this.$tokenIndex],e=this.getCurrentTokenColumn();return new Range(this.$row,e,this.$row,e+t.value.length)}}.call(TokenIterator.prototype),exports.TokenIterator=TokenIterator;