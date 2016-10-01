var twJscSistemaClima = {
	obter : function(){
		if(!twJscSistemaGeo.atual.ok){
			twJscSistemaGeo.localizar(function(ok){ if(ok){ twJscSistemaClima.obter(); } });
		} else {
			if(twJscSistemaNet.cliente.online && twJscSistemaGeo.atual.endereco.woeid!=null){
				twJscSistemaAjax.loadJS('https://tw.com.br/Prs/Web/Clima/Get.aspx?w='+twJscSistemaGeo.atual.endereco.woeid+'&callback=twJscSistemaClima.callback');
			}
		}
	},
	callback : function(json){
		if(json){
			$('divSysClima').style.visibility = 'visible';
			var info = '<b>' + json.medicao.temperatura + '&deg; C</b><br />\n';
			info += json.medicao.condicao.texto + '<br />\n';
			info += '<i>('+json.local.cidade + ' / ' + json.local.regiao + ')</i>\n';
			$('spanSysClimaInfo').innerHTML = info;
			$('imgSysClimaIcon').src = json.medicao.condicao.icone;
		}
		setTimeout(twJscSistemaClima.obter, (15 * 60 * 1000));
	}
};