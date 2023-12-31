"use strict";
var buildDom = require("ace/lib/dom").buildDom;

var {jwt_decode} = require("lib/jwt-decode");

function builtModal() {
    var
        dom = 
        ["div", {
                "class": "offcanvas offcanvas-end",
                "data-bs-backdrop": "static",
                "tabindex": "-1",
                "id": "dialogUser",
                "aria-labelledby": "staticBackdropLabel"
            },
            //['script',{src:'https://accounts.google.com/gsi/client','async':'async', 'defer':'defer'}],
            //['script',{src:'/js/jwt-decode.js'}],
            ["div", {
                    "class": "offcanvas-header"
                },
                ["h5", {
                    "class": "offcanvas-title",
                    "id": "staticBackdropLabel"
                }, "Offcanvas"],
                ["button", {
                    "type": "button",
                    "class": "btn-close",
                    "data-bs-dismiss": "offcanvas",
                    "aria-label": "Close"
                }, ""],


            ],
            ["div", {
                    "class": "offcanvas-body menu"
                },
                ["div", {},
                    "I will not close if you click outside of me."
                ],
                ["div", {id:'buttonDiv'}],

                ["button", {
                    'data-bs-toggle':"modal",
                    'data-bs-target':"#dialogSetting",
                }, ["i",{class:"material-icons"},"color_lens"]],
                
                ["button", {
                    'data-bs-toggle':"modal",
                    'data-bs-target':"#dialogHelp",
                }, ["i",{class:"material-icons"},"help"]],
                ["button", {
                    class:"position-relative",
                    'data-bs-toggle':"modal",
                    'data-bs-target':"#dialogLanggues",
                    }, 
                    ["i",{class:"material-icons"},"language"],
                    ["span",{class:"position-absolute top-50 start-0 translate-left badge rounded-pill"},"cn-vn"]
                ],

                ["button", {
                    'data-bs-toggle':"modal",
                    'data-bs-target':"#selectDicts",
                }, "Choose Dictionaries"],
            ],
        ]
    // var old = $('#modals2')[0].innerHTML
    // buildDom(dom, $('#modals2')[0], {})
    // old += $('#modals2')[0].innerHTML
    // $('#modals2')[0].innerHTML = old
    
    var container = document.querySelector('body')
    var optionsPanel = document.createElement("div");
    buildDom(dom, optionsPanel, {})
    container.insertBefore(optionsPanel, container.firstChild);

}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function handleCredentialResponse(response) {
    //alert('callback')
    ///console.log("Encoded JWT ID token: " + response.credential);
    //console.log(decodeURIComponent(response.credential));

    var token = jwt_decode(response.credential)
        //console.log(token);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/user/login');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.responseText == 'success') {
            //location.assign('/user/profile?view=json')
            loadIconUser()
        } else {
            alert(xhr.responseText)
        }
    };
    xhr.send(JSON.stringify({
        token: token
    }));
}
function loadIconUser(){
    require(["text!/user/profile?&view=json"],
        function (data) {
            //The data object will be the API response for the
            //JSONP data call.
            var e = JSON.parse(data)
            //console.log(e);
            $('#userIcon')[0].src = e.picture
            //window.userID = e
            $('#buttonDiv').hide()

        }
    );
}
function initUser(){
    var token = getCookie('session-token')
    //console.log('session-token',token);
    if(token==''){
        google.accounts.id.initialize({
            client_id: "563587575029-89224il8qt9bc2i5d3f15fucn6nutv0t.apps.googleusercontent.com",
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("buttonDiv"), {
                theme: "outline",
                size: "large"
            } // customization attributes
        );
        google.accounts.id.prompt(); // also display the One Tap dialog
    }else{
        loadIconUser()
    }
}
var basicFN = function(d,editor) {
    var app={}
    const butInstall = document.getElementById('butInstall');

      /**
       * Track successful app installs
       */
      window.addEventListener('appinstalled', (e) => {
        //gaEvent('Install', 'installed');
        console.log('Install', 'installed');
        butInstall.setAttribute('disabled', true);
        butInstall.classList.remove('d-none');
      });

      /**
       * Listen for 'beforeinstallprompt' event, and update the UI to indicate
       * text-editor can be installed.
       */
      window.addEventListener('beforeinstallprompt', (e) => {
        // Don't show the mini-info bar
        e.preventDefault();

        // Log that install is available.
        //gaEvent('Install', 'available');
        console.log('Install', 'available');
        // Save the deferred prompt
        app.installPrompt = e;

        // Show the install button
        butInstall.removeAttribute('disabled');
        butInstall.classList.remove('d-none');
      });
    
      // Handle the install button click
      butInstall.addEventListener('click', () => {
        butInstall.setAttribute('disabled', true);
        app.installPrompt.prompt();
        //gaEvent('Install', 'clicked');
        console.log('Install', 'clicked');
      });

      //myMenus.addKeyboardShortcut(butInstall);
};

(function() {
    this.callback = function(editor) {

    };
}).call(basicFN.prototype);
exports.appInstaller = basicFN;