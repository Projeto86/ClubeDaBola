var HorarioP86 = {
	listar : function(colunas, funcaoRetorno){
		var query = new twJscSistemaDados.procedure('up_bola_horario_list');
		query.toJson(
			colunas,
			function(json){
				if(json!==null){
					for ( var x in json.rows) {
						json.rows[x].data[json.col.tx_ini] = json.rows[x].data[json.col.tx_ini].toString().substring(0,5);
						json.rows[x].data[json.col.tx_fim] = json.rows[x].data[json.col.tx_fim].toString().substring(0,5);

					}
					funcaoRetorno(json);
				}
			}
		);
	},
	pegar : function(id, colunas, funcaoRetorno){
		var query = new twJscSistemaDados.procedure('up_bola_horario_list');
		query.adicionar('@id', id);
		query.toJson(
			colunas,
			function(json){
				if(json!==null){
					funcaoRetorno(json);
				}
			}
		);
	},
	adicionar : function(fl_tipo,hr_ini,hr_fim,funcaoRetorno){
		var query = new twJscSistemaDados.procedure('up_bola_horario_add');
		query.adicionar('@fl_tipo', fl_tipo);
		query.adicionar('@hr_ini', hr_ini);
		query.adicionar('@hr_fim', hr_fim);

		query.toString(
			function(retornoID){
				//console.log('ClienteP86.adicionar', retornoID);
				if(retornoID!==null){
					//twJscSistemaUI.alerta.statusOK('Usu&aacute;rio cadastrado', 'Novo usu&aacute;rio cadastrado com sucesso!<br><br>Senha tempor&aacute;ria: 123456<br><br>Ser&aacute; solicitado que o usu&aacute;rio altere a senha no primeiro acesso.');
					funcaoRetorno(retornoID);
				}
			}
		);
	},
	alterar : function(fl_tipo,hr_ini,hr_fim,funcaoRetorno){
		var query = new twJscSistemaDados.procedure('up_bola_horario_mod');
		query.adicionar('@id', id);
		query.adicionar('@fl_tipo', fl_tipo);
		query.adicionar('@hr_ini', hr_ini);
		query.adicionar('@hr_fim', hr_fim);

		query.execute(
			function(retorno){
				if(retorno!==null){
					funcaoRetorno(retorno);
				}
			}
		);
	},
	excluir : function(id, funcaoRetorno){
		var query = new twJscSistemaDados.procedure('up_bola_horario_del');
		query.adicionar('@id', id);
		query.execute(
			function(retorno){
				if(retorno!==null){
					funcaoRetorno(retorno);
				}
			}
		);
	}
};
