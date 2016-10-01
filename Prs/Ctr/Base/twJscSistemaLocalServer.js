var twJscSistemaLocalServer = {
	completed : false,
	progressBar : null,
	store : null,
	iniciar : function(){ //Ref: twControleLoader.start()
	
		/*var debug = twJscSistemaUI.getQueryString(document, 'debug');
		
		if(debug=='true'){
			var localServer = google.gears.factory.create('beta.localserver');
			localServer.removeManagedStore('tw-'+SYS_NAME);
			twJscSistemaLocalServer.completed = true;
		}
	
		if(!twJscSistemaLocalServer.completed){
	
			twJscSistemaUI.statusBar.escrever('Carregando cache <span id="sysLocalServerProgressBar"></span>');
			twJscSistemaLocalServer.progressBar = twJscSistemaUI.progressBar.multiColor('sysLocalServerProgressBar');
		
			var localServer = google.gears.factory.create('beta.localserver');
			localServer.removeManagedStore('tw-'+SYS_NAME);

			//store: sempre deve ser uma variavel global			
			twJscSistemaLocalServer.store = localServer.createManagedStore('tw-'+SYS_NAME);
			twJscSistemaLocalServer.store.manifestUrl = '/manifest.aspx?v=v'+(new Date()).getTime();
			twJscSistemaLocalServer.store.onerror = function(erro){
				//alert(erro.message);
				if(!twJscSistemaLocalServer.completed){
					twJscSistemaLocalServer.completed = true;
					twJscSistemaLocalServer.progressBar = null;
					twJscSistemaUI.statusBar.limpar();
				}
			};
			twJscSistemaLocalServer.store.onprogress = function(detais){
				var porcentagem = parseInt((detais.filesComplete * 100) / detais.filesTotal)
				twJscSistemaLocalServer.progressBar.setPercentage(porcentagem);
			}
			twJscSistemaLocalServer.store.oncomplete = function(detais){
				if(!twJscSistemaLocalServer.completed){
					//detais.newVersion
					twJscSistemaLocalServer.completed = true;
					twJscSistemaLocalServer.progressBar = null;
					twJscSistemaUI.statusBar.escrever('Cache carregado com sucesso!');
					googleGears.timer.setTimeout(twJscSistemaUI.statusBar.limpar, 4000);
				}
			}
			twJscSistemaLocalServer.store.checkForUpdate();
		}*/
	}
};

