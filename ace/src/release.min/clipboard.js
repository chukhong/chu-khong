"use strict";var $cancelT;module.exports={lineMode:!1,pasteCancelled:function(){return!!($cancelT&&$cancelT>Date.now()-50)||($cancelT=!1)},cancel:function(){$cancelT=Date.now()}};