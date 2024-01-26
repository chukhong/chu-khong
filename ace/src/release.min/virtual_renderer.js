"use strict";var oop=require("./lib/oop"),dom=require("./lib/dom"),config=require("./config"),GutterLayer=require("./layer/gutter").Gutter,MarkerLayer=require("./layer/marker").Marker,TextLayer=require("./layer/text").Text,CursorLayer=require("./layer/cursor").Cursor,HScrollBar=require("./scrollbar").HScrollBar,VScrollBar=require("./scrollbar").VScrollBar,RenderLoop=require("./renderloop").RenderLoop,FontMetrics=require("./layer/font_metrics").FontMetrics,EventEmitter=require("./lib/event_emitter").EventEmitter,editorCss=require("./css/editor.css"),useragent=require("./lib/useragent"),HIDE_TEXTAREA=useragent.isIE,VirtualRenderer=(dom.importCssString(editorCss,"ace_editor.css",!1),function(t,i){var s=this,t=(this.container=t||dom.createElement("div"),dom.addCssClass(this.container,"ace_editor"),dom.HI_DPI&&dom.addCssClass(this.container,"ace_hidpi"),this.setTheme(i),null==config.get("useStrictCSP")&&config.set("useStrictCSP",!1),this.$gutter=dom.createElement("div"),this.$gutter.className="ace_gutter",this.container.appendChild(this.$gutter),this.$gutter.setAttribute("aria-hidden",!0),this.scroller=dom.createElement("div"),this.scroller.className="ace_scroller",this.container.appendChild(this.scroller),this.content=dom.createElement("div"),this.content.className="ace_content",this.scroller.appendChild(this.content),this.$gutterLayer=new GutterLayer(this.$gutter),this.$gutterLayer.on("changeGutterWidth",this.onGutterResize.bind(this)),this.$markerBack=new MarkerLayer(this.content),this.$textLayer=new TextLayer(this.content));this.canvas=t.element,this.$markerFront=new MarkerLayer(this.content),this.$cursorLayer=new CursorLayer(this.content),this.$horizScroll=!1,this.$vScroll=!1,this.scrollBar=this.scrollBarV=new VScrollBar(this.container,this),this.scrollBarH=new HScrollBar(this.container,this),this.scrollBarV.on("scroll",function(t){s.$scrollAnimation||s.session.setScrollTop(t.data-s.scrollMargin.top)}),this.scrollBarH.on("scroll",function(t){s.$scrollAnimation||s.session.setScrollLeft(t.data-s.scrollMargin.left)}),this.scrollTop=0,this.scrollLeft=0,this.cursorPos={row:0,column:0},this.$fontMetrics=new FontMetrics(this.container),this.$textLayer.$setFontMetrics(this.$fontMetrics),this.$textLayer.on("changeCharacterSize",function(t){s.updateCharacterSize(),s.onResize(!0,s.gutterWidth,s.$size.width,s.$size.height),s._signal("changeCharacterSize",t)}),this.$size={width:0,height:0,scrollerHeight:0,scrollerWidth:0,$dirty:!0},this.layerConfig={width:1,padding:0,firstRow:0,firstRowScreen:0,lastRow:0,lineHeight:0,characterWidth:0,minHeight:1,maxHeight:1,offset:0,height:1,gutterOffset:1},this.scrollMargin={left:0,right:0,top:0,bottom:0,v:0,h:0},this.margin={left:0,right:0,top:0,bottom:0,v:0,h:0},this.$keepTextAreaAtCursor=!useragent.isIOS,this.$loop=new RenderLoop(this.$renderChanges.bind(this),this.container.ownerDocument.defaultView),this.$loop.schedule(this.CHANGE_FULL),this.updateCharacterSize(),this.setPadding(4),config.resetOptions(this),config._signal("renderer",this)});!function(){this.CHANGE_CURSOR=1,this.CHANGE_MARKER=2,this.CHANGE_GUTTER=4,this.CHANGE_SCROLL=8,this.CHANGE_LINES=16,this.CHANGE_TEXT=32,this.CHANGE_SIZE=64,this.CHANGE_MARKER_BACK=128,this.CHANGE_MARKER_FRONT=256,this.CHANGE_FULL=512,this.CHANGE_H_SCROLL=1024,oop.implement(this,EventEmitter),this.updateCharacterSize=function(){this.$textLayer.allowBoldFonts!=this.$allowBoldFonts&&(this.$allowBoldFonts=this.$textLayer.allowBoldFonts,this.setStyle("ace_nobold",!this.$allowBoldFonts)),this.layerConfig.characterWidth=this.characterWidth=this.$textLayer.getCharacterWidth(),this.layerConfig.lineHeight=this.lineHeight=this.$textLayer.getLineHeight(),this.$updatePrintMargin(),dom.setStyle(this.scroller.style,"line-height",this.lineHeight+"px")},this.setSession=function(t){this.session&&this.session.doc.off("changeNewLineMode",this.onChangeNewLineMode),(this.session=t)&&this.scrollMargin.top&&t.getScrollTop()<=0&&t.setScrollTop(-this.scrollMargin.top),this.$cursorLayer.setSession(t),this.$markerBack.setSession(t),this.$markerFront.setSession(t),this.$gutterLayer.setSession(t),this.$textLayer.setSession(t),t&&(this.$loop.schedule(this.CHANGE_FULL),this.session.$setFontMetrics(this.$fontMetrics),this.scrollBarH.scrollLeft=this.scrollBarV.scrollTop=null,this.onChangeNewLineMode=this.onChangeNewLineMode.bind(this),this.onChangeNewLineMode(),this.session.doc.on("changeNewLineMode",this.onChangeNewLineMode))},this.updateLines=function(t,i,s){if(void 0===i&&(i=1/0),this.$changedLines?(this.$changedLines.firstRow>t&&(this.$changedLines.firstRow=t),this.$changedLines.lastRow<i&&(this.$changedLines.lastRow=i)):this.$changedLines={firstRow:t,lastRow:i},this.$changedLines.lastRow<this.layerConfig.firstRow){if(!s)return;this.$changedLines.lastRow=this.layerConfig.lastRow}this.$changedLines.firstRow>this.layerConfig.lastRow||this.$loop.schedule(this.CHANGE_LINES)},this.onChangeNewLineMode=function(){this.$loop.schedule(this.CHANGE_TEXT),this.$textLayer.$updateEolChar(),this.session.$bidiHandler.setEolChar(this.$textLayer.EOL_CHAR)},this.onChangeTabSize=function(){this.$loop.schedule(this.CHANGE_TEXT|this.CHANGE_MARKER),this.$textLayer.onChangeTabSize()},this.updateText=function(){this.$loop.schedule(this.CHANGE_TEXT)},this.updateFull=function(t){t?this.$renderChanges(this.CHANGE_FULL,!0):this.$loop.schedule(this.CHANGE_FULL)},this.updateFontSize=function(){this.$textLayer.checkForSizeChanges()},this.$changes=0,this.$updateSizeAsync=function(){this.$loop.pending?this.$size.$dirty=!0:this.onResize()},this.onResize=function(t,i,s,e){if(!(2<this.resizing)){0<this.resizing?this.resizing++:this.resizing=t?1:0;var r=this.container,r=(e=e||r.clientHeight||r.scrollHeight,s=s||r.clientWidth||r.scrollWidth,this.$updateCachedSize(t,i,s,e));if(!this.$size.scrollerHeight||!s&&!e)return this.resizing=0;t&&(this.$gutterLayer.$padding=null),t?this.$renderChanges(r|this.$changes,!0):this.$loop.schedule(r|this.$changes),this.resizing&&(this.resizing=0),this.scrollBarH.scrollLeft=this.scrollBarV.scrollTop=null}},this.$updateCachedSize=function(t,i,s,e){e-=this.$extraHeight||0;var r=0,h=this.$size,o={width:h.width,height:h.height,scrollerHeight:h.scrollerHeight,scrollerWidth:h.scrollerWidth};return e&&(t||h.height!=e)&&(h.height=e,r|=this.CHANGE_SIZE,h.scrollerHeight=h.height,this.$horizScroll&&(h.scrollerHeight-=this.scrollBarH.getHeight()),this.scrollBarV.element.style.bottom=this.scrollBarH.getHeight()+"px",r|=this.CHANGE_SCROLL),s&&(t||h.width!=s)&&(r|=this.CHANGE_SIZE,h.width=s,null==i&&(i=this.$showGutter?this.$gutter.offsetWidth:0),this.gutterWidth=i,dom.setStyle(this.scrollBarH.element.style,"left",i+"px"),dom.setStyle(this.scroller.style,"left",i+this.margin.left+"px"),h.scrollerWidth=Math.max(0,s-i-this.scrollBarV.getWidth()-this.margin.h),dom.setStyle(this.$gutter.style,"left",this.margin.left+"px"),i=this.scrollBarV.getWidth()+"px",dom.setStyle(this.scrollBarH.element.style,"right",i),dom.setStyle(this.scroller.style,"right",i),dom.setStyle(this.scroller.style,"bottom",this.scrollBarH.getHeight()),this.session&&this.session.getUseWrapMode()&&this.adjustWrapLimit()||t)&&(r|=this.CHANGE_FULL),h.$dirty=!s||!e,r&&this._signal("resize",o),r},this.onGutterResize=function(t){t=this.$showGutter?t:0;t!=this.gutterWidth&&(this.$changes|=this.$updateCachedSize(!0,t,this.$size.width,this.$size.height)),this.session.getUseWrapMode()&&this.adjustWrapLimit()||this.$size.$dirty?this.$loop.schedule(this.CHANGE_FULL):this.$computeLayerConfig()},this.adjustWrapLimit=function(){var t=this.$size.scrollerWidth-2*this.$padding,t=Math.floor(t/this.characterWidth);return this.session.adjustWrapLimit(t,this.$showPrintMargin&&this.$printMarginColumn)},this.setAnimatedScroll=function(t){this.setOption("animatedScroll",t)},this.getAnimatedScroll=function(){return this.$animatedScroll},this.setShowInvisibles=function(t){this.setOption("showInvisibles",t),this.session.$bidiHandler.setShowInvisibles(t)},this.getShowInvisibles=function(){return this.getOption("showInvisibles")},this.getDisplayIndentGuides=function(){return this.getOption("displayIndentGuides")},this.setDisplayIndentGuides=function(t){this.setOption("displayIndentGuides",t)},this.setShowPrintMargin=function(t){this.setOption("showPrintMargin",t)},this.getShowPrintMargin=function(){return this.getOption("showPrintMargin")},this.setPrintMarginColumn=function(t){this.setOption("printMarginColumn",t)},this.getPrintMarginColumn=function(){return this.getOption("printMarginColumn")},this.getShowGutter=function(){return this.getOption("showGutter")},this.setShowGutter=function(t){return this.setOption("showGutter",t)},this.getFadeFoldWidgets=function(){return this.getOption("fadeFoldWidgets")},this.setFadeFoldWidgets=function(t){this.setOption("fadeFoldWidgets",t)},this.setHighlightGutterLine=function(t){this.setOption("highlightGutterLine",t)},this.getHighlightGutterLine=function(){return this.getOption("highlightGutterLine")},this.$updatePrintMargin=function(){var t;(this.$showPrintMargin||this.$printMarginEl)&&(this.$printMarginEl||((t=dom.createElement("div")).className="ace_layer ace_print-margin-layer",this.$printMarginEl=dom.createElement("div"),this.$printMarginEl.className="ace_print-margin",t.appendChild(this.$printMarginEl),this.content.insertBefore(t,this.content.firstChild)),(t=this.$printMarginEl.style).left=Math.round(this.characterWidth*this.$printMarginColumn+this.$padding)+"px",t.visibility=this.$showPrintMargin?"visible":"hidden",this.session)&&-1==this.session.$wrap&&this.adjustWrapLimit()},this.getContainerElement=function(){return this.container},this.getMouseEventTarget=function(){return this.scroller},this.getTextAreaContainer=function(){return this.container},this.$moveTextAreaToCursor=function(){var t,i,s,e,r,h,o;this.$isMousePressed||(t=this.textarea.style,h=this.$composition,this.$keepTextAreaAtCursor||h?(s=this.$cursorLayer.$pixelPos)&&(h&&h.markerRange&&(s=this.$cursorLayer.getPixelPosition(h.markerRange.start,!0)),o=this.layerConfig,i=s.top,s=s.left,i-=o.offset,e=h&&h.useTextareaForIME?this.lineHeight:HIDE_TEXTAREA?0:1,i<0||i>o.height-e?dom.translate(this.textarea,0,0):(o=1,r=this.$size.height-e,h?h.useTextareaForIME?(h=this.textarea.value,o=this.characterWidth*this.session.$getStringScreenWidth(h)[0]):i+=this.lineHeight+2:i+=this.lineHeight,(s-=this.scrollLeft)>this.$size.scrollerWidth-o&&(s=this.$size.scrollerWidth-o),s+=this.gutterWidth+this.margin.left,dom.setStyle(t,"height",e+"px"),dom.setStyle(t,"width",o+"px"),dom.translate(this.textarea,Math.min(s,this.$size.scrollerWidth-o),Math.min(i,r)))):dom.translate(this.textarea,-100,0))},this.getFirstVisibleRow=function(){return this.layerConfig.firstRow},this.getFirstFullyVisibleRow=function(){return this.layerConfig.firstRow+(0===this.layerConfig.offset?0:1)},this.getLastFullyVisibleRow=function(){var t=this.layerConfig,i=t.lastRow;return this.session.documentToScreenRow(i,0)*t.lineHeight-this.session.getScrollTop()>t.height-t.lineHeight?i-1:i},this.getLastVisibleRow=function(){return this.layerConfig.lastRow},this.$padding=null,this.setPadding=function(t){this.$padding=t,this.$textLayer.setPadding(t),this.$cursorLayer.setPadding(t),this.$markerFront.setPadding(t),this.$markerBack.setPadding(t),this.$loop.schedule(this.CHANGE_FULL),this.$updatePrintMargin()},this.setScrollMargin=function(t,i,s,e){var r=this.scrollMargin;r.top=0|t,r.bottom=0|i,r.right=0|e,r.left=0|s,r.v=r.top+r.bottom,r.h=r.left+r.right,r.top&&this.scrollTop<=0&&this.session&&this.session.setScrollTop(-r.top),this.updateFull()},this.setMargin=function(t,i,s,e){var r=this.margin;r.top=0|t,r.bottom=0|i,r.right=0|e,r.left=0|s,r.v=r.top+r.bottom,r.h=r.left+r.right,this.$updateCachedSize(!0,this.gutterWidth,this.$size.width,this.$size.height),this.updateFull()},this.getHScrollBarAlwaysVisible=function(){return this.$hScrollBarAlwaysVisible},this.setHScrollBarAlwaysVisible=function(t){this.setOption("hScrollBarAlwaysVisible",t)},this.getVScrollBarAlwaysVisible=function(){return this.$vScrollBarAlwaysVisible},this.setVScrollBarAlwaysVisible=function(t){this.setOption("vScrollBarAlwaysVisible",t)},this.$updateScrollBarV=function(){var t=this.layerConfig.maxHeight,i=this.$size.scrollerHeight;!this.$maxLines&&this.$scrollPastEnd&&(t-=(i-this.lineHeight)*this.$scrollPastEnd,this.scrollTop>t-i)&&(t=this.scrollTop+i,this.scrollBarV.scrollTop=null),this.scrollBarV.setScrollHeight(t+this.scrollMargin.v),this.scrollBarV.setScrollTop(this.scrollTop+this.scrollMargin.top)},this.$updateScrollBarH=function(){this.scrollBarH.setScrollWidth(this.layerConfig.width+2*this.$padding+this.scrollMargin.h),this.scrollBarH.setScrollLeft(this.scrollLeft+this.scrollMargin.left)},this.$frozen=!1,this.freeze=function(){this.$frozen=!0},this.unfreeze=function(){this.$frozen=!1},this.$renderChanges=function(t,i){if(this.$changes&&(t|=this.$changes,this.$changes=0),this.session&&this.container.offsetWidth&&!this.$frozen&&(t||i)){if(this.$size.$dirty)return this.$changes|=t,this.onResize(!0);this.lineHeight||this.$textLayer.checkForSizeChanges(),this._signal("beforeRender",t),this.session&&this.session.$bidiHandler&&this.session.$bidiHandler.updateCharacterWidths(this.$fontMetrics);var s,e,i=this.layerConfig;(t&this.CHANGE_FULL||t&this.CHANGE_SIZE||t&this.CHANGE_TEXT||t&this.CHANGE_LINES||t&this.CHANGE_SCROLL||t&this.CHANGE_H_SCROLL)&&(t|=this.$computeLayerConfig()|this.$loop.clear(),i.firstRow!=this.layerConfig.firstRow&&i.firstRowScreen==this.layerConfig.firstRowScreen&&0<(s=this.scrollTop+(i.firstRow-this.layerConfig.firstRow)*this.lineHeight)&&(this.scrollTop=s,t=(t|=this.CHANGE_SCROLL)|(this.$computeLayerConfig()|this.$loop.clear())),i=this.layerConfig,this.$updateScrollBarV(),t&this.CHANGE_H_SCROLL&&this.$updateScrollBarH(),dom.translate(this.content,-this.scrollLeft,-i.offset),s=i.width+2*this.$padding+"px",e=i.minHeight+"px",dom.setStyle(this.content.style,"width",s),dom.setStyle(this.content.style,"height",e)),t&this.CHANGE_H_SCROLL&&(dom.translate(this.content,-this.scrollLeft,-i.offset),this.scroller.className=this.scrollLeft<=0?"ace_scroller":"ace_scroller ace_scroll-left"),t&this.CHANGE_FULL?(this.$changedLines=null,this.$textLayer.update(i),this.$showGutter&&this.$gutterLayer.update(i),this.$markerBack.update(i),this.$markerFront.update(i),this.$cursorLayer.update(i),this.$moveTextAreaToCursor()):t&this.CHANGE_SCROLL?(this.$changedLines=null,t&this.CHANGE_TEXT||t&this.CHANGE_LINES?this.$textLayer.update(i):this.$textLayer.scrollLines(i),this.$showGutter&&(t&this.CHANGE_GUTTER||t&this.CHANGE_LINES?this.$gutterLayer.update(i):this.$gutterLayer.scrollLines(i)),this.$markerBack.update(i),this.$markerFront.update(i),this.$cursorLayer.update(i),this.$moveTextAreaToCursor()):(t&this.CHANGE_TEXT?(this.$changedLines=null,this.$textLayer.update(i),this.$showGutter&&this.$gutterLayer.update(i)):t&this.CHANGE_LINES?(this.$updateLines()||t&this.CHANGE_GUTTER&&this.$showGutter)&&this.$gutterLayer.update(i):t&this.CHANGE_TEXT||t&this.CHANGE_GUTTER?this.$showGutter&&this.$gutterLayer.update(i):t&this.CHANGE_CURSOR&&this.$highlightGutterLine&&this.$gutterLayer.updateLineHighlight(i),t&this.CHANGE_CURSOR&&(this.$cursorLayer.update(i),this.$moveTextAreaToCursor()),t&(this.CHANGE_MARKER|this.CHANGE_MARKER_FRONT)&&this.$markerFront.update(i),t&(this.CHANGE_MARKER|this.CHANGE_MARKER_BACK)&&this.$markerBack.update(i)),this._signal("afterRender",t)}else this.$changes|=t},this.$autosize=function(){var t=this.session.getScreenLength()*this.lineHeight,i=this.$maxLines*this.lineHeight,s=Math.min(i,Math.max((this.$minLines||1)*this.lineHeight,t))+this.scrollMargin.v+(this.$extraHeight||0);this.$horizScroll&&(s+=this.scrollBarH.getHeight());i=!((s=this.$maxPixelHeight&&s>this.$maxPixelHeight?this.$maxPixelHeight:s)<=2*this.lineHeight)&&i<t;s==this.desiredHeight&&this.$size.height==this.desiredHeight&&i==this.$vScroll||(i!=this.$vScroll&&(this.$vScroll=i,this.scrollBarV.setVisible(i)),t=this.container.clientWidth,this.container.style.height=s+"px",this.$updateCachedSize(!0,this.$gutterWidth,t,s),this.desiredHeight=s,this._signal("autosize"))},this.$computeLayerConfig=function(){var t,i=this.session,s=this.$size,e=s.height<=2*this.lineHeight,r=this.session.getScreenLength()*this.lineHeight,h=this.$getLongestLine(),o=!e&&(this.$hScrollBarAlwaysVisible||s.scrollerWidth-h-2*this.$padding<0),n=this.$horizScroll!==o,o=(n&&(this.$horizScroll=o,this.scrollBarH.setVisible(o)),this.$vScroll),l=(this.$maxLines&&1<this.lineHeight&&this.$autosize(),s.scrollerHeight+this.lineHeight),a=!this.$maxLines&&this.$scrollPastEnd?(s.scrollerHeight-this.lineHeight)*this.$scrollPastEnd:0,c=(r+=a,this.scrollMargin),e=(this.session.setScrollTop(Math.max(-c.top,Math.min(this.scrollTop,r-s.scrollerHeight+c.bottom))),this.session.setScrollLeft(Math.max(-c.left,Math.min(this.scrollLeft,h+2*this.$padding-s.scrollerWidth+c.right))),!e&&(this.$vScrollBarAlwaysVisible||s.scrollerHeight-r+a<0||this.scrollTop>c.top)),a=o!==e,c=(a&&(this.$vScroll=e,this.scrollBarV.setVisible(e)),this.scrollTop%this.lineHeight),o=Math.ceil(l/this.lineHeight)-1,o=(e=Math.max(0,Math.round((this.scrollTop-c)/this.lineHeight)))+o,u=this.lineHeight,e=i.screenToDocumentRow(e,0),d=i.getFoldLine(e),i=(d&&(e=d.start.row),d=i.documentToScreenRow(e,0),t=i.getRowLength(e)*u,o=Math.min(i.screenToDocumentRow(o,0),i.getLength()-1),l=s.scrollerHeight+i.getRowLength(o)*u+t,c=this.scrollTop-d*u,0);return this.layerConfig.width==h&&!n||(i=this.CHANGE_H_SCROLL),(n||a)&&(i|=this.$updateCachedSize(!0,this.gutterWidth,s.width,s.height),this._signal("scrollbarVisibilityChanged"),a)&&(h=this.$getLongestLine()),this.layerConfig={width:h,padding:this.$padding,firstRow:e,firstRowScreen:d,lastRow:o,lineHeight:u,characterWidth:this.characterWidth,minHeight:l,maxHeight:r,offset:c,gutterOffset:u?Math.max(0,Math.ceil((c+s.height-s.scrollerHeight)/u)):0,height:this.$size.scrollerHeight},this.session.$bidiHandler&&this.session.$bidiHandler.setContentWidth(h-this.$padding),i},this.$updateLines=function(){if(this.$changedLines){var t=this.$changedLines.firstRow,i=this.$changedLines.lastRow,s=(this.$changedLines=null,this.layerConfig);if(!(t>s.lastRow+1||i<s.firstRow)){if(i!==1/0)return this.$textLayer.updateLines(s,t,i),!0;this.$showGutter&&this.$gutterLayer.update(s),this.$textLayer.update(s)}}},this.$getLongestLine=function(){var t=this.session.getScreenWidth();return this.showInvisibles&&!this.session.$useWrapMode&&(t+=1),this.$textLayer&&t>this.$textLayer.MAX_LINE_LENGTH&&(t=this.$textLayer.MAX_LINE_LENGTH+30),Math.max(this.$size.scrollerWidth-2*this.$padding,Math.round(t*this.characterWidth))},this.updateFrontMarkers=function(){this.$markerFront.setMarkers(this.session.getMarkers(!0)),this.$loop.schedule(this.CHANGE_MARKER_FRONT)},this.updateBackMarkers=function(){this.$markerBack.setMarkers(this.session.getMarkers()),this.$loop.schedule(this.CHANGE_MARKER_BACK)},this.addGutterDecoration=function(t,i){this.$gutterLayer.addGutterDecoration(t,i)},this.removeGutterDecoration=function(t,i){this.$gutterLayer.removeGutterDecoration(t,i)},this.updateBreakpoints=function(t){this.$loop.schedule(this.CHANGE_GUTTER)},this.setAnnotations=function(t){this.$gutterLayer.setAnnotations(t),this.$loop.schedule(this.CHANGE_GUTTER)},this.updateCursor=function(){this.$loop.schedule(this.CHANGE_CURSOR)},this.hideCursor=function(){this.$cursorLayer.hideCursor()},this.showCursor=function(){this.$cursorLayer.showCursor()},this.scrollSelectionIntoView=function(t,i,s){this.scrollCursorIntoView(t,s),this.scrollCursorIntoView(i,s)},this.scrollCursorIntoView=function(t,i,s){var e,r,h;0!==this.$size.scrollerHeight&&(e=(t=this.$cursorLayer.getPixelPosition(t)).left,t=t.top,h=s&&s.top||0,s=s&&s.bottom||0,t<(r=this.$scrollAnimation?this.session.getScrollTop():this.scrollTop)+h?(i&&r+h>t+this.lineHeight&&(t-=i*this.$size.scrollerHeight),0===t&&(t=-this.scrollMargin.top),this.session.setScrollTop(t)):r+this.$size.scrollerHeight-s<t+this.lineHeight&&(i&&r+this.$size.scrollerHeight-s<t-this.lineHeight&&(t+=i*this.$size.scrollerHeight),this.session.setScrollTop(t+this.lineHeight+s-this.$size.scrollerHeight)),e<(h=this.scrollLeft)?(e<this.$padding+2*this.layerConfig.characterWidth&&(e=-this.scrollMargin.left),this.session.setScrollLeft(e)):h+this.$size.scrollerWidth<e+this.characterWidth?this.session.setScrollLeft(Math.round(e+this.characterWidth-this.$size.scrollerWidth)):h<=this.$padding&&e-h<this.characterWidth&&this.session.setScrollLeft(0))},this.getScrollTop=function(){return this.session.getScrollTop()},this.getScrollLeft=function(){return this.session.getScrollLeft()},this.getScrollTopRow=function(){return this.scrollTop/this.lineHeight},this.getScrollBottomRow=function(){return Math.max(0,Math.floor((this.scrollTop+this.$size.scrollerHeight)/this.lineHeight)-1)},this.scrollToRow=function(t){this.session.setScrollTop(t*this.lineHeight)},this.alignCursor=function(t,i){var t=this.$cursorLayer.getPixelPosition(t="number"==typeof t?{row:t,column:0}:t),s=this.$size.scrollerHeight-this.lineHeight,t=t.top-s*(i||0);return this.session.setScrollTop(t),t},this.STEPS=8,this.$calcSteps=function(t,i){for(var s,e,r=0,h=this.STEPS,o=[],r=0;r<h;++r)o.push((s=r/this.STEPS,(i-(e=t))*(Math.pow(s-1,3)+1)+e));return o},this.scrollToLine=function(t,i,s,e){t=this.$cursorLayer.getPixelPosition({row:t,column:0}).top,i&&(t-=this.$size.scrollerHeight/2),i=this.scrollTop;this.session.setScrollTop(t),!1!==s&&this.animateScrolling(i,e)},this.animateScrolling=function(t,i){var s=this.scrollTop;if(this.$animatedScroll){var e=this;if(t!=s){if(this.$scrollAnimation){var r=this.$scrollAnimation.steps;if(r.length&&(t=r[0])==s)return}var h=e.$calcSteps(t,s);this.$scrollAnimation={from:t,to:s,steps:h},clearInterval(this.$timer),e.session.setScrollTop(h.shift()),e.session.$scrollTop=s,this.$timer=setInterval(function(){if(!e.session)return clearInterval(e.$timer);h.length?(e.session.setScrollTop(h.shift()),e.session.$scrollTop=s):null!=s?(e.session.$scrollTop=-1,e.session.setScrollTop(s),s=null):(e.$timer=clearInterval(e.$timer),e.$scrollAnimation=null,i&&i())},10)}}},this.scrollToY=function(t){this.scrollTop!==t&&(this.$loop.schedule(this.CHANGE_SCROLL),this.scrollTop=t)},this.scrollToX=function(t){this.scrollLeft!==t&&(this.scrollLeft=t),this.$loop.schedule(this.CHANGE_H_SCROLL)},this.scrollTo=function(t,i){this.session.setScrollTop(i),this.session.setScrollLeft(t)},this.scrollBy=function(t,i){i&&this.session.setScrollTop(this.session.getScrollTop()+i),t&&this.session.setScrollLeft(this.session.getScrollLeft()+t)},this.isScrollableBy=function(t,i){return i<0&&this.session.getScrollTop()>=1-this.scrollMargin.top||0<i&&this.session.getScrollTop()+this.$size.scrollerHeight-this.layerConfig.maxHeight<-1+this.scrollMargin.bottom||t<0&&this.session.getScrollLeft()>=1-this.scrollMargin.left||0<t&&this.session.getScrollLeft()+this.$size.scrollerWidth-this.layerConfig.width<-1+this.scrollMargin.right||void 0},this.pixelToScreenCoordinates=function(t,i){this.$hasCssTransforms?(e={top:0,left:0},t=(s=this.$fontMetrics.transformCoordinates([t,i]))[1]-this.gutterWidth-this.margin.left,i=s[0]):e=this.scroller.getBoundingClientRect();var s=t+this.scrollLeft-e.left-this.$padding,t=s/this.characterWidth,i=Math.floor((i+this.scrollTop-e.top)/this.lineHeight),e=this.$blockCursor?Math.floor(t):Math.round(t);return{row:i,column:e,side:0<t-e?1:-1,offsetX:s}},this.screenToTextCoordinates=function(t,i){this.$hasCssTransforms?(s={top:0,left:0},t=(e=this.$fontMetrics.transformCoordinates([t,i]))[1]-this.gutterWidth-this.margin.left,i=e[0]):s=this.scroller.getBoundingClientRect();var s,e=t+this.scrollLeft-s.left-this.$padding,t=e/this.characterWidth,t=this.$blockCursor?Math.floor(t):Math.round(t),i=Math.floor((i+this.scrollTop-s.top)/this.lineHeight);return this.session.screenToDocumentPosition(i,Math.max(t,0),e)},this.textToScreenCoordinates=function(t,i){var s=this.scroller.getBoundingClientRect(),i=this.session.documentToScreenPosition(t,i),t=this.$padding+(this.session.$bidiHandler.isBidiRow(i.row,t)?this.session.$bidiHandler.getPosLeft(i.column):Math.round(i.column*this.characterWidth)),i=i.row*this.lineHeight;return{pageX:s.left+t-this.scrollLeft,pageY:s.top+i-this.scrollTop}},this.visualizeFocus=function(){dom.addCssClass(this.container,"ace_focus")},this.visualizeBlur=function(){dom.removeCssClass(this.container,"ace_focus")},this.showComposition=function(t){(this.$composition=t).cssText||(t.cssText=this.textarea.style.cssText),null==t.useTextareaForIME&&(t.useTextareaForIME=this.$useTextareaForIME),this.$useTextareaForIME?(dom.addCssClass(this.textarea,"ace_composition"),this.textarea.style.cssText="",this.$moveTextAreaToCursor(),this.$cursorLayer.element.style.display="none"):t.markerId=this.session.addMarker(t.markerRange,"ace_composition_marker","text")},this.setCompositionText=function(t){var i=this.session.selection.cursor;this.addToken(t,"composition_placeholder",i.row,i.column),this.$moveTextAreaToCursor()},this.hideComposition=function(){var t;this.$composition&&(this.$composition.markerId&&this.session.removeMarker(this.$composition.markerId),dom.removeCssClass(this.textarea,"ace_composition"),this.textarea.style.cssText=this.$composition.cssText,t=this.session.selection.cursor,this.removeExtraToken(t.row,t.column),this.$composition=null,this.$cursorLayer.element.style.display="")},this.addToken=function(t,i,s,e){var r=this.session,h=(r.bgTokenizer.lines[s]=null,{type:i,value:t}),o=r.getTokens(s);if(null==e)o.push(h);else for(var n=0,l=0;l<o.length;l++){var a=o[l];if(e<=(n+=a.value.length)){var c=a.value.length-(n-e),u=a.value.slice(0,c),c=a.value.slice(c);o.splice(l,1,{type:a.type,value:u},h,{type:a.type,value:c});break}}this.updateLines(s,s)},this.removeExtraToken=function(t,i){this.updateLines(t,t)},this.setTheme=function(s,e){var t,r=this;function i(t){if(r.$themeId!=s)return e&&e();if(!t||!t.cssClass)throw new Error("couldn't load module "+s+" or it didn't call define");t.$id&&(r.$themeId=t.$id),dom.importCssString(t.cssText,t.cssClass,r.container),r.theme&&dom.removeCssClass(r.container,r.theme.cssClass);var i="padding"in t?t.padding:"padding"in(r.theme||{})?4:r.$padding;r.$padding&&i!=r.$padding&&r.setPadding(i),r.$theme=t.cssClass,r.theme=t,dom.addCssClass(r.container,t.cssClass),dom.setCssClass(r.container,"ace_dark",t.isDark),r.$size&&(r.$size.width=0,r.$updateSizeAsync()),r._dispatchEvent("themeLoaded",{theme:t}),e&&e()}this.$themeId=s,r._dispatchEvent("themeChange",{theme:s}),s&&"string"!=typeof s?i(s):(t=s||this.$options.theme.initialValue,config.loadModule(["theme",t],i))},this.getTheme=function(){return this.$themeId},this.setStyle=function(t,i){dom.setCssClass(this.container,t,!1!==i)},this.unsetStyle=function(t){dom.removeCssClass(this.container,t)},this.setCursorStyle=function(t){dom.setStyle(this.scroller.style,"cursor",t)},this.setMouseCursor=function(t){dom.setStyle(this.scroller.style,"cursor",t)},this.attachToShadowRoot=function(){dom.importCssString(editorCss,"ace_editor.css",this.container)},this.destroy=function(){this.freeze(),this.$fontMetrics.destroy(),this.$cursorLayer.destroy(),this.removeAllListeners(),this.container.textContent=""}}.call(VirtualRenderer.prototype),config.defineOptions(VirtualRenderer.prototype,"renderer",{animatedScroll:{initialValue:!1},showInvisibles:{set:function(t){this.$textLayer.setShowInvisibles(t)&&this.$loop.schedule(this.CHANGE_TEXT)},initialValue:!1},showPrintMargin:{set:function(){this.$updatePrintMargin()},initialValue:!0},printMarginColumn:{set:function(){this.$updatePrintMargin()},initialValue:80},printMargin:{set:function(t){"number"==typeof t&&(this.$printMarginColumn=t),this.$showPrintMargin=!!t,this.$updatePrintMargin()},get:function(){return this.$showPrintMargin&&this.$printMarginColumn}},showGutter:{set:function(t){this.$gutter.style.display=t?"block":"none",this.$loop.schedule(this.CHANGE_FULL),this.onGutterResize()},initialValue:!0},fadeFoldWidgets:{set:function(t){dom.setCssClass(this.$gutter,"ace_fade-fold-widgets",t)},initialValue:!1},showFoldWidgets:{set:function(t){this.$gutterLayer.setShowFoldWidgets(t),this.$loop.schedule(this.CHANGE_GUTTER)},initialValue:!0},displayIndentGuides:{set:function(t){this.$textLayer.setDisplayIndentGuides(t)&&this.$loop.schedule(this.CHANGE_TEXT)},initialValue:!0},highlightGutterLine:{set:function(t){this.$gutterLayer.setHighlightGutterLine(t),this.$loop.schedule(this.CHANGE_GUTTER)},initialValue:!0},hScrollBarAlwaysVisible:{set:function(t){this.$hScrollBarAlwaysVisible&&this.$horizScroll||this.$loop.schedule(this.CHANGE_SCROLL)},initialValue:!1},vScrollBarAlwaysVisible:{set:function(t){this.$vScrollBarAlwaysVisible&&this.$vScroll||this.$loop.schedule(this.CHANGE_SCROLL)},initialValue:!1},fontSize:{set:function(t){"number"==typeof t&&(t+="px"),this.container.style.fontSize=t,this.updateFontSize()},initialValue:12},fontFamily:{set:function(t){this.container.style.fontFamily=t,this.updateFontSize()}},maxLines:{set:function(t){this.updateFull()}},minLines:{set:function(t){this.$minLines<562949953421311||(this.$minLines=0),this.updateFull()}},maxPixelHeight:{set:function(t){this.updateFull()},initialValue:0},scrollPastEnd:{set:function(t){this.$scrollPastEnd!=(t=+t||0)&&(this.$scrollPastEnd=t,this.$loop.schedule(this.CHANGE_SCROLL))},initialValue:0,handlesSet:!0},fixedWidthGutter:{set:function(t){this.$gutterLayer.$fixedWidth=!!t,this.$loop.schedule(this.CHANGE_GUTTER)}},theme:{set:function(t){this.setTheme(t)},get:function(){return this.$themeId||this.theme},initialValue:"./theme/textmate",handlesSet:!0},hasCssTransforms:{},useTextareaForIME:{initialValue:!useragent.isMobile&&!useragent.isIE}}),exports.VirtualRenderer=VirtualRenderer;