"use strict";var lang=require("../lib/lang");exports.$detectIndentation=function(e,t){for(var r=[],n=[],o=0,s=0,i=Math.min(e.length,1e3),a=0;a<i;a++){var c=e[a];if(/^\s*[^*+\-\s]/.test(c))for(var g,l,s="\t"==c[0]?(o++,-Number.MAX_VALUE):((g=c.match(/^ */)[0].length)&&"\t"!=c[g]&&(!(0<(l=g-s))||s%l||g%l||(n[l]=(n[l]||0)+1),r[g]=(r[g]||0)+1),g);a<i&&"\\"==c[c.length-1];)c=e[a++]}for(var h,p=n.reduce(function(e,t){return e+t},0),u={score:0,length:0},d=0,a=1;a<12;a++){var f=function(e){for(var t=0,n=e;n<r.length;n+=e)t+=r[n]||0;return t}(a);1==a?(d=f,f=r.length?r[1]?.9:.8:0):f/=d,n[a]&&(f+=n[a]/p),f>u.score&&(u={score:f,length:a})}return u.score&&1.4<u.score&&(h=u.length),d+1<o?{ch:"\t",length:h=1==h||d<o/4||u.score<1.8?void 0:h}:o+1<d?{ch:" ",length:h}:void 0},exports.detectIndentation=function(e){var t=e.getLines(0,1e3),t=exports.$detectIndentation(t)||{};return t.ch&&e.setUseSoftTabs(" "==t.ch),t.length&&e.setTabSize(t.length),t},exports.trimTrailingSpace=function(e,t){for(var n=e.getDocument(),r=n.getAllLines(),o=t&&t.trimEmpty?-1:0,s=[],i=-1,a=(t&&t.keepCursorPosition&&(e.selection.rangeCount?e.selection.rangeList.ranges.forEach(function(e,t,n){n=n[t+1];n&&n.cursor.row==e.cursor.row||s.push(e.cursor)}):s.push(e.selection.getCursor()),i=0),s[i]&&s[i].row),c=0,g=r.length;c<g;c++){var l=r[c],h=l.search(/\s+$/);c==a&&(h<s[i].column&&o<h&&(h=s[i].column),a=s[++i]?s[i].row:-1),o<h&&n.removeInLine(c,h,l.length)}},exports.convertIndentation=function(e,t,n){for(var r=e.getTabString()[0],o=e.getTabSize(),s=(n=n||o,"\t"==(t=t||r)?t:lang.stringRepeat(t,n)),i=e.doc,a=i.getAllLines(),c={},g={},l=0,h=a.length;l<h;l++){var p,u,d=a[l].match(/^\s*/)[0];d&&(p=(u=e.$getStringScreenWidth(d)[0])%o,u=c[u=Math.floor(u/o)]||(c[u]=lang.stringRepeat(s,u)),(u+=g[p]||(g[p]=lang.stringRepeat(" ",p)))!=d)&&(i.removeInLine(l,0,d.length),i.insertInLine({row:l,column:0},u))}e.setTabSize(n),e.setUseSoftTabs(" "==t)},exports.$parseStringArg=function(e){var t={},e=(/t/.test(e)?t.ch="\t":/s/.test(e)&&(t.ch=" "),e.match(/\d+/));return e&&(t.length=parseInt(e[0],10)),t},exports.$parseArg=function(e){return e?"string"==typeof e?exports.$parseStringArg(e):"string"==typeof e.text?exports.$parseStringArg(e.text):e:{}},exports.commands=[{name:"detectIndentation",description:"Detect indentation from content",exec:function(e){exports.detectIndentation(e.session)}},{name:"trimTrailingSpace",description:"Trim trailing whitespace",exec:function(e,t){exports.trimTrailingSpace(e.session,t)}},{name:"convertIndentation",description:"Convert indentation to ...",exec:function(e,t){t=exports.$parseArg(t);exports.convertIndentation(e.session,t.ch,t.length)}},{name:"setIndentation",description:"Set indentation",exec:function(e,t){t=exports.$parseArg(t);t.length&&e.session.setTabSize(t.length),t.ch&&e.session.setUseSoftTabs(" "==t.ch)}}];