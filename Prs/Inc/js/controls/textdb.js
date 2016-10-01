webix.protoUI({
    name:"textdb",
    defaults:{
        keyPressTimeout:500,
        suggest : {
            keyPressTimeout:600,
            data:[],
            on : {
                onValueSuggest : function(obj){
                    var _this =  $$(this.config.master);
                    _this.selected = obj;
                    if(_this.i){
                        var i = _this.i.onselect;
            			if (i){ for (var n = 0; n < i.length; n++){ i[n].apply(_this, [obj]); } }
                    }
                }
            }
        }
    },
    getObject : function(){
        return (this.selected||null);
    },
    $init:function(config){
        this.attachEvent("onTimedKeyPress", function(){
            var _this = this;
            $$(_this.config.suggest).getList().clearAll();
            if(!_this.getValue()){ return; }
            if(!_this.config.api) return;
            if(!_this.config.api.endpoint) return;
            if(!_this.config.api.filter) return;
            if(typeof _this.config.api.map!='function') return;
            var params = {};
            if(_this.config.api.params) { params = _this.config.api.params; }

            params[_this.config.api.filter] = _this.getValue();

            twApi(_this.config.api.endpoint, params, function(r){
                console.log(r);
                $$(_this.config.suggest).getList().clearAll();
                $$(_this.config.suggest).getList().parse(r.response.map(_this.config.api.map));
            });
        });
    }
}, webix.ui.text);
