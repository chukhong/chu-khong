"use strict";
var buildDom = require("ace/lib/dom").buildDom;

var {jwt_decode} = require("lib/jwt-decode");
//require("lib/jwt-decode");
window.jwt_decode = jwt_decode
function builtModal() {
    var
    item =["div",{"class":'list-group-item py-3 lh-sm'},
            ["div",{"class":"d-flex w-100 justify-content-end"},
              ["small",{"class":"text-muted"},""],
            ],
            ["div",{"class":'justify-content-between'},""],
        ],
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
                }, "user info"],
                ["button", {
                    "type": "button",
                    "class": "btn-close",
                    "data-bs-dismiss": "offcanvas",
                    "aria-label": "Close"
                }, ""],


            ],
            ["div", {
                    "class": "menu list-group list-group-flush scrollarea"
                    //offcanvas-body 
                },
                // ["div", {},
                //     "I will not close if you click outside of me."
                // ],
                ["div", {id:'buttonDiv',class:'list-group-item py-3 lh-sm'}],

                ["button", {
                    class:'list-group-item py-3 lh-sm',
                    'data-bs-toggle':"modal",
                    'data-bs-target':"#dialogSetting",
                }, ["i",{class:"material-icons"},"color_lens"],['span',{},"Setting"]],
                
                // ["button", {
                //     class:'list-group-item py-3 lh-sm',
                //     'data-bs-toggle':"modal",
                //     'data-bs-target':"#dialogHelp",
                // }, ["i",{class:"material-icons"},"help"],['span',{},"help"]],
                // ["button", {
                //     class:"position-relative list-group-item py-3 lh-sm",
                //     'data-bs-toggle':"modal",
                //     'data-bs-target':"#dialogLanggues",
                //     }, 
                //     ["i",{class:"material-icons"},"language"],
                //     ["span",{class:"position-absolute top-50 start-0 translate-left badge rounded-pill"},"cn-vn"],
                //     ['span',{},"Language"]
                // ],

                ["button", {
                    class:'list-group-item py-3 lh-sm',
                    'data-bs-toggle':"modal",
                    'data-bs-target':"#selectDicts",
                    }, 
                    ["i",{class:"material-icons"},"language"],
                    "Choose Dictionaries"],
                ["div",{class:'px-2',id:'appversion'},'']
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
    console.log(token);

    var url = script_url + "?q=" + JSON.stringify({ 
        SHEETNAME: 'users',
         action: "login", 
         condition:{"EMAIL":token.email},
         data:{"EMAIL":token.email,"NAME":token.name}
        })
    fetch(url, {
        method: "GET",
        mode: 'cors',
        headers: {
            "Content-Type": "text/plain;charset=utf-8",
        },
    })
    .then((response) => response.json())
    .then(res => {
        console.log(res);
        //console.log(token);
        //token.uuid = res.uuid
        cookieStore.set('session-userinfor',JSON.stringify(res.message))
        window.USERID = res.message.uuid
    })

    cookieStore.set('session-token2',JSON.stringify(token))

    cookieStore
    .get('session-token2')
    .then(r=>{
        //r = decodeURIComponent(r.value)
        //r = r.slice(2,r.length)
        //console.log(r)    
        r = JSON.parse(r.value)
        
        //showUserInfor(r)
        //console.log(r)
        $('#dialogUser h5')[0].innerHTML = r.name
        $('#userIcon')[0].src = r.picture
        $('#buttonDiv').hide()
    })
    .catch(error=>{
        // console.log(error);
        $('#app-toast .toast-header strong').html('Error')
        $('#app-toast .toast-body').html(error)
        $('#app-toast').toast('show')
    })
}
function loadIconUser(){

    cookieStore
    .get('session-token2')
    .then(r1=>{
        //r = decodeURIComponent(r.value)
        //r = r.slice(2,r.length)
        //console.log(r1)    
        var r = JSON.parse(r1.value)
        
        //showUserInfor(r)
        //console.log(r)
        $('#dialogUser h5')[0].innerHTML = r.name
        $('#userIcon')[0].src = r.picture
        $('#userIcon')[0].src = r.picture

        $('#buttonDiv').hide()
        
    })
    .catch(error=>{
        // console.log(error);
        $('#app-toast .toast-header strong').html('Error')
        $('#app-toast .toast-body').html(error)
        $('#app-toast').toast('show')
    })

    cookieStore
    .get('session-userinfor')
    .then(res=>{
        var userInfor = JSON.parse(res.value)
        window.USERID = userInfor.uuid
        //console.log(userInfor.uuid);
    })

    /*
    
    fetch('/user/profile?&view=json')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong');
    })
    .then(data=>{
        // console.log(data);
        // var e = JSON.parse(data)
        var e = data
        //console.log(e);
        $('#userIcon')[0].src = e.picture
        showUserInfor(data)
        //window.userID = e
        $('#buttonDiv').hide()
    })
    .catch(error=>{

        cookieStore
        .get('session-token')
        .then(r=>{
            r = decodeURIComponent(r.value)
            r = r.slice(2,r.length)
            //console.log(r)    
            r = JSON.parse(r)
            showUserInfor(r)
            //console.log(r)
            $('#userIcon')[0].src = r.picture
            $('#buttonDiv').hide()
        }).catch(error=>{
            // console.log(error);
            $('#app-toast .toast-header strong').html('Error')
            $('#app-toast .toast-body').html(error)
            $('#app-toast').toast('show')
        })

    })
    */
}
function showUserInfor(inforJson){
    $('#dialogUser h5')[0].innerHTML = inforJson.name
}
function initUser(){
    var token = getCookie('session-token2')
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
    builtModal()
    //console.log('d.init(initUser)');
    d.init(initUser)
    
    // window.addEventListener('load', function() {
    //     initUser()
    // })
};

(function() {
    this.callback = function(editor) {

    };
}).call(basicFN.prototype);
exports.user = basicFN;