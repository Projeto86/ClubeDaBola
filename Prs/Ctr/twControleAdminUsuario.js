
var twControleAdminUsuario = {

	listarRH : function(colunas, funcaoRetorno){
		var query = new twJscSistemaDados.procedure('up_ad_usuario_listar_pessoal');
		query.toJson(
			colunas,
			function(json){
				if(json!=null){
					funcaoRetorno(json);
				}
			}
		);
	},
	listar : function(colunas, funcaoRetorno){
		var query = new twJscSistemaDados.procedure('up_ad_usuario_listar');
		query.toJson(
			colunas,
			function(json){
				if(json!=null){
					funcaoRetorno(json);
				}
			}
		);
	},
	pegar : function(id, colunas, funcaoRetorno){
		var query = new twJscSistemaDados.procedure('up_ad_usuario_pegar');
		query.adicionar('@id', id);
		query.toJson(
			colunas,
			function(json){
				if(json!=null){
					funcaoRetorno(json);
				}
			}
		);
	},
	adicionar : function(nome, login, flDono, flIpLiberado, nuDesconto, pessoalID, funcaoRetorno){
		var query = new twJscSistemaDados.procedure('up_ad_usuario_adicionar');
		query.adicionar('@tx_nome', nome);
		query.adicionar('@tx_login', login);
		if(flDono){ query.adicionar('@fl_dono', 1); }
		if(flIpLiberado){ query.adicionar('@fl_ip_liberado', 1); }
		query.adicionar('@nu_desconto', nuDesconto);
		if(pessoalID!=null && pessoalID!=''){ query.adicionar('@id_rh_pessoal', pessoalID); }

		query.toString(
			function(retornoID){
				if(retornoID!=null){
					twJscSistemaUI.alerta.statusOK('Usu&aacute;rio cadastrado', 'Novo usu&aacute;rio cadastrado com sucesso!<br><br>Senha tempor&aacute;ria: 123456<br><br>Ser&aacute; solicitado que o usu&aacute;rio altere a senha no primeiro acesso.');
					funcaoRetorno(retornoID);
				}
			}
		);
	},
	alterar : function(id, nome, login, flDono, flIpLiberado, nuDesconto,pessoalID, funcaoRetorno){
		var query = new twJscSistemaDados.procedure('up_ad_usuario_alterar');
		query.adicionar('@id', id);
		query.adicionar('@tx_nome', nome);
		query.adicionar('@tx_login', login);
		if(flDono){ query.adicionar('@fl_dono', 1); }
		if(flIpLiberado){ query.adicionar('@fl_ip_liberado', 1); }
		query.adicionar('@nu_desconto', nuDesconto);
		if(pessoalID!=null && pessoalID!=''){ query.adicionar('@id_rh_pessoal', pessoalID); }
		query.execute(
			function(retorno){
				if(retorno!=null){
					twJscSistemaUI.alerta.statusOK('Dados alterados', 'Dados do cliente usu&aacute;rio alterados com sucesso!');
					funcaoRetorno();
				}
			}
		);
	},
	excluir : function(id, funcaoRetorno){
		var query = new twJscSistemaDados.procedure('up_ad_usuario_excluir');
		query.adicionar('@id', id);
		query.execute(
			function(retorno){
				if(retorno!=null){
					twJscSistemaUI.alerta.statusOK('Registro excluido', 'Cliente usu&aacute;rio excluido com sucesso!');
					funcaoRetorno();
				}
			}
		);
	},
	DescontoLogar : function(usuario, senha, funcaoRetorno){
		var query = new twJscSistemaDados.procedure('up_ad_usuario_login_desconto');
		query.adicionar('@tx_login', usuario);
		query.adicionar('@tx_senha_sha1', twJscSistemaCripto.sha1.hash(senha));
		query.toJson(null, function(json){ funcaoRetorno(json); });
	},
	conectado : function(){
		if(twControleAdminUsuario.dados.id > 0){
			return(true);
		} else {
			return(false);
		}
	},
	dados : {
		id : 0,
		nome : '',
		ehAdmin : false,
		ehDono : false,
		mudarSenha : false
	},
	logar : function(usuario, senha){
		var query = new twJscSistemaDados.procedure('up_ad_usuario_login');
		query.adicionar('@tx_login', usuario);
		query.adicionar('@tx_senha_sha1', twJscSistemaCripto.sha1.hash(senha));
		query.adicionar('@tx_ip', twJscSistemaNet.cliente.ip);
		query.toJson(
			null,
			function(json){
				if(json!=null){
					if(json.rows[0].id > 0 && json.rows[0].data[json.col.fl_logar] > 0 ){
						twControleAdminUsuario.dados.id = json.rows[0].id;
						twControleAdminUsuario.dados.nome = json.rows[0].data[json.col.tx_user_nome];

						if(json.rows[0].data[json.col.fl_admin]==1){ twControleAdminUsuario.dados.ehAdmin = true; }
						if(json.rows[0].data[json.col.fl_dono]==1){ twControleAdminUsuario.dados.ehDono = true; }
						if(json.rows[0].data[json.col.fl_mudar_senha]==1){ twControleAdminUsuario.dados.mudarSenha = true; }

						if(json.rows[0].data[json.col.id_cm_caixa_sessao]>0){
							twControleComercialCaixaSessao.dados = {
								aberto : true,
								sessaoID : json.rows[0].data[json.col.id_cm_caixa_sessao],
								localID : json.rows[0].data[json.col.id_ba_local_caixa],
								localTX : json.rows[0].data[json.col.tx_caixa_local],
								caixaTX : json.rows[0].data[json.col.tx_caixa]
							};
							twControleComercialCaixaSessao.mostrar();
						}

						if(twControleAdminUsuario.dados.mudarSenha){
							var janela = twJscSistemaUI.alerta.abrir({ id : 'loginAlterarSenhaFlag', modal : true, titulo : 'Alterar sua senha', width : 450, height : 400});
							janela.button('close').hide();
							janela.attachURL('/Prs/Web/Admin/Base/Sistema/Alerta/AlterarSenhaFlag.htm');
						}

						var info = '<b>Ormuz Confec&ccedil;&atilde;o</b><br />';
						info += 'Usu&aacute;rio: '+twControleAdminUsuario.dados.nome;
						$('divSysLoginInfo').style.visibility = 'visible';
						$('spanSysLoginDetails').innerHTML = info;

						twTimeout.Pausado = false;
						twJscSistemaUI.tela.carregar(
							'/Prs/Web/Admin/Base/Sistema/Welcome.htm?nc='+(new Date()).getTime(),
							true,
							null,
							function(){ twJscSistemaUI.menu.iniciar(); }
						);

					} else {
						var janela = twJscSistemaUI.alerta.abrir({
							id : 'loginErro',
							modal : true,
							titulo : 'Erro ao conectar',
							width : 400, height : 310
						});
						janela.button('close').hide();
						janela.attachURL('/Prs/Web/Admin/Base/Sistema/Alerta/LoginErro.htm?nc=1');
					}
				}
			}
		);

	},
	relogar : function(usuario, senha, callback){
		var query = new twJscSistemaDados.procedure('up_ad_usuario_relogin');
		query.adicionar('@id_usuario', twControleAdminUsuario.dados.id);
		query.adicionar('@tx_login', usuario);
		query.adicionar('@tx_senha_sha1', twJscSistemaCripto.sha1.hash(senha));
		query.adicionar('@tx_ip', twJscSistemaNet.cliente.ip);
		query.toJson(
			null,
			function(json){
				if(json!=null){
					if(json.rows[0].data[json.col.fl_retorno] > 0 ){
						callback(true);
					} else {
						callback(false);
					}
				}
			}
		);

	},
	logoff : function(){
		twControleAdminUsuario.dados.id = 0;
		twControleAdminUsuario.dados.nome = '';

		twControleAdminUsuario.dados.ehAdmin = false;
		twControleAdminUsuario.dados.ehDono = false;
		twControleAdminUsuario.dados.mudarSenha = false;
		
		twControleComercialCaixaSessao.zerar();

		$('spanSysLoginDetails').innerHTML = '';
		$('divSysLoginInfo').style.visibility = 'hidden';

		twJscSistemaUI.menu.limpar();

		twJscSistemaUI.tela.carregar('/Prs/Web/Admin/Base/Sistema/Login.htm', true);
	},
	alterarSenha : function(senhaAtual, senhaNova){
		var query = new twJscSistemaDados.procedure('up_ad_usuario_senha_alterar');
		query.adicionar('@id_ad_usuario', twControleAdminUsuario.dados.id);
		query.adicionar('@tx_senha_sha1_atual', twJscSistemaCripto.sha1.hash(senhaAtual));
		query.adicionar('@tx_senha_sha1_nova', twJscSistemaCripto.sha1.hash(senhaNova));
		query.toString(
			function(ok){
				if(ok!=null){
					if(parseInt(ok)==1){
						twJscSistemaUI.alerta.statusOK('Senha alterada', 'Sua senha foi alterada com sucesso!');
					} else {
						twJscSistemaUI.alerta.statusErro('Senha N&Atilde;O alterada', 'Sua senha <b>N&Atilde;O</b> foi alterada!<br/>Confira se voc&ecirc; digitou sua senha atual correta!');
					}
					twJscSistemaUI.tela.carregar('/Prs/Web/Admin/Base/Sistema/AlterarSenha.htm');
				}
			}
		);
	},
	alterarSenhaFlag : function(senhaNova){
		var query = new twJscSistemaDados.procedure('up_ad_usuario_senha_flag_alterar');
		query.adicionar('@id_ad_usuario', twControleAdminUsuario.dados.id);
		query.adicionar('@tx_senha_sha1_nova', twJscSistemaCripto.sha1.hash(senhaNova));
		query.toString(
			function(ok){
				if(ok!=null){
					twJscSistemaUI.alerta.fechar('loginAlterarSenhaFlag');
					twJscSistemaUI.alerta.statusOK('Senha alterada', 'Sua senha foi alterada com sucesso!');
				}
			}
		);
	},
	senhaResetar : function(id, funcaoRetorno){
		var query = new twJscSistemaDados.procedure('up_ad_usuario_senha_resetar');
		query.adicionar('@id_ad_usuario', id);
		query.execute(
			function(retorno){
				if(retorno!=null){
					twJscSistemaUI.alerta.statusOK('Dados alterados', 'Senha do usu&aacute;rio alterada para "123456"!<br/><br/>Ser&aacute; solicitado que ele altere a senha no primeiro acesso.');
					funcaoRetorno();
				}
			}
		);
	}
}
