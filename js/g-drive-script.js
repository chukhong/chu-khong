// this source code used updated google sign in options 
// after the previous button is deprecated
"use strict";
// require('https://apis.google.com/js/api.js')
// require('asset-url!https://accounts.google.com/gsi/client')


var CLIENT_ID = '563587575029-89224il8qt9bc2i5d3f15fucn6nutv0t.apps.googleusercontent.com';
var API_KEY = 'AIzaSyAriPgPyfamY9SudpCiBJ86RSiO-MYyi98';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/drive';
var signinButton = document.getElementsByClassName('signin')[0];
var signoutButton = document.getElementsByClassName('signout')[0];
let tokenClient;
let gapiInited = false;
let gisInited = false;
let gdToken;

var app
var editor
// window.addEventListener('load',(event)=>{
//     var signinButton = document.getElementsByClassName('signin')[0];
//     var signoutButton = document.getElementsByClassName('signout')[0];
//     signinButton.onclick = () => handleAuthClick()
//     signoutButton.onclick = () => handleSignoutClick()
//     gapiLoaded();
//     gisLoaded()
// })

function gapiLoaded() {
    try{
        gapi.load('client', initializeGapiClient);
    }catch(error){
        console.log("Error",error.message);
    }
}

exports.gapiLoaded = gapiLoaded;

function maybeEnableButtons() {
    if (gapiInited && gisInited) {
        signinButton.style.display = 'block'
    }
}

async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: DISCOVERY_DOCS,
    });
    gapiInited = true;
    maybeEnableButtons();
}

function gisLoaded() {
    try{
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: ''
        });
        gisInited = true;
        maybeEnableButtons();

        gdToken = localStorage.getItem('gdToken')
        if(gdToken){
            signinButton.querySelector('a').innerText = 'Refresh';
            signinButton.style.visibility = 'visible';
            signoutButton.style.visibility = 'visible';
            
        }
    }catch(error){
            
    }
}
exports.gisLoaded = gisLoaded;



function handleAuthClick() {
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw (resp);
        }
        gdToken = gapi.client.getToken()
        localStorage.setItem('gdToken',gdToken)

        signinButton.style.display = 'none'
        signoutButton.style.display = 'block'
        checkFolder()
    };

    // if (gapi.client.getToken() === null) {
    if (gdToken === null) {
        tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
        tokenClient.requestAccessToken({ prompt: '' });
    }
}
exports.handleAuthClick = handleAuthClick;

function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
        signinButton.style.display = 'block'
        signoutButton.style.display = 'none'
    }
    localStorage.removeItem('gdToken')
}
exports.handleAuthClick = handleAuthClick;
// check for a Backup Folder in google drive
function checkFolder() {
    gapi.client.drive.files.list({
        'q': 'name = "Chu-Khong"',
    }).then(function (response) {
        var files = response.result.files;
        if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                localStorage.setItem('parent_folder', file.id);
                console.log('Folder Available');
                // get files if folder available
                showList();
            }
        } else {
            // if folder not available then create
            createFolder();
        }
    })
}

// now create a function to upload file
function gdUpload() {
    try{
        //var text = document.querySelector('textarea');
        var text = { value: editor.getValue() }
        //d.q('[data-cmd-as=save]')
        if (text.value != "") {
            const blob = new Blob([text.value], { type: 'plain/text' });
            //const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), text.value], { type: 'plain/text;charset=utf-8' });
            // get parent folder id from localstorage
            const parentFolder = localStorage.getItem('parent_folder');
            var twoWords = text.value.split(' ')[0] + '-' + text.value.split(' ')[1];
            // set file metadata
            var metadata = {
                // get first two words from the input text and set as file name instead of backup-file
                //name: twoWords + '-' + String(Math.random() * 10000).split('.')[0] + '.txt',
                name: fileName.innerHTML.trim() + '.txt',
                //mimeType: 'plain/text',
                mimeType: 'plain/text;charset=utf-8',
                parents: [parentFolder]
            };
            var formData = new FormData();
            formData.append("metadata", new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
            formData.append("file", blob);

            fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
                method: 'POST',
                headers: new Headers({ "Authorization": "Bearer " + gapi.auth.getToken().access_token }),
                body: formData
            }).then(function (response) {
                return response.json();
            }).then(function (value) {
                console.log(value);
                // also update list on file upload
                if(value && value.error){
                    app.toast.message('Error From Google Driver',value.error.message).show()
                    return
                }
                app.toast.message('Google Driver','Upload new file successfully').show()
                showList();
            });
        }
    }catch(error){
        app.toast.message('Error Google Driver',error.message).show()
    }
}
window.gdUpload = gdUpload
function createFolder() {
    var access_token = gapi.auth.getToken().access_token;
    var request = gapi.client.request({
        'path': 'drive/v2/files',
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
        },
        'body': {
            'title': 'Chu-Khong',
            'mimeType': 'application/vnd.google-apps.folder'
        }
    });
    request.execute(function (response) {
        localStorage.setItem('parent_folder', response.id);
    })
}

