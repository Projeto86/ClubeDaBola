var twJscSistemaNet = {
	iniciar : function(){ //Ref: twControleLoader.start()
		twJscSistemaNet.monitoramento.verficar(0, true);
	},
	cliente : {
		ip : '',
		online : true,
		setCount : 0,
		setStatus : function(online){
			if((twJscSistemaNet.cliente.online != online)||(twJscSistemaNet.cliente.setCount==0)){
				twJscSistemaNet.cliente.setCount ++;
				twJscSistemaNet.cliente.online = online;
			}
		},
		setIP : function(ip){
			twJscSistemaNet.cliente.ip = ip;
			var data = new Date();			
			//console.log('('+ twJscSistemaNet.cliente.setCount +' - '+ data.getHours() +':'+data.getMinutes() +') IP identificado: ' + ip);
		}
	},
	monitoramento : {
		lastTimeSpan : 0,
		timer : {
			timeoutID : 0,
			timeoutTries : 0
		},
		atualizar : function(ip, timeSpan){
			clearTimeout(twJscSistemaNet.monitoramento.timer.timeoutID);
			if(twJscSistemaNet.monitoramento.lastTimeSpan != timeSpan){
				twJscSistemaNet.monitoramento.lastTimeSpan = timeSpan;
				twJscSistemaNet.monitoramento.timer.timeoutTries = 0;
				twJscSistemaNet.monitoramento.timer.timeoutID = 0;
				twJscSistemaNet.cliente.setIP(ip);

				twJscSistemaNet.cliente.setStatus(true);
			}
			twJscSistemaNet.monitoramento.verficar(60000);
		},
		verficar : function(timer, run){
			if(typeof(run)!='boolean'){ run = false; }
			if(run){
				$$('ifrSysNetOnline').src = '/online.aspx?t='+(new Date()).getTime();
				twJscSistemaNet.monitoramento.timer.timeoutID = setTimeout(twJscSistemaNet.monitoramento.timeout, 5000);
			} else {
				setTimeout('twJscSistemaNet.monitoramento.verficar(0, true);', timer);
			}
		},
		timeout : function(){
			//$('ifrSysNetOnline').src = 'about:blank';
			twJscSistemaNet.cliente.setStatus(false);
			twJscSistemaNet.monitoramento.timer.timeoutTries ++;
			var tentativas = twJscSistemaNet.monitoramento.timer.timeoutTries;
			if(tentativas <= 3){
				//$('spSysNetIP').innerHTML = 'Testando conex&atilde;o... ('+tentativas+'&ordf; tentativa)';
				twJscSistemaNet.monitoramento.verficar(1000);
			} else {
				//$('spSysNetIP').innerHTML = 'Sem conex&atilde;o, tentando novamente em 15 segundos... ('+tentativas+'&ordf; tentativa)';
				twJscSistemaNet.monitoramento.verficar(10000);
			}
		}
	}
};