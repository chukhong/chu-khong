"use strict";var oop=require("./oop"),Keys=function(){var e,t,o={MODIFIER_KEYS:{16:"Shift",17:"Ctrl",18:"Alt",224:"Meta",91:"MetaLeft",92:"MetaRight",93:"ContextMenu"},KEY_MODS:{ctrl:1,alt:2,option:2,shift:4,super:8,meta:8,command:8,cmd:8,control:1},FUNCTION_KEYS:{8:"Backspace",9:"Tab",13:"Return",19:"Pause",27:"Esc",32:"Space",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",44:"Print",45:"Insert",46:"Delete",96:"Numpad0",97:"Numpad1",98:"Numpad2",99:"Numpad3",100:"Numpad4",101:"Numpad5",102:"Numpad6",103:"Numpad7",104:"Numpad8",105:"Numpad9","-13":"NumpadEnter",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"Numlock",145:"Scrolllock"},PRINTABLE_KEYS:{32:" ",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",61:"=",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",107:"+",109:"-",110:".",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",111:"/",106:"*"}};for(t in o.FUNCTION_KEYS)e=o.FUNCTION_KEYS[t].toLowerCase(),o[e]=parseInt(t,10);for(t in o.PRINTABLE_KEYS)e=o.PRINTABLE_KEYS[t].toLowerCase(),o[e]=parseInt(t,10);oop.mixin(o,o.MODIFIER_KEYS),oop.mixin(o,o.PRINTABLE_KEYS),oop.mixin(o,o.FUNCTION_KEYS),o.enter=o.return,o.escape=o.esc,o.del=o.delete,o[173]="-";for(var r=["cmd","ctrl","alt","shift"],a=Math.pow(2,r.length);a--;)o.KEY_MODS[a]=r.filter(function(e){return a&o.KEY_MODS[e]}).join("-")+"-";return o.KEY_MODS[0]="",o.KEY_MODS[-1]="input-",o}();oop.mixin(exports,Keys),exports.keyCodeToString=function(e){var t=Keys[e];return(t="string"!=typeof t?String.fromCharCode(e):t).toLowerCase()};