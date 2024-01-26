"use strict";var dom=require("ace/lib/dom"),event=require("ace/lib/event"),EditSession=require("ace/edit_session").EditSession,UndoManager=require("ace/undomanager").UndoManager,Renderer=require("ace/virtual_renderer").VirtualRenderer,Editor=require("ace/editor").Editor,MultiSelect=require("ace/multi_select").MultiSelect,SplitRoot=(dom.importCssString("splitter {    border: 1px solid #C6C6D2;    width: 0px;    cursor: ew-resize;    z-index:10}splitter:hover {    margin-left: -2px;    width:3px;    border-color: #B5B4E0;}","splitEditor"),exports.edit=function(e){"string"==typeof e&&(e=document.getElementById(e));var t=new Editor(new Renderer(e,require("ace/theme/textmate")));return t.resize(),event.addListener(window,"resize",function(){t.resize()}),t},function(e,t,i,r){e.style.position=i||"relative",this.container=e,this.getSize=r||this.getSize,this.resize=this.$resize.bind(this),event.addListener(e.ownerDocument.defaultView,"resize",this.resize),this.editor=this.createEditor()}),Split=(!function(){this.createEditor=function(){var e=document.createElement("div"),e=(e.className=this.$editorCSS,e.style.cssText="position: absolute; top:0px; bottom:0px",this.$container.appendChild(e),new EditSession(""),new Editor(new Renderer(e,this.$theme)));return this.$editors.push(e),e.setFontSize(this.$fontSize),e},this.$resize=function(){var e=this.getSize(this.container);this.rect={x:e.left,y:e.top,w:e.width,h:e.height},this.item.resize(this.rect)},this.getSize=function(e){return e.getBoundingClientRect()},this.destroy=function(){var e=this.container.ownerDocument.defaultView;event.removeListener(e,"resize",this.resize)}}.call(SplitRoot.prototype),function(){});!function(){this.execute=function(e){this.$u.execute(e)}}.call(Split.prototype),exports.singleLineEditor=function(e){var t=new Renderer(e),e=(e.style.overflow="hidden",t.screenToTextCoordinates=function(e,t){e=this.pixelToScreenCoordinates(e,t);return this.session.screenToDocumentPosition(Math.min(this.session.getScreenLength()-1,Math.max(e.row,0)),Math.max(e.column,0))},t.$maxLines=4,t.setStyle("ace_one-line"),new Editor(t));return e.session.setUndoManager(new UndoManager),e.setShowPrintMargin(!1),e.renderer.setShowGutter(!1),e.renderer.setHighlightGutterLine(!1),e.$mouseHandler.$focusWaitTimout=0,e};