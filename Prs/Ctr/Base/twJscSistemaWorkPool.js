var twJscSistemaWorkPool = {
	onMessage : function(messageText, senderId, messageObject){
		switch(messageObject.sender){
			case twJscSistemaWorkPool.scripts.senders['twPoolSistemaDados'] :
				switch(messageObject.body.acao){
					case 'carregar':
						twJscSistemaDados.offline.atualizador.tabelaAtual.nome = messageObject.body.tabelaNome;
						twJscSistemaDados.offline.atualizador.carregar();
						break;
					case 'restart':
						googleGears.workerpool.sendMessage({ 'acao' : 'restart'}, messageObject.sender);
						break;
					case 'alert':
						alert(messageObject.body.msg);
						break;
				}
				break;
		}
	},
	scripts : {
		senders : [],
		loader : function(scriptName, scriptUrl, message){
			var request = twJscSistemaAjax.create('beta.httprequest');
			request.open('GET', scriptUrl+'?'+(new Date()).getTime());
			request.onreadystatechange = function() {
				if(request.readyState == 4){
					twJscSistemaWorkPool.scripts.senders[scriptName] = googleGears.workerpool.createWorker(request.responseText);
					googleGears.workerpool.sendMessage(message, twJscSistemaWorkPool.scripts.senders[scriptName]);
				}
			};
			request.send();
		}
	}
};

//googleGears.workerpool.onmessage = twJscSistemaWorkPool.onMessage;