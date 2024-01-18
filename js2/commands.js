"use strict";
(function (GLOBAL) {

var { hanNom } = require("data/hanNom");
var { hanViet } = require("data/hanViet");
var { gianPhonThe } = require("data/gianPhonThe");



window.hanViet = hanViet

var buildDom = require("ace/lib/dom").buildDom;

//console.log(boFull)
var {
	getSelection,
	setSelection,
	reSelected,
	getTextPreviousLine,
	titleCase,
	autoSpellCheck
} = require("lib/utilities")


window.getTextPreviousLine = getTextPreviousLine
var
commands = function (app, refs) {
	var editor = window.editor
		function updateToolbar() {
			refs.saveButton.disabled = editor.session.getUndoManager().isClean();
			refs.undoButton.disabled = !editor.session.getUndoManager().hasUndo();
			refs.redoButton.disabled = !editor.session.getUndoManager().hasRedo();
		}
		editor.on("input", updateToolbar);
		//editor.session.setValue(localStorage.savedValue || "Welcome to ace Toolbar demo!")
		function save() {
			localStorage.savedValue = editor.getValue();
			editor.session.getUndoManager().markClean();
			updateToolbar();
		}
		editor.commands.addCommand({
			name: "save",
			exec: save,
			bindKey: { win: "ctrl-s", mac: "cmd-s" }
		});

		var
			myClipboar,
			textSelected,
			selection,

			fns = {
				save: save,
				undo: () => { editor.undo() },
				redo: () => { editor.redo() },
				selectall: (event) => {
					editor.selectAll();
				},
				copy: () => {
					myClipboar = editor.getCopyText();
					navigator.clipboard.writeText(myClipboar)
					editor.onCopy();
					// console.log('onCopy');
				},
				cut: () => {
					myClipboar = editor.getCopyText();
					navigator.clipboard.writeText(myClipboar)
					editor.onCut();
					// console.log('cut');
				},
				paste: (event) => {
					navigator
						.clipboard
						.readText()
						.then((clipText) => (editor.onPaste(clipText, event)));
					//editor.onPaste(myClipboar,event); 
					// console.log('paste');
					// console.log(myClipboar);

				},
				// addWord:()=>{

				// },
				search: () => {
					console.log('search');
					editor.execCommand('find')
				},
				reply: () => {
					editor.execCommand('replace')
				},
				searchtu: (event) => {
					// var si = $('#search-input')[0]
					// si.value = editor.getCopyText()
					// $('#btn-search-word').on('click')
					// $('#btn-search-word')[0].click()
					//if(event.target !== this) return false;
					// console.log(event);
					// if (event.target.matches('li.btn')) return
					// $(this).toggleClass('active')
					searchInput.value = editor.getCopyText()
					if(searchInput.value.length==0)
						return
					btnSearchWord.click()
					$('#dialogResultSearchWord').offcanvas('show')
					//console.log('new style');
					//si.parentNode.submit()
				},
				translateOffline: () => {
					if(!navigator.onLine){
						app.toast.message('Alert','internet is off').show()
						return
					}
					var
						text = getTextPreviousLine(editor)
					//editor.onPaste("translateOffline "+text)
					var url = script_url + "?q=" + JSON.stringify({
						SHEETNAME: SHEETNAME,
						action: "translate",
						data: { "TEXT": text, "USERID": USERID }
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
							if (res.status == "successful") {
								editor.onPaste(res.message)
								console.log(res);
							}
							//readAll();
						})
				},
				gTranslate: () => {
					if(!navigator.onLine){
						app.toast.message('Alert','internet is off').show()
						return
					}
					var
						text = getTextPreviousLine(editor)
					//editor.onPaste("gTranslate "+text)
					$('#iframeGT')[0].contentWindow.postMessage(text)
				},
				upLowCases: () => {
					var
						row = getSelection(editor),
						a = textSelected,
						u = a.toUpperCase(),
						t = titleCase(a),
						l = a.toLowerCase()
					a = (a == u && u[1] && u[1] == a[1]) ? t : (a == l) ? u : l
					textSelected = a
					editor.onPaste(a)
					setSelection(editor, row)
				},
				spellcheck: () => {
					var text = textSelected,
						row = getSelection(editor)
					text = autoSpellCheck(text)
					editor.onPaste(text)
					setSelection(editor, row)
				},
				linearWords: () => {
					var
						row = getSelection(editor),
						text = textSelected
					textSelected = text.indexOf('-') == -1 ? text.replace(/\s/g, '-') : text.replace(/\-/g, ' ')
					editor.onPaste(textSelected)
					//editor.selection.setSelectionRange(range,reverse)
					setSelection(editor, row)
				},

				changeWords34: () => {
					var
						row = getSelection(editor)
						, text = textSelected
						, s = text.split(' ')
						, t = s[0]
					if (s.length == 3) {
						s[0] = s[2]
						s[2] = t
						textSelected = s.join(' ')
					}
					if (s.length == 4)
						textSelected = s[2] + ' ' + s[3] + ' ' + s[0] + ' ' + s[1]
					if (s.length == 5)
						textSelected = s[3] + ' ' + s[4] + ' ' + s[2] + ' ' + s[0] + ' ' + s[1]
					if (s.length == 6)
						textSelected = s[4] + ' ' + s[5] + ' ' + s[2] + ' ' + s[3] + ' ' + s[0] + ' ' + s[1]
					editor.onPaste(textSelected)
					setSelection(editor, row)
				},
				changeWordscua: () => {
					var
						row = getSelection(editor),
						text = textSelected,
						s = text.split('của'),
						t = s[0].trim()
					s[0] = s[1].trim()
					s[1] = t
					textSelected = s.join(' của ')
					editor.onPaste(textSelected)
					setSelection(editor, row)

				},
				changeWordsla: () => {
					var
						row = getSelection(editor),
						text = textSelected,
						s = text.split('là'),
						t = s[0].trim()
						s[0] = s[1].trim()
					s[1] = t
					textSelected = s.join(' là ')
					editor.onPaste(textSelected)
					setSelection(editor, row)
				},
				hideBarExpand: () => {
					// $('.offcanvas-backdrop').removeClass('show')
					// $('#barExpand').removeClass('show')
					//var bsOffcanvas =new bootstrap.Offcanvas('#barExpand')
					//bsOffcanvas.toggle()
					if (fns.nextCMD.barExpandShow)
						$('[data-bs-target="#barExpand"')[0].click()
				},
				nextCMD: { index: null, text: '', data: null, target: '', barExpandShow: false },
				selectWord: (event) => {
					//console.log(fns.nextCMD);
					var
						{ text, index, data, target } = fns.nextCMD,
						html = $(event.target).html()
					if (data == null) {
						editor.onPaste(html)
						fns.hideBarExpand()
						$('#dialogSelectWord').modal("hide");
						//reSelected(editor)
						var
							row = getSelection(editor)
						setSelection(editor, row)
					} else {
						//fns.nextCMD.text+=text
						fns.nextCMD.text = fns.nextCMD.text.replace(data[index], html)
						//console.log(text);
						if (index >= data.length - 1) {
							fns.nextCMD.index = null
							fns.nextCMD.data = null
							editor.onPaste(fns.nextCMD.text)
							fns.nextCMD.text = ''
							fns.nextCMD.target = ''

							fns.hideBarExpand()

							$('#dialogSelectWord').modal("hide");
						} else {
							fns.nextCMD.index++
							setTimeout(() => {
								$(fns.nextCMD.target).click()
								//$("[data-cmd-as='keyboardHanViet']").click()   			
							}, 100)
						}
					}
				},
				keyboardHanViet: () => {
					var i, k, c, w = [], old, dom, ws, findKey //與
					if (fns.nextCMD.data == null) {
						fns.nextCMD.target = "[data-cmd-as='keyboardHanViet']"
						//textSelected = editor.getCopyText()
						// console.log('textSelected '+textSelected);
						// console.log('textSelected '+textSelected.length);
						// console.log('editor.getCopyText() '+editor.getCopyText());
						if(!textSelected)
							textSelected = editor.getSelectedText()
						if (textSelected.length == 1 || textSelected.length == 0) {
							textSelected = getTextPreviousLine(editor)
							// console.log('getTextPreviousLine(editor) '+textSelected);
						}

						ws = textSelected.split(/[\s\n]+/)
						if (ws.length > 1) {
							fns.nextCMD.data = ws
							fns.nextCMD.index = 0
							fns.nextCMD.text = textSelected
						}
					}
					i = fns.nextCMD.index
					findKey = Array.isArray(fns.nextCMD.data) ? fns.nextCMD.data[i] : textSelected
					c = window.hanViet.filter(e => {
						w = e[1].split(/\,\s|\,|\;\s|\;/)
						return w.indexOf(findKey) != -1
					})

					if (c.length != 0) {
						c = c.map(e => { return e[0] })
						dom = c.map(e => { return ['button', { 'class': 'btn btn-secondary', 'data-cmd-as': 'selectWord' }, e] })
					}

					if (c.length == 0) {
						c = [findKey]
						dom = c.map(e => { return ['button', { 'class': 'btn btn-secondary', 'data-cmd-as': 'selectWord' }, e] })
					}

					$('#dialogSelectWord .modal-body').html('')
					var target = $('#dialogSelectWord .modal-body')[0]
					buildDom(dom, target, {})

					$('#dialogSelectWord .modal-title').html(fns.nextCMD.text)
					$('#dialogSelectWord').modal("show");
				},
				keyboardHanNom: () => {
					var i, k, c, w = [], old, dom, ws, findKey //與
					if (fns.nextCMD.data == null) {
						fns.nextCMD.target = "[data-cmd-as='keyboardHanNom']"

						if(!textSelected)
							textSelected = editor.getSelectedText()

						if (textSelected.length == 1 || textSelected.length == 0)
							textSelected = getTextPreviousLine(editor)
						ws = textSelected.split(/\s+/)
						if (ws.length > 1) {
							fns.nextCMD.data = ws
							fns.nextCMD.index = 0
							fns.nextCMD.text = textSelected
						}
					}
					i = fns.nextCMD.index
					findKey = Array.isArray(fns.nextCMD.data) ? fns.nextCMD.data[i] : textSelected
					//console.log(findKey);
					c = hanNom.find(e => { return e[0] == findKey })

					if (c) {
						c = c[1].split(/\,\s|\,|\;\s|\;/)
						dom = c.map(e => { return ['button', { 'class': 'btn btn-secondary', 'data-cmd-as': 'selectWord' }, e] })
					}
					if (!c) {
						c = [findKey]
						dom = c.map(e => { return ['button', { 'class': 'btn btn-secondary', 'data-cmd-as': 'selectWord' }, e] })
					}

					$('#dialogSelectWord .modal-body').html('')
					var target = $('#dialogSelectWord .modal-body')[0]
					buildDom(dom, target, {})

					$('#dialogSelectWord .modal-title').html(fns.nextCMD.text)
					$('#dialogSelectWord').modal("show");
				},
				keyboardPhiemAm: () => {
					var i, k, c, w = [], old //與
					var getLine = false

					if(!textSelected)
						textSelected = editor.getSelectedText()

					if (textSelected.length == 0) {
						textSelected = getTextPreviousLine(editor)
						getLine = true
					}
					old = textSelected

					//hanViet.sort((a,b)=>{return a[0].length-b[0].length})
					window.hanViet.sort((a, b) => { return b[0].length - a[0].length })

					// for (i = 0; i < textSelected.length; i++) {
					// 	k = textSelected[i]
					// 	c = hanViet.find((e)=>{return e[0]==k})
					//   	if(c){
					//   		w = c[1].split(/\,\s|\,|\;\s|\;/)
					//   		textSelected = textSelected.replace(k,w[0]+" ")
					//   	}
					// }
					window.hanViet.map(i => {
						var w = i[1].split(/\,\s|\,|\;\s|\;/)
						textSelected = textSelected.replace(new RegExp(i[0], 'g'), w[0] + " ")
					})
					if (old != textSelected) {
						editor.onPaste(textSelected)
						if (getLine == false)
							reSelected(editor)
					}
				},
				keyboardGianThe: () => {
					if(!textSelected)
						textSelected = editor.getSelectedText()

					var i, k, c, old //觇覘
					old = textSelected
					for (i = 0; i < textSelected.length; i++) {
						k = textSelected[i]
						c = gianPhonThe.find((e) => { return e[1] == k })
						if (c)
							textSelected = textSelected.replace(k, c[0])
					}
					if (old != textSelected) {
						editor.onPaste(textSelected)
						reSelected(editor)
					}
				},
				keyboardPhonThe: () => {
					if(!textSelected)
						textSelected = editor.getSelectedText()

					var i, k, c, old //觇覘
					old = textSelected
					for (i = 0; i < textSelected.length; i++) {
						k = textSelected[i]
						c = gianPhonThe.find((e) => { return e[0] == k })
						if (c)
							textSelected = textSelected.replace(k, c[1])
					}
					if (old != textSelected) {
						editor.onPaste(textSelected)
						reSelected(editor)
					}
				},
				userprofile: () => { },
				insertEnter: () => { editor.onPaste("\n") },
				insertTab: () => { editor.onPaste("\t") },
				systemWord: () => {

					//$('#bodyDialogSystemWords').html()
				},
				moveleft: () => {
					var row = getSelection(editor)
					setSelection(editor, [row[0], row[1] - 1])
				},
				moveright: () => {
					var row = getSelection(editor)
					setSelection(editor, [row[0], row[1] + 1])
				},
				dialogUser: () => {

				},
				openFile: app.openFile
			}

		$(document).on("click", "[data-cmd-as]", (function (event) {
			var cmd = $(this).data("cmdAs");
			//alert(cmd)
			//console.log(cmd);
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

		// editor capture  word
		editor.on("mouseup", function () {
			fns.nextCMD = { index: null, text: '', data: null, target: '', barExpandShow: false }
			var text = editor.getCopyText()
			selection = editor.selection
			textSelected = text
			if (text.length)
				console.log(text);
			if($('[class~=autoclick]')[0])
				$('[class~=autoclick]').click()
		})

		// mouse right

		$("[data-toggle='modal-contextmenu']").on("contextmenu", function (e) {
			e.preventDefault();
			var targetModal = $(this).data('target');
			//console.log($(this).data('target'));
			$(targetModal).modal("show");
		})
		$("[data-toggle='active']").on("contextmenu", function (e) {
			
			var target = $(this).data("target");
			$(target).toggleClass('autoclick')
			e.preventDefault();
		})
		$("[data-toggle='modal-left-click']").on("click", function (e) {
			e.preventDefault();
			var targetModal = $(this).data('target');
			//console.log($(this).data('target'));
			$(targetModal).modal("show");
		})
		// event click
		$("[data-toggle='toggle-find']").on("click", function (e) {
			//e.preventDefault();
			alert(e)
			$("[data-toggle='toggle-find']").each((i, el) => {
				//$(el).addClass('d-none')
				var targetModal = $(el).data('target');
				$(targetModal).addClass('d-none')
			})
			var targetModal = $(this).data('target');
			//$(targetModal).show();
			$(targetModal).toggleClass('d-none')
			$('#dialogOptionFind').modal("hide");
		})

		// event keyboard click

		$("[data-toggle='toggle-keyboard']").on("click", function (e) {
			//e.preventDefault();
			$("[data-toggle='toggle-keyboard']").each((i, el) => {
				var targetModal = $(el).data('target');
				$(targetModal).addClass('d-none')
			})
			var targetModal = $(this).data('target');
			$(targetModal).toggleClass('d-none')
			$('#dialogOptionKeyboard').modal("hide");
		})

		// event translate click

		$("[data-toggle='toggle-translate']").on("click", function (e) {
			//e.preventDefault();
			$("[data-toggle='toggle-translate']").each((i, el) => {
				//$(el).addClass('d-none')
				var targetModal = $(el).data('target');
				$(targetModal).addClass('d-none')
			})
			var targetModal = $(this).data('target');
			//$(targetModal).show();
			$(targetModal).toggleClass('d-none')
			$('#dialogOptionTranslate').modal("hide");
		})

		// event translate click
		$("[data-toggle='toggle-changeWords']").on("click", function (e) {
			//e.preventDefault();
			$("[data-toggle='toggle-changeWords']").each((i, el) => {
				//$(el).addClass('d-none')
				var targetModal = $(el).data('target');
				$(targetModal).addClass('d-none')
			})
			var targetModal = $(this).data('target');
			console.log(targetModal);
			//$(targetModal).show();
			$(targetModal).toggleClass('d-none')
			$('#dialogOptionChangeWords').modal("hide");
		})

		// event resize
		// $("[data-toggle='row-swap-drowpdow']").on("resize", function(e) {
		//   console.log(e.target);
		// })
		//.addEventListener('resize'
		// $(window).on("resize", "[data-toggle='row-swap-drowpdow']", (function(event) {
		// 	 console.log(e.target);
		// }))

		// hide.bs.dropdown	Fires immediately when the hide instance method has been called.
		// hidden.bs.dropdown	Fired when the dropdown has finished being hidden from the user and CSS transitions have completed.
		// show.bs.dropdown	Fires immediately when the show instance method is called.
		// shown.bs.dropdown	Fired when the dropdown has been made visible to the user and CSS transitions have completed.

		// const myDropdown = document.getElementById('myDropdown')
		// myDropdown.addEventListener('show.bs.dropdown', event => {
		//   // do something...
		// })

		const eleBarExpand = document.getElementById('barExpand')
		eleBarExpand.addEventListener('hidden.bs.offcanvas', event => {
			fns.nextCMD.barExpandShow = false
		})
		eleBarExpand.addEventListener('show.bs.offcanvas', event => {
			fns.nextCMD.barExpandShow = true
		})

	};

// (function(){
//     this.updateStatus = function(editor) {

//     };
// }).call(commands.prototype);



//exports.fns = callfns;
commands(window.app,window.refs)
})(this)