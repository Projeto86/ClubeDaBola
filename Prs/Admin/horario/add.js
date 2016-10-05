var adm_horario_add = {
	id : "adm_horario_add",
	view:"window",
	modal:true,
	width:400,
	position:"center",
	head: {
		view:"toolbar",
		cols:[
			{ view:"label", label: 'Adicionando horario' },
			{ view:"icon", icon:"close", hotkey:"esc", align: 'right', click:function(){ $$("adm_horario_add").close(); } }
		]
	},
	body: {
		id : 'adm_horario_add_form',
		view : 'form',
		on : { onChange : function(){ $$("adm_horario_add").config.confirmBeforeClose = true; } },
		rows : [
			{
				id : 'adm_horario_add_form_tipo',
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
				id : 'adm_horario_add_form_inicio',
				name : 'inicio',
				view : 'text',
				label : 'Horario de inicio:',
				labelPosition:"top",
				placeholder : 'Digite o horario de inicio',
				required : true,
				validate:"isNotEmpty"
			},
			{
				id : 'adm_horario_add_form_fim',
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
				cols: [
					{},
					{
						view : 'button',
						type : "form",
						width: 150,
						label: 'Adicionar',
						on : {
							onAfterRender : function(){ twMain.hotkey($$(this),"enter"); },
							onItemClick : function(){
								var form = $$('adm_horario_add_form');
								if( form.validate() ){
									var fields = form.getValues();

                                    HorarioP86.adicionar(fields.tipo,fields.inicio,fields.fim,function(retorno){
                                        if (retorno == 'ok') {
                                            adm_horario.load.horario();
                                            $$("adm_horario_add").close(true);
                                            webix.alert({
                                                type:"alert-warning",
                                                text: 'Horario adicionado com sucesso!',
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
	open : function(){
		webix.ui(webix.copy(adm_horario_add)).show();
		$$('adm_horario_add_form_tipo').focus();
	}
};
