var ClienteP86 = {
	listar : function(colunas, funcaoRetorno){
		var query = new twJscSistemaDados.procedure('up_bola_cliente_list');
		query.toJson(
			colunas,
			function(json){
				if(json!==null){					
					funcaoRetorno(json);
				}
			}
		);
	},
	pegar : function(id, colunas, funcaoRetorno){
		var query = new twJscSistemaDados.procedure('up_bola_cliente_list');
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
	adicionar : function(tx_nome,tx_email,nu_telefone,nu_documento,nu_end_cep,tx_end_estado,tx_end_cidade,tx_end_bairro,tx_end_endereco,nu_end_numero,tx_end_complemento,funcaoRetorno){
		var query = new twJscSistemaDados.procedure('up_bola_cliente_add');
		query.adicionar('@tx_nome', tx_nome);
		query.adicionar('@tx_email', tx_email);
		query.adicionar('@nu_telefone', nu_telefone);
		query.adicionar('@nu_documento', nu_documento);
		query.adicionar('@nu_end_cep', nu_end_cep);
		query.adicionar('@tx_end_estado', tx_end_estado);
		query.adicionar('@tx_end_cidade', tx_end_cidade);
		query.adicionar('@tx_end_bairro', tx_end_bairro);
		query.adicionar('@tx_end_endereco', tx_end_endereco);
		query.adicionar('@nu_end_numero', nu_end_numero);
		query.adicionar('@tx_end_complemento', tx_end_complemento);

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
	alterar : function(id,tx_nome,tx_email,nu_telefone,nu_documento,nu_end_cep,tx_end_estado,tx_end_cidade,tx_end_bairro,tx_end_endereco,nu_end_numero,tx_end_complemento,funcaoRetorno){
		var query = new twJscSistemaDados.procedure('up_bola_cliente_mod');
		query.adicionar('@id', id);
		query.adicionar('@tx_nome', tx_nome);
		query.adicionar('@tx_email', tx_email);
		query.adicionar('@nu_telefone', nu_telefone);
		query.adicionar('@nu_documento', nu_documento);
		query.adicionar('@nu_end_cep', nu_end_cep);
		query.adicionar('@tx_end_estado', tx_end_estado);
		query.adicionar('@tx_end_cidade', tx_end_cidade);
		query.adicionar('@tx_end_bairro', tx_end_bairro);
		query.adicionar('@tx_end_endereco', tx_end_endereco);
		query.adicionar('@nu_end_numero', nu_end_numero);
		query.adicionar('@tx_end_complemento', tx_end_complemento);

		query.execute(
			function(retorno){
				if(retorno!==null){
					funcaoRetorno(retorno);
				}
			}
		);
	},
	excluir : function(id, funcaoRetorno){
		var query = new twJscSistemaDados.procedure('up_bola_cliente_del');
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
