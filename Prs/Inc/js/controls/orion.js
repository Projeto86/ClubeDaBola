var orionEditor;

webix.protoUI({
	name:"orion",
	$init:function(config){
		this.$view.className += " webix_selectable";
		this._init_ckeditor_once();
	},
	defaults:{
		contentType : "application/javascript",
		borderless:true
	},
	_init_ckeditor_once:function(){
		if(!orion) return;
		var tid = "";
		while(tid.length<30){
			var r = Math.random();
			tid+= (r<0.1?Math.floor(r*100):String.fromCharCode(Math.floor(r*26) + (r>0.5?97:65)));
		}
		tid = this.config.textAreaID = 'o'+tid;
		var _this = this;

		setTimeout(function(){
			_this.$view.innerHTML = "<div style='width:100%; height:100%' id='"+tid+"'></div>";
			if(!orionEditor) orionEditor= new orion.codeEdit();
			_this._3rd_editorView = null;

			orionEditor.create({ "parent": tid }).then(function(editorViewer) {
				editorViewer.editor.getTextView().setOptions({"themeClass": "atomOneDark"});
				if (editorViewer.settings) {
					editorViewer.settings.contentAssistAutoTrigger = true;
					editorViewer.settings.showOccurrences = true;
				}
				editorViewer.setContents((_this.config.value||""), _this.config.contentType);
				_this._3rd_editorView = editorViewer;
			});
		}, 1);
	},
	$setSize:function(x,y){
		if (webix.ui.view.prototype.$setSize.call(this, x, y)){
			if(this._3rd_editorView) this._3rd_editorView.editor.resize();
		}
	},
	setValue:function(value, contentType){
		if(!this._3rd_editorView){
			this.config.value = value;
			if(contentType) this.config.contentType = contentType;
		} else {
			if(!contentType) this._3rd_editorView.editor.getTextView().setText(value);
			else this._3rd_editorView.setContents(value, contentType);
		}
	},
	insertText :function(value){
		var view = this._3rd_editorView.editor.getTextView();
		var p = view.getCaretOffset();
		view.setText(value, p, p);
	},
	getValue:function(){
		if(!this._3rd_editorView) return null;
		return this._3rd_editorView.editor.getTextView().getText();
	}
}, webix.ui.view);
