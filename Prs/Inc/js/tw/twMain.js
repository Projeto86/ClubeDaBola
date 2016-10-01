var twMain = {
    loading : {
        open : function(){
            if(!$$("mainModalLoading"))
                webix.ui({
                    id : "mainModalLoading",
                    view:"window",
                    modal:true,
                    maxWidth:500,
                    maxHeight:500,
                    head:langIndex.modal.loading.title,
                    position:"center",
                    body:{
                        template:'<iframe src="/loading/cube?lang='+twGlobal.lang+'" width="100%" height="100%" allowTransparency="true" frameborder="0" scrolling="no" style="overflow:hidden;border:none"></iframe>'
                    }
                }).show();
        },
        close : function(){
            if($$("mainModalLoading"))
                $$("mainModalLoading").close();
        }
    },
    progressBar : function(params){
        var options = {
            percentage : 0,
            color : 'blue',
            labelWidth : 100,
            width : '100%',
            height : 25,
            thousands : twMoneyThousands,
            decimal : twMoneyDecimal,
            precision: 0
        };
        $.extend(options, params);

        var optionsMoneyMask = {
            prefix: '',
            suffix: '',
            thousands: options.thousands,
            decimal: options.decimal,
            precision: options.precision,
            allowNegative: false
        };
        if(Math.round(options.percentage)>100){ options.percentage = 100; }
        return '<div class="progress progress-'+options.color+'" style="position:relative; height:'+options.height+'px; width:'+options.width+';">' +
            '<span style="width:'+Math.ceil(options.percentage)+'%; height:'+(options.height-2)+'px">' +
                '<b style="left:3px; width:'+options.labelWidth+'px; line-height: '+(options.height-2)+'px;font-size: '+(options.height-10)+'px;display:block; position:absolute; text-align:left">'+twMain.moneyMask(options.percentage, optionsMoneyMask)+' %</b>' +
            '</span>' +
        '</div>';
    },
    title : {
        set : function(_title, _icon){
            $$('_Main_Title').define('label',_title);
            $$('_Main_TitleIcon').define('icon',_icon);
            $$('_Main_Title').refresh();
            $$('_Main_TitleIcon').refresh();
        }
    },
    menu : {
        title : {
            set : function(_title, _icon){
                $$('_Main_Menu_Icon').define('icon',_icon);
                $$('_Main_Menu_Title').define('label',_title);
                $$('_Main_Menu_Icon').refresh();
                $$('_Main_Menu_Title').refresh();
            }
        },
        parse : function(appID, list, show){
            _Main.globals.menu.selectedID = null;
            var permittedList = twMain.menuPermissions(appID, list);
            $$('_Main_Menu_List').clearAll();
            $$('_Main_Menu_List').parse(permittedList);
            $$('_Main_Menu_Btn').show();
            if(show){ $$('_Main_Menu').show(); }
        },
        select : function(itemId){
            if(itemId){
                var menu = $$('_Main_Menu_List');
                menu.select(itemId);

                var item = menu.getItem(itemId);
                if(item){ twMain.title.set(item.value, item.icon); }

                var openBranch = function(branchID){
                    var i = menu.getItem(branchID);
                    if(i){
                        if(i.id&&i.$parent){
                            menu.open(i.$parent);
                            if(menu.getItem(i.$parent).$parent){
                                openBranch(menu.getItem(i.$parent).$parent);
                            }
                        }
                    }
                };

                openBranch(itemId);
            }
        }
    },
    regexSearch : function(text, type){
        var r = ['AÀÁÂÃÄ','CÇ','EÈÉÊË','IÌÍÏÎ','NÑ','OÒÓÔÕÖ','UÙÚÛÜ','YÝ','aàáâãä','cç','eéèêë','iìíîï','nñ','oòóôõö','uùúûü','yý'];
        var tx = '';
        for(var x=0;x<text.length;x++){
            var l = text.substr(x,1);
            for(var i in r){ if(r[i].indexOf(l)>=0){ l = '[' + r[i] + ']'; break; } }
            tx+=l;
        }
        if(type){ type = type.toLowerCase(); }

        switch(type){
            case 'start': tx = '^' + tx; break;
            case 'end': tx = tx + '$'; break;
            case 'any': tx = tx; break;
            default:tx = '^' + tx + '$'; break; //match
        }
        return new RegExp(tx, 'i');
    },
	regexPermalink : function(text){ return text.replace(/[^a-z0-9]+/gi, '_').replace(/^-*|-*$/g, '').toLowerCase(); },
    window : {
        confirmBeforeClose : false,
        close : function(id){
            var dig = function(childs){
                for(var x in childs){
                    switch(childs[x].config.view){
                        case "combo":
                            childs[x].getPopup().hide();
                            break;
                        case "richselect":
                            childs[x].getPopup().hide();
                            break;
                        case "text":
                            if(childs[x].config.suggest){ $$(childs[x].config.suggest).hide(); }
                            break;
                        case "suggest":
                            childs[x].hide();
                            break;
                        case "popup":
                            childs[x].hide();
                            break;
                    }
                    dig(childs[x].getChildViews());
                }
            };


            if(twMain.window.confirmBeforeClose){
                webix.confirm({
                    type :"confirm-warning",
                    text:"Você mudou algumas informações nesta tela.<br><br>Se você a fechar, irá perder essas alterações.<br><br>Deseja realmente fecha-la?",
                    ok:"Feche a janela",
                    cancel:"Não",
                    callback:function(close){
                        if(close){
                            twMain.window.confirmBeforeClose = false;
                            dig($$(id).getChildViews());
							webix.UIManager.removeHotKey("enter");
                            $$(id).close();
                        }
                    }
                });
            } else {
                twMain.window.confirmBeforeClose = false;
                dig($$(id).getChildViews());
				webix.UIManager.removeHotKey("enter");
                $$(id).close();
            }
        }
    },
    hotkey : function(btn, key){
        webix.UIManager.removeHotKey(key);
        webix.UIManager.addHotKey(key, function(){ btn.callEvent("onItemClick"); });
    },
    tabViewNav : function(tabviewID){
        this.mv = $$(tabviewID).getMultiview();
        this.activeId = this.mv.getActiveId();
        this.views = this.mv.getChildViews();
        this.getActiveIndex = function(){
            for(var x in this.views){ if(this.views[x].config.id==this.activeId){ return parseInt(x); } }
            return -1;
        };
        this.getIdFromIndex = function(index){
            return this.views[index].config.id;
        };
        this.hasNext = function(){
            return(this.getActiveIndex()+1)<this.views.length;
        };
        this.hasPrev = function(){
            return(this.getActiveIndex()>0);
        };
        this.next = function(){
            if(this.hasNext()){ this.go(1); }
        };
        this.prev = function(){
            if(this.hasPrev()){ this.go(-1); }
        };
        this.go = function(index){
            var id = this.getIdFromIndex(this.getActiveIndex()+index);
            if(typeof $$(id).config.go=='function'){ $$(id).config.go(); }
            else { $$(id).show(); }
        };
    },
    arrayTree : function(list, parentPath, childPath){

        var getObjValue = function(obj, objPath){
            var r = null;
            for(var k in objPath){
                r = (obj[k]||null);
                if(r&&is.json(objPath[k])){ r = getObjValue(r, objPath[k]); }
                break;
            }
            return r;
        };

        var digObj = function(obj){
            for(var y in list){
                if(getObjValue(obj, childPath)==getObjValue(list[y], parentPath)){
                    list[y].data = [];
                    list[y].open = true;
                    obj.data.push(list[y]);
                    digObj(list[y]);
                }
            }
        };

        var listTree = [];

        for(var x in list){
            if(!getObjValue(list[x], parentPath)){
                list[x].data = [];
                list[x].open = true;
                listTree.push(list[x]);
            }
        }

        for(var x2 in listTree){ digObj(listTree[x2]); }

        return listTree.slice();
    },
    moneyMask: function(value, options) {

        var config = {
            prefix: twMoneyPrefix,
            suffix: twMoneySuffix,
            thousands: twMoneyThousands,
            decimal: twMoneyDecimal,
            precision: 2,
            allowNegative: false
        };

        $.extend(config, options);

        if(typeof value=='number'){
            value = (value.toFixed(config.precision)).replace(new RegExp("\\.", "g"), config.decimal);
        }

        var negative = (value.indexOf("-") > -1 && config.allowNegative) ? "-" : "",
            onlyNumbers = value.replace(/[^0-9]/g, ""),
            integerPart = onlyNumbers.slice(0, onlyNumbers.length - config.precision),
            newValue,
            decimalPart,
            leadingZeros;

        // remove initial zeros
        integerPart = integerPart.replace(/^0*/g, "");
        // put settings.thousands every 3 chars
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, config.thousands);
        if (integerPart === "") {
            integerPart = "0";
        }
        newValue = negative + integerPart;

        if (config.precision > 0) {
            decimalPart = onlyNumbers.slice(onlyNumbers.length - config.precision);
            leadingZeros = new Array((config.precision + 1) - decimalPart.length).join(0);
            newValue += config.decimal + leadingZeros + decimalPart;
        }

        var operator = "";
        if (newValue.indexOf("-") > -1) {
            newValue = newValue.replace("-", "");
            operator = "-";
        }
        return operator + config.prefix + newValue + config.suffix;
    },
    dateAdd : function(timeU, byMany, dateObj, dateFormat){
        return twJscSistemaDate.dateAdd(timeU, byMany, dateObj, dateFormat);
    },
    checkPermission : function(appID, menu){
        if(twGlobal.user){
            if(twGlobal.user.profile){
                if(twGlobal.user.profile.permissions){
                    var permissions = twGlobal.user.profile.permissions.join(';').toUpperCase().split(';');
                    if(permissions.indexOf(appID.toUpperCase()+'.'+menu.toUpperCase())>=0){
                        return true;
                    }
                }
            }
        }
        return false;
    },
    menuPermissions : function(appID, menuTemplate){
        if(!twGlobal.user){ return []; }
        if(!twGlobal.user.profile){ return []; }
        if(!twGlobal.user.profile.permissions){ return []; }

        var permissions = twGlobal.user.profile.permissions.filter(function(permission){
            return permission.toUpperCase().indexOf(appID.toUpperCase()+'.')===0;
        });

        if(!permissions.length){ return []; }

        var digger = function(list){
            var menu = [];
            list.forEach(function(item){
                var found = false;
                for(var y in item.permissions){
                    for(var x in permissions){
                        if(permissions[x].toUpperCase().indexOf(item.permissions[y].toUpperCase())===0){
                            menu.push({
                                "id" : item.id,
                                "value" : item.value,
                                "icon" : (item.icon||null)
                            });
                            if(item.data){ menu[menu.length-1].data = digger(item.data); }

                            found = true;
                            break;
                        }
                    }
                    if(found){ break; }
                }
            });
            return menu;
        };
        return digger(menuTemplate);
    },
    file : {
        url : twGlobal.filesUrl,
        download : function(_id){
            var fileUrl = twMain.file.url + '/v1/storage/file/download/'+_id+'?accessToken=' + twGlobal.user.token;
            window.open(fileUrl, '_blank');
        },
        get : function(_id){
            return twMain.file.url + '/v1/storage/file/get/'+_id+'?accessToken=' + twGlobal.user.token;
        },
        pdf : function(files, filename){
            if(filename){ filename = '&filename=' + filename; } else { filename = ''; }
            if(!is.array(files)){ files = [files]; }
            var fileUrl = twMain.file.url + '/v1/converter/pdf/merge/get?files='+files.join(',')+filename+'&accessToken=' + twGlobal.user.token;
            window.open(fileUrl, '_blank');
        },
        htmlToPdf : function(title, html, config){
            var json = {
                'accessToken' : twGlobal.user.token,
                'file' : {
                    'filename' : title.replace(/[^a-z0-9]/gi, '_') + '.pdf',
                    'html' : html,
                    'config' : (config||{})
                }
            };
            //console.log(JSON.stringify(json));
            $('#postForm input').val(JSON.stringify(json));
            $('#postForm').attr('action', twMain.file.url + '/v1/converter/pdf/html/download');
            $('#postForm').attr('target', '_blank');
            $('#postForm').submit();
        },
		list : function(params, callback){
			params = (params||{});
			params.accessToken = twGlobal.user.token;
			$.post('/files/list', params, callback);
		},
		delete : function(file_id, callback){
			$.post(
				'/files/delete',
				{ 'accessToken' : twGlobal.user.token, 'file_id' : file_id },
				callback
			);
		}
    },
    arrayMatch : function(array1, array2){
        if(!array1 && !array2){ return true; } //if the two arrays are empty
        if(!array1 || !array2){ return false; } //if only one array is empty (because if both will exit in the first if)
        if(array1.length != array2.length){ return false; } //compare length - can save a lot of time
        if(!array1.length && !array2.length){ return true; } //if both arrays are empty
        for(var x1 in array1){ if(array2.indexOf(array1[x1])<0){ return false; } }
        return true;
    },
    viewDisablerRecursive : function(view){
        var views = view.getChildViews();
        if(views.length){
            for(var x in views){
                twMain.viewDisablerRecursive(views[x]);
            }
        } else {
            switch((view.config.view?view.config.view.toLowerCase():'')){
                case "combo":
                case "richselect":
                case "datepicker":
                case "text":
                case "textarea":
                case "moneymask":
                case "counter":
                case "button":
                    view.disable();
            }
        }
    },
	datatable : {
		clearFilters : function(table){
			if(typeof table=="string") table = $$(id);
			table.config.columns.forEach(function(col){
				var filter = table.getFilter(col.id);
				if(filter){
					if(filter.setValue){ filter.setValue(''); }
					else { filter.value = ""; }
				}
			});
		}
	},
	formatSizeUnits : function (bytes){
        if      (bytes>=1073741824) {bytes=(bytes/1073741824).toFixed(2)+' GB';}
        else if (bytes>=1048576)    {bytes=(bytes/1048576).toFixed(2)+' MB';}
        else if (bytes>=1024)       {bytes=(bytes/1024).toFixed(2)+' KB';}
        else if (bytes>1)           {bytes=bytes+' bytes';}
        else if (bytes==1)          {bytes=bytes+' byte';}
        else                        {bytes='0 byte';}
        return bytes;
	},
	secondsToTime : function (d) {
		d = Number(d);
		var h = ("0"+Math.floor(d / 3600)).slice(-2);
		var m = ("0"+Math.floor(d % 3600 / 60)).slice(-2);
		var s = ("0"+Math.floor(d % 3600 % 60)).slice(-2);
		return h + ":" + m + ":" + s;
	}

};
