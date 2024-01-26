"use strict";var LineWidgets=require("../line_widgets").LineWidgets,event=require("../lib/event"),lang=require("../lib/lang"),dom=require("../lib/dom");function clearLensElements(e){var e=e.$textLayer,n=e.$lenses;n&&n.forEach(function(e){e.remove()}),e.$lenses=null}function renderWidgets(e,n){if(e&n.CHANGE_LINES||e&n.CHANGE_FULL||e&n.CHANGE_SCROLL||e&n.CHANGE_TEXT){var t=n.session,o=n.session.lineWidgets,e=n.$textLayer,r=e.$lenses;if(o){for(var i=n.$textLayer.$lines.cells,s=n.layerConfig,d=n.$padding,r=r||(e.$lenses=[]),a=0,l=0;l<i.length;l++){var c=i[l].row,u=o[c],g=u&&u.lenses;if(g&&g.length){var L=r[a];(L=L||(r[a]=dom.buildDom(["div",{class:"ace_codeLens"}],n.container))).style.height=s.lineHeight+"px",a++;for(var f=0;f<g.length;f++){var p=L.childNodes[2*f];p||(0!=f&&L.appendChild(dom.createTextNode(" | ")),p=dom.buildDom(["a"],L)),p.textContent=g[f].title,p.lensCommand=g[f]}for(;L.childNodes.length>2*f-1;)L.lastChild.remove();u=n.$cursorLayer.getPixelPosition({row:c,column:0},!0).top-s.lineHeight*u.rowsAbove-s.offset,u=(L.style.top=u+"px",n.gutterWidth),c=t.getLine(c).search(/\S|$/);u+=(c=-1==c?0:c)*s.characterWidth,L.style.paddingLeft=d+u+"px"}}for(;a<r.length;)r.pop().remove()}else r&&clearLensElements(n)}}function clearCodeLensWidgets(e){var n;e.lineWidgets&&(n=e.widgetManager,e.lineWidgets.forEach(function(e){e&&e.lenses&&n.removeLineWidget(e)}))}function attachToEditor(a){a.codeLensProviders=[],a.renderer.on("afterRender",renderWidgets),a.$codeLensClickHandler||(a.$codeLensClickHandler=function(e){var n=e.target.lensCommand;n&&(a.execCommand(n.id,n.arguments),a._emit("codeLensClick",e))},event.addListener(a.container,"click",a.$codeLensClickHandler,a)),a.$updateLenses=function(){var i,s,d=a.session;d&&(d.widgetManager||(d.widgetManager=new LineWidgets(d),d.widgetManager.attach(a)),i=a.codeLensProviders.length,s=[],a.codeLensProviders.forEach(function(e){e.provideCodeLenses(d,function(e,n){var t,o,r;e||(n.forEach(function(e){s.push(e)}),0==--i&&(e=d.selection.cursor,n=d.documentToScreenRow(e),t=d.getScrollTop(),o=exports.setLenses(d,s),(r=d.$undoManager&&d.$undoManager.$lastDelta)&&"remove"==r.action&&1<r.lines.length||(r=d.documentToScreenRow(e),e=a.renderer.layerConfig.lineHeight,r=d.getScrollTop()+(r-n)*e,0==o&&t<e/4&&-e/4<t&&(r=-e),d.setScrollTop(r))))})}))};var e=lang.delayedCall(a.$updateLenses);a.$updateLensesOnInput=function(){e.delay(250)},a.on("input",a.$updateLensesOnInput)}function detachFromEditor(e){e.off("input",e.$updateLensesOnInput),e.renderer.off("afterRender",renderWidgets),e.$codeLensClickHandler&&e.container.removeEventListener("click",e.$codeLensClickHandler)}exports.setLenses=function(r,e){var i=Number.MAX_VALUE;return clearCodeLensWidgets(r),e&&e.forEach(function(e){var n=e.start.row,t=e.start.column,o=r.lineWidgets&&r.lineWidgets[n];(o=o&&o.lenses?o:r.widgetManager.$registerLineWidget({rowCount:1,rowsAbove:1,row:n,column:t,lenses:[]})).lenses.push(e.command),n<i&&(i=n)}),r._emit("changeFold",{data:{start:{row:i}}}),i},exports.registerCodeLensProvider=function(e,n){e.setOption("enableCodeLens",!0),e.codeLensProviders.push(n),e.$updateLensesOnInput()},exports.clear=function(e){exports.setLenses(e,null)};var Editor=require("../editor").Editor;require("../config").defineOptions(Editor.prototype,"editor",{enableCodeLens:{set:function(e){(e?attachToEditor:detachFromEditor)(this)}}}),dom.importCssString(`
.ace_codeLens {
    position: absolute;
    color: #aaa;
    font-size: 88%;
    background: inherit;
    width: 100%;
    display: flex;
    align-items: flex-end;
    pointer-events: none;
}
.ace_codeLens > a {
    cursor: pointer;
    pointer-events: auto;
}
.ace_codeLens > a:hover {
    color: #0000ff;
    text-decoration: underline;
}
.ace_dark > .ace_codeLens > a:hover {
    color: #4e94ce;
}
`,"codelense.css",!1);