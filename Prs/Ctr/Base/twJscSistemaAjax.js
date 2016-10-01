var twJscSistemaAjax = {
	create : function(vs){
		try{return new ActiveXObject('Msxml2.XMLHTTP')}catch(e){try{return new ActiveXObject('Microsoft.XMLHTTP')}catch(e){return new XMLHttpRequest()}}
	},
	loadJS : function(url){
		var h=document.getElementsByTagName("head")[0];
		var s=document.createElement("script");
		url += url.indexOf('?') >= 0 ? '&' : '?';
		url += 'nocache='+(new Date()).getTime();
		s.setAttribute("type","text/javascript");
		s.setAttribute("src",url);
		h.insertBefore(s, h.firstChild);
	}
};