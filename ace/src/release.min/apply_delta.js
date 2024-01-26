"use strict";function throwDeltaError(t,n){throw console.log("Invalid Delta:",t),"Invalid Delta: "+n}function positionInDocument(t,n){return 0<=n.row&&n.row<t.length&&0<=n.column&&n.column<=t[n.row].length}function validateDelta(t,n){"insert"!=n.action&&"remove"!=n.action&&throwDeltaError(n,"delta.action must be 'insert' or 'remove'"),n.lines instanceof Array||throwDeltaError(n,"delta.lines must be an Array"),n.start&&n.end||throwDeltaError(n,"delta.start/end must be an present");var e=n.start,r=(positionInDocument(t,n.start)||throwDeltaError(n,"delta.start must be contained in document"),n.end),t=("remove"!=n.action||positionInDocument(t,r)||throwDeltaError(n,"delta.end must contained in document for 'remove' actions"),r.row-e.row),r=r.column-(0==t?e.column:0);t==n.lines.length-1&&n.lines[t].length==r||throwDeltaError(n,"delta.range must match delta lines")}exports.applyDelta=function(t,n,e){var r=n.start.row,o=n.start.column,s=t[r]||"";switch(n.action){case"insert":1===n.lines.length?t[r]=s.substring(0,o)+n.lines[0]+s.substring(o):(a=[r,1].concat(n.lines),t.splice.apply(t,a),t[r]=s.substring(0,o)+t[r],t[r+n.lines.length-1]+=s.substring(o));break;case"remove":var a=n.end.column,i=n.end.row;r===i?t[r]=s.substring(0,o)+s.substring(a):t.splice(r,i-r+1,s.substring(0,o)+t[i].substring(a))}};