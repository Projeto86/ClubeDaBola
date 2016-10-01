var twJscSistemaCep = {
	callback : null,
	retorno : function(cepInfo){ twJscSistemaCep.callback(cepInfo); },
	consulta : function(cep, callback){
		if(cep.toString().length==9){
			twJscSistemaCep.callback = callback;
			twJscSistemaAjax.loadJS('http://cep.twla.com.br/consulta.aspx?c=twJscSistemaCep.retorno&q='+cep);
		}
	}
};