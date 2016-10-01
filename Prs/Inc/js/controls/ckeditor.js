webix.protoUI({
	name:"ckeditor",
	$init:function(config){
		this.$view.className += " webix_selectable";
		this._init_ckeditor_once();
	},
	defaults:{
		borderless:true,
		toolbar: [
    		{ name: 'document', items: [ 'Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates' ] },
    		{ name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
    		{ name: 'editing', items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
    		{ name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
    		'/',
    		{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat' ] },
    		{ name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
    		{ name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
    		{ name: 'insert', items: [ 'CreatePlaceholder', 'Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ] },
    		'/',
    		{ name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
    		{ name: 'colors', items: [ 'TextColor', 'BGColor' ] },
    		{ name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] }
	]
	},
	_init_ckeditor_once:function(){
		var tid = "";
	    while(tid.length<30){
	        var r = Math.random();
	        tid+= (r<0.1?Math.floor(r*100):String.fromCharCode(Math.floor(r*26) + (r>0.5?97:65)));
	    }
    	tid = this.config.textAreaID = 't'+tid;
		var _this = this;
		setTimeout(function(){
			_this.$view.innerHTML = "<textarea id='"+tid+"'>"+(_this.config.value||"")+"</textarea>";
			window.CKEDITOR_BASEPATH = "/Prs/Inc/Jsc/ckeditor/v4.5.7/";
			var breakLines = _this.config.toolbar.filter(function(t){return t==='/';});
			_this._3rd_editor = CKEDITOR.replace( _this.config.textAreaID, {
				toolbar: _this.config.toolbar,
				width:_this.$width -2,
				height: (_this.$height - (breakLines.length*50) - 55),
				placeholders : (_this.config.placeholders||[])
			});
		}, 1);

	},
	refresh : function(){
		var _this = this;
		if(_this._3rd_editor) _this._3rd_editor.destroy();
		var breakLines = _this.config.toolbar.filter(function(t){return t==='/';});
		_this._3rd_editor = CKEDITOR.replace( _this.config.textAreaID, {
			toolbar: _this.config.toolbar,
			width:_this.$width -2,
			height: (_this.$height - (breakLines.length*50) - 55),
			placeholders : (_this.config.placeholders||[])
		});
	},
	_set_inner_size:function(x, y){
		if (!this._3rd_editor || !this._3rd_editor.container || !this.$width) return;
        var breakLines = this.config.toolbar.filter(function(t){return t==='/';});
        y = y - (breakLines.length*50) - 55;
		this._3rd_editor.resize(x, y);
	},
	$setSize:function(x,y){
		if (webix.ui.view.prototype.$setSize.call(this, x, y)){
			this._set_inner_size(x,y);
		}
	},
	setValue:function(value){
		this.config.value = value;
		if (this._3rd_editor){
			if(this._3rd_editor.editable()) this._3rd_editor.editable().setData(value);
			else this._3rd_editor.setData(value);
		} else webix.delay(function(){
			this.setValue(value);
		},this,[],100);
	},
	getValue:function(){
		return this._3rd_editor?this._3rd_editor.getData():this.config.value;
	},
	focus:function(){
		this._focus_await = true;
		if (this._3rd_editor)
			this._3rd_editor.focus();
	},
	getEditor:function(){
		return this._3rd_editor.getData();
	}
}, webix.ui.view);
