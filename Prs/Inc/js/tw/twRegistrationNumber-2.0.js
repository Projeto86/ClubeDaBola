
var twRegistrationNumber2 = {
	defaults : null,
	labels : {
		fieldset : ""
	},
	ids : {
		replacer : { main : "" },
		category : ""
	},
	requiredConfig : "default",
	build : function(registrationNumberObj, fieldsetLabel, replaceObjID, callback){
		twRegistrationNumber2.ids.replacer.main = replaceObjID;
		twRegistrationNumber2.ids.category = twRegistrationNumber2.ids.replacer.main+"_registrationNumberCategory_id";

		if(fieldsetLabel){ twRegistrationNumber2.labels.fieldset = fieldsetLabel; }

		if(typeof twRegistrationNumber2.requiredConfig=='undefined'){ twRegistrationNumber2.requiredConfig = "default"; }

		twRegistrationNumber2.fields.bind(
			registrationNumberObj._id,
			registrationNumberObj.numbers,
			function(){
				twRegistrationNumber2.render();
				twRegistrationNumber2.defaults = null;
				twRegistrationNumber2.requiredConfig = "default";
				if(typeof callback=='function'){ callback(); }
			}
		);
	},
	render : function(){
		var defaults = twRegistrationNumber2.defaults;

		var fs = {
			id : twRegistrationNumber2.ids.replacer.main+"_fieldset",
			view:"fieldset", 
			label: twRegistrationNumber2.labels.fieldset,
			body:{
				margin : 10,
				cols:[ {} ]
			}
		}

		fs.body.cols = webix.copy(twRegistrationNumber2.fields.list);

		webix.ui([webix.copy(fs)], $$(twRegistrationNumber2.ids.replacer.main));
	},
	fields : {
		list : [],
		bind : function(categoryID, regNums, callback){
			var ids = twRegistrationNumber2.ids;
			var d = twRegistrationNumber2.defaults;

			twRegistrationNumber2.fields.list = [];
			for(var x in regNums){
				if(twRegistrationNumber2.requiredConfig=="all"||twRegistrationNumber2.requiredConfig=="none"){
					regNums[x].required = (twRegistrationNumber2.requiredConfig=="all");
				}

				if(regNums[x].required){
					eval('var v = ' + regNums[x].validator);
				} else {
					eval(
						"var v = function(vl){\n"
							+"var a="+regNums[x].validator+";\n"
							+"if(is.not.empty(vl)){ return a(vl); }\n"
							+"else { return true; }\n"
						+"}"
					);
				}
				var value = "";

				if(d){
					for(var y in d.numbers){
						if(regNums[x]._id == d.numbers[y]._id){ value = d.numbers[y].value; break; }
					}
				}

				twRegistrationNumber2.fields.list.push({ 
					"id" : ids.replacer.main+"_regNum_"+regNums[x]._id, 
					"name" : regNums[x]._id,
					"main" : regNums[x].main,
					"category_id" : categoryID,
					"view" : 'textmask',
					"label" : regNums[x].label,
					"labelPosition" : "top",
					"placeholder" : regNums[x].placeholder,
					"value" : value,
					"validate" : v,
					"required" : regNums[x].required,
					"inputmask" : regNums[x].mask
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
			var list = twRegistrationNumber2.fields.list;
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