"use strict";var oop=require("./lib/oop"),EventEmitter=require("./lib/event_emitter").EventEmitter,BackgroundTokenizer=function(t,i){this.running=!1,this.lines=[],this.states=[],this.currentLine=0,this.tokenizer=t;var o=this;this.$worker=function(){if(o.running){for(var t=new Date,i=o.currentLine,e=-1,n=o.doc,s=i;o.lines[i];)i++;var r=n.getLength(),h=0;for(o.running=!1;i<r;){for(o.$tokenizeRow(i),e=i;i++,o.lines[i];);if(++h%5==0&&20<new Date-t){o.running=setTimeout(o.$worker,20);break}}o.currentLine=i,s<=(e=-1==e?i:e)&&o.fireUpdateEvent(s,e)}}};!function(){oop.implement(this,EventEmitter),this.setTokenizer=function(t){this.tokenizer=t,this.lines=[],this.states=[],this.start(0)},this.setDocument=function(t){this.doc=t,this.lines=[],this.states=[],this.stop()},this.fireUpdateEvent=function(t,i){this._signal("update",{data:{first:t,last:i}})},this.start=function(t){this.currentLine=Math.min(t||0,this.currentLine,this.doc.getLength()),this.lines.splice(this.currentLine,this.lines.length),this.states.splice(this.currentLine,this.states.length),this.stop(),this.running=setTimeout(this.$worker,700)},this.scheduleStart=function(){this.running||(this.running=setTimeout(this.$worker,700))},this.$updateOnChange=function(t){var i=t.start.row,e=t.end.row-i;0==e?this.lines[i]=null:"remove"==t.action?(this.lines.splice(i,1+e,null),this.states.splice(i,1+e,null)):((t=Array(1+e)).unshift(i,1),this.lines.splice.apply(this.lines,t),this.states.splice.apply(this.states,t)),this.currentLine=Math.min(i,this.currentLine,this.doc.getLength()),this.stop()},this.stop=function(){this.running&&clearTimeout(this.running),this.running=!1},this.getTokens=function(t){return this.lines[t]||this.$tokenizeRow(t)},this.getState=function(t){return this.currentLine==t&&this.$tokenizeRow(t),this.states[t]||"start"},this.$tokenizeRow=function(t){var i=this.doc.getLine(t),e=this.states[t-1],i=this.tokenizer.getLineTokens(i,e,t);return this.states[t]+""!=i.state+""?(this.states[t]=i.state,this.lines[t+1]=null,this.currentLine>t+1&&(this.currentLine=t+1)):this.currentLine==t&&(this.currentLine=t+1),this.lines[t]=i.tokens},this.cleanup=function(){this.running=!1,this.lines=[],this.states=[],this.currentLine=0,this.removeAllListeners()}}.call(BackgroundTokenizer.prototype),exports.BackgroundTokenizer=BackgroundTokenizer;