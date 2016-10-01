// A FAZER: twJscSistemaDados.json.colunaExibir  (conferir comentarios no metodo) 20/06/10


twJscSistemaDados = {
	html5Database : {
		aberto : false,
		database : null,
		iniciar : function(){
			/*
			if(window.openDatabase){
				twJscSistemaDados.html5Database.database = openDatabase('tw_'+SYS_NAME, '1.0', 'tw Sistema', 5*1024*1024);
				twJscSistemaDados.html5Database.aberto = true;
			}
			*/
		},
		abrir : function(){
			/*
			if(!twJscSistemaDados.html5Database.aberto){
				if(window.openDatabase){
					twJscSistemaDados.html5Database.database = openDatabase('tw_'+SYS_NAME, '1.0', 'tw Sistema', 5*1024*1024);
					twJscSistemaDados.html5Database.aberto = true;
				}
			}
			*/
		}
	},
	offline : {
		lista : {
			iniciar : function(){
				/*
				twJscSistemaDados.html5Database.abrir();
				if(!twJscSistemaDados.html5Database.aberto){
					twJscSistemaDados.html5Database.database.transaction(function(tx){
						tx.executeSql('CREATE TABLE IF NOT EXISTS tb_sys_offline_tabela (tx_nome text)');
					});
				}
				*/
			},
			adicionar : function(tableName){
				/*
				twJscSistemaDados.offline.lista.iniciar();
				if(!twJscSistemaDados.html5Database.aberto){
					twJscSistemaDados.html5Database.database.transaction(function(tx){
						var rs = tx.executeSql('SELECT tx_nome FROM tb_sys_offline_tabela WHERE tx_nome = ?;', [tableName]);
						if (!rs.isValidRow()) { tx.executeSql('INSERT INTO tb_sys_offline_tabela VALUES (?)', [tableName]); }
						rs.close();
					});
				}
				*/
			},
			remover : function(tableName){
				/*
				if(!twJscSistemaDados.html5Database.aberto){
					twJscSistemaDados.html5Database.database.transaction(function(tx){
						tx.executeSql('DELETE FROM tb_sys_offline_tabela WHERE tx_nome = ?;', [tableName]);
					});
				}
				*/
			},
			listar : function(){
				/*
				if(!twJscSistemaDados.html5Database.aberto){
					twJscSistemaDados.html5Database.database.transaction(function(tx){
						var rs = tx.executeSql('SELECT tx_nome FROM tb_sys_offline_tabela ;', []);
						return(twJscSistemaDados.json.gears2string(rs));
					});
				}
				*/
			}
		},
		atualizador : {
			timeout : 5 * 60,
			tabelaAtual : {
				index : 0,
				nome : ''
			},
			iniciar : function(){ //Executado: pool
				/*eval('var offlineLista = ' + twJscSistemaDados.offline.lista.listar());
				if(offlineLista.rows.length > 0){
					var linha = twJscSistemaDados.offline.atualizador.tabelaAtual.index;
					if(linha >= offlineLista.rows.length){ linha = 0; }
					var tabelaNome = offlineLista.rows[linha].data[0];
					twJscSistemaDados.offline.atualizador.tabelaAtual.nome = tabelaNome;
					twJscSistemaDados.offline.atualizador.tabelaAtual.index = linha+1;
					var msg = { 'acao': 'carregar', 'tabelaNome' : tabelaNome };
					wp.sendMessage(msg, senderID);
				} else {
					//Aguarda 30 segundos e depois continua a sincronizar
					var timer = google.gears.factory.create('beta.timer');
					timer.setTimeout("wp.sendMessage({ 'acao': 'restart' }, senderID);", twJscSistemaDados.offline.atualizador.timeout*1000);
				}*/
			},
			carregar : function(){ //Executado: local
				/*if(twJscSistemaNet.cliente.online){
					eval('var funcao = ' + twJscSistemaDados.offline.atualizador.tabelaAtual.nome + ';');
					var parametros = { loadGears : false };
					funcao(
						parametros,
						function(jsonString){
							var message = {
								'acao' : 'comparar',
								'tabelaNome' : twJscSistemaDados.offline.atualizador.tabelaAtual.nome,
								'jsonString' : jsonString
							};
							googleGears.workerpool.sendMessage(message, twJscSistemaWorkPool.scripts.senders['twPoolSistemaDados']);
						}
					);

				} else {
					var timer = google.gears.factory.create('beta.timer');
					timer.setTimeout('twJscSistemaDados.offline.atualizador.carregar()', 15000);
				}*/
			},
			comparar : function(jsonStringOnline){ //Executado: pool

				tabelaNome = twJscSistemaDados.offline.atualizador.tabelaAtual.nome;

				var jsonStringOffline = twJscSistemaDados.offline.tabela.listar(tabelaNome);

				eval('var jsonOnline = ' + jsonStringOnline);
				eval('var jsonOffline = ' + jsonStringOffline);

				//Falta sincronizar colunas novas ou removidas!!!
				var onlineColunaDiff = false;
				var offlineColunaDiff = false;

				for(var on in jsonOnline.columns){
					var colunaOK = false;
					for(var off in jsonOffline.columns){
						if(
							(jsonOnline.columns[on].name===jsonOffline.columns[off].name)&&
							(jsonOnline.columns[on].type===jsonOffline.columns[off].type)
						){ colunaOK = true; break; }
					}
					if(!colunaOK){ onlineColunaDiff = true; break; }
				}

				if(!onlineColunaDiff){
					for(var off in jsonOffline.columns){
						var colunaOK = false;
						for(var on in jsonOnline.columns){
							if(
								(jsonOnline.columns[on].name===jsonOffline.columns[off].name)&&
								(jsonOnline.columns[on].type===jsonOffline.columns[off].type)
							){ colunaOK = true; break; }
						}
						if(!colunaOK){ offlineColunaDiff = true; break; }
					}
				}

				if((onlineColunaDiff)||(offlineColunaDiff)){
					twJscSistemaDados.offline.tabela.carregar(tabelaNome, json);
				} else {
					for(var on in jsonOnline.rows){
						var linhaExite = false;
						for(var off in jsonOffline.rows){
							if(jsonOffline.rows[off].id === jsonOnline.rows[on].id){ linhaExite = true; }
							if((jsonOffline.rows[off].id > 0)&&(jsonOffline.rows[off].cs != 0)){
								if((jsonOffline.rows[off].id === jsonOnline.rows[on].id)&&(jsonOffline.rows[off].cs != jsonOnline.rows[on].cs)){
									var updateCols = [];
									updateCols[0] = { 'nome':'cs', 'valor':jsonOnline.rows[on].cs };
									for(var c in jsonOnline.columns){
										var nome = jsonOnline.columns[c].name;
										var valor;
										if(jsonOnline.columns[c].type==="datetime"){
											valor = jsonOnline.rows[on].data[c].getTime();
										} else {
											valor = jsonOnline.rows[on].data[c];
										}
										updateCols[updateCols.length] = { 'nome':nome, 'valor':valor };
									}
									twJscSistemaDados.offline.tabela.atualizar(tabelaNome, updateCols, [{ 'nome':'id', 'valor':jsonOnline.rows[on].id }]);
									break;
								}
							}
							if(linhaExite){ break; }
						}
						if(!linhaExite){
							var dados = [];
							var colunasInsert = [];
							dados[0] = jsonOnline.rows[on].id;
							dados[1] = jsonOnline.rows[on].cs;
							colunasInsert[0] = 'id';
							colunasInsert[1] = 'cs';
							for(var y = 0; y < jsonOnline.columns.length; y++){
								colunasInsert[colunasInsert.length] = jsonOnline.columns[y].name;
								if(jsonOnline.columns[y].type==="datetime"){
									dados[dados.length] = jsonOnline.rows[on].data[y].getTime();
								} else {
									dados[dados.length] = jsonOnline.rows[on].data[y];
								}
							}
							twJscSistemaDados.offline.tabela.adicionar(tabelaNome, colunasInsert, dados);
						}
					}
				}
				//Aguarda 30 segundos e depois continua a sincronizar
				var timer = google.gears.factory.create('beta.timer');
				timer.setTimeout("wp.sendMessage({ 'acao': 'restart' }, senderID);", twJscSistemaDados.offline.atualizador.timeout*1000);
			}
		},
		tabela : {
			carregar : function(tableName, jsonObj){
				var colunas = '';
				for(var y = 0; y < jsonObj.columns.length; y++){
					colunas += ",";
					if(jsonObj.columns[y].type==="datetime"){
						colunas += jsonObj.columns[y].name + ' numeric';
					} else {
						colunas += jsonObj.columns[y].name + ' ' + jsonObj.columns[y].type;
					}
				}

				//Adiciona a lista de tabelas salvas em memoria
				twJscSistemaDados.offline.lista.adicionar(tableName);

				twJscSistemaDados.html5Database.database.executeSql('DROP TABLE IF EXISTS ' + tableName);
				twJscSistemaDados.html5Database.database.executeSql('CREATE TABLE IF NOT EXISTS ' + tableName + ' (id int, cs int '+colunas+')');

				for(var x = 0; x < jsonObj.rows.length; x++){
					var dados = [];
					var colunasInsert = [];
					dados[0] = jsonObj.rows[x].id;
					dados[1] = jsonObj.rows[x].cs;
					colunasInsert[0] = 'id';
					colunasInsert[1] = 'cs';
					for(var y = 0; y < jsonObj.columns.length; y++){
						colunasInsert[y+2] = jsonObj.columns[y].name;
						if(jsonObj.columns[y].type==="datetime"){
							dados[y+2] = jsonObj.rows[x].data[y].getTime();
						} else {
							dados[y+2] = jsonObj.rows[x].data[y];
						}
					}
					twJscSistemaDados.offline.tabela.adicionar(tableName, colunasInsert, dados);
				}
			},
			adicionar : function(tableName, colunas, dados){
				if(colunas.length === dados.length){
					var colsNomes = '';
					var colsDados = '';
					for(var col in colunas){
						if(colsNomes.length > 0){ colsNomes += ','; colsDados += ','; }
						colsNomes += colunas[col];
						colsDados += '?';
					}
					twJscSistemaDados.html5Database.database.executeSql('INSERT INTO '+tableName+' ('+colsNomes+') VALUES ('+colsDados+')', dados);
				}
			},
			atualizar : function(tableName, campos, condicoes){
				var sql = '';
				var valores = [];
				for(var x = 0; x < campos.length; x++){
					if(x > 0){ sql += ', '; }
					sql += campos[x].nome + ' = ?';
					valores[valores.length] = campos[x].valor;
				}
				if(condicoes.length > 0){
					sql += ' WHERE ';
					for(var y = 0; y < condicoes.length; y++){
						if(y > 0){ sql += ' AND '; }
						sql += condicoes[y].nome + ' = ?';
						valores[valores.length] = condicoes[y].valor;
					}
				}
				sql = 'UPDATE '+tableName+' SET ' + sql;
				wp.sendMessage({ 'acao': 'alert', 'msg':sql+'\n'+valores.toString() }, senderID);

				twJscSistemaDados.html5Database.database.executeSql(sql, valores);
			},
			listar : function(tableName, colunasAexibir, orderBy){
				var orderBySql = '';
				if(typeof(orderBy)==='string'){ if(orderBy.length > 0){ orderBySql = ' ORDER BY ' + orderBy; } }
				var rs = twJscSistemaDados.html5Database.database.executeSql('SELECT * FROM '+tableName+orderBySql+';');
				return(twJscSistemaDados.json.gears2string(rs, colunasAexibir));
			},
			decarregar : function(tableName){
				twJscSistemaDados.offline.lista.remover(tableName);
				twJscSistemaDados.html5Database.database.executeSql('DROP TABLE IF EXISTS ' + tableName);
			}
		}
	},
	json : {
		tipoColuna : function(colunaNome){
			var tipo = "text";
			if(colunaNome.length >= 2){
				switch(colunaNome.substring(0,2).toLowerCase()){
					case "fl": tipo = "int"; break;
					case "id": tipo = "int"; break;
					case "nu": tipo = "int"; break;
					case "vl": tipo = "real"; break;
					case "tx": tipo = "text"; break;
					case "mm": tipo = "text"; break;
					case "dt": tipo = "datetime"; break;
				}
			}
			return(tipo);
		},
		converte : function(recordSet, fieldIndex){
			var retorno = "\"\"";
			if(recordSet.field(fieldIndex).toString().length > 0){
				switch(twJscSistemaDados.json.tipoColuna(recordSet.fieldName(fieldIndex))){
					case "real": recordSet.field(fieldIndex).toString(); break;
					case "int": recordSet.field(fieldIndex).toString(); break;
					case "text": retorno = "\""+recordSet.field(fieldIndex).toString().replace(new RegExp('\\\\', 'gi'), '\\\\').replace(new RegExp('\"', 'gi'), '\\"').replace(new RegExp('\n', 'gi'), '\\n')+"\""; break;
					case "datetime": retorno = "new Date("+recordSet.field(fieldIndex).toString()+")"; break;
				}
			}
			return(retorno);
		},
		colunaExibir : function(colunasAexibir, colunaNome){  //A FAZER: ordem das colunas a exibir
			var exibir = true;
			if((colunaNome.toLowerCase()==="id")||(colunaNome.toLowerCase()==="cs")){
				exibir = false;
			} else {
				if(typeof(colunasAexibir)==='string'){
					if(colunasAexibir.length > 2){
						var cols = colunasAexibir.toLowerCase().split(',');
						if(cols.length > 0){
							exibir = false;
							for(var col in cols){ //RegEx: /^\s+|\s+$/g     ===> Trim()
								if(cols[col].replace(/^\s+|\s+$/g,"")===colunaNome.toLowerCase()){
									exibir = true;
									break;
								}
							}
						}
					}
				}
			}
			return(exibir);
		},
		gears2string : function(recordSet, colunasAexibir){
			if(typeof(colunasAexibir)!='string'){ colunasAexibir = null; }
			var jsonStr = "";

			var con = "";
			var temID = false;
			var temCS = false;
			jsonStr += " {  columns : [ ";

			if(recordSet.isValidRow()){
				for (var i = 0; i < recordSet.fieldCount(); i++){
					if(recordSet.fieldName(i).toLowerCase()==="id"){ temID = true; }
					if(recordSet.fieldName(i).toLowerCase()==="cs"){ temCS = true; }
				}
				for (var i = 0; i < recordSet.fieldCount(); i++){
					if(twJscSistemaDados.json.colunaExibir(colunasAexibir, recordSet.fieldName(i))){
						jsonStr += con + "{ name:\"" + recordSet.fieldName(i) + "\",";
						jsonStr += "type : \""+twJscSistemaDados.json.tipoColuna(recordSet.fieldName(i))+"\" } ";
						con = " , ";

					}
				}
			}
			jsonStr += " ], ";
			con = "";

			jsonStr += " cols : { ";
			if(recordSet.isValidRow()){
				for (var i = 0; i < recordSet.fieldCount(); i++){
					if(twJscSistemaDados.json.colunaExibir(colunasAexibir, recordSet.fieldName(i))){
						jsonStr += con + "\"" + recordSet.fieldName(i) + "\":";
						jsonStr += "\""+twJscSistemaDados.json.tipoColuna(recordSet.fieldName(i))+"\"";
						con = " , ";
					}
				}
			}
			jsonStr += " }, ";
			con = "";

			jsonStr += " rows: [ ";
			if(recordSet.isValidRow()){
				var lineCount = 1;
				while(recordSet.isValidRow()){
					jsonStr += con + " { id: ";
					if(temID){ jsonStr += recordSet.fieldByName("id").toString(); }
					else { jsonStr += lineCount.toString(); }
					jsonStr += ", data:[";
					var conY = "";
					for (var y = 0; y < recordSet.fieldCount(); y++){
						if(twJscSistemaDados.json.colunaExibir(colunasAexibir, recordSet.fieldName(y))){
							jsonStr += conY + twJscSistemaDados.json.converte(recordSet, y);
							conY = " , ";
						}
					}
					jsonStr += "], cs: ";
					if(temCS){ jsonStr += recordSet.fieldByName("cs").toString(); }
					else { jsonStr += "0"; }
					jsonStr += " } ";
					con = " , ";
					recordSet.next();
				}
			}
			jsonStr += " ] }; ";
			recordSet.close();
			return(jsonStr);
		}
	},
	procedure : function(procedureName, somenteOnline){
		if(typeof(somenteOnline)==='undefined'){ somenteOnline = true; }
		this.procedureName = procedureName;
		this.somenteOnline = somenteOnline;
		this.campos = [];
		this.valores = [];
		this.adicionar = function(campo, valor){
			if(typeof(valor)==='string'){ if(valor.length === 0){ valor = null } }

			if((campo.indexOf('@vl_')===0)&&(typeof(valor)==='string')){
				valor = twJscSistemaDados.conversao.stringToMoney(valor);
			}
			//Conversão de data realizada no WebService
			//if((campo.indexOf('@dt_')===0)&&(typeof(valor)==='string')){
			//	valor = twJscSistemaData.getDateFromFormat(valor, 'dd/MM/yyyy');
			//}
			if((campo.indexOf('@dt_')===0)&&(typeof(valor)==='object')){ //Acerta difernca de fuso horario
				valor.setMinutes(valor.getMinutes() - valor.getTimezoneOffset());
			}
			if((campo.indexOf('@fl_')===0)&&(valor==='on')){ valor = 1; }
			if((campo.indexOf('@fl_')===0)&&(valor===null)){ valor = 0; }
			if((campo.indexOf('@fl_')===0)&&(valor===true)){ valor = 1; }
			if((campo.indexOf('@fl_')===0)&&(valor===false)){ valor = 0; }

			this.campos[this.campos.length] = campo;
			this.valores[this.valores.length] = valor;
		};
		this.execute = function(funcaoRetorno){
			if((this.somenteOnline)&&(!twJscSistemaNet.cliente.online)){
				twJscSistemaUI.alerta.somenteOnline();
				funcaoRetorno(null);
				return;
			}

			twJscSistemaUI.alerta.carregando();
			TW.WebService.Dados.Execute(
				this.procedureName,
				this.campos,
				this.valores,
				function(){
					twJscSistemaUI.alerta.carregandoFechar();
					funcaoRetorno(true);
				},
				twControleLoader.WebServiceFailedCallback
			);
		};
		this.execute2 = function(funcaoRetorno){
			if((this.somenteOnline)&&(!twJscSistemaNet.cliente.online)){
				twJscSistemaUI.alerta.somenteOnline();
				funcaoRetorno(null);
				return;
			}

			//twJscSistemaUI.alerta.carregando();
			TW.WebService.Dados.Execute(
				this.procedureName,
				this.campos,
				this.valores,
				function(){
					//twJscSistemaUI.alerta.carregandoFechar();
					funcaoRetorno(true);
				},
				twControleLoader.WebServiceFailedCallback
			);
		};
		this.toString = function(funcaoRetorno){
			if((this.somenteOnline)&&(!twJscSistemaNet.cliente.online)){
				twJscSistemaUI.alerta.somenteOnline();
				funcaoRetorno(null);
				return;
			}

			twJscSistemaUI.alerta.carregando();
			TW.WebService.Dados.ToString(
				this.procedureName,
				this.campos,
				this.valores,
				function(retorno){
					twJscSistemaUI.alerta.carregandoFechar();
					funcaoRetorno(retorno);
				},
				twControleLoader.WebServiceFailedCallback
			);
		};
		this.toJson = function(colunasAexibir, funcaoRetorno, tela){
			if((this.somenteOnline)&&(!twJscSistemaNet.cliente.online)){
				twJscSistemaUI.alerta.somenteOnline();
				funcaoRetorno(null);
				return;
			}

			if (typeof(tela)==='undefined'){
				twJscSistemaUI.alerta.carregando();
			}

			TW.WebService.Dados.ToJson(
				this.procedureName,
				this.campos,
				this.valores,
				colunasAexibir,
				function(jsonString){
					if (typeof(tela)==='undefined'){
						twJscSistemaUI.alerta.carregandoFechar();
					}
					eval('var json = ' + jsonString);
					funcaoRetorno(json);
				},
				twControleLoader.WebServiceFailedCallback
			);
		};
		this.toJson2 = function(colunasAexibir, funcaoRetorno, tela){
			if((this.somenteOnline)&&(!twJscSistemaNet.cliente.online)){
				twJscSistemaUI.alerta.somenteOnline();
				funcaoRetorno(null);
				return;
			}

			if (typeof(tela)==='undefined'){
				//twJscSistemaUI.alerta.carregando();
			}
			TW.WebService.Dados.ToJson(
				this.procedureName,
				this.campos,
				this.valores,
				colunasAexibir,
				function(jsonString){
					if (typeof(tela)==='undefined'){
						//twJscSistemaUI.alerta.carregandoFechar();
					}
					eval('var json = ' + jsonString);
					funcaoRetorno(json);
				},
				twControleLoader.WebServiceFailedCallback
			);
		};
	},
	conversao : {
		stringToMoney : function(valorString){
			if(typeof(valorString)==='string'){
				return twJscSistemaMath.FromString(valorString, true);
			} else {
				return valorString;
			}
		},
		moneyToString : function(valor){
			return twJscSistemaMath.ToString(valor, true);
		}
	}
};

//twJscSistemaDados.offline.lista.iniciar();