var expandContainer = document.querySelector('.expand-container');
var expandContainerUl = document.querySelector('.expand-container ul');
var listcontainer = document.querySelector('.list ul');
// create a function to show hide options
function gdExpand(v) {
    var click_position = v.getBoundingClientRect();
    if (expandContainer.style.display == 'block') {
        expandContainer.style.display = 'none';
        expandContainerUl.setAttribute('data-id', '');
        expandContainerUl.setAttribute('data-name', '');
    } else {
        expandContainer.style.display = 'block';
        expandContainer.style.left = (click_position.left + window.scrollX) - 120 + 'px';
        expandContainer.style.top = (click_position.top + window.scrollY) + 25 + 'px';
        // get data name & id and store it to the options
        expandContainerUl.setAttribute('data-id', v.parentElement.getAttribute('data-id'));
        expandContainerUl.setAttribute('data-name', v.parentElement.getAttribute('data-name'));
    }
}
window.gdExpand = gdExpand
// function for files list
window.cacheFiles = ''
function showList() {
    var fns = {
        edit:()=>{
            readEditDownload(this, 'edit')
        }
    }
    gapi.client.drive.files.list({
        // get parent folder id from localstorage
        'q': `parents in "${localStorage.getItem('parent_folder')}"`
    }).then(function (response) {
        var files = cacheFiles = response.result.files;
        if (files && files.length > 0) {
            listcontainer.innerHTML = '';
            for (var i = 0; i < files.length; i++) {
                listcontainer.innerHTML += `
                
                <li data-id="${files[i].id}" data-name="${files[i].name}" class="list-group-item list-group-item-action list-group-item-dark">
                <span onclick="readEditDownload(this, 'edit')">${files[i].name}</span>
                <svg onclick="gdExpand(this)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/></svg>
                </li>
                
                `;
            }
        } else {
            listcontainer.innerHTML = '<div style="text-align: center;">No Files</div>'
        }

        $(document).on("click", "[data-cmd-gd]", (function (event) {
			var cmd = $(this).data("cmdGd");
			//alert(cmd)
			if (fns[cmd]) {
				fns[cmd](event)
				//event.preventDefault();
			} else {
				console.log(`
                    // ${cmd} not defined
                    ${cmd}:()=>{}
	            `)
			}
		}));
    })
}
function updateFileNameToToolBar(fileId){
    if(cacheFiles){
       var r= cacheFiles.find(item=>{return item.id==fileId})
       fileName.innerHTML = r.name
    }
}
function readEditDownload(v, condition) {
    var id = v.parentElement.getAttribute('data-id');
    var name = v.parentElement.getAttribute('data-name');
    //v.innerHTML = '...';

    gapi.client.drive.files.get({
        fileId: id,
        alt: 'media'
    }).then(function (res) {
        //console.log(res);
        updateFileNameToToolBar(id)
        expandContainer.style.display = 'none';
        expandContainerUl.setAttribute('data-id', '');
        expandContainerUl.setAttribute('data-name', '');

        let binary = res.body
        // EDIT - addition from Gabrielle vvvv
        let l = binary.length
        let array = new Uint8Array(l);
        for (var i = 0; i < l; i++) {
            array[i] = binary.charCodeAt(i);
        }

        const domString = new TextDecoder().decode(array);

        if (condition == 'read') {
            //v.innerHTML = 'Read';
            //document.querySelector('textarea').value = res.body;
            //editor.setValue(res.body)
            editor.setValue(domString)
            document.documentElement.scrollTop = 0;
            var updateBtn = d.q('[data-cmd-as=save]')
            updateBtn.setAttribute('onClick', 'gdUpload()');
            updateBtn.setAttribute('disabled', true)
            //console.log('Read Now')
        } else if (condition == 'edit') {
           //v.innerHTML = 'Edit';
            //document.querySelector('textarea').value = res.body;
            //editor.setValue(res.body)
            editor.setValue(domString)
            document.documentElement.scrollTop = 0;
            var updateBtn = d.q('[data-cmd-as=save]') //document.getElementsByClassName('upload')[0];
            //updateBtn.innerHTML = 'Update';
            // we will make the update function later
            updateBtn.setAttribute('onClick', 'gdUpdate()');
            //document.querySelector('textarea').setAttribute('data-update-id', id);
            editor.id = id
            //console.log('File ready for update');
            app.toast.message('Google Driver','File ready for update').show()
        } else {
           // v.innerHTML = 'Download';
            var blob = new Blob([domString], { type: 'plain/text;charset=utf-8' });
            var a = document.createElement('a');
            a.href = window.URL.createObjectURL(blob);
            a.download = name;
            a.click();
        }
        $('#leftSidebar').offcanvas('hide')
    })
}
window.readEditDownload = readEditDownload
// new create update function
window.gdRenameFile = function(){
    try{
        //var updateId = document.querySelector('textarea').getAttribute('data-update-id');
        if(editor.id=='')
            return;
        var fileId = editor.id,
        newTitle = fileName.innerText.trim()
        var body = {'name': newTitle};
        var request = gapi.client.drive.files.update({
            'fileId': fileId,
            'resource': body
        });
        request.execute(function(resp) {
            //console.log(resp);
            showList();
            app.toast.message('Google Driver','Rename successfully').show()
        });
    }catch(error){
        app.toast.message('Error Google Driver',error.message).show()
    }
} 
function gdUpdate() {
    try{
        //var updateId = document.querySelector('textarea').getAttribute('data-update-id');
        var updateId = editor.id
        var url = 'c' + updateId + '?uploadType=media';
        fetch(url, {
            method: 'PATCH',
            headers: new Headers({
                Authorization: 'Bearer ' + gapi.auth.getToken().access_token,
                'Content-type': 'plain/text; charset=utf-8'
            }),
            //body: document.querySelector('textarea').value
            body: editor.getValue()
        }).then(value => {
            console.log('File updated successfully');
            app.toast.message('Google Driver','File updated successfully').show()
            //document.querySelector('textarea').setAttribute('data-update-id', '');
            editor.id = ''
            var updateBtn = d.q('[data-cmd-as=save]') //document.getElementsByClassName('upload')[0];
            //updateBtn.innerHTML = 'Backup';
            updateBtn.setAttribute('onClick', 'gdUpload()');
        }).catch(err => console.error(err))
    }catch(error){
        app.toast.message('Error Google Driver',error.message).show()
    }
}
window.gdUpdate = gdUpdate
function gdDeleteFile(v) {
    var id = v.parentElement.getAttribute('data-id');
    v.innerHTML = '...';
    var request = gapi.client.drive.files.delete({
        'fileId': id
    });
    request.execute(function (res) {
        console.log('File Deleted');
        v.innerHTML = 'Delete';
        expandContainer.style.display = 'none';
        expandContainerUl.setAttribute('data-id', '');
        expandContainerUl.setAttribute('data-name', '');
        // after delete update the list
        showList();
    })
}
window.gdDeleteFile = gdDeleteFile

exports.gDriveScript = function (_editor, parentNode,_app) {
    editor = _editor
    app = _app
    signinButton = document.getElementsByClassName('signin')[0];
    signoutButton = document.getElementsByClassName('signout')[0];

    expandContainer = document.querySelector('.expand-container');
    expandContainerUl = document.querySelector('.expand-container ul');
    listcontainer = document.querySelector('.list ul');

    signinButton.onclick = () => handleAuthClick()
    signoutButton.onclick = () => handleSignoutClick()
    gapiLoaded();
    gisLoaded()

    var updateBtn = d.q('[data-cmd-as=save]')
    updateBtn.setAttribute('onClick', 'gdUpload()');
}
