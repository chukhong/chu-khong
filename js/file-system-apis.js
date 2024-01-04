/**
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';


/* globals getFileHandle, getNewFileHandle, readFile, verifyPermission,
           writeFile */

// eslint-disable-next-line no-redeclare
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
// app.version = '2.0'
// Verify the APIs we need are supported, show a polite warning if not.
if (app.hasNativeFS) {
  //gaEvent('File System APIs', 'Native');
  console.log('File System APIs', 'Native');
} else {
  document.getElementById('butSave').classList.toggle('hidden', true);
  //gaEvent('File System APIs', 'Legacy');
  console.log('File System APIs', 'Legacy');
}

/* exported getFileHandle, getNewFileHandle, readFile, verifyPermission,
            writeFile */

/**
 * Open a handle to an existing file on the local file system.
 *
 * @return {!Promise<FileSystemFileHandle>} Handle to the existing file.
 */
function getFileHandle() {
  // For Chrome 86 and later...
  if ('showOpenFilePicker' in window) {
    return window.showOpenFilePicker().then((handles) => handles[0]);
  }
  // For Chrome 85 and earlier...
  return window.chooseFileSystemEntries();
}

/**
 * Create a handle to a new (text) file on the local file system.
 *
 * @return {!Promise<FileSystemFileHandle>} Handle to the new file.
 */
function getNewFileHandle() {
  // For Chrome 86 and later...
  if ('showSaveFilePicker' in window) {
    const opts = {
      types: [{
        description: 'Text file',
        accept: {'text/plain': ['txt']},
      }],
    };
    return window.showSaveFilePicker(opts);
  }
  // For Chrome 85 and earlier...
  const opts = {
    type: 'save-file',
    accepts: [{
      description: 'Text file',
      extensions: ['txt'],
      mimeTypes: ['text/plain'],
    }],
  };
  return window.chooseFileSystemEntries(opts);
}

/**
 * Reads the raw text from a file.
 *
 * @param {File} file
 * @return {!Promise<string>} A promise that resolves to the parsed string.
 */
function readFile(file) {
  // If the new .text() reader is available, use it.
  if (file.text) {
    return file.text();
  }
  // Otherwise use the traditional file reading technique.
  return _readFileLegacy(file);
}

/**
 * Reads the raw text from a file.
 *
 * @private
 * @param {File} file
 * @return {Promise<string>} A promise that resolves to the parsed string.
 */
function _readFileLegacy(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', (e) => {
      const text = e.srcElement.result;
      resolve(text);
    });
    reader.readAsText(file);
  });
}

/**
 * Writes the contents to disk.
 *
 * @param {FileSystemFileHandle} fileHandle File handle to write to.
 * @param {string} contents Contents to write.
 */
async function writeFile(fileHandle, contents) {
  // Support for Chrome 82 and earlier.
  if (fileHandle.createWriter) {
    // Create a writer (request permission if necessary).
    const writer = await fileHandle.createWriter();
    // Write the full length of the contents
    await writer.write(0, contents);
    // Close the file and write the contents to disk
    await writer.close();
    return;
  }
  // For Chrome 83 and later.
  // Create a FileSystemWritableFileStream to write to.
  const writable = await fileHandle.createWritable();
  // Write the contents of the file to the stream.
  await writable.write(contents);
  // Close the file and write the contents to disk.
  await writable.close();
}

/**
 * Verify the user has granted permission to read or write to the file, if
 * permission hasn't been granted, request permission.
 *
 * @param {FileSystemFileHandle} fileHandle File handle to check.
 * @param {boolean} withWrite True if write permission should be checked.
 * @return {boolean} True if the user has granted read/write permission.
 */
async function verifyPermission(fileHandle, withWrite) {
  const opts = {};
  if (withWrite) {
    opts.writable = true;
    // For Chrome 86 and later...
    opts.mode = 'readwrite';
  }
  // Check if we already have permission, if so, return true.
  if (await fileHandle.queryPermission(opts) === 'granted') {
    return true;
  }
  // Request permission to the file, if the user grants permission, return true.
  if (await fileHandle.requestPermission(opts) === 'granted') {
    return true;
  }
  // The user did nt grant permission, return false.
  return false;
}

//--------------------------------------------------------------

const modifiedHeader = document.getElementById('modifiedHeader');
const modifiedFooter = document.getElementById('modifiedFooter');

// Setup the before unload listener to prevent accidental loss on navigation.
window.addEventListener('beforeunload', (e) => {
  const msg = `There are unsaved changes. Are you sure you want to leave?`;
  if (app.file.isModified) {
    e.preventDefault();
    e.returnValue = msg;
  }
});

/**
 * Confirms user does not want to save before closing the current doc.
 * @return {boolean} True if it's OK to discard.
 */
app.confirmDiscard = () => {
  if (!app.file.isModified) {
    return true;
  }
  const confirmMsg = 'Discard changes? All changes will be lost.';
  return confirm(confirmMsg);
};

/**
 * Updates the UI with the current file name.
 * @param {FileHandle|string} fileHandle Filename to display in header.
 */
