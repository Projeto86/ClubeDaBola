var twColor = {
	popup : function(){



		/*var cells = this.data.map(function(palette){
			return {
				'view' : 'dataview',
				'header' : '<span style="font-size:12px">' + lang_base_colors[palette.id].name + '</span>',
				'yCount' : 5,
				'template' : function(obj,commom){
					var h = '<div class="colorBox" style="background:#'+obj.hex+';color:#'+obj.fontColor+';"><div>';
					h+=(palette.group?palette.group+'<br/>':'');
					h+=lang_base_colors[palette.id]['color'][obj.code];
					h+='</div></div>';
					return h;
				},
				'type': {
					'width': 90,
					'height': 90
				},
				'click' : function(id){
					var popup = this.getParentView().getParentView().getParentView();
					var cp = $$(popup.config.master);
					var color = this.getItem(id);
					delete color.id;
					color.hex = '#' + color.hex.toLowerCase();
					cp.setValue(color.hex);
					cp.define('color', {
						'palette' : color.palette,
						'code' : color.code,
						'hex' : color.hex,
						'rgb' : (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color.hex)).slice(1).map(function(h){ return parseInt(h, 16); })
					});
					popup.hide();
				},
				'data' : palette.colors.map(function(color){
					color.palette = palette.id;
					return color;
				})
			};
		});*/

		return {
			'view' : "popup",
			'maxWidth' : 580,
			'maxHeight' : 580,
			'css' : 'colorpicker',
			'body' : {
				'rows' : [
					{
						'view' : 'dataview',
						'yCount' : 16,
						'height' : 140,
						'type': {
							'width': 33,
							'height': 33
						},
						'template' : function(obj,commom){ return '<div style="background:#'+obj.id+';width:70px;height:70px"></div>'; },
						'click' : function(id){
							alert(id);
						},
						'data' : [
							{ 'id' : 'FFFFFF' },
							{ 'id' : 'C0C0C0' },
							{ 'id' : '808080' },
							{ 'id' : '000000' },
							{ 'id' : 'FF0000' },
							{ 'id' : '800000' },
							{ 'id' : 'FFFF00' },
							{ 'id' : '808000' },
							{ 'id' : '00FF00' },
							{ 'id' : '008000' },
							{ 'id' : '00FFFF' },
							{ 'id' : '008080' },
							{ 'id' : '0000FF' },
							{ 'id' : '000080' },
							{ 'id' : 'FF00FF' },
							{ 'id' : '800080' }
						]
					},
					{}
					/*,
					{
						'view': 'tabview',
						'multiview' : { 'animate' : false } ,
						'cells' : cells.slice()
					}*/
				]
			},
			'on' : {
				'onShow' : function(){
					var tabview = this.getChildViews()[0].getChildViews();
					tabview[0].setValue(tabview[1].getActiveId());
				},
				'onHide' : function(){
					var resizeDigger = function(view){
						view.resize();
						if(view.getChildViews()){ view.getChildViews().forEach(function(child){ resizeDigger(child); }); }
					};
					resizeDigger(this);
				}
			}
		};
	}
};