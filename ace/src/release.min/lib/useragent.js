"use strict";exports.OS={LINUX:"LINUX",MAC:"MAC",WINDOWS:"WINDOWS"},exports.getOS=function(){return exports.isMac?exports.OS.MAC:exports.isLinux?exports.OS.LINUX:exports.OS.WINDOWS};var _navigator="object"==typeof navigator?navigator:{},os=(/mac|win|linux/i.exec(_navigator.platform)||["other"])[0].toLowerCase(),ua=_navigator.userAgent||"",appName=_navigator.appName||"";exports.isWin="win"==os,exports.isMac="mac"==os,exports.isLinux="linux"==os,exports.isIE="Microsoft Internet Explorer"==appName||0<=appName.indexOf("MSAppHost")?parseFloat((ua.match(/(?:MSIE |Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/)||[])[1]):parseFloat((ua.match(/(?:Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/)||[])[1]),exports.isOldIE=exports.isIE&&exports.isIE<9,exports.isGecko=exports.isMozilla=ua.match(/ Gecko\/\d+/),exports.isOpera="object"==typeof opera&&"[object Opera]"==Object.prototype.toString.call(window.opera),exports.isWebKit=parseFloat(ua.split("WebKit/")[1])||void 0,exports.isChrome=parseFloat(ua.split(" Chrome/")[1])||void 0,exports.isEdge=parseFloat(ua.split(" Edge/")[1])||void 0,exports.isAIR=0<=ua.indexOf("AdobeAIR"),exports.isAndroid=0<=ua.indexOf("Android"),exports.isChromeOS=0<=ua.indexOf(" CrOS "),exports.isIOS=/iPad|iPhone|iPod/.test(ua)&&!window.MSStream,exports.isIOS&&(exports.isMac=!0),exports.isMobile=exports.isIOS||exports.isAndroid;