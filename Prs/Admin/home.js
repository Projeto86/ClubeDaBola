var adm_home = {
	id : 'adm_home',
	css : 'homeBg',
	type : 'space',
	rows : [
		{
			id:"Base_Home_List",
			view:"dataview",
			borderless:true,
			css : "homeBox",
			type: { 'height': 95, width : 95 },
			template : function(obj){
				var color = (obj.color?obj.color:'');
				var h = '' +
						'<div class="desktopicon" style="opacity: 1; transform: scale(1, 1);" id="i'+obj.id+'">' +
						'<div class="icon blue"><span class="webix_icon fa-'+obj.icon+'"></span></div>' +
						'<div class="desktopicon_title">' +
							'<div class="l">'+obj.name+'</div><div class="r"></div>' +
						'</div>' +
					'</div>';
				return h;
			},
			data:[],
			click : function(id){
				var l = id ;
				_main.go(l);
			}
		},
		{ id : 'Base_Home_Detail', rows : [] }
	],
	go : function(callback){
		$$(adm_home.id).show();

		var list = [];

		for ( var x in _main.menu ){
			if ( _main.menu[x].length > 0 ){
				for ( var y in _main.menu[x] ){
					if ( _main.menu[x][y].name &&  _main.menu[x][y].icon ){
						list.push(_main.menu[x][y]);
					}
				}
			}
		}

		console.log(list);
		$$('Base_Home_List').clearAll();
		$$('Base_Home_List').define('data', list);
		if(typeof callback=='function'){ callback(); }
		/*
		p86BaProduto.listar(null, function(r){
			console.log(r);
		});
		*/

	}
};
