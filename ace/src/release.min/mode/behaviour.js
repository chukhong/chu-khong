"use strict";var Behaviour=function(){this.$behaviours={}};!function(){this.add=function(i,h,s){switch(void 0){case this.$behaviours:this.$behaviours={};case this.$behaviours[i]:this.$behaviours[i]={}}this.$behaviours[i][h]=s},this.addBehaviours=function(i){for(var h in i)for(var s in i[h])this.add(h,s,i[h][s])},this.remove=function(i){this.$behaviours&&this.$behaviours[i]&&delete this.$behaviours[i]},this.inherit=function(i,h){i=("function"==typeof i?new i:i).getBehaviours(h),this.addBehaviours(i)},this.getBehaviours=function(i){if(i){for(var h={},s=0;s<i.length;s++)this.$behaviours[i[s]]&&(h[i[s]]=this.$behaviours[i[s]]);return h}return this.$behaviours}}.call(Behaviour.prototype),exports.Behaviour=Behaviour;