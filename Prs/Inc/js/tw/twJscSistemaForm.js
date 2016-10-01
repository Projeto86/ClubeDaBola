var twJscSistemaForm = {
	validacao : {
		length : {
			menorQue : function(ccmCampo, ccmQuantidadeMinima, ccmMensagem){
				if (ccmCampo.value.length < ccmQuantidadeMinima){ alert(ccmMensagem); ccmCampo.focus(); return (true); }
				else { return (false); }
			},
			maiorQue : function(ccmCampo, ccmQuantidadeMaxima, ccmMensagem){
				if (ccmCampo.value.length > ccmQuantidadeMaxima){ alert(ccmMensagem); ccmCampo.focus(); return (true); }
				else { return (false); }
			}
		},
		valor : {
			igualA : function(cenCampo, cenValor, cenMensagem){
				if (parseInt(cenCampo.value)==parseInt(cenValor)){ return (true); }
				else { alert(cenMensagem); cenCampo.focus(); return (false); }
			},
			maiorQue : function(cgnCampo, cgnValor, cgnMensagem){
				if (parseInt(cgnCampo.value)>parseInt(cgnValor)){ return (true); }
				else { alert(cgnMensagem); cgnCampo.focus(); return (false); }
			},
			maiorOuIgual : function(cgoenCampo, cgoenValor, cgoenMensagem){
				if (parseInt(cgoenCampo.value)>=parseInt(cgoenValor)){ return (true); }
				else { alert(cgoenMensagem); cgoenCampo.focus(); return (false); }
			},
			menorQue : function(clnCampo, clnValor, clnMensagem){
				if (parseInt(clnCampo.value)<parseInt(clnValor)){ return (true); }
				else { alert(clnMensagem); clnCampo.focus(); return (false); }
			},
			menorOuIgual : function(cloenCampo, cloenValor, cloenMensagem){
				if (parseInt(cloenCampo.value)<=parseInt(cloenValor)){ return (true); }
				else { alert(cloenMensagem); cloenCampo.focus(); return (false); }
			}
		},
		tipo : {
			isNumeric : function(inCampo, inMensagem){
				if (isNaN(inCampo.value)){ alert(inMensagem); inCampo.focus(); return (false); }
				else { return (true); }
			},
			isCpf : function(icCpf){
				var icCpfNumero = "";
				var icRegExpCpf = /^\d{3}\.{1}\d{3}\.{1}\d{3}-{1}\d{2}$/;
				var icRegExpSohNumeros = /^\d$/;
			
				//Verfica se o CPF fornecido esta no padrão (xxx.xxx.xxx-xx)
				if(!icRegExpCpf.test(icCpf)){ return(false); }
			
				//Deixa apenas os números
				for(ic_x = 0; ic_x < icCpf.length; ic_x ++)
					if(icRegExpSohNumeros.test(icCpf.charAt(ic_x)))
						icCpfNumero += icCpf.charAt(ic_x).toString();
			
				var icCpfDigitos = icCpfNumero.substr(9,2);
				var icVerificadorD1 = 0;
			
				//Inicio: Calculo de verificação
				for (ic_x = 0; ic_x < 9; ic_x++) { icVerificadorD1 += parseInt(icCpfNumero.charAt(ic_x)) * (10 - ic_x); }
				if (icVerificadorD1 == 0){ return(false); }
				icVerificadorD1 = 11 - (icVerificadorD1 % 11);
				if (icVerificadorD1 > 9){ icVerificadorD1 = 0; }
				if (parseInt(icCpfDigitos.charAt(0)) != icVerificadorD1) { return(false); }
				icVerificadorD1 *= 2;
				for (ic_x = 0; ic_x < 9; ic_x++) { icVerificadorD1 += parseInt(icCpfNumero.charAt(ic_x)) * (11 - ic_x); }
				icVerificadorD1 = 11 - (icVerificadorD1 % 11);
				if (icVerificadorD1 > 9){ icVerificadorD1 = 0; }
				if (icCpfDigitos.charAt(1) != icVerificadorD1) { return(false); }
				//Fim: Calculo de verificação
			
				return(true);
			},
			isCnpj : function(icCnpj){
				var icCnpjNumero = "";
				var icRegExpCnpj = /^([0-9]{2}|0[0-9]{2})\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2}$/;
				var icRegExpSohNumeros = /^\d$/;
			
				//Verfica se o CNPJ fornecido esta no padrão (xxx.xxx.xxx/xxxx-xx)
				if(!icRegExpCnpj.test(icCnpj)){ return(false); }
			
				//Deixa apenas os números
				for(ic_x = 0; ic_x < icCnpj.length; ic_x ++)
					if(icRegExpSohNumeros.test(icCnpj.charAt(ic_x)))
						icCnpjNumero += icCnpj.charAt(ic_x).toString();
			
				//Valida o CNPJ
				var icCnpjValido = true;
				for(ic_g = 13; ic_g <= 14; ic_g ++){
					var icCaracterValidador = 0;
					var icIndicador = 2;
					for(ic_f = ic_g; ic_f > 0; ic_f --){
						icCaracterValidador += parseInt(icCnpjNumero.charAt(ic_f - 1)) * icIndicador;
						if(icIndicador > 8){ icIndicador = 2; }
						else { icIndicador ++; }
					}
					icCaracterValidador %= 11;
					if((icCaracterValidador == 0) || (icCaracterValidador == 1)){ icCaracterValidador = 0; }
					else { icCaracterValidador = 11 - icCaracterValidador; }
					if(icCaracterValidador != parseInt(icCnpjNumero.charAt(ic_g))){
						icCnpjValido = false;
						break;
					}
				}
				return(icCnpjValido);
			},
			isDate : function(idValor) {
				if(typeof idValor == "undefined"){ return (false); }
				if(typeof idValor != "string"){ idValor = idValor.toString(); }
				if ((idValor.length > 10)||(idValor.length < 6)) { return (false); }
				var id_c = 0; 
				var idValorTemporario = idValor; 
				var idCaractereValido = false;
				var idDiaMesAno = new Array();
				var idCaracteresAceitos = new Array("0","1","2","3","4","5","6","7","8","9","/");
				idDiaMesAno[0] = "";
				idDiaMesAno[1] = "";
				idDiaMesAno[2] = "";
				for (id_x = 0; id_x < idValorTemporario.length; id_x ++){ 
					idCaractereValido = false; 
					for(id_y = 0; id_y < 11; id_y ++){ 
						if(idValorTemporario.charAt(id_x) == idCaracteresAceitos[id_y]){ 
							idCaractereValido = true; 
						} 
					} 
					if(idCaractereValido){ 
						if(idValorTemporario.charAt(id_x) == "/"){ id_c ++; } 
						else { idDiaMesAno[id_c] += idValorTemporario.charAt(id_x); } 
					} else { 
						return (false); 
					} 
				}
				if (id_c!=2){ return (false); }
				var idDia = parseFloat(idDiaMesAno[0]);
				var idMes = parseFloat(idDiaMesAno[1]);
				var idAno = parseFloat(idDiaMesAno[2]);
				if ((idDia<1) || (idDia>31)){ return (false); }
				if ((idMes<1) || (idMes>12)){ return (false); }
				if ((idAno.toString().length!=2)&&(idAno.toString().length!=4)){ return (false); }
				if (idAno.toString().length==2){ 
					if(parseFloat(idAno)>49){ idAno = 1900 + idAno; }
					else { idAno = 2000 + idAno; } 
				}
				if ((idMes==4) || (idMes==6) || (idMes==9) || (idMes==11)){ if (idDia==31){ return (false); } }
				if (idMes==2){ 
					if (idDia > 29){ return (false); } 
					if ((idDia == 29) && (!twJscSistemaForm.validacao.tipo.isYearBisexto(idAno))){ return (false); } 
				}
				return (true);
			},
			isYearBisexto : function(iybAno){
				var iybIsBisexto = false;
				var iybAnoNum = parseFloat(iybAno);
				if(((iybAnoNum % 4) == 0) && (((iybAnoNum % 100) != 0) || ((iybAnoNum % 400) == 0))){ iybIsBisexto = true; }
				return(iybIsBisexto);
			},
			isDateAlert : function(idmData, idmMensagem) {
				if(!twJscSistemaForm.validacao.tipo.isDate(idmData)){ alert(idmMensagem); return(false); }
				else { return (true); }
			},
			isEmail : function(email) {
				var ieRegExpEmail = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]{2,}\.)+[a-zA-Z]{2,4}$/;
				return(ieRegExpEmail.test(email));
			},
			isImage : function(iiValor){
				var iiRegExpEmail = /^(.{3,})+\.(bmp|gif|jpg|jpeg|png)$/;
				return(iiRegExpEmail.test(iiValor));
			}
		}
	},
	formata : {
		cpf : function(fcCpf){
			var fcCpfTexto = "";
			var fcCpfNumero = "";
			var fcRegExpSohNumeros = /^\d$/;
			if(typeof(fcCpf)=="object"){ fcCpfTexto = fcCpf.value.toString(); }
			else { fcCpfTexto = fcCpf.toString(); }
		
			//Deixa apenas os números
			for(fc_x = 0; fc_x < fcCpfTexto.length; fc_x ++)
				if(fcRegExpSohNumeros.test(fcCpfTexto.charAt(fc_x)))
					fcCpfNumero += fcCpfTexto.charAt(fc_x).toString();
		
			fcCpfTexto = "";
		
			//Coloca "." e "-" nos números
			for(fc_x = 0; fc_x < fcCpfNumero.length; fc_x ++){
				if(fc_x <= 10){
					fcCpfTexto += fcCpfNumero.charAt(fc_x).toString();
					switch(fc_x){
						case 2: fcCpfTexto += "."; break;
						case 5: fcCpfTexto += "."; break;
						case 8: fcCpfTexto += "-"; break;
					}
				}
			}
		
			if(typeof(fcCpf)=="object"){ fcCpf.value = fcCpfTexto; }
			else { return(fcCpfTexto); }
		},
		cnpj : function(fcCnpj){
			var fcCnpjTexto = "";
			var fcCnpjNumero = "";
			var fcRegExpSohNumeros = /^\d$/;
		
			if(typeof(fcCnpj)=="object")
				fcCnpjTexto = fcCnpj.value.toString();
			else
				fcCnpjTexto = fcCnpj.toString();
		
			//Deixa apenas os números
			for(fc_x = 0; fc_x < fcCnpjTexto.length; fc_x ++)
				if(fcRegExpSohNumeros.test(fcCnpjTexto.charAt(fc_x)))
					fcCnpjNumero += fcCnpjTexto.charAt(fc_x).toString();
		
			fcCnpjTexto = "";
		
			//Coloca ".", "/" e "-" nos números
			for(fc_x = 0; fc_x < fcCnpjNumero.length; fc_x ++){
				if(fc_x <= 14){
					fcCnpjTexto += fcCnpjNumero.charAt(fc_x).toString();
					switch(fc_x){
						case 2: fcCnpjTexto += "."; break;
						case 5: fcCnpjTexto += "."; break;
						case 8: fcCnpjTexto += "/"; break;
						case 12: fcCnpjTexto += "-"; break;
					}
				}
			}
		
			if(typeof(fcCnpj)=="object")
				fcCnpj.value = fcCnpjTexto;
			else
				return(fcCnpjTexto);	
		},
		data : function(fdData){
			var fdDataTexto = "";
			var fdDataSohNumero = "";
			var fdRegExpSohNumeros = /^\d$/;
		
			if(typeof(fdData)=="object")
				fdDataTexto = fdData.value.toString();
			else
				fdDataTexto = fdData.toString();
		
			//Deixa apenas os números
			for(fd_x = 0; fd_x < fdDataTexto.length; fd_x ++)
				if(fdRegExpSohNumeros.test(fdDataTexto.charAt(fd_x)))
					fdDataSohNumero += fdDataTexto.charAt(fd_x).toString();
		
			fdDataTexto = "";
		
			//Coloca "/" nos números
			for(fd_x = 0; fd_x < fdDataSohNumero.length; fd_x ++){
				if(fd_x <= 7){
					fdDataTexto += fdDataSohNumero.charAt(fd_x).toString();
					switch(fd_x){
						case 1: fdDataTexto += "/"; break;
						case 3: fdDataTexto += "/"; break;
					}
				}
			}
		
			if(typeof(fdData)=="object")
				fdData.value = fdDataTexto;
			else
				return(fdDataTexto);	
		},
		telefone : function(ftTelefone){
			var ftTelefoneTexto = "";
			var ftTelefoneNumero = "";
			var ftRegExpSohNumeros = /^\d$/;
		
			if(typeof(ftTelefone)=="object")
				ftTelefoneTexto = ftTelefone.value.toString();
			else
				ftTelefoneTexto = ftTelefone.toString();
			
			//Verifica se o número é menor que 14 digitos
			//Padrão: (nn) nnnn-nnnn
			//Se for maior pode ser dados relativos a ramal, e não precisam de formatação
			if(ftTelefoneTexto.length <= 14){	
				//Deixa apenas os números
				for(ft_x = 0; ft_x < ftTelefoneTexto.length; ft_x ++)
					if(ftRegExpSohNumeros.test(ftTelefoneTexto.charAt(ft_x)))
						ftTelefoneNumero += ftTelefoneTexto.charAt(ft_x).toString();
			
				ftTelefoneTexto = "";
			
				//Coloca "()" e "-" nos números
				for(ft_x = 0; ft_x < ftTelefoneNumero.length; ft_x ++){
					if(ft_x < 10){
						switch(ft_x){
							case 0: ftTelefoneTexto += "("; break;
							case 2: ftTelefoneTexto += ") "; break;
							case 6: ftTelefoneTexto += "-"; break;
						}
						ftTelefoneTexto += ftTelefoneNumero.charAt(ft_x).toString();
					}
				}
			}
		
			if(typeof(ftTelefone)=="object")
				ftTelefone.value = ftTelefoneTexto;
			else
				return(ftTelefoneTexto);
		},
		cep : function(ftCep){
			var ftCepTexto = "";
			var ftCepNumero = "";
			var ftRegExpSohNumeros = /^\d$/;
		
			if(typeof(ftCep)=="object")
				ftCepTexto = ftCep.value.toString();
			else
				ftCepTexto = ftCep.toString();
			
			//Deixa apenas os números
			for(ft_x = 0; ft_x < ftCepTexto.length; ft_x ++)
				if(ftRegExpSohNumeros.test(ftCepTexto.charAt(ft_x)))
					ftCepNumero += ftCepTexto.charAt(ft_x).toString();
		
			ftCepTexto = "";
		
			//Coloca "()" e "-" nos números
			for(ft_x = 0; ft_x < ftCepNumero.length; ft_x ++){
				if(ft_x < 10){
					switch(ft_x){
						case 5: ftCepTexto += "-"; break;
					}
					ftCepTexto += ftCepNumero.charAt(ft_x).toString();
				}
			}
			
			if(typeof(ftCep)=="object")
				ftCep.value = ftCepTexto;
			else
				return(ftCepTexto);
		}
	}
};