
var twRegistrationNumber = {
	defaults : null,
	labels : {
		fieldset : "",
		category : ""
	},
	ids : {
		replacer : { main : "" },
		category : ""
	},
	requiredConfig : "default",
	build : function(fieldsetLabel, categoryLabel, replaceObjID, callback){
		twRegistrationNumber.ids.replacer.main = replaceObjID;
		twRegistrationNumber.ids.category = twRegistrationNumber.ids.replacer.main+"_registrationNumberCategory_id";

		if(fieldsetLabel){ twRegistrationNumber.labels.fieldset = fieldsetLabel; }
		if(categoryLabel){ twRegistrationNumber.labels.category = categoryLabel; }

		if(typeof twRegistrationNumber.requiredConfig=='undefined'){ twRegistrationNumber.requiredConfig = "default"; }

		twRegistrationNumber.category.load(function(){
			twRegistrationNumber.fields.load(
				twRegistrationNumber.category.list[0].id,
				function(){
					twRegistrationNumber.render();
					twRegistrationNumber.defaults = null;
					twRegistrationNumber.requiredConfig = "default";
					if(typeof callback=='function'){ callback(); }
				}
			);
		});
	},
	render : function(){
		var defaults = twRegistrationNumber.defaults;

		var categoryID = null;
		if(defaults){ if(defaults.category){ if(defaults.category._id){ categoryID = defaults.category._id; } } }
		if(!categoryID){
			if(!$$(twRegistrationNumber.ids.category)){
				categoryID = twRegistrationNumber.category.list[0].id;
			} else {
				categoryID = $$(twRegistrationNumber.ids.category).getValue();
			}
		}

		var req = true;
		if(twRegistrationNumber.requiredConfig=="all"||twRegistrationNumber.requiredConfig=="none"){ req = (twRegistrationNumber.requiredConfig=="all"); }

		var fs = {
			id : twRegistrationNumber.ids.replacer.main+"_fieldset",
			view:"fieldset", 
			label: twRegistrationNumber.labels.fieldset,
			body:{
				margin : 10,
				cols:[
					{
						id : twRegistrationNumber.ids.category,
						name : 'registrationNumberCategory_id',
						view : 'richselect',
						label : twRegistrationNumber.labels.category,
						labelPosition:"top",
						required : req,
						options : webix.copy(twRegistrationNumber.category.list),
						value : categoryID,
						on : {
							onChange : function(id){
								twRegistrationNumber.fields.load(id, function(){
									twRegistrationNumber.render();
								});
							}
						}
					}
				]
			}
		}

		fs.body.cols = fs.body.cols.concat(webix.copy(twRegistrationNumber.fields.list));

		webix.ui([webix.copy(fs)], $$(twRegistrationNumber.ids.replacer.main));
	},
	category : {
		list : [],
		load : function(callback){
			twApi(
				"registrationNumber/category/list",
				{},
				function(categories){
					twRegistrationNumber.category.list = [];
					for(var x in categories.response){
						twRegistrationNumber.category.list.push({
							"id" : categories.response[x]._id,
							"value" : categories.response[x].name
						});
					}
					if(typeof callback=='function'){ callback(); }
				}
			);
		}
	},
	fields : {
		list : [],
		load : function(categoryID, callback){
			var ids = twRegistrationNumber.ids;
			var d = twRegistrationNumber.defaults;

			categoryID = (d?(d.category?(d.category._id||categoryID):categoryID):categoryID);

			twApi(
				"registrationNumber/list",
				{ "category" : { "_id" : categoryID } },
				function(regNums){
					twRegistrationNumber.fields.bind(categoryID, regNums, callback);
				}
			);
		},
		bind : function(categoryID, regNums, callback){
			var ids = twRegistrationNumber.ids;
			var d = twRegistrationNumber.defaults;

			twRegistrationNumber.fields.list = [];
			for(var x in regNums.response){
				if(twRegistrationNumber.requiredConfig=="all"||twRegistrationNumber.requiredConfig=="none"){
					regNums.response[x].required = (twRegistrationNumber.requiredConfig=="all");
				}

				if(regNums.response[x].required){
					eval('var v = ' + regNums.response[x].validator);
				} else {
					eval(
						"var v = function(vl){\n"
							+"var a="+regNums.response[x].validator+";\n"
							+"if(is.not.empty(vl)){ return a(vl); }\n"
							+"else { return true; }\n"
						+"}"
					);
				}
				var value = "";

				if(d){
					for(var y in d.numbers){
						if(regNums.response[x]._id == d.numbers[y]._id){ value = d.numbers[y].value; break; }
					}
				}

				twRegistrationNumber.fields.list.push({ 
					"id" : ids.replacer.main+"_regNum_"+regNums.response[x]._id, 
					"name" : regNums.response[x]._id,
					"main" : regNums.response[x].main,
					"category_id" : categoryID,
					"view" : 'textmask',
					"label" : regNums.response[x].label,
					"labelPosition" : "top",
					"placeholder" : regNums.response[x].placeholder,
					"value" : value,
					"validate" : v,
					"required" : regNums.response[x].required,
					"inputmask" : regNums.response[x].mask
				});
			}
			if(typeof callback=='function'){ callback(); }
		},
		getValues : function(){
			var r = {
				category : { _id : null },
				main : {},
				numbers : []
			};
			var list = twRegistrationNumber.fields.list;
			for(var x in list){
				r.category._id = list[x].category_id;
				var vl = $$(list[x].id).getValue();
				if(!list[x].validate(vl)||vl==""){ vl = null; }
				var n = {
					"_id" : list[x].name,
					"label" : list[x].label,
					"main" : list[x].main,
					"value" : vl
				};
				r.numbers.push(n);
				if(list[x].main){ r.main = n; }
			}
			return webix.copy(r);
		}
	}
};