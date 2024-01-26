"use strict";var Range=require("../range").Range,dom=require("../lib/dom"),Marker=function(t){this.element=dom.createElement("div"),this.element.className="ace_layer ace_marker-layer",t.appendChild(this.element)};!function(){this.$padding=0,this.setPadding=function(t){this.$padding=t},this.setSession=function(t){this.session=t},this.setMarkers=function(t){this.markers=t},this.elt=function(t,e){var i=-1!=this.i&&this.element.childNodes[this.i];i?this.i++:(i=document.createElement("div"),this.element.appendChild(i),this.i=-1),i.style.cssText=e,i.className=t},this.update=function(t){if(t){var e,i;for(i in this.config=t,this.i=0,this.markers){var r,s,n,a=this.markers[i];a.range?(n=a.range.clipRows(t.firstRow,t.lastRow)).isEmpty()||(n=n.toScreenRange(this.session),a.renderer?(r=this.$getTop(n.start.row,t),s=this.$padding+n.start.column*t.characterWidth,a.renderer(e,n,s,r,t)):"fullLine"==a.type?this.drawFullLineMarker(e,n,a.clazz,t):"screenLine"==a.type?this.drawScreenLineMarker(e,n,a.clazz,t):n.isMultiLine()?"text"==a.type?this.drawTextMarker(e,n,a.clazz,t):this.drawMultiLineMarker(e,n,a.clazz,t):this.drawSingleLineMarker(e,n,a.clazz+" ace_start ace_br15",t)):a.update(e,this,this.session,t)}if(-1!=this.i)for(;this.i<this.element.childElementCount;)this.element.removeChild(this.element.lastChild)}},this.$getTop=function(t,e){return(t-e.firstRowScreen)*e.lineHeight},this.drawTextMarker=function(t,e,i,r,s){for(var n,a=this.session,h=e.start.row,o=e.end.row,l=h,d=0,c=a.getScreenLastRowColumn(l),p=new Range(l,e.start.column,l,d);l<=o;l++)p.start.row=p.end.row=l,p.start.column=l==h?e.start.column:a.getRowWrapIndent(l),p.end.column=c,n=d,d=c,c=l+1<o?a.getScreenLastRowColumn(l+1):l==o?0:e.end.column,this.drawSingleLineMarker(t,p,i+(l==h?" ace_start":"")+" ace_br"+((l==h||l==h+1&&e.start.column?1:0)|(n<d?2:0)|(c<d?4:0)|(l==o?8:0)),r,l==o?0:1,s)},this.drawMultiLineMarker=function(t,e,i,r,s){var n,a=this.$padding,h=r.lineHeight,o=this.$getTop(e.start.row,r),l=a+e.start.column*r.characterWidth;s=s||"",this.session.$bidiHandler.isBidiRow(e.start.row)?((n=e.clone()).end.row=n.start.row,n.end.column=this.session.getLine(n.start.row).length,this.drawBidiSingleLineMarker(t,n,i+" ace_br1 ace_start",r,null,s)):this.elt(i+" ace_br1 ace_start","height:"+h+"px;right:0;top:"+o+"px;left:"+l+"px;"+(s||"")),this.session.$bidiHandler.isBidiRow(e.end.row)?((n=e.clone()).start.row=n.end.row,n.start.column=0,this.drawBidiSingleLineMarker(t,n,i+" ace_br12",r,null,s)):(o=this.$getTop(e.end.row,r),l=e.end.column*r.characterWidth,this.elt(i+" ace_br12","height:"+h+"px;width:"+l+"px;top:"+o+"px;left:"+a+"px;"+(s||""))),(h=(e.end.row-e.start.row-1)*r.lineHeight)<=0||(o=this.$getTop(e.start.row+1,r),t=(e.start.column?1:0)|(e.end.column?0:8),this.elt(i+(t?" ace_br"+t:""),"height:"+h+"px;right:0;top:"+o+"px;left:"+a+"px;"+(s||"")))},this.drawSingleLineMarker=function(t,e,i,r,s,n){if(this.session.$bidiHandler.isBidiRow(e.start.row))return this.drawBidiSingleLineMarker(t,e,i,r,s,n);var t=r.lineHeight,s=(e.end.column+(s||0)-e.start.column)*r.characterWidth,a=this.$getTop(e.start.row,r),e=this.$padding+e.start.column*r.characterWidth;this.elt(i,"height:"+t+"px;width:"+s+"px;top:"+a+"px;left:"+e+"px;"+(n||""))},this.drawBidiSingleLineMarker=function(t,e,i,r,s,n){var a=r.lineHeight,h=this.$getTop(e.start.row,r),o=this.$padding;this.session.$bidiHandler.getSelections(e.start.column,e.end.column).forEach(function(t){this.elt(i,"height:"+a+"px;width:"+t.width+(s||0)+"px;top:"+h+"px;left:"+(o+t.left)+"px;"+(n||""))},this)},this.drawFullLineMarker=function(t,e,i,r,s){var n=this.$getTop(e.start.row,r),a=r.lineHeight;e.start.row!=e.end.row&&(a+=this.$getTop(e.end.row,r)-n),this.elt(i,"height:"+a+"px;top:"+n+"px;left:0;right:0;"+(s||""))},this.drawScreenLineMarker=function(t,e,i,r,s){e=this.$getTop(e.start.row,r),r=r.lineHeight;this.elt(i,"height:"+r+"px;top:"+e+"px;left:0;right:0;"+(s||""))}}.call(Marker.prototype),exports.Marker=Marker;