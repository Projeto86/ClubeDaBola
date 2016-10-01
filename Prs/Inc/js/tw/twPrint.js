var twPrint = {
    _formatTemplates : {
        money : function(v){return twMain.moneyMask(v);},
        decimal : function(v){return parseFloat(Math.round(v * 100) / 100).toFixed(2);},
        integer : function(v){return parseInt(v);},
        fulldate : function(v){return twJscSistemaDate.formatDate(new Date(v),twDateFormat + ' HH:mm');},
        shortdate : function(v){return twJscSistemaDate.formatDate(new Date(v),twDateFormat);}
    },
    _getValue : function(key, obj){
        var path = key.split('.');
        for(var p in path){ if(!obj){ break; } obj = obj[path[p]]; }
        return obj;
    },
    _execute : function(filename, template, data, windowName, callback){

        var fields = template.body.fields;

        var _getFieldName = function(_id){
            for(var f in fields){ if(fields[f]._id==_id){ return fields[f].name[twGlobal.lang]; } }
            return '';
        };

        var dataList = twPrint._getValue(template.body.list, data);

        var tableHeader = [];
        var tableLines = [];

        template.body.template.forEach(function(column){
            tableHeader.push('<th '+(column.align?'align="'+column.align+'"':'')+'>'+_getFieldName(column.field)+'</th>');
            tableLines.push('<td '+(column.align?'align="'+column.align+'"':'')+'>{{:'+column.field.replace(/\./g,'_')+'}}</td>');
        });

        var style = '<style>' +
            'body, th, td, p { font-family: Arial; font-size: 12pt; }\r\n' +
            '#templateList th { background: #CCC; }\r\n' +
            '#templateList tbody tr:nth-child(even) { background: #EFEFEF; }\r\n' +
        '</style>';

        var body = style+'<table id="templateList" width="100%" border="0" cellpadding="5" cellspacing="0">' +
            '<thead><tr>' + tableHeader.join('') + '</tr></thead>' +
            '<tbody>{{for list}}<tr>' + tableLines.join('') + '</tr>{{/for}}</tbody>' +
            '</table>';

        var list = dataList.map(function(item){
            var doc = {};
            template.body.template.forEach(function(column){
                var value = twPrint._getValue(column.field, item);
                if(column.format){ value = twPrint._formatTemplates[column.format](value); }
                doc[column.field.replace(/\./g, '_')] = value;
            });
            return doc;
        });

        var header = '', footer = '';

        var valueReplacer = function(text){
            text = text.replace(/\[\[page\.actual\]\]/g, '{#pageNum}');
            text = text.replace(/\[\[page\.total\]\]/g, '{#numPages}');

            text = text.replace(/\[\[date\.now\|shortdate\]\]/g, twPrint._formatTemplates.shortdate(twSystemDate.toDate().getTime()));
            text = text.replace(/\[\[date\.now\|fulldate\]\]/g, twPrint._formatTemplates.fulldate(twSystemDate.toDate().getTime()));

            template.placeholders.forEach(function(placeholder){
                var id = placeholder._id.split('|');
                var key = id[0];
                var format = (id.length>1?id[1]:null);
                var value = (twPrint._getValue(key, data)||'');
                if(format&&value){ value = twPrint._formatTemplates[format](value); }
                text = text.replace(new RegExp('\\[\\['+placeholder._id.replace(/\./g,'\\.').replace(/\|/g,'\\|')+'\\]\\]', 'g'), value);
            });
            return text;
        };

        if(template.header.template){ header = style + valueReplacer(template.header.template); }
        if(template.footer.template){ footer = style + valueReplacer(template.footer.template); }

        $('#postForm input').val(JSON.stringify({
            'accessToken' : twGlobal.user.token,
            'filename' : filename + '.pdf',
            'body' : {
                'template' : body,
                'data' : { 'list' : list }
            },
            'header' : header,
            'footer' : footer,
            'config' : template.config
        }));
        $('#postForm').attr('action', twMain.file.url + '/v1/report/pdf/download');
        $('#postForm').attr('target', windowName);
        $('#postForm').submit();

        if(typeof callback=='function') callback();

    },
    preview : function(template, data, callback){
        twPrint._execute('preview', template, data, '_blank', callback);
    },
    download : function(template_id, query, callback){
        var windowName = 'twPrint_' + (new Date()).getTime();
        var win = window.open('about:blank', windowName);
        var b = '<div class="windows8">' +
        	'<div class="wBall" id="wBall_1"><div class="wInnerBall"></div></div>' +
        	'<div class="wBall" id="wBall_2"><div class="wInnerBall"></div></div>' +
        	'<div class="wBall" id="wBall_3"><div class="wInnerBall"></div></div>' +
        	'<div class="wBall" id="wBall_4"><div class="wInnerBall"></div></div>' +
        	'<div class="wBall" id="wBall_5"><div class="wInnerBall"></div></div>' +
        '</div>';
        var s = 'html,body{margin:0px;padding:0px;width:100%;height:100%;}.windows8{position:relative;width:90px;height:90px;margin:auto;top:50%;margin-top:-45px;}.windows8 .wBall{position:absolute;width:86px;height:86px;opacity:0;transform:rotate(225deg);-o-transform:rotate(225deg);-ms-transform:rotate(225deg);-webkit-transform:rotate(225deg);-moz-transform:rotate(225deg);animation:orbit 6.96s infinite;-o-animation:orbit 6.96s infinite;-ms-animation:orbit 6.96s infinite;-webkit-animation:orbit 6.96s infinite;-moz-animation:orbit 6.96s infinite}.windows8 .wBall .wInnerBall{position:absolute;width:11px;height:11px;background:#000;left:0;top:0;border-radius:11px}.windows8 #wBall_1{animation-delay:1.52s;-o-animation-delay:1.52s;-ms-animation-delay:1.52s;-webkit-animation-delay:1.52s;-moz-animation-delay:1.52s}.windows8 #wBall_2{animation-delay:.3s;-o-animation-delay:.3s;-ms-animation-delay:.3s;-webkit-animation-delay:.3s;-moz-animation-delay:.3s}.windows8 #wBall_3{animation-delay:.61s;-o-animation-delay:.61s;-ms-animation-delay:.61s;-webkit-animation-delay:.61s;-moz-animation-delay:.61s}.windows8 #wBall_4{animation-delay:.91s;-o-animation-delay:.91s;-ms-animation-delay:.91s;-webkit-animation-delay:.91s;-moz-animation-delay:.91s}.windows8 #wBall_5{animation-delay:1.22s;-o-animation-delay:1.22s;-ms-animation-delay:1.22s;-webkit-animation-delay:1.22s;-moz-animation-delay:1.22s}@keyframes orbit{0%{opacity:1;z-index:99;transform:rotate(180deg);animation-timing-function:ease-out}7%{opacity:1;transform:rotate(300deg);animation-timing-function:linear;origin:0}30%{opacity:1;transform:rotate(410deg);animation-timing-function:ease-in-out;origin:7%}39%{opacity:1;transform:rotate(645deg);animation-timing-function:linear;origin:30%}70%{opacity:1;transform:rotate(770deg);animation-timing-function:ease-out;origin:39%}75%{opacity:1;transform:rotate(900deg);animation-timing-function:ease-out;origin:70%}76%{opacity:0;transform:rotate(900deg)}100%{opacity:0;transform:rotate(900deg)}}@-o-keyframes orbit{0%{opacity:1;z-index:99;-o-transform:rotate(180deg);-o-animation-timing-function:ease-out}7%{opacity:1;-o-transform:rotate(300deg);-o-animation-timing-function:linear;-o-origin:0}30%{opacity:1;-o-transform:rotate(410deg);-o-animation-timing-function:ease-in-out;-o-origin:7%}39%{opacity:1;-o-transform:rotate(645deg);-o-animation-timing-function:linear;-o-origin:30%}70%{opacity:1;-o-transform:rotate(770deg);-o-animation-timing-function:ease-out;-o-origin:39%}75%{opacity:1;-o-transform:rotate(900deg);-o-animation-timing-function:ease-out;-o-origin:70%}76%{opacity:0;-o-transform:rotate(900deg)}100%{opacity:0;-o-transform:rotate(900deg)}}@-ms-keyframes orbit{0%{opacity:1;z-index:99;-ms-transform:rotate(180deg);-ms-animation-timing-function:ease-out}7%{opacity:1;-ms-transform:rotate(300deg);-ms-animation-timing-function:linear;-ms-origin:0}30%{opacity:1;-ms-transform:rotate(410deg);-ms-animation-timing-function:ease-in-out;-ms-origin:7%}39%{opacity:1;-ms-transform:rotate(645deg);-ms-animation-timing-function:linear;-ms-origin:30%}70%{opacity:1;-ms-transform:rotate(770deg);-ms-animation-timing-function:ease-out;-ms-origin:39%}75%{opacity:1;-ms-transform:rotate(900deg);-ms-animation-timing-function:ease-out;-ms-origin:70%}76%{opacity:0;-ms-transform:rotate(900deg)}100%{opacity:0;-ms-transform:rotate(900deg)}}@-webkit-keyframes orbit{0%{opacity:1;z-index:99;-webkit-transform:rotate(180deg);-webkit-animation-timing-function:ease-out}7%{opacity:1;-webkit-transform:rotate(300deg);-webkit-animation-timing-function:linear;-webkit-origin:0}30%{opacity:1;-webkit-transform:rotate(410deg);-webkit-animation-timing-function:ease-in-out;-webkit-origin:7%}39%{opacity:1;-webkit-transform:rotate(645deg);-webkit-animation-timing-function:linear;-webkit-origin:30%}70%{opacity:1;-webkit-transform:rotate(770deg);-webkit-animation-timing-function:ease-out;-webkit-origin:39%}75%{opacity:1;-webkit-transform:rotate(900deg);-webkit-animation-timing-function:ease-out;-webkit-origin:70%}76%{opacity:0;-webkit-transform:rotate(900deg)}100%{opacity:0;-webkit-transform:rotate(900deg)}}@-moz-keyframes orbit{0%{opacity:1;z-index:99;-moz-transform:rotate(180deg);-moz-animation-timing-function:ease-out}7%{opacity:1;-moz-transform:rotate(300deg);-moz-animation-timing-function:linear;-moz-origin:0}30%{opacity:1;-moz-transform:rotate(410deg);-moz-animation-timing-function:ease-in-out;-moz-origin:7%}39%{opacity:1;-moz-transform:rotate(645deg);-moz-animation-timing-function:linear;-moz-origin:30%}70%{opacity:1;-moz-transform:rotate(770deg);-moz-animation-timing-function:ease-out;-moz-origin:39%}75%{opacity:1;-moz-transform:rotate(900deg);-moz-animation-timing-function:ease-out;-moz-origin:70%}76%{opacity:0;-moz-transform:rotate(900deg)}100%{opacity:0;-moz-transform:rotate(900deg)}}';
        win.document.write('<html><head><style>'+s+'</style></head><body>'+b+'</body></html>');

        twApi("printTemplate/get", { "_id" : template_id }, function(r){
            if(r.status!==200){ return; }
            var template = r.response;
            twApi(template.endpoint, query, function(r1){
                if(r1.status!==200){ return; }
                var data = r1.response;
                twPrint._execute(template_id, template, data, windowName, callback);
            });
        });
    }
};
