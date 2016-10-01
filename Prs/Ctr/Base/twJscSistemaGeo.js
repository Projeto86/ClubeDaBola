

var twJscSistemaGeo = {
	atual : {
		ok : false,
		coordenadas : {
			latitude : 0, //Latitude em graus usando o  World Geodetic System 1984 (WGS84 datum).
			longitude : 0, //Longitude em graus (WGS84 datum).
			precisao : null, //Precisão horizonal da posicao em metros, ou 'null' se não houver
			altitude : null, //Altura em metros (WGS84 datum), ou 'null' se não houver
			altitudePrecisao : null //Precisão vertical da posicao em metros, ou 'null' se não houver
		},
		endereco : {
			paisCode : null, //Código do país (ISO 3166-1)
			pais : null, //Nome do pais
			estado : null, //Nome do estado ou região
			cidade : null, //Nome da cidade
			premissa : null, //Premissa, Ex.: Nome do prédio
			rua : null, //Nome da rua
			numero : null, //Numero do local
			woeid : null //Codigo metereologico
		},
		erro : false
	},
	localizar : function(funcaoRetorno){ //Se a 'funcaoRetorno' existir, retorna true se encontrar a localizao ou false se der erro
		//twJscSistemaGeo.atual.erro = true;

		twJscSistemaGeo.callback.funcao = null;
		twJscSistemaGeo.atual.ok = false;

		if(twJscSistemaNet.cliente.online && !twJscSistemaGeo.atual.erro){
			
			if(navigator.geolocation){ //HTML5
				navigator.geolocation.getCurrentPosition(
					function(p){
						twJscSistemaGeo.atual.coordenadas.latitude = p.coords.latitude;
						twJscSistemaGeo.atual.coordenadas.longitude = p.coords.longitude;
						twJscSistemaGeo.atual.coordenadas.precisao = p.coords.accuracy;
						twJscSistemaGeo.atual.coordenadas.altitude = p.coords.altitude;
						twJscSistemaGeo.atual.coordenadas.altitudePrecisao = p.coords.altitudeAccuracy;
						
						twJscSistemaGeo.atual.ok = true;
	
						if(typeof(funcaoRetorno)=='function'){ twJscSistemaGeo.callback.funcao = funcaoRetorno; }

						var s = p.coords.latitude + ',' + p.coords.longitude;
						//twJscSistemaAjax.loadJS('http://where.yahooapis.com/geocode?location='+s+'&flags=J&gflags=R&callback=twJscSistemaGeo.callback.woeid');
						twJscSistemaAjax.loadJS('https://tw.com.br/teste/clima/geocode.aspx?latlong='+s+'&callback=twJscSistemaGeo.callback.cidade');
					},
					function(erro){
						twJscSistemaGeo.atual.erro = true;
						if(typeof(funcaoRetorno)=='function'){ funcaoRetorno(false); }
					},
					{
						enableHighAccuracy : true
					}
				);
				
			} else {
				twJscSistemaGeo.atual.erro = true;
				if(typeof(funcaoRetorno)=='function'){ funcaoRetorno(false); }
			}
		}
	},
	callback : {
		funcao : null,
		cidade : function(json){
			if(!json.erro){
				twJscSistemaAjax.loadJS('https://query.yahooapis.com/v1/public/yql?q=select+*+from+geo.places+where+text%3D%22'+json.endereco.cidade.nome+','+json.endereco.pais.nome+'%22&format=json&callback=twJscSistemaGeo.callback.woeid');
			}
		},
		woeid : function(json){
			if(json.query.results.place){
				if(json.query.results.place.length>0){
					twJscSistemaGeo.atual.endereco.woeid = json.query.results.place[0].locality1.woeid;
				}
			}
			//if(json.ResultSet){ if(json.ResultSet.Results.length>0){ twJscSistemaGeo.atual.endereco.woeid = json.ResultSet.Results[0].woeid; } }
			if(typeof(twJscSistemaGeo.callback.funcao)=='function'){
				twJscSistemaGeo.callback.funcao(true);
				twJscSistemaGeo.callback.funcao = null;
			}
		}
	}
};