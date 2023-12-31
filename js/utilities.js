"use strict";
var Range = require("ace/range").Range;

exports.getSelection = function (editor) {
    var data = editor.multiSelect.toJSON();
    if (!data.length) data = [data];
    data = data.map(function(x) {
        var a, c;
        if (x.isBackwards) {
            a = x.end;
            c = x.start;
        } else {
            c = x.end;
            a = x.start;
        }
        return Range.comparePoints(a, c) 
            ? [a.row, a.column, c.row, c.column]
            : [a.row, a.column];
    });
    return data.length > 1 ? data : data[0];
}
exports.testSelection = function (editor, data) {
    assert.equal(getSelection(editor) + "", data + "");
}
function setSelection (editor, data) {
    if (typeof data[0] == "number")
        data = [data];
    editor.selection.fromJSON(data.map(function(x) {
        var start = {row: x[0], column: x[1]};
        var end = x.length == 2 ? start : {row: x[2], column: x[3]};
        var isBackwards = Range.comparePoints(start, end) > 0;
        return isBackwards ? {
            start: end,
            end: start,
            isBackwards: true
        } : {
            start: start,
            end: end,
            isBackwards: true
        };
    }));
}
exports.setSelection = setSelection
exports.testValue = function (editor, value) {
    assert.equal(editor.getValue(), value);
}
exports.setValue = function (editor, value) {
    editor.setValue(value, 1);
}
exports.titleCase = function (string) {
   var sentence = string.toLowerCase().split(" ");
   for(var i = 0; i< sentence.length; i++){
      sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
   }
		return sentence.join(" ");
}
exports.reSelected = function (editor){
	var row = getSelection(editor)
	setSelection(editor,row)
}
exports.getTextPreviousLine = function (editor){
  var
  currentLine =  editor.selection.getCursor().row
  ,previousLine = currentLine-1
  ,text = editor.selection.doc.$lines[previousLine]
  return text
}

var
VI0 = "[a-zA-ZáàãảạăắằẵẳặâấầẫẩậđéèẽẻẹêềếễểệùúũủụưừứữửựóòõỏọôồốỗổộơờớỡởìíĩỉịỳýỹỷỵÁÀÃẢẠĂẮẰẴẲẶÂẤẦẪẨẬĐÉÈẼẺẸÊỀẾỄỂỆÙÚŨỦỤƯỪỨỮỬỰÓÒÕỎỌÔỒỐỖỔỘƠỜỚỠỞÌÍĨỈỊỲÝỸỶỴ]"
,VI = "("+VI0+"{1})"

exports.autoSpellCheck = function (str,hoadaudong){
	//‘“；：？》《，。{}【】、！
	var
	 FORMMATTRANSLATE = [
			{re:/\s+/g,t:" "},//hai khoan trang
			{re:/‘|’/g,t:"'"}, // chuyen dau tieng TQ sang anh
			{re:/“|”/g,t:"\""}, // chuyen dau tieng TQ sang anh
			{re:/“|”/g,t:"\""}, // chuyen dau tieng TQ sang anh
			{re:/；/g,t:";"}, // chuyen dau tieng TQ sang anh
			{re:/：/g,t:": "}, // chuyen dau tieng TQ sang anh
			{re:/？/g,t:"? "}, // chuyen dau tieng TQ sang anh
			{re:/！/g,t:"! "}, // chuyen dau tieng TQ sang anh
			// {re:/《/g,t:"<"}, // chuyen dau tieng TQ sang anh
			// {re:/》/g,t:">"}, // chuyen dau tieng TQ sang anh
			{re:/，|、/g,t:", "}, // chuyen dau tieng TQ sang anh
			{re:/。/g,t:". "}, // chuyen dau tieng TQ sang anh
			// {re:/【/g,t:"["}, // chuyen dau tieng TQ sang anh
			// {re:/】/g,t:"]"}, // chuyen dau tieng TQ sang anh
			{re:/[《「『【]/g,t:"“"}, // chuyen dau tieng TQ sang anh
			{re:/[】』」》]/g,t:"” "}, // chuyen dau tieng TQ sang anh
			{re:/\. ”/g,t:"”\. "}, // chuyen dau tieng TQ sang anh
			{re:new RegExp("([\\,\\.\\;\\!\\:\\?]{1})"+VI,"g"),t:"$1 $2"}, // chu dinh voi dau
			{re:new RegExp("([\\.\\!\\:\\?]{1})\\s"+VI,"g"),t:(x)=>{x = x.toUpperCase();return x;	}}, // hoa dau
			{re:new RegExp(VI+"\\s([\\.\\;\\!\\:\\?]{1})","g"),t:"$1$2"}, // bo khoan trang giua chu va dau
			{re:new RegExp("^"+VI,"g"),t:(x)=>{x = x.toUpperCase();return x;	}}, // hoa tu dau dong
			{re:new RegExp(VI+"(\\s)([\\,\\.\\;\\!\\:\\?]{1})","g"),t:"$1$3"}, //noi chu voi dau
	]
	for (var i = 0; i < FORMMATTRANSLATE.length; i++) {
		if(hoadaudong==false && i==FORMMATTRANSLATE.length-1)
			continue
		var re = FORMMATTRANSLATE[i].re
		var toformax = FORMMATTRANSLATE[i].t
	  str = str.replace(re,toformax)
	}
	return str
}

