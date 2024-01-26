"use strict";var LineWidgets=require("../line_widgets").LineWidgets,dom=require("../lib/dom"),Range=require("../range").Range;function binarySearch(e,r,o){for(var t=0,n=e.length-1;t<=n;){var i=t+n>>1,a=o(r,e[i]);if(0<a)t=1+i;else{if(!(a<0))return i;n=i-1}}return-(t+1)}function findAnnotations(e,r,o){var t=e.getAnnotations().sort(Range.comparePoints);if(t.length){var n=binarySearch(t,{row:r,column:-1},Range.comparePoints),i=((n=n<0?-n-1:n)>=t.length?n=0<o?0:t.length-1:0===n&&o<0&&(n=t.length-1),t[n]);if(i&&o){if(i.row===r){for(;(i=t[n+=o])&&i.row===r;);if(!i)return t.slice()}var a=[];for(r=i.row;a[o<0?"unshift":"push"](i),(i=t[n+=o])&&i.row==r;);return a.length&&a}}}exports.showErrorMarker=function(e,r){var o,t=e.session,n=(t.widgetManager||(t.widgetManager=new LineWidgets(t),t.widgetManager.attach(e)),e.getCursorPosition()),i=n.row,a=t.widgetManager.getWidgetsAtRow(i).filter(function(e){return"errorMarker"==e.type})[0],i=(a?a.destroy():i-=r,findAnnotations(t,i,r));if(i){r=i[0];n.column=(r.pos&&"number"!=typeof r.column?r.pos.sc:r.column)||0,n.row=r.row,o=e.renderer.$gutterLayer.$annotations[n.row]}else{if(a)return;o={text:["Looks good!"],className:"ace_ok"}}e.session.unfold(n.row),e.selection.moveToPosition(n);function d(e,r,o){if(0===r&&("esc"===o||"return"===o))return s.destroy(),{command:"null"}}var s={row:n.row,fixedWidth:!0,coverGutter:!0,el:dom.createElement("div"),type:"errorMarker"},i=s.el.appendChild(dom.createElement("div")),r=s.el.appendChild(dom.createElement("div")),a=(r.className="error_widget_arrow "+o.className,e.renderer.$cursorLayer.getPixelPosition(n).left);r.style.left=a+e.renderer.gutterWidth-5+"px",s.el.className="error_widget_wrapper",i.className="error_widget "+o.className,i.innerHTML=o.text.join("<br>"),i.appendChild(dom.createElement("div"));s.destroy=function(){e.$mouseHandler.isMousePressed||(e.keyBinding.removeKeyboardHandler(d),t.widgetManager.removeLineWidget(s),e.off("changeSelection",s.destroy),e.off("changeSession",s.destroy),e.off("mouseup",s.destroy),e.off("change",s.destroy))},e.keyBinding.addKeyboardHandler(d),e.on("changeSelection",s.destroy),e.on("changeSession",s.destroy),e.on("mouseup",s.destroy),e.on("change",s.destroy),e.session.widgetManager.addLineWidget(s),s.el.onmousedown=e.focus.bind(e),e.renderer.scrollCursorIntoView(null,.5,{bottom:s.el.offsetHeight})},dom.importCssString(`
    .error_widget_wrapper {
        background: inherit;
        color: inherit;
        border:none
    }
    .error_widget {
        border-top: solid 2px;
        border-bottom: solid 2px;
        margin: 5px 0;
        padding: 10px 40px;
        white-space: pre-wrap;
    }
    .error_widget.ace_error, .error_widget_arrow.ace_error{
        border-color: #ff5a5a
    }
    .error_widget.ace_warning, .error_widget_arrow.ace_warning{
        border-color: #F1D817
    }
    .error_widget.ace_info, .error_widget_arrow.ace_info{
        border-color: #5a5a5a
    }
    .error_widget.ace_ok, .error_widget_arrow.ace_ok{
        border-color: #5aaa5a
    }
    .error_widget_arrow {
        position: absolute;
        border: solid 5px;
        border-top-color: transparent!important;
        border-right-color: transparent!important;
        border-left-color: transparent!important;
        top: -5px;
    }
`,"error_marker.css",!1);