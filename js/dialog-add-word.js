"use strict";




var {boFull} = require("data/boFull");
var buildDom = require("ace/lib/dom").buildDom;

var 
    specialword = ['từ kép','danh từ','động từ','tính từ','trạng từ','giới từ','trợ từ','phó từ'],
    builtSpecialWord = ()=>{
        return specialword.map(i=>{
            var k =i.replace(/\s/g,'-')
            return  ['div',{class:"mb-3 row"},
                ['label',{class:"col-sm-3 form-label",'for':k},i],
                ['div',{class:'col-sm-7'},
                    ['input',{class:"form-control",'type':'text',id:k,name:k,'placeholder':i}],
                ]
            ]
        })
    }

function builtModal(){
    var
    dom =['div',{
                'class':'modal',
                'id':'dialogAddWord',
                'tabindex':"-1",
                'role':"dialog",
                'aria-labelledby':"dialogAddWordTitle",
                'aria-hidden':"true"
            },
            //['form',{id:'formAddWord','action':'/dictionaries/add',method:'post'},
            ['form',{id:'formAddWord','action':'#',method:'post'},
                ['div',{class:"modal-dialog modal-lg", role:"document"},
                    ['div',{class:"modal-content bd-gray-900"},
                        ['div',{class:"modal-header navbar navbar-expand-lg"},
                            ['h1',{class:"modal-title mt-3", id:"titleDialogAddWord"},'Add Word'],
                            ['h1',{class:"modal-title spinner mx-3","style":"width:30px;height:30px", id:"spinnerDialogAddWord" },''],
                            
                            ['button',{'type':"button",'class':"btn-close text-bg-info",'data-bs-dismiss':"modal", 'aria-label':"Close"}],
                        ],
                        ['div',{class:"modal-body", id:"bodyDialogAddWord"},
                            ['div',{class:"mb-3 row"},
                                ['label',{class:"col-sm-3 col-form-label",'for':'key-word'},'Key Word'],
                                ['div',{class:"col-sm-7"},
                                    ['input',{class:"form-control",'type':'text',id:'key',name:'key','placeholder':'Key Word'}],
                                ],
                            ],
                            ['div',{class:"mb-3 row"},
                                ['label',{class:"col-sm-3 col-form-label",'for':'aliases'},'Aliases Word'],
                                ['div',{class:"col-sm-7"},
                                    ['input',{class:"form-control",'type':'text',id:'aliases',name:'aliases','placeholder':'Aliases Word'}],
                                ],                              
                            ],
                            ['input',{class:"form-control",'type':'hidden',id:'shortMeaning',name:'shortMeaning','placeholder':'Aliases Word'}],
                            builtSpecialWord(),
                            ['div',{class:"mb-3"},
                                ['label',{class:"form-label",'for':'full-meaning'},'Full meaning'],
                                ['textarea',{class:"form-control",'row':'3',id:'fullMeaning',name:'fullMeaning','placeholder':'Full meaning'}],
                            ],
                        ],
                        ['div',{class:"modal-footer"},
                            ['button',{'type':"submit",'class':"btn btn-primary",'aria-label':"Save",'data-bs-dismiss':"modal"},'Save'],
                            ['button',{'type':"button",'class':"btn btn-secondary",'data-bs-dismiss':"modal", 'aria-label':"Close"},'Close']
                        ],
                    ],
                ]
            ]
    ]

    // var old = $('#modals2')[0].innerHTML
    // buildDom(dom,$('#modals2')[0],{})
    // old += $('#modals2')[0].innerHTML
    // $('#modals2')[0].innerHTML = old

    var container = document.querySelector('body')
    var optionsPanel = document.createElement("div");
    buildDom(dom, optionsPanel, {})
    container.insertBefore(optionsPanel, container.firstChild);
}





