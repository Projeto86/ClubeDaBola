webix.protoUI({
	name: "multifield",
	defaults: {
		rows : []
	},
	$init: function() {
		this.$ready.push(this.addSection);
	},
	addSection: function(extra, defaultValue){
		var label = (typeof this.config.label==='string'?{ view : 'label', label : this.config.label }:webix.copy(this.config.label));
		if(this.config.labelWidth){ label.width = this.config.labelWidth; }

		var field = webix.copy(this.config.field);

		var button = {
			view:"icon",
			icon:"plus-circle",
			click:function(){ this.getParentView().getParentView().addSection(true); }
		};

		if(extra){
			button = {
				view:"icon",
				icon:"minus-circle",
				click:function(){ this.getParentView().getParentView().removeView(this.getParentView()); }
			};
		}

		delete label.name;
		delete this.config.field.name;

		if(defaultValue){
			if(defaultValue.label){
				label.value = defaultValue.label;
				if(defaultValue.field){
					if(label.options){
						for(var i in label.options){
							if(label.options[i].id===label.value){
								if(label.options[i].options)
									field.options = webix.copy(label.options[i].options);
							}
						}
					}
					field.value = defaultValue.field;
				}
			}
		}

		if(
			(label.view=='combo'||label.view=='richselect') &&
			(field.view=='combo'||field.view=='richselect'||field.view=='multiselect')
		){
			label.on = {
				onChange : function(id){
					var obj = this.getPopup().getList().getItem(id);
					var list = $$(field.id).getPopup().getList();
					list.clearAll();
					list.parse(obj.options||[]);
					$$(field.id).setValue('');
				}
			};
		}

		var t = this.addView({
			cols : [
				label,
				field,
				button
			]
		});
	},
	getValue: function(){
		var values = [];
		this.getChildViews().forEach(function(line){
			var cols = line.getChildViews();
			var label = cols[0];
			var field = cols[1];
			values.push({
				label : (label.config.view.toLowerCase()!=='label'?label.getValue():null),
				field : field.getValue()
			});
		});
		return values;
	},
	setValue: function(list){
		var _this = this;
		this.getChildViews().forEach(function(view){ _this.removeView(view); });
		if(!list || !list.length){ this.addSection(); return; }
		for(var x in list){ this.addSection((x>0), list[x]); }
	},
	validate : function(){
		var validated = true;
		this.getChildViews().forEach(function(line){
			var cols = line.getChildViews();
			var label = cols[0];
			var field = cols[1];
			webix.html.removeCss(field.x, "webix_invalid");
			if(!field.validate()){
				validated = false;
				webix.html.addCss(field.x, "webix_invalid");
			}
			if(label.config.view.toLowerCase()!=='label'){
				webix.html.removeCss(label.x, "webix_invalid");
				if(!label.validate()){
					validated = false;
					webix.html.addCss(label.x, "webix_invalid");
				}
			}
		});
		return validated;
	},
	parseLabel : function(list){
		this.config.label.options = list;
		var _this = this;
		this.getChildViews().forEach(function(view){ _this.removeView(view); });
		this.addSection();
	}

}, webix.ui.layout);
