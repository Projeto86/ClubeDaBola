
webix.protoUI({
	name:"google-map",
	$init:function(config){
		this.$view.innerHTML = '<iframe src="/Prs/Web/Controls/googlemaps_iframe.htm?nc='+(new Date()).getTime()+'" frameborder="0" scrolling="no"  style="width:100%;height:100%"></iframe>';
		this._contentobj = this.$view.firstChild;
		this.$ready.push(this.render);
	},
	render : function(){
		var view_id = this.$view.attributes.view_id.value;
		var t = this._contentobj;
		t.onload = function(){ t.contentWindow.twMap.setViewID(view_id); };
	},
	loaded : function(){
		if(!this._contentobj.contentWindow) return;
		var c = this.config;
		var m = this._contentobj.contentWindow.twMap;
		m.map.setCenter(c.center[1], c.center[0]);
		m.map.setZoom(c.zoom);
		m.map.setMapTypeId(c.mapType);
		this.refresh();
	},
	refresh : function(_this, counter){
		_this = (_this||this);
		if(!_this._contentobj.contentWindow) return;
		var c = _this.config;
		var m = _this._contentobj.contentWindow.twMap;
		if(m){
			m.markers.clearAll();
			if(c.coords.length>0){
				var b = { n : -9999, s : 9999, e : -9999, w : 9999 };
				for(var x in c.coords){
					var lat = 0, lng = 0;
					if(is.array(c.coords[x])){
						lat = c.coords[x][1];
						lng = c.coords[x][0];
						m.markers.add(lat, lng, c.editable);
					} else if(is.json(c.coords[x])){
						lat = c.coords[x].coords[1];
						lng = c.coords[x].coords[0];
						m.markers.add(lat, lng, c.editable, c.coords[x].title, c.coords[x].id);
					}
					if(lng > b.e){ b.e = lng; } if(lng < b.w){ b.w = lng; }
					if(lat > b.n){ b.n = lat; } if(lat < b.s){ b.s = lat; }
				}
				if(_this.config.coords.length==1){ b.s -= 0.005; b.w -= 0.005; b.n += 0.005; b.e += 0.005; }

				m.map.fitBounds(b.s, b.w, b.n, b.e);
				
			}
			if(c.borders.length){ m.border.parse(c.borders); }
			if(c.heatmap.length){ m.heatmap.parse(c.heatmap); }
		} else {
			if(!counter||counter<50)
				setTimeout(function(){ _this.refresh(_this, (counter?counter+1:1)); },30); //if the twMap it's not load
		}
	},
	parse : function(coords){
		this.config.coords = coords;
		this.refresh();
	},
	updateCoords : function(pos, lat, lng){
		this.config.coords[pos] = [ lng, lat ];
	},
	getValue : function(){
		return this.config.coords;
	},
	setValue : function(value){
		this.config.coords[0] = value;
		if(this.isVisible()){ this.refresh(); }
	},
	setBorders : function(list){
		this.config.borders = list.slice();
		if(this.isVisible()){ this.refresh(); }
	},
	setHeatmap : function(list){
		this.config.heatmap = list.slice();
		if(this.isVisible()){ this.refresh(); }
	},
	defaults:{
		zoom: 5,
		center:[ -45, -23 ],
		mapType: "ROADMAP" ,
		coords : [],
		borders : [],
		heatmap : [],
		editable : false
	},
	$setSize:function(){ webix.ui.view.prototype.$setSize.apply(this, arguments); }
}, webix.ui.view);
