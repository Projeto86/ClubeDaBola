
var globalLocatorGeocoder = null;
var globalLocatorPlaces = null;

webix.protoUI({
    name:"locator",
    defaults:{
        keyPressTimeout:500,
        on : {
            onTimedKeyPress : function(){
				var _this = this;
				$$(_this.config.suggest).getList().clearAll();
                if(!_this.getValue()){ return; }
                if(!globalLocatorPlaces){ return; }
                globalLocatorPlaces.getQueryPredictions(
                    { 'input' : _this.getValue() },
                    function(results, status){
                        if(results && results.length){
                            $$(_this.config.suggest).getList().clearAll();
                            $$(_this.config.suggest).getList().parse(results.map(function(item){
                                return {
                                    'id' : item.id,
                                    'value' : item.description,
                                    'place_id' : item.place_id
                                };
                            }));
                        } else {
                            if(_this.config.map){
                                globalLocatorGeocoder.geocode(
                                    { 'address' : _this.getValue() },
                                    function(results, status){
                                        var coords = [];
                                        if(results && results.length){
                                            coords = [
                                                [
                                                    results[0].geometry.location.lng(),
                                                    results[0].geometry.location.lat()
                                                ]
                                            ];
                                        }
                                        $$(_this.config.map).parse(coords);
                                    }
                                );
                            }
                        }
                    }
                );
            }
        },
        suggest : {
            keyPressTimeout:600,
            data:[],
            on : {
                onValueSuggest : function(obj){
                    var configSet =  $$(this.config.master).config;
                    var mapID = configSet.map;
                    if(mapID){
                        globalLocatorGeocoder.geocode(
                            { 'placeId' : obj.place_id },
                            function(results, status){
                                var coords = [];
                                if(results && results.length){
                                    coords = [
                                        [
                                            results[0].geometry.location.lng(),
                                            results[0].geometry.location.lat()
                                        ]
                                    ];
                                }
                                $$(mapID).parse(coords);

                                if ( typeof(configSet.onSelect)=='function' ){
                                    configSet.onSelect();
                                }
                            }
                        );
                    }

                }
            }
        }
    },
    $init:function(config){
        try {
            globalLocatorGeocoder = new google.maps.Geocoder();
            globalLocatorPlaces = new google.maps.places.AutocompleteService();
        } catch(err) {}


        this.attachEvent("onAfterRender", function(){
            var _this = this;
            var mapID = _this.config.map;
            twMain.hotkey($$(this),"enter");
            if(!mapID && _this.config.rel){
                var formFinder = function(view){
                    var parent = view.getParentView();
                    if(!parent){ return null; }
                    if(parent.config.type=='form'){ return parent; }
                    else { return formFinder(parent); }
                };
                var frm = formFinder(_this);
                if(frm){
                    webix.ui.each(frm, function(e) {
                        if(_this.config.rel==e.config.rel && e.config.view=="google-map" && !mapID){ mapID = e.config.id; }
                    });
                }
            }
            this.define('map', mapID);
        });

    }
}, webix.ui.text);