app.setFile = (fileHandle) => {
  if (fileHandle && fileHandle.name) {
    app.file.handle = fileHandle;
    app.file.name = fileHandle.name;
    document.title = `${fileHandle.name} - ${app.appName}`;
    //spanFileName.textContent = fileHandle.name;
    //spanAppName.classList.toggle('hidden', false);
    app.addRecent(fileHandle);
  } else {
    app.file.handle = null;
    app.file.name = fileHandle;
    document.title = app.appName;
    //spanFileName.textContent = app.appName;
    //spanAppName.classList.toggle('hidden', true);
  }
};

/**
 * Updates the UI if the file has been modified.
 * @param {boolean} val True if the file has been modified.
 */
app.setModified = (val) => {
  if (!app.hasNativeFS) {
    return;
  }
  app.file.isModified = val;
  document.body.classList.toggle('modified', val);
  const hidden = !val;
  //modifiedHeader.classList.toggle('hidden', hidden);
  modifiedFooter.classList.toggle('hidden', hidden);
};

/**
 * Creates an empty notepad with no details in it.
 */
app.newFile = () => {
  if (!app.confirmDiscard()) {
    return;
  }
  app.setText();
  app.setFile();
  app.setModified(false);
  app.setFocus(true);
  //gaEvent('FileAction', 'New');
};


/**
 * Opens a file for reading.
 *
 * @param {FileSystemFileHandle} fileHandle File handle to read from.
 */
app.openFile = async (fileHandle) => {
  if (!app.confirmDiscard()) {
    return;
  }

  // If the Native File System API is not supported, use the legacy file apis.
  if (!app.hasNativeFS) {
    //gaEvent('FileAction', 'Open', 'Legacy');
    const file = await app.getFileLegacy();
    if (file) {
      app.readFile(file);
    }
    return;
  }

  // If a fileHandle is provided, verify we have permission to read/write it,
  // otherwise, show the file open prompt and allow the user to select the file.
  if (fileHandle) {
    //gaEvent('FileAction', 'OpenRecent', 'Native');
    if (await verifyPermission(fileHandle, true) === false) {
      console.error(`User did not grant permission to '${fileHandle.name}'`);
      return;
    }
  } else {
    //gaEvent('FileAction', 'Open', 'Native');
    try {
      fileHandle = await getFileHandle();
    } catch (ex) {
      if (ex.name === 'AbortError') {
        return;
      }
      //gaEvent('Error', 'FileOpen', ex.name);
      const msg = 'An error occured trying to open the file.';
      console.error(msg, ex);
      alert(msg);
    }
  }

  if (!fileHandle) {
    return;
  }
  const file = await fileHandle.getFile();
  app.readFile(file, fileHandle);
};

/**
 * Read the file from disk.
 *
 *  @param {File} file File to read from.
 *  @param {FileSystemFileHandle} fileHandle File handle to read from.
 */
app.readFile = async (file, fileHandle) => {
  try {
    app.setText(await readFile(file));
    app.setFile(fileHandle || file.name);
    app.setModified(false);
    app.setFocus(true);
  } catch (ex) {
    //gaEvent('Error', 'FileRead', ex.name);
    const msg = `An error occured reading ${app.fileName}`;
    console.error(msg, ex);
    alert(msg);
  }
};

/**
 * Saves a file to disk.
 */
app.saveFile = async () => {
  try {
    if (!app.file.handle) {
      return await app.saveFileAs();
    }
    //gaEvent('FileAction', 'Save');
    await writeFile(app.file.handle, app.getText());
    app.setModified(false);
  } catch (ex) {
    //gaEvent('Error', 'FileSave', ex.name);
    const msg = 'Unable to save file';
    console.error(msg, ex);
    alert(msg);
  }
  app.setFocus();
};

/**
 * Saves a new file to disk.
 */
app.saveFileAs = async () => {
  if (!app.hasNativeFS) {
    //gaEvent('FileAction', 'Save As', 'Legacy');
    app.saveAsLegacy(app.file.name, app.getText());
    app.setFocus();
    return;
  }
  //gaEvent('FileAction', 'Save As', 'Native');
  let fileHandle;
  try {
    fileHandle = await getNewFileHandle();
  } catch (ex) {
    if (ex.name === 'AbortError') {
      return;
    }
    //gaEvent('Error', 'FileSaveAs1', ex.name);
    const msg = 'An error occured trying to open the file.';
    console.error(msg, ex);
    alert(msg);
    return;
  }
  try {
    await writeFile(fileHandle, app.getText());
    app.setFile(fileHandle);
    app.setModified(false);
  } catch (ex) {
    //gaEvent('Error', 'FileSaveAs2', ex.name);
    const msg = 'Unable to save file.';
    console.error(msg, ex);
    alert(msg);
    //gaEvent('Error', 'Unable to write file', 'Native');
    return;
  }
  app.setFocus();
};

/**
 * Attempts to close the window
 */
app.quitApp = () => {
  if (!app.confirmDiscard()) {
    return;
  }
  //gaEvent('FileAction', 'Quit');
  window.close();
};

app.autoClick = (event,o)=>{
  if(event!=undefined){
    //console.log(o);
    if(o.classList.value.indexOf('autoClick')!=-1){

      app.autoCMD = null;
      o.classList.remove('autoClick');
      return true;
    }else{
      var allbutton = document.querySelectorAll('button.autoClick')
      allbutton.forEach(e=>{
        e.classList.remove('autoClick');
      })
      app.autoCMD = o.id
      o.classList.add('autoClick');
    }
  }
  return false;
}
exports.app = app;