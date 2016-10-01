var twAddress = function(){

	this.defaults = {
		country : '',
		state : '',
		city : '',
		neighborhood : '',
		addressName : '',
		addressNumber : '',
		addressComplement : '',
		postalCode : '',
		coords : null
	};

	this.getIds = function(){
		var p = this;
		return {
			country : p.country.id,
			state : p.state.id,
			city : p.city.id,
			neighborhood : p.neighborhood.id,
			addressName : p.addressName.id,
			addressNumber : p.addressNumber.id,
			addressComplement : p.addressComplement.id,
			postalCode : p.postalCode.id,
			map : p.map.id
		};
	};

	this.setIds = function(ids){
		var p = this;
		p.country.id = ids.country;
		p.state.id = ids.state;
		p.city.id = ids.city;
		p.neighborhood.id = ids.neighborhood;
		p.addressName.id = ids.addressName;
		p.addressNumber.id = ids.addressNumber;
		p.addressComplement.id = ids.addressComplement;
		p.postalCode.id = ids.postalCode;
		p.map.id = ids.map;
	};

	this.init = function(ids, callback){
		var p = this;

		if(
			typeof ids.country != 'string' ||
			typeof ids.state != 'string' ||
			typeof ids.city != 'string' ||
			typeof ids.neighborhood != 'string' ||
			typeof ids.addressName != 'string' ||
			typeof ids.addressNumber != 'string' ||
			typeof ids.addressComplement != 'string' ||
			typeof ids.postalCode != 'string' ||
			typeof ids.map != 'string'
		){
			alert("Please, inform all IDs needed!");
			return;
		}

		p.country.id = ids.country;
		p.state.id = ids.state;
		p.city.id = ids.city;
		p.neighborhood.id = ids.neighborhood;
		p.addressName.id = ids.addressName;
		p.addressNumber.id = ids.addressNumber;
		p.addressComplement.id = ids.addressComplement;
		p.postalCode.id = ids.postalCode;
		p.map.id = ids.map;

		p.country.load(function(){
			p.state.load(function(){
				p.city.load(function(){
					p.neighborhood.load(function(){
						$$(p.neighborhood.id).attachEvent("onChange", function(id_new, id_old){ if(typeof id_old!='undefined'){ p.geocoding.search(); } });
						$$(p.addressName.id).attachEvent("onChange", function(id_new, id_old){ if(typeof id_old!='undefined'){ p.geocoding.search(); } });
						$$(p.addressNumber.id).attachEvent("onChange", function(id_new, id_old){ if(typeof id_old!='undefined'){ p.geocoding.search(); } });
						if(typeof callback=='function'){ callback(); }
					});
				});
			});
		});
	};

	this.clearAll = function(pos){
		if(pos<1){ this.country.clear(); }
		if(pos<2){ this.postalCode.clear(); }
		if(pos<2){ this.state.clear(); }
		if(pos<3){ this.city.clear(); }
		if(pos<4){ this.neighborhood.clear(); }
		this.addressName.clear();
		this.addressNumber.clear();
		this.addressComplement.clear();
	};

	this.getValues = function(){
		var p = this;
		var country = p.country.getItem();
		var state = p.state.getItem();
		var city = p.city.getItem();
		var neighborhood = p.neighborhood.getValue();
		var addressName = p.addressName.getValue();
		var addressNumber = p.addressNumber.getValue();
		var addressComplement = p.addressComplement.getValue();
		var postalCode = p.postalCode.getValue();
		var coords = p.map.getValue();

		var doc = {};

		if(country){ doc.country = { "code" : country.id, "name" : country.value, "bacen" : country.bacen }; }
		if(state){ doc.state = { "code" : state.id, "name" : state.value }; }
		if(city){ doc.city = { "code" : parseInt(city.id), "name" : city.value }; }
		if(neighborhood!==''){ doc.neighborhood = { "name" : neighborhood }; }
		if(addressName!==''){
			doc.address = { "name" : addressName };
			if(addressNumber){
				doc.address.number = addressNumber;
				if(addressComplement){ doc.address.complement = addressComplement; }
			}
		}
		if(postalCode){ doc.postalCode = postalCode; }
		if(city){ if(city.ibge){ doc.ibge = city.ibge; } }
		if(coords){ doc.coords = coords; }
		return webix.copy(doc);
	};

	this.country = {
		parent : this,
		id : "",
		clear : function(){
			$$(this.id).getPopup().getList().clearAll();
			$$(this.id).setValue('');
		},
		eventID : null,
		load : function(callback){
			this.parent.clearAll(0);
			var p = this.parent;
			twApi(
				"baseArea/country/list",
				null,
				function(r){
					if(r.status==200){
						var l = [];
						for(var x in r.response){
							l.push({
								id : r.response[x].country.code,
								value : r.response[x].country.name,
								postalCode : r.response[x].country.postalCode,
								bacen : (r.response[x].country.bacen||null),
								coords : r.response[x].coords
							});
						}
						$$(p.country.id).getPopup().getList().clearAll();
						$$(p.country.id).getPopup().getList().parse(l);
						if(p.country.eventID){
							$$(p.country.id).detachEvent(p.country.eventID);
							p.country.eventID=null;
						}
						$$(p.country.id).setValue(p.defaults.country);
						p.defaults.country = '';
						p.postalCode.clear();
					}

					if(!p.country.eventID){
						p.country.eventID = $$(p.country.id).attachEvent("onChange", function(){
							p.state.load(function(){ setTimeout(function(){ $$(p.postalCode.id).focus(); }, 100); });
						});
					}

					if(typeof callback=="function"){ callback(); }
				},
				true
			);
		},
		getItem : function(){
			var id = $$(this.id).getValue();
			return (id?$$(this.id).getPopup().getList().getItem(id):null);
		}
	};

	this.state = {
		parent : this,
		id : "",
		clear : function(){
			$$(this.id).getPopup().getList().clearAll();
			$$(this.id).setValue('');
		},
		eventID : null,
		load : function(callback){
			this.parent.clearAll(1);
			var p = this.parent;
			var country = p.country.getItem();
			if(country){
				twApi(
					"baseArea/state/list",
					{ country : { code : country.id } },
					function(r){
						if(r.status==200){
							var l = [];
							for(var x in r.response){
								if(r.response[x].state){
									l.push({
										id : r.response[x].state.code,
										value : r.response[x].state.name,
										coords : r.response[x].coords
									});
								}
							}
							$$(p.state.id).getPopup().getList().clearAll();
							$$(p.state.id).getPopup().getList().parse(l);

							if(p.state.eventID){
								$$(p.state.id).detachEvent(p.state.eventID);
								p.state.eventID=null;
							}

							$$(p.state.id).setValue(p.defaults.state);
							p.defaults.state = '';
						}

						if(!p.state.eventID){
							p.state.eventID = $$(p.state.id).attachEvent("onChange", function(){ p.city.load(); });
						}

						if(typeof callback=="function"){ callback(); }
					},
					true
				);
			} else {
				if(typeof callback=="function"){ callback(); }
			}
		},
		getItem : function(){
			var id = $$(this.id).getValue();
			return (id?$$(this.id).getPopup().getList().getItem(id):null);
		}
	};

	this.city = {
		parent : this,
		id : "",
		clear : function(){
			if($$(this.id).config.view==='text' && $$(this.id).config.suggest){
				$$($$(this.id).config.suggest).getList().clearAll();
			} else $$(this.id).getPopup().getList().clearAll();
			$$(this.id).setValue('');
		},
		eventID : null,
		load : function(callback){
			this.parent.clearAll(2);
			var p = this.parent;
			var country = p.country.getItem();
			var state = p.state.getItem();
			if(country&&state){
				twApi(
					"baseArea/city/list",
					{ country : { code : country.id }, state : { code : state.id } },
					function(r){
						if(r.status==200){
							var l = [];
							for(var x in r.response){
								if(r.response[x].city){
									l.push({
										id : r.response[x].city.code,
										value : r.response[x].city.name,
										coords : r.response[x].coords,
										ibge : r.response[x].ibge
									});
								}
							}

							var listObj;
							if($$(p.city.id).config.view==='text' && $$(p.city.id).config.suggest){
								listObj = $$($$(p.city.id).config.suggest).getList();
							} else listObj = $$(p.city.id).getPopup().getList();

							listObj.clearAll();
							listObj.parse(l);

							if(p.city.eventID){
								$$(p.city.id).detachEvent(p.city.eventID);
								p.city.eventID=null;
							}

							if(p.defaults.city){ $$(p.city.id).setValue(p.defaults.city); }
							p.defaults.city = null;
							if($$(p.city.id).getValue()===''){ $$(p.city.id).focus(); }
						}

						if(!p.city.eventID){ p.city.eventID = $$(p.city.id).attachEvent("onChange", function(){ p.neighborhood.load(); }); }

						if(typeof callback=="function"){ callback(); }
					},
					true
				);
			} else {
				if(typeof callback=="function"){ callback(); }
			}
		},
		getItem : function(){
			if($$(this.id).config.view==='text')
				return {
					id : null,
					value : $$(this.id).getValue(),
					coords : null,
					ibge : null
				};
			else {
				var id = $$(this.id).getValue();
				return (id?$$(this.id).getPopup().getList().getItem(id):null);
			}
		}
	};

	this.neighborhood = {
		parent : this,
		id : "",
		clear : function(){
			$$($$(this.id).config.suggest).getList().clearAll();
			$$(this.id).setValue('');
		},
		eventID : null,
		load : function(callback){
			this.parent.clearAll(3);

			var p = this.parent;
			var country = p.country.getItem();
			var state = p.state.getItem();
			var city = p.city.getItem();

			p.addressName.setValue(p.defaults.addressName);
			p.addressNumber.setValue(p.defaults.addressNumber);
			p.addressComplement.setValue(p.defaults.addressComplement);
			p.postalCode.setValue(p.defaults.postalCode);

			if(p.defaults.coords){
				p.map.setValue(p.defaults.coords);
				p.defaults.coords = null;
			}

			if(country&&state&&city){
				twApi(
					"baseArea/neighborhood/list",
					{
						country : { code : country.id },
						state : { code : state.id },
						city : { code : parseInt((city.id||0)) }
					},
					function(r){
						if(r.status==200){
							var l = [];
							for(var x in r.response){
								if(r.response[x].neighborhood){
									l.push({
										id : r.response[x].neighborhood.code,
										value : r.response[x].neighborhood.name,
										coords : r.response[x].coords
									});
								}
							}
							$$($$(p.neighborhood.id).config.suggest).getList().clearAll();
							$$($$(p.neighborhood.id).config.suggest).getList().parse(l);
						}

						if(p.neighborhood.eventID){
							$$(p.neighborhood.id).detachEvent(p.neighborhood.eventID);
							p.neighborhood.eventID=null;
						}

						if(p.defaults.neighborhood){ $$(p.neighborhood.id).setValue(p.defaults.neighborhood); }
						p.defaults.neighborhood = null;

						if(p.neighborhood.getValue()===''){ setTimeout(function(){ $$(p.neighborhood.id).focus(); },50);  }
						else if(p.addressName.getValue()===''){ $$(p.addressName.id).focus(); }
						else { $$(p.addressNumber.id).focus(); }

						if(!p.neighborhood.eventID){
							p.neighborhood.eventID = $$(p.neighborhood.id).attachEvent("onChange", function(){
								setTimeout(function(){ $$(p.addressName.id).focus(); },50);
							});
						}

						if(typeof callback=="function"){ callback(); }
					},
					true
				);
			} else {
				if(typeof callback=="function"){ callback(); }
			}
		},
		getValue : function(){
			return $$(this.id).getValue();
		}
	};

	this.postalCode = {
		parent : this,
		id : "",
		clear : function(){
			var p = this.parent;
			var country = p.country.getItem();

			var placeholder = "99999";
			var mask = "99999";

			if(country){
				if(country.postalCode){
					if(country.postalCode.placeholder){ placeholder = country.postalCode.placeholder; }
					if(country.postalCode.mask){ mask = country.postalCode.mask; }
				}
			}

			$$(this.id).setValue('');
			$$(this.id).config.placeholder = placeholder;
			$$(this.id).config.inputmask = mask;
			$$(this.id).render();
		},
		search : function(callback){
			var p = this.parent;
			var country = p.country.getItem();
			var postalCode = p.postalCode.getValue().match(/\d/g).join('');

			if(country&&postalCode!==''){
				twApi(
					"baseArea/postalCode/get",
					{ country : { code : country.id }, postalCode : parseInt(postalCode) },
					function(r){
						if(r.status==200){
							p.defaults.state = (r.response.state?r.response.state.code:'');
							p.defaults.city = (r.response.city?($$(p.city.id).config.view==='text'?r.response.city.name:r.response.city.code):'');
							p.defaults.neighborhood = (r.response.neighborhood?r.response.neighborhood.name:'');

							p.defaults.addressName = (r.response.address?r.response.address.name:'');
							p.defaults.addressNumber = '';
							p.defaults.addressComplement = '';
							p.defaults.postalCode = postalCode;

							p.state.load(function(){
								p.city.load(function(){
									p.neighborhood.load(function(){
										if(r.response.coords){ p.map.setValue(r.response.coords); }

										if(typeof callback=="function"){ callback(); }
									});
								});
							});
						} else {
							if(typeof callback=="function"){ callback(); }
						}
					},
					true
				);
			}
		},
		getValue : function(){
			if($$(this.id).getValue()){	return $$(this.id).getValue(); }
			return null;
		},
		setValue : function(val){
			$$(this.id).setValue(val);
		}
	};

	this.addressName = {
		id : "",
		clear : function(){ this.setValue(''); },
		getValue : function(){ return $$(this.id).getValue(''); },
		setValue : function(val){ $$(this.id).setValue(val); }
	};

	this.addressNumber = {
		id : "",
		clear : function(){ this.setValue(''); },
		getValue : function(){ return $$(this.id).getValue(''); },
		setValue : function(val){ $$(this.id).setValue(val); }
	};

	this.addressComplement = {
		id : "",
		clear : function(){ this.setValue(''); },
		getValue : function(){ return $$(this.id).getValue(''); },
		setValue : function(val){ $$(this.id).setValue(val); }
	};

	this.map = {
		id : "",
		clear : function(){
			$$(this.id).config.coords = [];
			$$(this.id).refresh();
		},
		getValue : function(){
			if($$(this.id)){
				if($$(this.id).config){
					if($$(this.id).config.coords){
						if($$(this.id).config.coords.length>0){
							return $$(this.id).config.coords[0];
						}
					}
				}
			}
			return null;
		},
		setValue : function(coords){
			$$(this.id).config.coords = [ coords ];
			$$(this.id).refresh();
		},
	};

	this.geocoding = {
		parent : this,
		search : function(){
			var p = this.parent;
			var country = p.country.getItem();
			var state = p.state.getItem();
			var city = p.city.getItem();
			var neighborhood = p.neighborhood.getValue();
			var addressName = p.addressName.getValue();
			var addressNumber = p.addressNumber.getValue();

			if(country){
				var search = { country : { code : country.id } };
				if(state){ search.state = { code : state.id }; }
				if(city){ search.city = { name : city.value }; }
				if(neighborhood){ search.neighborhood = { name : neighborhood }; }
				if(addressName){
					search.address = { name : addressName };
					if(addressNumber){ search.address.number = addressNumber ; }
				}
				twApi(
					"baseArea/geocode/search",
					search,
					function(r){
						if(r.status==200){
							if(r.response){
								p.map.setValue(r.response);
							}
						}
					},
					true
				);
			}
		}
	};
};
