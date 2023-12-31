"use strict";
var {boFull} = require("data/boFull");

require("tablednd");

 //console.log(tableDnD);
var buildDom = require("ace/lib/dom").buildDom;


// console.log(url);
function builtModal(){
    var dom =['div',{
                'class':'modal',
                'id':'dialogUsersTranslate',
                'tabindex':"-1",
                'role':"dialog",
                'aria-labelledby':"dialogSystemWordsTitle",
                'aria-hidden':"true"
            },
            ['form',{id:'formPriority','action':'#',method:'post'},
                ['div',{class:"modal-dialog modal-lg", role:"document"},
                    ['div',{class:"modal-content bd-gray-900"},
                        ['div',{class:"modal-header"},
                            ['div',{class:"nav-item", id:"titleDialogSystemWords"},'In order to translate'],
                            ['button',{'type':"button",'class':"btn-secondary-close",'data-bs-dismiss':"modal", 'aria-label':"Close"}],
                        ],
                        ['div',{class:"modal-body", id:"bodyDialogSystemWords"},
                        
                            ["table", 
                                {
                                    "id":"table",
                                    "data-toggle":"table",
                                    "data-pagination":"true",
                                    "data-search":"false",
                                    "data-show-toggle":"true",
                                    "data-toolbar":".toolbar",
                                    "data-use-row-attr-func":"true",
                                    "data-reorderable-rows":"true",
                                    "class":"text-light"
                                },
                                ["thead",{},
                                    ["tr",{},
                                    ["th",{"data-field":"NAME","data-sortable":"true"},"Name"],
                                    ],
                                ],
                                ["tbody",{},""]
                                // ["tbody",{},
                                //     ["tr",{},
                                //         ["td",{},"chanh"],
                                //     ],
                                //     ["tr",{},
                                //         ["td",{},"huy"],
                                //     ],
                                // ],
                            ]

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
      
var dialogUsersTranslate = function(editor) {
    builtModal()
    
    //$('#table').bootstrapTable()
    // $('#table').bootstrapTable('hideColumn', 'EMAIL')
    // $('#table').bootstrapTable('hideColumn', 'ID')
    //ajaxRequest()
    //$('#table').tableDnD()
    
    var buildTable = (data)=>{
        return data.map((v,i)=>{
            return  ['tr',{class:""},
                        ['td',{"data-id":v.ID},v.NAME],
            ]
        })
    }

    var url = script_url + "?q="+JSON.stringify({
        SHEETNAME: 'users',
        action:"filter",
        data:{}
    });
    fetch(url,{
        method: "GET",
        mode: 'cors',
        headers: {
            "Content-Type": "text/plain;charset=utf-8",
        },
    })
    .then(res=>res.json())
    .then(listUsers=>{
        console.log(listUsers);
        // params.success(res.data)
        // $('#table').bootstrapTable('hideColumn', 'EMAIL')
        // $('#table').bootstrapTable('hideColumn', 'ID')
        var url = script_url + "?q="+JSON.stringify({
            SHEETNAME: 'priority',
            action:"filter",
            data:{USERID:USERID}
        });
        fetch(url,{
            method: "GET",
            mode: 'cors',
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
        })
        .then(res=>res.json())
        .then(listPriority=>{
            function joinPriorityToTableA(a,b){
                return a.map(ia=>{
                    var r = ia, _priority = 100,
                    rb = b.filter((ib)=>{return ib.USERORTHER==ia.ID})
                    if(rb.length>0)
                        _priority =rb[0].PRIORITY
                    r.PRIORITY =_priority
                    return r 
                })
            }
           var data =  joinPriorityToTableA(listUsers.data, listPriority.data)
           data.sort((a,b)=>{return a.PRIORITY-b.PRIORITY})
           //console.log(data);
        
            var $table = $('#table')
            var dom = buildTable(data)
            //console.log(dom)
            buildDom(dom, document.querySelector('#table tbody'), {})
            $table.tableDnD()
        })
        
    })

    $('#formPriority').on('submit',(event)=>{
        event.preventDefault()
        var $table = document.querySelector('#table tbody')
        var tds = $table.querySelectorAll('td')
        var data = []
        tds.forEach((td,i)=>{
            //console.log(td.dataset.id,i)
            var row = {USERID:USERID,USERORTHER:td.dataset.id,PRIORITY:(i+1)}
            //data.push(row)
            console.log(row);
            var url = script_url + "?q="+JSON.stringify({
                    "SHEETNAME":"priority",
                    "action":"insert",
                    "condition":{USERID:USERID,USERORTHER:td.dataset.id},
                    "data":row,
            });
            fetch(url,{
                method: "GET",
                mode: 'cors',
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
            }).then(res=>res.json())
            .then(res=>{
                console.log(res);
            })
        })

    })
};

(function(){
    this.callback = function(editor) {
        
    };
}).call(dialogUsersTranslate.prototype);
exports.dialogUsersTranslate = dialogUsersTranslate;
//exports.builtModal = builtModal;