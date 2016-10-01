
var twJscSistemaUI = {
	getQueryString : function(doc, campo){
		var valor = null;
		var url = doc.location.toString();
		var pos = url.toLowerCase().indexOf('?'+campo.toLowerCase()+'=', 0);
		if(pos < 0){ pos = url.toLowerCase().indexOf('&'+campo.toLowerCase()+'=', 0); }
		if(pos >= 0){
			var inicio = pos + campo.length + 2;
			var final = url.indexOf('&', inicio);
			if(final < 0){ final = url.length; }
			valor = url.substring(inicio, final);
		}
		return(valor);
	},
	isMobile : function(){
		return ( $('#identificadorMob').css('display')=='none' );
	},
	alerta : {
		objeto : null,
		abrir : function(opcoes){
			$('#dvFooterCont').html('');
			$('#dvFooter').hide();
			var obj = {
				opcao : opcoes,
				attachHTMLString : function(msg){
					var cancel = '<div class="btCancelPopup" onClick="twJscSistemaUI.alerta.fechar()">X</div>';
					var titulo = '';
					var bt = '';

					if ( !obj.opcao.cancel ) { cancel = ''; }
					if ( obj.opcao.titulo.toString() != 'undefined' ) {
						titulo = '<div id="dvFooterTitulo">' + obj.opcao.titulo + '</div>';
					}

					if ( typeof(obj.opcao.bt) != 'undefined' ) {
						bt = obj.opcao.bt.toString();
					}

					$('#dvFooterCont').html( titulo + cancel + '<div id="dvFooterConteudo">' + msg + '</div><div id="dvFooterFooter"></div>'  );
					$('#dvFooterFooter').html(bt);
					$('#dvFooter').show();
					$('#dvFooter .inputCancel').click(function(){
						$('#' + $(this).attr('id').replace('_c','')).val('');
					});
				}
			}
			return obj;
		},
		fechar : function(id){
			$('#dvFooterCont').html('');
			$('#dvFooter').hide();
			return;
			try {
				twJscSistemaUI.alerta.objeto.window(id).close();
			} catch(ex) { alert(id + ' - ' + ex); }
		},
		somenteOnline : function(){
			var janela = twJscSistemaUI.alerta.abrir({ id : 'sysSomenteOnline', modal : true, titulo : 'Recurso indispon&iacute;vel', width : 400, height : 300});
			var msg = '<font face="verdana"  color="black" size="2"><br><br><br>';
			msg += '<center><font color="red" size="3"><b>Recurso indipon&iacute;vel</b></font></center><br><br>';
			msg += 'Desculpe, mas este recurso/fun&ccedil;&atilde;o s&oacute; pode ser utlizado com o sistema online.<br><br><br>';
			msg += '<center><input type="button" name="ok" value="   OK   " onclick="javascript:parent.twJscSistemaUI.alerta.fechar(\'sysSomenteOnline\')" /></center></font>';
			janela.attachHTMLString(msg);
		},
		carregando : function(){
			/*
			var janela = twJscSistemaUI.alerta.abrir({ id : 'sysLoading', modal : true, titulo : 'Carregando' });
			var msg = '<center><br><span id="spAguardeTimer" name="spAguardeTimer"></span>';
			msg += '<br><br><img src="/prs/img/admin/ft/ajax-loader3.GIF?n=3" width="80" height="80"><br><br>';
			msg += '<b>Estamos processando informações.</b><br>Aguarde o processamento !!<br>';
			msg += '<span id="spAguardeMsg" name="spAguardeMsg"></span></center>';
			//janela.button('close').hide();
			janela.attachHTMLString(msg);
			*/
		},
		carregandoFechar : function(){
			twJscSistemaUI.alerta.fechar('sysLoading');
		},
		statusOK : function(titulo, descricao){
			var janela = twJscSistemaUI.alerta.abrir({ id : 'sysStatusOK', modal : true, titulo : titulo, width : 400, height : 400});
			var msg = '<font face="verdana" size="2" color="black"><br>';
			msg += '<center><img src="/Prs/Img/Admin/Ft/icones/comentario.gif" width="80" height="80" vspace="20" /><br />';
			msg += '<font color="green" size="3"><b>'+titulo+'</b></font><br><br>';
			msg += descricao +'<br><br><br>';
			msg += '<input type="button" id="statusOKbtn" value="   OK   " onclick="javascript:parent.twJscSistemaUI.alerta.fechar(\'sysStatusOK\')" /></center></font>';
			msg += '<script language="javascript"> document.getElementById("statusOKbtn").focus() </script>';
			janela.attachHTMLString(msg);
			return janela;
		},
		statusErro : function(titulo, descricao){
			var janela = twJscSistemaUI.alerta.abrir({ id : 'sysStatusErro', modal : true, titulo : titulo, width : 400, height : 400});
			var msg = '<font face="verdana" size="2"><br>';
			msg += '<center><img src="/Prs/Img/Admin/Ft/icones/alerta.gif" width="80" height="80" vspace="20" /><br />'
			msg += '<font color="red" size="3"><b>'+titulo+'</b></font><br><br>';
			msg += descricao +'<br><br><br>';
			msg += '<input type="button" id="statusErrobtn" name="ok" value="   OK   " onclick="javascript:parent.twJscSistemaUI.alerta.fechar(\'sysStatusErro\')" /></center></font>';
			msg += '<script language="javascript"> document.getElementById("statusErrobtn").focus() </script>';
			janela.attachHTMLString(msg);
			return janela;
		}
	},
	tela : {
		altura : {
			valor : function(largura){
				var myHeight = 0;
				var myWidth = 0;
				if( typeof( window.innerWidth ) == 'number' ) {
					//Non-IE
					myHeight = window.innerHeight;
					myWidth = window.innerWidth;
				} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
					//IE 6+ in 'standards compliant mode'
					myHeight = document.documentElement.clientHeight;
					myWidth = document.documentElement.clientWidth;
				} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
					//IE 4 compatible
					myHeight = document.body.clientHeight;
					myWidth = document.body.clientWidth;
				}

				return (largura==true?myWidth:myHeight);
			},
			atualizar : function(){
				return;
				var myHeight = 0;
				var myWidth = 0;
				if( typeof( window.innerWidth ) == 'number' ) {
					//Non-IE
					myHeight = window.innerHeight;
					myWidth = window.innerWidth;
				} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
					//IE 6+ in 'standards compliant mode'
					myHeight = document.documentElement.clientHeight;
					myWidth = document.documentElement.clientWidth;
				} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
					//IE 4 compatible
					myHeight = document.body.clientHeight;
					myWidth = document.body.clientWidth;
				}
				/*
				if ( myHeight < 600) {
					// Feito p/ MOBILE: Correção de altura dos divs
					//myHeight += 70;
					myWidth = 450;
				}
				else if ( myWidth <= 800) {
					$('.tabela').css({'width':'750px'});
				}

				if ( myWidth < 900){
					$('#asideobj').hide();
				}

				*/
				try {
					document.getElementById('spSysConteudo').style.height = (myHeight-80)+'px';
				} catch (ex) {}
				/// default2.aspx
				//document.getElementById('dvMenuConteudo').style.height = (myHeight)+'px';
				//document.getElementById('dvFooter').style.width = (myWidth)+'px';

				//document.getElementById('spSysConteudo').style.width = (myWidth-(myWidth<500?120:150) )+'px';

				var conteudoAltura = myHeight ; //+ (myHeight<700?-50:0);

				for(var x = 0; x < document.getElementsByTagName('div').length; x++){
					var div = document.getElementsByTagName('div')[x];
					var alturaAjustar = div.getAttribute('alturaAjustar');
					if(alturaAjustar!==null){
						if(!isNaN(alturaAjustar)){
							div.style.height = (conteudoAltura + parseFloat(alturaAjustar) ).toString() + 'px';
						}
					}
				}
			}
		},
		scripts : {
			total : 0,
			loaded : 0
		},
		carregar : function(url, nocache, divID, funcaoRetorno){
			url = url;

			twJscSistemaUI.alerta.carregando();

			if(twJscSistemaUI.getQueryString(document, 'debug')=='true'){ nocache = true; }

			if(typeof(nocache)!='boolean'){ nocache = false; }
			if(nocache){
				if(url.indexOf('?')>0){ url += '&'; } else { url += '?' }
				url += 'sys_nocache=' + (new Date()).getTime().toString();
			}
			var request = twJscSistemaAjax.create('beta.httprequest');
			request.open('GET', url);
			request.onreadystatechange = function() {
				if(request.readyState == 4){
					twJscSistemaUI.alerta.carregandoFechar();

					var spConteudo;
					if((typeof(divID)=='undefined')||(divID==null)){
						spConteudo = document.getElementById('spSysConteudo');
					} else {
						if (divID=='htm') {}
						else if(typeof(divID)=='string'){ spConteudo = document.getElementById(divID); }
						else { spConteudo = divID; }
					}

					//var spConteudo = document.getElementById('spSysConteudo');

					if( divID!='htm'){
						spConteudo.innerHTML = request.responseText;
						//if((typeof(divID)=='undefined')||(divID==null)){ $('#'+divID).show(); }
						setTimeout(twJscSistemaUI.tela.altura.atualizar, 10);

						//Processa o JavaScript se tiver
						var scriptTags = spConteudo.getElementsByTagName('SCRIPT');
						var string='';
						var jsCode='';

						twJscSistemaUI.tela.scripts.total = scriptTags.length;
						twJscSistemaUI.tela.scripts.loaded = 0;

						var head=document.getElementsByTagName("head")[0];

						//Procura e remove script que estejam sendo carregados novamente
						var scriptsInHead = head.getElementsByTagName("script");
						for(var sh=0;sh<scriptsInHead.length;sh++){
							if(scriptsInHead[sh].getAttribute("loadType") == "twJscSistemaUI"){
								var oldScript = head.removeChild( scriptsInHead[sh] );
								oldScript = null;
							}
						}

						for(var no=0;no<scriptTags.length;no++){
							if(scriptTags[no].src){
								var scriptObj=document.createElement("script");
								scriptObj.setAttribute("type","text/javascript");
								scriptObj.setAttribute("loadType","twJscSistemaUI");
								scriptObj.setAttribute("src",scriptTags[no].src);

								// Attach handlers for all browsers
								scriptObj.onload = scriptObj.onreadystatechange = function() {
									if ( !this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
										twJscSistemaUI.tela.scripts.loaded++;

										// Handle memory leak in IE
										if(twJscSistemaUI.tela.scripts.loaded == twJscSistemaUI.tela.scripts.total){
											scriptObj.onload = scriptObj.onreadystatechange = null;
											if ( head && scriptObj.parentNode ) {
												head.removeChild( scriptObj );
											}
										}
									}
								};

								// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
								// This arises when a base node is used (#2709 and #4378).
								head.insertBefore( scriptObj, head.firstChild )

							} else {
								jsCode=jsCode+scriptTags[no].innerHTML;
								twJscSistemaUI.tela.scripts.loaded++;
								if(jsCode){
									try{
										if(window.execScript){ window.execScript(jsCode); }
										else { window.setTimeout(jsCode,0); }
									}catch(e){  }
								}
							}
						}

						if(typeof(funcaoRetorno)=='function'){ funcaoRetorno(); }
					} else {
						console.log('devolvendo');
						funcaoRetorno(request.responseText);
					}

				}
			};
			request.send();

		}
	},
	statusBar : {
		escrever : function(txt){
			document.getElementById('spSysStatusBar').innerHTML = txt;
		},
		limpar : function(){
			twJscSistemaUI.statusBar.escrever('');
		}
	},
	progressBar : {
		multiColor : function(span){
			var spanObj = null;
			if(typeof(span)=='string'){ spanObj = document.getElementById(span); } else { spanObj = span; }
			var bar = new JS_BRAMUS.jsProgressBar(
				spanObj,
				0,
				{
					barImage : Array(
						'/App/Client/bramus/img/percentImage_back4.png',
						'/App/Client/bramus/img/percentImage_back3.png',
						'/App/Client/bramus/img/percentImage_back2.png',
						'/App/Client/bramus/img/percentImage_back1.png'
					)
				}
			);
			return(bar);
		}
	},
	titulo : {
		imagemPath : '/Prs/Img/Admin/Ft/titulos/',
		exibir : function(spanID, titulo, imagem){
			if(typeof(spanID)=='string'){
				document.getElementById(spanID).innerHTML = titulo;
			} else {
				spanID.innerHTML = titulo;
			}
			return;

			var cadeado = (imagem.indexOf('cadeado.gif')>-1);
			var htm = '<table width="100%" cellpadding="0" cellspacing="0" border="0" ><tr'+(cadeado?' bgcolor="#fff"':'') +'>';
			htm += '<td width="1%"><img src="'+twJscSistemaUI.titulo.imagemPath+imagem+'" /></td>';
			htm += '<td width="99%" style="vertical-align:bottom; text-align:right; font-size: 16pt;'+(cadeado?' color:#000':'')+'">';
			htm += titulo;
			htm += '</td></tr>';
			htm += '<tr><td bgcolor="#003399" height="1" colspan="2"></td></tr></table>';

			if(typeof(spanID)=='string'){
				document.getElementById(spanID).innerHTML = htm;
			} else {
				spanID.innerHTML = htm;
			}
		}
	},
	menu : {
		objeto : null,
		ultimoMenu : null,
		dados : [],
		carregar : function(){
			twJscSistemaUI.menu.ultimoMenu = null;
			if(twJscSistemaUI.menu.objeto!=null){ twJscSistemaUI.menu.objeto.unload(); }
			twJscSistemaUI.menu.objeto = new dhtmlXMenuObject("divSysMenu");
			twJscSistemaUI.menu.objeto.setIconsPath("/App/Client/dhtmlX/imgs/dhxmenu_icons/");
			twJscSistemaUI.menu.objeto.setOpenMode("win");
			twJscSistemaUI.menu.objeto.attachEvent("onClick", twJscSistemaUI.menu.onClick);
		},
		limpar : function(){
			if(twJscSistemaUI.menu.objeto!=null){
				twJscSistemaUI.menu.ultimoMenu = null;
				twJscSistemaUI.menu.objeto.clearAll();
			}
		},
		adicionarMenu : function(itemId, itemText, onClickFunction, disabled, imgEnabled, imgDisabled){
			var nextToId = twJscSistemaUI.menu.ultimoMenu;
			twJscSistemaUI.menu.objeto.addNewSibling(nextToId, 'sysMenu:'+itemId, itemText, disabled, imgEnabled, imgDisabled);
			twJscSistemaUI.menu.ultimoMenu = 'sysMenu:'+itemId;
			twJscSistemaUI.menu.dados['sysMenu:'+itemId] = {
				subMenuQtd : 0,
				onClick : onClickFunction
			};
		},
		adicionarSubMenu : function(parentId, itemId, itemText, onClickFunction, disabled, imgEnabled, imgDisabled){
			var pos = twJscSistemaUI.menu.dados['sysMenu:'+parentId].subMenuQtd;
			twJscSistemaUI.menu.objeto.addNewChild('sysMenu:'+parentId, pos, 'sysMenu:'+parentId+':'+itemId, itemText, disabled, imgEnabled, imgDisabled);
			twJscSistemaUI.menu.dados['sysMenu:'+parentId].subMenuQtd++;
			twJscSistemaUI.menu.dados['sysMenu:'+parentId+':'+itemId] = {
				subMenuQtd : 0,
				onClick : onClickFunction
			};
		},
		iniciar : function(){
			$('.menu').show();
			$('.passaporte').show();
			//twControleMenu.carregar();

		},
		onClick : function(id, zoneId, casState){
			if(typeof(twJscSistemaUI.menu.dados[id])=='object'){
				if(typeof(twJscSistemaUI.menu.dados[id].onClick)=='function'){
					twJscSistemaUI.menu.dados[id].onClick(id, zoneId, casState);
				}
			}
		}
	},
	grid : {
		iniciar : function(divID){
			var newGrid = new dhtmlXGridObject(divID);
			newGrid.setImagePath("/App/Client/dhtmlX/imgs/");
			newGrid.setSkin("dhx_skyblue");
			return(newGrid);
		},
		toHtml : function(obj, titulo){
			var h = '';
			var dominio = document.location.toString();
			dominio = dominio.substring(0, dominio.indexOf('/', 9));

			if (typeof(titulo)=='string'){
				h+='<style type="text/css">';
				h+= 'td,body,th { font-family: verdana; font-size: 12px; }';
				h+= '.titulo { font-size: 18px; }';
				h+='</style></header><body>';
				h += '<table width="100%"><tr><td width="1%"><img src="'+dominio+'/Prs/Img/Admin/Ft/logos/logo.gif" /></td><td width="99%" valign="bottom" align="right" class="titulo"><b>'+titulo+'</b></td></tr></table><br>';
			}

			if (obj.hdrLabels.length>0){
				h += '<table width="100%" border="0" cellpadding="4" cellspacing="1" bgcolor="#333333">';
				var numCol = obj.hdrLabels.length;
				h+='<tr bgcolor="#CCCCCC">';
				for(var x=0;x<numCol;x++){ if (obj.hdrLabels[x]!="Ação") { h += '<th width="'+obj.initCellWidth[x]+'%">'+obj.hdrLabels[x]+'</th>'; } }
				h+='</tr>';
				for(var r=0;r<obj.getRowsNum();r++){
					h+='<tr bgcolor="#'+(r%2?'EFEFEF':'FFFFFF')+'">';
					for(var c=0;c<numCol;c++){
						if (obj.cellByIndex(r,c).getValue().toString().toLowerCase().indexOf('input')==-1) {
							h+='<td align="'+obj.cellAlign[c]+'">'+ (obj.cellType[c]=='price'?'R$ ':'')+ obj.cellByIndex(r,c).getValue()+'</td>';
						}
					}
					h+='</tr>';
				}
				h+='</table>';
			}

			if (typeof(titulo)=='string'){
				h+='<br>';
				var today = new Date();
				var dd = today.getDate(); var mm = today.getMonth()+1; var yyyy = today.getFullYear(); var hh = today.getHours(); var mi = today.getMinutes();
				if(dd<10){dd='0'+dd;} if(mm<10){mm='0'+mm;} if(hh<10){hh='0'+hh;}  if(mi<10){mi='0'+mi;}
				today = dd+'/'+mm+'/'+yyyy + ' ' + hh + ':' + mi;
				h+= '<small><i>Gerado em: '+ today + '</i></small>';
			}

			return h;
		},
		imprimir : function (obj, titulo, jan, exportarPDF){
			if (obj.hdrLabels.length>0){
				var ctd = twJscSistemaUI.grid.toHtml(obj,titulo);
				if(typeof(exportarPDF)!='string'){
					var h = '<html><header><title>'+titulo+'</title>';
					h += ctd;
					h += '<br><input type="button" onclick="window.print()" value="Imprimir" />';
					h+='</body></html>';
					if(typeof(jan)=='undefined'){ jan = window.open('','_blank','',''); }
					jan.document.write(h);
				} else {
					twJscSistemaUI.exportar(
						'pdf',
						exportarPDF+'.pdf',
						ctd
					);
				}
			}
		}
	},
	combo : {
		iniciar : function(divID, campoNome, lagura){
			return new dhtmlXCombo(divID, campoNome, lagura);
		}
	},
	exportar : function(tipo, nome, conteudoHTML){
		document.getElementById('MainFormPrintTipo').value = tipo;
		document.getElementById('MainFormPrintNome').value = nome;
		document.getElementById('MainFormPrintConteudo').value = conteudoHTML;
		document.getElementById('MainFormPrint').submit();
	}
}
