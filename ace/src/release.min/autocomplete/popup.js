"use strict";var Renderer=require("../virtual_renderer").VirtualRenderer,Editor=require("../editor").Editor,Range=require("../range").Range,event=require("../lib/event"),lang=require("../lib/lang"),dom=require("../lib/dom"),$singleLineEditor=function(e){e=new Renderer(e),e.$maxLines=4,e=new Editor(e);return e.setHighlightActiveLine(!1),e.setShowPrintMargin(!1),e.renderer.setShowGutter(!1),e.renderer.setHighlightGutterLine(!1),e.$mouseHandler.$focusTimeout=0,e.$highlightTagPending=!0,e},AcePopup=function(e){function t(){}function o(){a(-1)}var l,r=dom.createElement("div"),g=new $singleLineEditor(r),i=(e&&e.appendChild(r),r.style.display="none",g.renderer.content.style.cursor="default",g.renderer.setStyle("ace_autocomplete"),g.setOption("displayIndentGuides",!1),g.setOption("dragDelay",150),g.focus=t,g.$isFocused=!0,g.renderer.$cursorLayer.restartTimer=t,g.renderer.$cursorLayer.element.style.opacity=0,g.renderer.$maxLines=8,g.renderer.$keepTextAreaAtCursor=!1,g.setHighlightActiveLine(!1),g.session.highlight(""),g.session.$searchHighlight.clazz="ace_highlight-marker",g.on("mousedown",function(e){var t=e.getDocumentPosition();g.selection.moveToPosition(t),n.start.row=n.end.row=t.row,e.stop()}),new Range(-1,0,-1,1/0)),n=new Range(-1,0,-1,1/0),a=(n.id=g.session.addMarker(n,"ace_active-line","fullLine"),g.setSelectOnHover=function(e){e?i.id&&(g.session.removeMarker(i.id),i.id=null):i.id=g.session.addMarker(i,"ace_line-hover","fullLine")},g.setSelectOnHover(!1),g.on("mousemove",function(e){var t;l?l.x==e.x&&l.y==e.y||((l=e).scrollTop=g.renderer.scrollTop,t=l.getDocumentPosition().row,i.start.row!=t&&(i.id||g.setRow(t),a(t))):l=e}),g.renderer.on("beforeRender",function(){var e;l&&-1!=i.start.row&&(l.$pos=null,e=l.getDocumentPosition().row,i.id||g.setRow(e),a(e,!0))}),g.renderer.on("afterRender",function(){var e=g.getRow(),t=g.renderer.$textLayer,e=t.element.childNodes[e-t.config.firstRow];e!==t.selectedNode&&t.selectedNode&&dom.removeCssClass(t.selectedNode,"ace_selected"),(t.selectedNode=e)&&dom.addCssClass(e,"ace_selected")}),function(e,t){e!==i.start.row&&(i.start.row=i.end.row=e,t||g.session._emit("changeBackMarker"),g._emit("changeHoverMarker"))}),e=(g.getHoveredRow=function(){return i.start.row},event.addListener(g.container,"mouseout",o),g.on("hide",o),g.on("changeSelection",o),g.session.doc.getLength=function(){return g.data.length},g.session.doc.getLine=function(e){e=g.data[e];return"string"==typeof e?e:e&&e.value||""},g.session.bgTokenizer);return e.$tokenizeRow=function(e){var o=g.data[e],r=[];if(o){for(var t,i,n=(o="string"==typeof o?{value:o}:o).caption||o.value||o.name,a=n.toLowerCase(),s=(g.filterText||"").toLowerCase(),c=0,l=0,d=0;d<=s.length;d++)d!=l&&(o.matchMask&1<<d||d==s.length)&&(t=s.slice(l,d),l=d,-1!=(i=a.indexOf(t,c)))&&(u(n.slice(c,i),""),c=i+t.length,u(n.slice(i,c),"completion-highlight"));u(n.slice(c,n.length),""),o.meta&&r.push({type:"completion-meta",value:o.meta}),o.message&&r.push({type:"completion-message",value:o.message})}return r;function u(e,t){e&&r.push({type:(o.className||"")+(t||""),value:e})}},e.$updateOnChange=t,e.start=t,g.session.$computeWidth=function(){return this.screenWidth=0},g.isOpen=!1,g.isTopdown=!1,g.autoSelect=!0,g.filterText="",g.data=[],g.setData=function(e,t){g.filterText=t||"",g.setValue(lang.stringRepeat("\n",e.length),-1),g.data=e||[],g.setRow(0)},g.getData=function(e){return g.data[e]},g.getRow=function(){return n.start.row},g.setRow=function(e){e=Math.max(this.autoSelect?0:-1,Math.min(this.data.length,e)),n.start.row!=e&&(g.selection.clearSelection(),n.start.row=n.end.row=e||0,g.session._emit("changeBackMarker"),g.moveCursorTo(e||0,0),g.isOpen)&&g._signal("select")},g.on("changeSelection",function(){g.isOpen&&g.setRow(g.selection.lead.row),g.renderer.scrollCursorIntoView()}),g.hide=function(){this.container.style.display="none",this._signal("hide"),g.isOpen=!1},g.show=function(e,t,o){var r=this.container,i=window.innerHeight,n=window.innerWidth,a=this.renderer,s=a.$maxLines*t*1.4,c=e.top+this.$borderSize,o=(i/2<c&&!o&&i<c+t+s?(a.$maxPixelHeight=c-2*this.$borderSize,r.style.top="",r.style.bottom=i-c+"px",g.isTopdown=!1):(a.$maxPixelHeight=i-(c+=t)-.2*t,r.style.top=c+"px",r.style.bottom="",g.isTopdown=!0),r.style.display="",e.left);o+r.offsetWidth>n&&(o=n-r.offsetWidth),r.style.left=o+"px",this._signal("show"),l=null,g.isOpen=!0},g.goTo=function(e){var t=this.getRow(),o=this.session.getLength()-1;switch(e){case"up":t=t<=0?o:t-1;break;case"down":t=o<=t?-1:t+1;break;case"start":t=0;break;case"end":t=o}this.setRow(t)},g.getTextLeftOffset=function(){return this.$borderSize+this.renderer.$padding+this.$imageSize},g.$imageSize=0,g.$borderSize=1,g};dom.importCssString(`
.ace_editor.ace_autocomplete .ace_marker-layer .ace_active-line {
    background-color: #CAD6FA;
    z-index: 1;
}
.ace_dark.ace_editor.ace_autocomplete .ace_marker-layer .ace_active-line {
    background-color: #3a674e;
}
.ace_editor.ace_autocomplete .ace_line-hover {
    border: 1px solid #abbffe;
    margin-top: -1px;
    background: rgba(233,233,253,0.4);
    position: absolute;
    z-index: 2;
}
.ace_dark.ace_editor.ace_autocomplete .ace_line-hover {
    border: 1px solid rgba(109, 150, 13, 0.8);
    background: rgba(58, 103, 78, 0.62);
}
.ace_completion-meta {
    opacity: 0.5;
    margin: 0.9em;
}
.ace_completion-message {
    color: blue;
}
.ace_editor.ace_autocomplete .ace_completion-highlight{
    color: #2d69c7;
}
.ace_dark.ace_editor.ace_autocomplete .ace_completion-highlight{
    color: #93ca12;
}
.ace_editor.ace_autocomplete {
    width: 300px;
    z-index: 200000;
    border: 1px lightgray solid;
    position: fixed;
    box-shadow: 2px 3px 5px rgba(0,0,0,.2);
    line-height: 1.4;
    background: #fefefe;
    color: #111;
}
.ace_dark.ace_editor.ace_autocomplete {
    border: 1px #484747 solid;
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.51);
    line-height: 1.4;
    background: #25282c;
    color: #c1c1c1;
}`,"autocompletion.css",!1),exports.AcePopup=AcePopup,exports.$singleLineEditor=$singleLineEditor;