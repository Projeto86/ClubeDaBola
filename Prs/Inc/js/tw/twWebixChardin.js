//webix hack for chardin.js use

var twWebixChardin = function(obj){
	if(typeof obj=='object' && obj){
		if(obj.chardin){
			if(!obj.on){ obj.on = {} }
			obj.on.onBeforeRender = function(objItem){
				if(!!obj.chardin.text&&!!obj.chardin.position){
					var x = objItem.template.toString();
					x = x.replace('<div ', '<div data-intro=\\"'+obj.chardin.text+'\\" data-position=\\"'+obj.chardin.position+'\\" ');
					eval('objItem.template = ' + x);
				}
			}
		}
		for(var a in obj){ if(typeof obj[a] == 'object' && obj[a]){ twWebixChardin(obj[a]); } }
	}
}

if(twGlobal){
	if(twGlobal.ui){
		if(twGlobal.ui.list){
			for(var x in twGlobal.ui.list){
				twWebixChardin(twGlobal.ui.list[x]);
			}
		}
	}
}