var objAnswer
window.addEventListener("message", (event) => {
 objAnswer = event.source;
 objAnswer.postMessage({target:event.data.target,text:document.querySelector('body').innerHTML})
}, false);