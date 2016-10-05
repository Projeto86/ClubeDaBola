var adm_cliente = {
	id : "adm_cliente",
	css : 'homeBg',
	type : 'space',
	rows : [
		{
			margin: 5,
			cols : [
				{
					id : 'adm_cliente_btAdd',
					view : 'button',
					type : 'iconButton',
					icon : 'plus',
					label : 'Adicionar',
					width : 110,
					click : function(){
						$('button').blur();
						adm_cliente_add.open();
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
						adm_cliente.load.cliente();
					}
				},
				{}
			]
		},
		{
			id : 'adm_cliente_List',
			view : 'datatable',
			scroll:'y',
			columns:[
				{
					id: 'tx_nome',
					header : 'Nome',
					fillspace : true
				},
				{
					id: 'tx_email',
					header : 'E-mail',
					fillspace : true
				},
				{
					id: 'nu_telefone',
					header : 'Telefone',
					fillspace : true
				},
				{
					id: 'nu_documento',
					header : 'CPF/CNPJ',
					fillspace : true
				}
			],
			data: [],
			on : {
				onItemClick : function(id){
					adm_cliente_mod.open(id.toString());
				}
			}
		}
	],
	load : {
		cliente : function () {
			var table = $$('adm_cliente_List');
			table.clearAll();
			var list = [];

			ClienteP86.listar(null,function(retorno){
				for (var x in retorno.rows) {
					list.push({
						'id' : retorno.rows[x].id,
						'tx_nome' : retorno.rows[x].data[retorno.col.tx_nome],
						'tx_email' : retorno.rows[x].data[retorno.col.tx_email],
						'nu_telefone' : retorno.rows[x].data[retorno.col.nu_telefone],
						'nu_documento' : retorno.rows[x].data[retorno.col.nu_documento],
					});
				}
				table.parse(list);
			});
		}
	},
	go : function(){
		$$('adm_cliente').show();
		adm_cliente.load.cliente();
	}
};