var dialogAddWord = function(d,editor) {
    builtModal()

    

    var

    fns={
        _getUserData:(key)=>{
            fetch('/dictionaries/get/'+key,{
                headers: {
                    'Content-Type': 'application/json',
                },
                method:'get'
            })
            .then((response) => response.json())
            //.then((response) => response.text())
            .then(data=>{
                //alert(data.sms);
                //console.log(data);
                if(!Array.isArray(data)){
                    $('#dialogAddWord').modal('hide')
                    $('#app-toast .toast-header strong').html('Error')
                    $('#app-toast .toast-body').html(data.sms)
                    $('#app-toast').toast('show')

                    return;
                }
                if(data.length==0) return;
                var 
                key = data[0][1],
                aliases = data[0][3],
                shortMeaning = data[0][4],
                fullMeaning = data[0][5]
                console.log(data);
                if(shortMeaning.indexOf('{')!=-1){
                    var obj = JSON.parse(shortMeaning)
                    console.log(obj)
                    for(var i in obj){
                        //console.log(i);
                        $('#'+i).val(obj[i])
                    }
                }
                $('#fullMeaning').val(fullMeaning)
                $('#aliases').val(aliases)
                // $('#app-toast .toast-header strong').html('Message')
                // $('#app-toast .toast-body').html(data)
                // $('#app-toast').toast('show')

            })
            .catch(error=>{
                $('#app-toast .toast-header strong').html('Error')
                $('#app-toast .toast-body').html(error)
                $('#app-toast').toast('show')
            })
        },
        _getUserDataV2(key){

            var spinnerDialogAddWord = document.getElementById("spinnerDialogAddWord")
            spinnerDialogAddWord.style.visibility = "visible";

            var url = script_url + "?q=" + JSON.stringify({ 
                SHEETNAME: SHEETNAME,
                 action: "filter", 
                 data:{ID:key,USERID:USERID}
                })
            var data = {}
            fetch(url, {
                method: "GET",
                mode: 'cors',
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
            })
            .then((response) => response.json())
            .then(res => {
                spinnerDialogAddWord.style.visibility = "hidden";
                //console.log(res);
                if(res.status=="success"){
                    data = JSON.parse(res.data[0].JSONDATA)
                    var obj = data.shortMeaning
                    //console.log(obj)
                    for(var i in obj){
                        //console.log(i);
                        $('#'+i).val(obj[i])
                    }
                    $('#aliases').val(data.aliases)
                    $('#fullMeaning').val(data.fullMeaning)
                }
            })
        },
        addWord:()=>{
            if(!window.USERID){
                $('#app-toast .toast-header strong').html('Error')
                $('#app-toast .toast-body').html("You must login")
                $('#app-toast').toast('show')
                return
            }

            fns._getUserDataV2(editor.getCopyText())
            
            //clean input
            $('#formAddWord input,textarea').val('')

            $('#dialogAddWord').modal('show')
            $('#key').val(editor.getCopyText())
        }
    }
    $(document).on("click", "[data-cmd-as]", (function(event) {
      var cmd = $(this).data("cmdAs");
      if (fns[cmd]) {
        fns[cmd](event)
        //event.preventDefault();
      }else{
        // console.log(`
        //     // ${cmd} not defined
        //     ${cmd}:()=>{}
        // `)
      }
    }));

    function getShortMeaning(){
        var 
        rk = {},
        srk=''
        specialword.map(i=>{
            var k =i.replace(/\s/g,'-'),
            v = $('#'+k).val().trim()
            if(v!='')
            rk[k] = v
        })
        //srk = JSON.stringify(rk)
        if(srk!='{}')
            $('#shortMeaning').val(srk)
        //console.log(srk);
        //var list = ['key','aliases','shortMeaning','fullMeaning'],
        var list = ['key','aliases','fullMeaning'],
        data = {}
        list.map(i=>{
            var v = $('#'+i).val().trim()
            data[i] = v
        })
        data.shortMeaning = rk
        return data
    }
    function initEventDialogAddWord(){
       //console.log('-init-dialog-add-word--');
        $('#formAddWord').on('submit',(event)=>{
            var data = getShortMeaning()
            event.preventDefault()
            //alert('submit')
            console.log(data);
            // $.post('/dictionaries/add', function(data, status){
            //     alert("Data: " + data + "\nStatus: " + status);
            // });
            /*
            fetch('/dictionaries/add',{
                headers: {
                    'Content-Type': 'application/json',
                },
                method:'post',
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
            //.then((response) => response.text())
            .then(data=>{
                //alert(data.sms);
                $('#app-toast .toast-header strong').html('Message')
                $('#app-toast .toast-body').html(data.sms)
                $('#app-toast').toast('show')
                loadUserDict()
            })
            .catch(e=>{
                $('#app-toast .toast-header strong').html('Message')
                $('#app-toast .toast-body').html(e)
                $('#app-toast').toast('show')
            })
            */

        
            // $("#re").css("visibility", "hidden");
            // document.getElementById("loader").style.visibility = "visible";
            // $('#mySpinner').addClass('spinner');
        
            // var id1 = $("#id").val();
            // var name = $("#name").val();
        
            var url = script_url + "?q="+JSON.stringify({
                SHEETNAME: SHEETNAME,
                action:"insert",
                condition:{"ID":data.key,"USERID":USERID},
                data:{"ID":data.key,"KEY":data.key,"LENGTH":data.key.length,"JSONDATA":JSON.stringify(data),"USERID":USERID}
            });
        
            fetch(url, {
                method: "GET",
                mode: 'cors',
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
        
            })
            .then((response) => response.json())
            .then(res => {
                //console.log(res);
                //readAll();
            })
        
            return false;
        })
    }
    d.init(initEventDialogAddWord)

};

(function(){
    this.callback = function(editor) {
        
    };
}).call(dialogAddWord.prototype);
exports.dialogAddWord = dialogAddWord;
