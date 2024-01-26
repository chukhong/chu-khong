"use strict";var oop=require("../lib/oop"),ShHighlightRules=require("./sh_highlight_rules").ShHighlightRules,DockerfileHighlightRules=function(){ShHighlightRules.call(this);for(var e=this.$rules.start,i=0;i<e.length;i++)if("variable.language"==e[i].token){e.splice(i,0,{token:"constant.language",regex:"(?:^(?:FROM|MAINTAINER|RUN|CMD|EXPOSE|ENV|ADD|ENTRYPOINT|VOLUME|USER|WORKDIR|ONBUILD|COPY|LABEL)\\b)",caseInsensitive:!0});break}};oop.inherits(DockerfileHighlightRules,ShHighlightRules),exports.DockerfileHighlightRules=DockerfileHighlightRules;