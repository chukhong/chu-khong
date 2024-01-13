'use strict';

const app = {
  appName: 'Text Editor',
  file: {
    handle: null,
    name: null,
    isModified: false,
  },
  options: {
    captureTabs: true,
    fontFamily: 'Arial, fangsong',
    fontSize: 'medium',
    iconSize:'medium',
    monoSpace: false,
    wordWrap: true,
  },
  hasNativeFS: 'chooseFileSystemEntries' in window ||
               'showOpenFilePicker' in window,
  isMac: navigator.userAgent.includes('Mac OS X'),
};

let fileHandle;
let contents;
let file;

// file picker
async function getFileHandle() {
  const options = {
    types: [
      {
        description: "Text Files",
        accept: {
          "text/plain": [".txt"]
        }
      }
    ]
  };
  [fileHandle] = await window.showOpenFilePicker(options);
  file = await fileHandle.getFile();
  //fileName.innerHTML = '🔥 Now you can edit ' + file.name + ' and save it to disk.';
  contents = await file.text();
  fileName.innerText = file.name
  //textArea.value = contents;
  editor.setValue(contents)
  //writeFileButton.removeAttribute('onclick')
  writeFileButton.setAttribute('onclick','localDeviceSave')
  $('#leftSidebar').offcanvas('hide')

}
window.localDeviceRename = async function(){
  if(editor.id==''|| editor.id == 'editor1' || editor.id == null){

    await fileHandle.move(fileName.innerText.trim());
    await writeFile(fileHandle, editor.getValue())
    console.log('rename');
  }
}
// write file
async function writeFile(fileHandle, contents) {
  // Create a FileSystemWritableFileStream to write to.
  const writable = await fileHandle.createWritable();
  // Write the contents of the file to the stream.
  await writable.write(contents);
  // Close the file and write the contents to disk.
  await writable.close();
}

app.downloadFile = function (filename,text) {

  let element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent('\uFEFF' + text));
  element.setAttribute('download', filename);
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  
}

window.localDeviceDownloadFile = function () {
  var filename = fileName.innerText.trim()
  var text = editor.getValue()
  app.downloadFile(filename,text);
}

let writeFileButton,
getFileHandleButton;
window.localDeviceSave = function () {
  if(writeFileButton.getAttribute('onClick')=='localDeviceSave'){
    writeFile(fileHandle, editor.getValue()).
    then(function () {
      //info.textContent = "🎉 Successfully saved to disk!"
      console.log('🎉 Successfully saved to disk!');
      app.toast.message('Local Deviece','🎉 Successfully saved to disk!').show()
    })
  }
};
// button clicks
app.addEvent = ()=>{
  writeFileButton = d.q('[data-cmd-as=save]')
  getFileHandleButton = d.q('[data-cmd-left-side-as=openFile]')
  getFileHandleButton.addEventListener("click", getFileHandle);
  writeFileButton.addEventListener("click", window.localDeviceSave);
  
}

exports.app = app;