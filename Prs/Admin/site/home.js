var adm_site = {
	id : "adm_site",
	css : 'homeBg',
	type : 'space',
	rows : [
		{
			margin : 5,
			cols : [
				{
					id : 'adm_site_Selected_Delete',
					view : 'button',
					type : "iconButton",
					icon : 'trash',
					css : 'danger',
					width : 37,
					tooltip : 'Delete',
					disabled : true,
					click : function(){
						var selected = adm_site.selected;
						if(selected.length<1) return;
						webix.confirm({
							type:"confirm-warning",
							text: ("{{qty}} foto(s) selecionada(s)").replace("{{qty}}", selected.length),
							ok: 'OK',
							cancel: 'Cancel',
							callback:function(r){
								if(r){
									/*
									twApi(
										"xxx/movie/pictures/delete",
										{ "_id" : xxxMovies_Movies_Mod_Home_Control.globals._id, "pictures" : selected },
										function(r){
											adm_site.gridControl.bind(function(){
												webix.alert({
													type:"alert-warning",
													text: lang_xxxMovies_Movies_Mod_Tab_Pictures_Home.remove.confirm.done,
													ok: langIndex.confirm.edit.ok
												});
											});
										}
									);
									*/
								}
							}
						});
					}
				},
				{
					id : 'adm_site_Selected_Main',
					view : 'button',
					type : "iconButton",
					icon : 'star',
					width : 37,
					tooltip : 'Principal',
					disabled : true,
					click : function(){
						var selected = adm_site.selected;
						if(selected.length!=1) return;
						/*
						twApi(
							"xxx/movie/pictures/update",
							{ "_id" : selected[0], "main" : true },
							function(r){
								adm_site.gridControl.bind(function(){
									webix.alert({
										type:"alert-warning",
										text: lang_xxxMovies_Movies_Mod_Tab_Pictures_Home.changeMain.done,
										ok: langIndex.confirm.edit.ok
									});
								});
							}
						);
						*/
					}
				},
				{
					id : 'adm_site_Selected',
					view: 'label',
					label : '0 imagens selecionadas',
					height: 30
				},
				{
					id: 'adm_site_btAdd',
					view : 'button',
					type : "form",
					width: 160,
					label: 'Adicionar',
					click : function(){
						adm_upload.open();
					}
				}
			]
		},
		{
			id : 'adm_site_dataview',
			view : "dataview",
			template : function(obj) {
				var htm = '<div align="center" style="line-height:initial; position:relative;">' +
							'<img id="pic_'+obj.id+'" src="'+obj.pictureThumb+'" />' +
							'<div style="top:96px; left: 5px; position: absolute; z-index:10">' +
								'<input type="checkbox" id="cbx_'+obj.id+'" value="'+obj.id+'" onclick="this.checked=!this.checked;" />' +
							'</div>' +
							'<div style="top:79px; left: 79px; position: absolute; z-index:10">' +
								'<span class="fa-stack fa-lg" onclick="adm_site.zoom=true;"><i class="fa fa-square fa-stack-2x" style="opacity:0.6"></i><i class="fa fa-search-plus fa-stack-1x fa-inverse"></i></span>' +
							'</div>' +
						'</div>';
				return htm;
			},
			type:{ width:140, height: 125 },
			on:{
				onItemClick : function(id){
					var item = this.getItem(id);
					if(adm_site.zoom){
						adm_site.zoom = false;
						xxxMovies_Movies_Mod_Tab_Pictures_Mod_Control.open(item._id, item.pictureZoom, item.main);
						return;
					}
					var checkbox = document.getElementById('cbx_'+id);
					checkbox.checked = !checkbox.checked;
					var selected = adm_site.selected;
					var pos = selected.indexOf(id.toString());
					if(checkbox.checked && pos < 0){ selected.push(id.toString()); }
					else if(!checkbox.checked && pos >=0){ selected.splice(pos,1); }
					$("#pic_"+id).fadeTo("slow", (checkbox.checked?0.3:1));
					var prefix = "adm_site_Selected";
					$$(prefix).define('label', selected.length + ' ' + 'imagens selecionadas');
					$$(prefix).refresh();
					if(!selected.length) $$(prefix+"_Delete").disable(); else $$(prefix+"_Delete").enable();
					if(selected.length!=1) $$(prefix+"_Main").disable(); else $$(prefix+"_Main").enable();
				}
			}
		}
	],
	gridControl : {
		bind : function(callback){
			adm_site.selected = [];
			var prefix = "adm_site_Selected";
			$$(prefix).define('label', '0 ' + 'imagens selecionadas');
			$$(prefix).refresh();
			//$$(prefix+"_Delete").disable();
			//$$(prefix+"_Main").disable();
			/*
			twApi(
				"xxx/movie/pictures/list",
				{ "_id" : xxxMovies_Movies_Mod_Home_Control.globals._id },
				function(r){
					if(r.status==200){
						list = [];

						for (var x in r.response.list) {
							var pictureThumbID = "";
							var pictureZoomID = "";

							if (r.response.list[x].sizes) {
								pictureThumbID = r.response.list[x].sizes["120x120"];
								pictureZoomID = r.response.list[x].sizes["600x600"];
							}

							list.push ({
								_id : r.response.list[x]._id,
								id : r.response.list[x]._id,
								pictureThumb :  pictureThumbID,
								pictureZoom : pictureZoomID,
								main : (r.response.main._id == r.response.list[x]._id)
							});
						}

						$$('adm_site_dataview').clearAll();
						$$('adm_site_dataview').parse(list);
						if (r.response.main) {
							$$('adm_site_dataview').select(r.response.main._id);
						}
						if(typeof callback=='function'){ callback(); }
					}
				}
			);
			*/
		},
		list : []
	},
	zoom : false,
	selected : [],
	go : function(callback){
		console.log('kk');
		$$("adm_site").show();
		adm_site.gridControl.list = [];
		adm_site.zoom = false;
		adm_site.selected = [];

		adm_site.gridControl.bind(function(){
			if(typeof callback=='function'){ callback(); }
		});
	}
};
