"undefined"!=typeof process&&(require("amd-loader"),require("./test/mockdom"));var EditSession=require("./edit_session").EditSession,Editor=require("./editor").Editor,MockRenderer=require("./test/mockrenderer").MockRenderer,assert=require("./test/assertions");module.exports={createEditSession:function(e,t){t=new Array(t+1).join("a"),e=new Array(e).join(t+"\n")+t;return new EditSession(e)},"test: navigate to end of file should scroll the last line into view":function(){var e=this.createEditSession(200,10),e=new Editor(new MockRenderer,e),t=(e.execCommand("gotoend"),e.getCursorPosition());assert.ok(e.getFirstVisibleRow()<=t.row),assert.ok(e.getLastVisibleRow()>=t.row)},"test: navigate to start of file should scroll the first row into view":function(){var e=this.createEditSession(200,10),e=new Editor(new MockRenderer,e);e.moveCursorTo(e.getLastVisibleRow()+20),e.execCommand("gotostart"),assert.equal(e.getFirstVisibleRow(),0)},"test: goto hidden line should scroll the line into the middle of the viewport":function(){var e=new Editor(new MockRenderer,this.createEditSession(200,5));e.navigateTo(0,0),e.renderer.scrollCursorIntoView(),e.gotoLine(101),assert.position(e.getCursorPosition(),100,0),assert.equal(e.getFirstVisibleRow(),89),e.navigateTo(100,0),e.renderer.scrollCursorIntoView(),e.gotoLine(11),assert.position(e.getCursorPosition(),10,0),assert.equal(e.getFirstVisibleRow(),0),e.navigateTo(100,0),e.renderer.scrollCursorIntoView(),e.gotoLine(6),assert.position(e.getCursorPosition(),5,0),assert.equal(0,e.getFirstVisibleRow(),0),e.navigateTo(100,0),e.renderer.scrollCursorIntoView(),e.gotoLine(1),assert.position(e.getCursorPosition(),0,0),assert.equal(e.getFirstVisibleRow(),0),e.navigateTo(0,0),e.renderer.scrollCursorIntoView(),e.gotoLine(191),assert.position(e.getCursorPosition(),190,0),assert.equal(e.getFirstVisibleRow(),179),e.navigateTo(0,0),e.renderer.scrollCursorIntoView(),e.gotoLine(196),assert.position(e.getCursorPosition(),195,0),assert.equal(e.getFirstVisibleRow(),180)},"test: goto visible line should only move the cursor and not scroll":function(){var e=new Editor(new MockRenderer,this.createEditSession(200,5));e.navigateTo(0,0),e.renderer.scrollCursorIntoView(),e.gotoLine(12),assert.position(e.getCursorPosition(),11,0),assert.equal(e.getFirstVisibleRow(),0),e.navigateTo(30,0),e.renderer.scrollCursorIntoView(),e.gotoLine(33),assert.position(e.getCursorPosition(),32,0),assert.equal(e.getFirstVisibleRow(),30)},"test: navigate from the end of a long line down to a short line and back should maintain the curser column":function(){var e=new Editor(new MockRenderer,new EditSession(["123456","1"]));e.navigateTo(0,6),assert.position(e.getCursorPosition(),0,6),e.navigateDown(),assert.position(e.getCursorPosition(),1,1),e.navigateUp(),assert.position(e.getCursorPosition(),0,6)},"test: reset desired column on navigate left or right":function(){var e=new Editor(new MockRenderer,new EditSession(["123456","12"]));e.navigateTo(0,6),assert.position(e.getCursorPosition(),0,6),e.navigateDown(),assert.position(e.getCursorPosition(),1,2),e.navigateLeft(),assert.position(e.getCursorPosition(),1,1),e.navigateUp(),assert.position(e.getCursorPosition(),0,1)},"test: navigate within soft tabs based on setting":function(){var e=new Editor(new MockRenderer,new EditSession(["        "]));e.getSession().setUseSoftTabs(!0),e.getSession().setTabSize(4),e.navigateTo(0,0),e.navigateRight(),assert.position(e.getCursorPosition(),0,4),e.navigateLeft(),assert.position(e.getCursorPosition(),0,0),e.getSession().setNavigateWithinSoftTabs(!0),e.navigateRight(),assert.position(e.getCursorPosition(),0,1),e.navigateTo(0,4),e.navigateLeft(),assert.position(e.getCursorPosition(),0,3)},"test: typing text should update the desired column":function(){var e=new Editor(new MockRenderer,new EditSession(["1234","1234567890"]));e.navigateTo(0,3),e.insert("juhu"),e.navigateDown(),assert.position(e.getCursorPosition(),1,7)}},"undefined"!=typeof module&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();