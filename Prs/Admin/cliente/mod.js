var adm_cliente_mod = {
	id : "adm_cliente_mod",
	view:"window",
	modal:true,
	width:860,
	position:"center",
	head: {
		view:"toolbar",
		cols:[
			{ view:"label", label: 'Editando cliente' },
			{ view:"icon", icon:"close", hotkey:"esc", align: 'right', click:function(){ $$("adm_cliente_mod").close(); } }
		]
	},
	body: {
		id : 'adm_cliente_mod_form',
		view : 'form',
		on : { onChange : function(){ $$("adm_cliente_mod").config.confirmBeforeClose = true; } },
		rows : [
			{
				margin : 10,
				cols : [
					{
						id : 'adm_cliente_mod_form_name',
						name : 'name',
						view : 'text',
						label : 'Nome:',
						labelPosition:"top",
						placeholder : 'Digite o nome do cliente',
						required : true,
						validate:"isNotEmpty"
					},
					{
						id : 'adm_cliente_mod_form_email',
						name : 'email',
						view : 'text',
						label : 'E-mail:',
						labelPosition:"top",
						placeholder : 'Digite o e-mail do cliente',
						required : true,
						validate:"isNotEmpty"
					}
				]
			},
			{
				margin : 10,
				cols : [
					{
		                id : 'adm_cliente_mod_form_tel',
		                name : 'tel',
		                view : 'text',
		                label : 'Telefone:',
		                labelPosition:"top",
		                placeholder : 'Digite o telefone do cliente',
		                required : true,
		                validate:"isNotEmpty"
		            },
					{
						id : 'adm_cliente_mod_form_doc',
						name : 'doc',
						view : 'text',
						label : 'CPF/CNPJ:',
						labelPosition:"top",
						placeholder : 'Digite o CPF/CNPJ do cliente',
						required : true,
						validate:"isNotEmpty"
					}
				]
			},
			{
				rows : [
					{
						margin : 10,
						cols:[
							{
								id : 'adm_cliente_mod_form_cep',
								name : 'cep',
								view : 'text',
								label : 'CEP:',
								labelPosition:"top",
								width : 100,
								placeholder : "99999999",
								required : true,
								validate:"isNotEmpty"
							},
							{
								id : 'adm_cliente_mod_form_estado',
								name : 'estado',
								view : 'text',
								label : 'Estado:',
								labelPosition:"top",
								placeholder : 'Ex: Sao Paulo',
								required : true,
								width : 275,
								validate:"isNotEmpty"
							},
							{
								id : 'adm_cliente_mod_form_cidade',
								name : 'cidade',
								view : 'text',
								label : 'Cidade:',
								labelPosition:"top",
								placeholder : 'Ex: Santos',
								required : true,
								validate:"isNotEmpty"
							},
							{
								id : 'adm_cliente_mod_form_bairro',
								name : 'bairro',
								view : 'text',
								label : 'Bairro:',
								labelPosition:"top",
								placeholder : 'Ex: Gonzaga',
								width: 200,
								required : true,
								validate:"isNotEmpty"
							}
						]
					},
					{ view : 'spacer', height: 5 },
					{
						margin : 10,
						cols:[
							{
								id : 'adm_cliente_mod_form_endereco',
								name : 'endereco',
								view : 'text',
								label : 'Endereco:',
								labelPosition:"top",
								placeholder : 'Ex: Avenida Ana Costa',
								width: 388,
								required : true,
								validate:"isNotEmpty"
							},
							{
								id : 'adm_cliente_mod_form_numero',
								name : 'numero',
								view : 'text',
								label : 'Numero',
								labelPosition:"top",
								placeholder : 'Ex: 253',
								required : true,
								validate:"isNotEmpty"
							},
							{
								id : 'adm_cliente_mod_form_complemento',
								name : 'complemento',
								view : 'text',
								label : 'Complemento:',
								labelPosition:"top",
								placeholder : 'Ex: Ap 61',
								width: 200,
								required : true,
								validate:"isNotEmpty"
							},
						]
					}
				]
			},
			{ view : 'spacer', height: 10 },
			{
				cols : [
					{
						view : 'button',
						type : "danger",
						width : 150,
						label: 'Deletar',
						click : function(){
							webix.confirm({
								type:"confirm-warning",
								width: "300px",
								text: 'Realmente deseja excluir esse cliente?',
								ok: 'Sim',
								cancel: 'Não',
								callback:function(r){
									if(r){
										var id = adm_cliente_mod.global.id;
	                                    ClienteP86.excluir(id,function(retorno){
	                                        if (retorno) {
	                                            adm_cliente.load.customer();
	                                            $$("adm_cliente_mod").close(true);
	                                            webix.alert({
	                                                type:"alert-warning",
	                                                text: 'Cliente deletado com sucesso!',
	                                                ok: 'OK'
	                                            });
	                                        }
	                            		});
									}
								}
							});
						}
					},
					{},
					{
						view : 'button',
						type : "form",
						width: 150,
						label: 'Alterar',
						on : {
							onAfterRender : function(){ twMain.hotkey($$(this),"enter"); },
							onItemClick : function(){
								var form = $$('adm_cliente_mod_form');
								if( form.validate() ){
									var fields = form.getValues();
									var id = adm_cliente_mod.global.id;
                                    ClienteP86.alterar(id,fields.name,fields.email,fields.tel,fields.doc,fields.cep,fields.estado,fields.cidade,fields.bairro,fields.endereco,fields.numero,fields.complemento,function(retorno){
                                        if (retorno) {
                                            adm_cliente.load.customer();
                                            $$("adm_cliente_mod").close(true);
                                            webix.alert({
                                                type:"alert-warning",
                                                text: 'Cliente alterado com sucesso!',
                                                ok: 'OK'
                                            });
                                        }
                            		});
								}
							}
						}
					}
				]
			}
		]
	},
	global : {
		'id' : null
	},
	open : function(id){
		webix.ui(webix.copy(adm_cliente_mod)).show();
		$$('adm_cliente_mod_form_name').focus();

		adm_cliente_mod.global.id = id;

		ClienteP86.pegar(id,null,function(retorno){
			$$('adm_cliente_mod_form').setValues({
				name : retorno.rows[0].data[retorno.col.tx_nome],
				email : retorno.rows[0].data[retorno.col.tx_email],
				tel : retorno.rows[0].data[retorno.col.nu_telefone],
				doc : retorno.rows[0].data[retorno.col.nu_documento],
				cep : retorno.rows[0].data[retorno.col.nu_end_cep],
				estado : retorno.rows[0].data[retorno.col.tx_end_estado],
				cidade : retorno.rows[0].data[retorno.col.tx_end_cidade],
				bairro : retorno.rows[0].data[retorno.col.tx_end_bairro],
				endereco : retorno.rows[0].data[retorno.col.tx_end_endereco],
				numero : retorno.rows[0].data[retorno.col.nu_end_numero],
				complemento : retorno.rows[0].data[retorno.col.tx_end_complemento]
			});
		});
	}
};
