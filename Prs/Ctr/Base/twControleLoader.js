var twControleLoader = {
	warmUP : function(){
		//twJscSistemaDados.html5Database.iniciar();

		//window.dhx_globalImgPath = "./../../../App/Client/dhtmlX/imgs/";
		//dhtmlx.skin = "dhx_skyblue";

		/*window.onerror = function(msg, url, linenumber){
			alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
			return true;
		}*/

		window.onload = twControleLoader.start;

	},
	start : function(){

		twJscSistemaUI.tela.altura.atualizar();
		window.onresize = twJscSistemaUI.tela.altura.atualizar;

		//twJscSistemaUI.menu.carregar();

		//twJscSistemaClima.obter();

		//Para desativar o cache de arquivos use: http://[projeto].twla.com.br/?debug=true
		//twJscSistemaLocalServer.iniciar();

		//twJscSistemaNet.iniciar();

		//Estudar para carregar o workpool do framework.twla.com.br/js
		/*var request = google.gears.factory.create('beta.httprequest');
		request.open('GET', '/App/Client/tw/twJscSistemaDados.js?'+(new Date()).getTime());
		request.onreadystatechange = function() {
			if(request.readyState == 4){
				twJscSistemaWorkPool.scripts.loader('twPoolSistemaDados', '/App/Client/tw/Pool/twPoolSistemaDados.js', { acao : 'start', twJscSistemaDados : request.responseText } );
			}
		};
		request.send();*/

		//twJscSistemaUI.tela.carregar('/Prs/Web/Admin/Base/Sistema/Login.htm', true);
	},
	WebServiceFailedCallback : function(error){
		console.log(error);
		/*
		twJscSistemaUI.alerta.carregandoFechar();

		var stackTrace = error.get_stackTrace();
		var message = error.get_message();
		var statusCode = error.get_statusCode();
		var exceptionType = error.get_exceptionType();
		var timedout = error.get_timedOut();
		var msg = "<div id=\"objId\" style=\"width:100%;height:100%;overflow:auto\">"
			+ "<center><b>ERRO AO CARREGAR WEBSERVICE</b></center><br><br>\n"
			+ "<b>Service Error:</b> " + message + "<br>\n"
			+ "<b>Stack Trace:</b> " +  stackTrace + "<br>\n"
			+ "<b>Status Code:</b> " + statusCode + "<br>\n"
			+ "<b>Exception Type:</b> " + exceptionType + "<br>\n"
			+ "<b>Timedout:</b> " + timedout
			+ "</div>";

		var winErro = twJscSistemaUI.alerta.abrir({id:'WebServiceFailedCallbackErroWindow', titulo:'Erro WebService', width: 450, height: 450, modal: true});
		winErro.attachHTMLString(msg);
		*/
	}
}

twControleLoader.warmUP();
