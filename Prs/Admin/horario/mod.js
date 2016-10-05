var adm_horario_mod = {
	id : "adm_horario_mod",
	view:"window",
	modal:true,
	width:860,
	position:"center",
	head: {
		view:"toolbar",
		cols:[
			{ view:"label", label: 'Editando horario' },
			{ view:"icon", icon:"close", hotkey:"esc", align: 'right', click:function(){ $$("adm_horario_mod").close(); } }
		]
	},
	body: {
		id : 'adm_horario_mod_form',
		view : 'form',
		on : { onChange : function(){ $$("adm_horario_mod").config.confirmBeforeClose = true; } },
		rows : [
			{
				id : 'adm_horario_mod_form_tipo',
				name : 'tipo',
				view : 'richselect',
				label : 'Dia da semana:',
				labelPosition:"top",
				placeholder : 'Selecione o dia da semana',
				required : true,
				validate:"isNotEmpty",
				options : [
					{id:1, value: 'Segunda-feira'},
					{id:2, value: 'Terca-feira'},
					{id:3, value: 'Quarta-feira'},
					{id:4, value: 'Quinta-feira'},
					{id:5, value: 'Sexta-feira'},
					{id:6, value: 'Sabado'},
					{id:7, value: 'Domingo'}
				]
			},
			{
				id : 'adm_horario_mod_form_inicio',
				name : 'inicio',
				view : 'text',
				label : 'Horario de inicio:',
				labelPosition:"top",
				placeholder : 'Digite o horario de inicio',
				required : true,
				validate:"isNotEmpty"
			},
			{
				id : 'adm_horario_mod_form_fim',
				name : 'fim',
				view : 'text',
				label : 'Horario de termino:',
				labelPosition:"top",
				placeholder : 'Digite o horario de termino',
				required : true,
				validate:"isNotEmpty"
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
								text: 'Realmente deseja excluir esse horario?',
								ok: 'Sim',
								cancel: 'Não',
								callback:function(r){
									if(r){
										var id = adm_horario_mod.global.id;
	                                    HorarioP86.excluir(id,function(retorno){
	                                        if (retorno) {
	                                            adm_horario.load.horario();
	                                            $$("adm_horario_mod").close(true);
	                                            webix.alert({
	                                                type:"alert-warning",
	                                                text: 'Horario deletado com sucesso!',
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
								var form = $$('adm_horario_mod_form');
								if( form.validate() ){
									var fields = form.getValues();
									var id = adm_horario_mod.global.id;
                                    HorarioP86.alterar(id,fields.tipo,fields.inicio,fields.fim,function(retorno){
                                        if (retorno) {
                                            adm_horario.load.horario();
                                            $$("adm_horario_mod").close(true);
                                            webix.alert({
                                                type:"alert-warning",
                                                text: 'Horario alterado com sucesso!',
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
		webix.ui(webix.copy(adm_horario_mod)).show();
		$$('adm_horario_mod_form_name').focus();

		adm_horario_mod.global.id = id;

		HorarioP86.pegar(id,null,function(retorno){
			$$('adm_horario_mod_form').setValues({
				tipo : retorno.rows[0].data[retorno.col.fl_tipo],
				inicio : retorno.rows[0].data[retorno.col.hr_ini],
				fim : retorno.rows[0].data[retorno.col.hr_fim],
			});
		});
	}
};
