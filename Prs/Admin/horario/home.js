var adm_horario = {
	id : "adm_horario",
	css : 'homeBg',
	type : 'space',
	rows : [
		{
			margin: 5,
			cols : [
				{
					id : 'adm_horario_btAdd',
					view : 'button',
					type : 'iconButton',
					icon : 'plus',
					label : 'Adicionar',
					width : 110,
					click : function(){
						$('button').blur();
						adm_horario_add.open();
					}
				},
				{
					view: 'button',
					type: 'iconButton',
					icon: 'refresh',
					width: 110,
					label: 'Atualizar',
					click: function() {
						this.blur();
						adm_horario.load.horario();
					}
				},
				{}
			]
		},
		{
			id : 'adm_horario_List',
			view : 'datatable',
			scroll:'y',
			columns:[
				{
					id: 'fl_tipo',
					header : 'Dia da semana',
					fillspace : true,
					sort : 'string',
					template : function (obj) {
						switch(obj.fl_tipo) {
							case 1:
								return 'Segunda-feira';
							case 2:
								return 'Terca-feira';
							case 3:
								return 'Quarta-feira';
							case 4:
								return 'Quinta-feira';
							case 5:
								return 'Sexta-feira';
							case 6:
								return 'Sabado';
							case 7:
								return 'Domingo';

						}
					}
				},
				{
					id: 'hr_ini',
					header : 'Horario de inicio',
					fillspace : true,
					sort : 'date'
				},
				{
					id: 'hr_fim',
					header : 'Horario de termino',
					fillspace : true,
					sort : 'date'
				}
			],
			data: [],
			on : {
				onItemClick : function(id){
					adm_horario_mod.open(id.toString());
				}
			}
		}
	],
	load : {
		horario : function () {
			var table = $$('adm_horario_List');
			table.clearAll();
			var list = [];


			HorarioP86.listar(null,function(retorno){
				for (var x in retorno.rows) {
					list.push({
						'id' : retorno.rows[x].id,
						'fl_tipo' : retorno.rows[x].data[retorno.col.fl_tipo],
						'hr_ini' : retorno.rows[x].data[retorno.col.tx_ini],
						'hr_fim' : retorno.rows[x].data[retorno.col.tx_fim]
					});
				}
				table.parse(list);
			});

		}
	},
	go : function(){
		$$('adm_horario').show();
		adm_horario.load.horario();
	}
};
