"use strict";var dom=require("../lib/dom"),Lines=function(e,t){this.element=e,this.canvasHeight=t||5e5,this.element.style.height=2*this.canvasHeight+"px",this.cells=[],this.cellCache=[],this.$offsetCoefficient=0};!function(){this.moveContainer=function(e){dom.translate(this.element,0,-(e.firstRowScreen*e.lineHeight%this.canvasHeight)-e.offset*this.$offsetCoefficient)},this.pageChanged=function(e,t){return Math.floor(e.firstRowScreen*e.lineHeight/this.canvasHeight)!==Math.floor(t.firstRowScreen*t.lineHeight/this.canvasHeight)},this.computeLineTop=function(e,t,i){var n=t.firstRowScreen*t.lineHeight,n=Math.floor(n/this.canvasHeight);return i.documentToScreenRow(e,0)*t.lineHeight-n*this.canvasHeight},this.computeLineHeight=function(e,t,i){return t.lineHeight*i.getRowLineCount(e)},this.getLength=function(){return this.cells.length},this.get=function(e){return this.cells[e]},this.shift=function(){this.$cacheCell(this.cells.shift())},this.pop=function(){this.$cacheCell(this.cells.pop())},this.push=function(e){if(Array.isArray(e)){this.cells.push.apply(this.cells,e);for(var t=dom.createFragment(this.element),i=0;i<e.length;i++)t.appendChild(e[i].element);this.element.appendChild(t)}else this.cells.push(e),this.element.appendChild(e.element)},this.unshift=function(e){if(Array.isArray(e)){this.cells.unshift.apply(this.cells,e);for(var t=dom.createFragment(this.element),i=0;i<e.length;i++)t.appendChild(e[i].element);this.element.firstChild?this.element.insertBefore(t,this.element.firstChild):this.element.appendChild(t)}else this.cells.unshift(e),this.element.insertAdjacentElement("afterbegin",e.element)},this.last=function(){return this.cells.length?this.cells[this.cells.length-1]:null},this.$cacheCell=function(e){e&&(e.element.remove(),this.cellCache.push(e))},this.createCell=function(e,t,i,n){var s,h=this.cellCache.pop();return h||(s=dom.createElement("div"),n&&n(s),this.element.appendChild(s),h={element:s,text:"",row:e}),h.row=e,h}}.call(Lines.prototype),exports.Lines=Lines;