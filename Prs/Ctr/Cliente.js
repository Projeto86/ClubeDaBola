var ClienteP86 = {
	listar : function(colunas, funcaoRetorno){
		var query = new twJscSistemaDados.procedure('up_lacos_ba_produto_list');
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
		var query = new twJscSistemaDados.procedure('up_lacos_ba_produto_list');
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
	adicionar : function(tx_nome,tx_mini_descricao,tx_descricao,tx_url_principal,tx_url_secundaria,nu_prazo_dias,nu_qtd_estoque,vl_peso,vl_venda,vl_custo,funcaoRetorno){
		var query = new twJscSistemaDados.procedure('up_lacos_ba_produto_add');
		query.adicionar('@tx_nome', tx_nome);
		query.adicionar('@tx_mini_descricao', tx_mini_descricao);
		query.adicionar('@tx_descricao', tx_descricao);
		query.adicionar('@tx_url_principal', tx_url_principal);
		query.adicionar('@nu_prazo_dias', nu_prazo_dias);
		query.adicionar('@vl_venda', vl_venda);

		if(tx_url_secundaria)	{ query.adicionar('@tx_url_secundaria', tx_url_secundaria); }
		if(nu_qtd_estoque) 		{ query.adicionar('@nu_qtd_estoque', nu_qtd_estoque); }
		if(vl_peso) 			{ query.adicionar('@vl_peso', vl_peso); }
		if(vl_custo) 			{ query.adicionar('@vl_custo', vl_custo); }

		query.toString(
			function(retornoID){
				console.log('baProduto.adicionar', retornoID);
				if(retornoID!==null){
					//twJscSistemaUI.alerta.statusOK('Usu&aacute;rio cadastrado', 'Novo usu&aacute;rio cadastrado com sucesso!<br><br>Senha tempor&aacute;ria: 123456<br><br>Ser&aacute; solicitado que o usu&aacute;rio altere a senha no primeiro acesso.');
					funcaoRetorno(retornoID);
				}
			}
		);
	},
	alterar : function(id,tx_nome,tx_mini_descricao,tx_descricao,tx_url_principal,tx_url_secundaria,nu_prazo_dias,nu_qtd_estoque,vl_peso,vl_venda,vl_custo,funcaoRetorno){
		var query = new twJscSistemaDados.procedure('up_lacos_ba_produto_mod');
		query.adicionar('@id', id);
		query.adicionar('@tx_nome', tx_nome);
		query.adicionar('@tx_mini_descricao', tx_mini_descricao);
		query.adicionar('@tx_descricao', tx_descricao);
		query.adicionar('@tx_url_principal', tx_url_principal);
		query.adicionar('@nu_prazo_dias', nu_prazo_dias);
		query.adicionar('@vl_venda', vl_venda);

		if(tx_url_secundaria)	{ query.adicionar('@tx_url_secundaria', tx_url_secundaria); }
		if(nu_qtd_estoque) 		{ query.adicionar('@nu_qtd_estoque', nu_qtd_estoque); }
		if(vl_peso) 			{ query.adicionar('@vl_peso', vl_peso); }
		if(vl_custo) 			{ query.adicionar('@vl_custo', vl_custo); }

		query.execute(
			function(retorno){
				if(retorno!==null){
					funcaoRetorno();
				}
			}
		);
	},
	excluir : function(id, funcaoRetorno){
		var query = new twJscSistemaDados.procedure('up_lacos_ba_produto_del');
		query.adicionar('@id', id);
		query.execute(
			function(retorno){
				if(retorno!==null){
					funcaoRetorno();
				}
			}
		);
	}
}
