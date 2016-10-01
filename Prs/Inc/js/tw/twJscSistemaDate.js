//Classe para manipulação de datas
//  Conversão entre Date e String
//  Validação de campo como uma data valida

var twJscSistemaDate = {
	nome : {
		meses : ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro','Jan','Fev','Mar','Abr','Mai','Jun','Jul','Aug','Set','Out','Nov','Dez'],
		dias : ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado','Dom','Seg','Ter','Qua','Qui','Sex','Sab']
	},
	LZ : function(x){
		return(x<0||x>9?"":"0")+x; //Coloca um "0" antes se o numero for menor q 10, ex: 8 -> 08
	},
	isDate : function(val, format){
		var date=twJscSistemaDate.getDateFromFormat(val,format);
		if (date==0) { return false; }
		return true;
	},
	compareDates : function(date1,dateformat1,date2,dateformat2) {
		var d1=twJscSistemaDate.getDateFromFormat(date1,dateformat1);
		var d2=twJscSistemaDate.getDateFromFormat(date2,dateformat2);
		if (d1==0 || d2==0){ return -1; }
		else if (d1 > d2){ return 1; }
		return 0;
	},
	formatDate : function(date,format) {
		if(date==null){ return ''; }
		if(date==''){ return ''; }
		format=format+"";
		var result="";
		var i_format=0;
		var c="";
		var token="";
		var y=date.getFullYear()+"";
		var M=date.getMonth()+1;
		var d=date.getDate();
		var E=date.getDay();
		var H=date.getHours();
		var m=date.getMinutes();
		var s=date.getSeconds();
		var yyyy,yy,MMM,MM,dd,hh,h,mm,ss,ampm,HH,H,KK,K,kk,k;
		// Convert real date parts into formatted versions
		var value=new Object();
		if (y.length < 4) {y=""+(y-0+1900);}
		value["y"]=""+y;
		value["yyyy"]=y;
		value["yy"]=y.substring(2,4);
		value["M"]=M;
		value["MM"]=twJscSistemaDate.LZ(M);
		value["MMM"]=twJscSistemaDate.nome.meses[M-1];
		value["NNN"]=twJscSistemaDate.nome.meses[M+11];
		value["d"]=d;
		value["dd"]=twJscSistemaDate.LZ(d);
		value["E"]=twJscSistemaDate.nome.dias[E+7];
		value["EE"]=twJscSistemaDate.nome.dias[E];
		value["H"]=H;
		value["HH"]=twJscSistemaDate.LZ(H);
		if (H==0){value["h"]=12;}
		else if (H>12){value["h"]=H-12;}
		else {value["h"]=H;}
		value["hh"]=twJscSistemaDate.LZ(value["h"]);
		if (H>11){value["K"]=H-12;} else {value["K"]=H;}
		value["k"]=H+1;
		value["KK"]=twJscSistemaDate.LZ(value["K"]);
		value["kk"]=twJscSistemaDate.LZ(value["k"]);
		if (H > 11) { value["a"]="PM"; }
		else { value["a"]="AM"; }
		value["m"]=m;
		value["mm"]=twJscSistemaDate.LZ(m);
		value["s"]=s;
		value["ss"]=twJscSistemaDate.LZ(s);
		while (i_format < format.length) {
			c=format.charAt(i_format);
			token="";
			while ((format.charAt(i_format)==c) && (i_format < format.length)) {
				token += format.charAt(i_format++);
			}
			if (value[token] != null) { result=result + value[token]; }
			else { result=result + token; }
		}
		return result;
	},
	_isInteger : function(val){
		var digits="1234567890";
		for (var i=0; i < val.length; i++) {
			if (digits.indexOf(val.charAt(i))==-1) { return false; }
		}
		return true;
	},
	_getInt : function(str,i,minlength,maxlength) {
		for (var x=maxlength; x>=minlength; x--) {
			var token=str.substring(i,i+x);
			if (token.length < minlength) { return null; }
			if (twJscSistemaDate._isInteger(token)) { return token; }
		}
		return null;
	},
	getDateFromFormat : function(val,format) {
		val=val+"";
		format=format+"";
		var i_val=0;
		var i_format=0;
		var c="";
		var token="";
		var token2="";
		var x,y;
		var now=new Date(0);
		var year=now.getYear();
		var month=now.getMonth()+1;
		var date=1;
		var hh=0;
		var mm=0;
		var ss=0;
		var ampm="";

		while (i_format < format.length) {
			// Get next token from format string
			c=format.charAt(i_format);
			token="";
			while ((format.charAt(i_format)==c) && (i_format < format.length)) {
				token += format.charAt(i_format++);
			}
			// Extract contents of value based on format token
			if (token=="yyyy" || token=="yy" || token=="y") {
				if (token=="yyyy") { x=4;y=4; }
				if (token=="yy")   { x=2;y=2; }
				if (token=="y")    { x=2;y=4; }
				year=twJscSistemaDate._getInt(val,i_val,x,y);
				if (year==null) { return 0; }
				i_val += year.length;
				if (year.length==2) {
					if (year > 70) { year=1900+(year-0); }
					else { year=2000+(year-0); }
				}
			}
			else if (token=="MMM"||token=="NNN"){
				month=0;
				for (var i=0; i<twJscSistemaDate.nome.meses.length; i++) {
					var month_name=twJscSistemaDate.nome.meses[i];
					if (val.substring(i_val,i_val+month_name.length).toLowerCase()==month_name.toLowerCase()) {
						if (token=="MMM"||(token=="NNN"&&i>11)) {
							month=i+1;
							if (month>12) { month -= 12; }
							i_val += month_name.length;
							break;
						}
					}
				}
				if ((month < 1)||(month>12)){return 0;}
			}
			else if (token=="EE"||token=="E"){
				for (var i=0; i<twJscSistemaDate.nome.dias.length; i++) {
					var day_name=twJscSistemaDate.nome.dias[i];
					if (val.substring(i_val,i_val+day_name.length).toLowerCase()==day_name.toLowerCase()) {
						i_val += day_name.length;
						break;
					}
				}
			}
			else if (token=="MM"||token=="M") {
				month=twJscSistemaDate._getInt(val,i_val,token.length,2);
				if(month==null||(month<1)||(month>12)){return 0;}
				i_val+=month.length;
			}
			else if (token=="dd"||token=="d") {
				date=twJscSistemaDate._getInt(val,i_val,token.length,2);
				if(date==null||(date<1)||(date>31)){return 0;}
				i_val+=date.length;
			}
			else if (token=="hh"||token=="h") {
				hh=twJscSistemaDate._getInt(val,i_val,token.length,2);
				if(hh==null||(hh<1)||(hh>12)){return 0;}
				i_val+=hh.length;
			}
			else if (token=="HH"||token=="H") {
				hh=twJscSistemaDate._getInt(val,i_val,token.length,2);
				if(hh==null||(hh<0)||(hh>23)){return 0;}
				i_val+=hh.length;
			}
			else if (token=="KK"||token=="K") {
				hh=twJscSistemaDate._getInt(val,i_val,token.length,2);
				if(hh==null||(hh<0)||(hh>11)){return 0;}
				i_val+=hh.length;
			}
			else if (token=="kk"||token=="k") {
				hh=twJscSistemaDate._getInt(val,i_val,token.length,2);
				if(hh==null||(hh<1)||(hh>24)){return 0;}
				i_val+=hh.length;hh--;
			}
			else if (token=="mm"||token=="m") {
				mm=twJscSistemaDate._getInt(val,i_val,token.length,2);
				if(mm==null||(mm<0)||(mm>59)){return 0;}
				i_val+=mm.length;
			}
			else if (token=="ss"||token=="s") {
				ss=twJscSistemaDate._getInt(val,i_val,token.length,2);
				if(ss==null||(ss<0)||(ss>59)){return 0;}
				i_val+=ss.length;
			}
			else if (token=="a") {
				if (val.substring(i_val,i_val+2).toLowerCase()=="am") {ampm="AM";}
				else if (val.substring(i_val,i_val+2).toLowerCase()=="pm") {ampm="PM";}
				else {return 0;}
				i_val+=2;
			}
			else {
				if (val.substring(i_val,i_val+token.length)!=token) {return 0;}
				else {i_val+=token.length;}
			}
		}
		// If there are any trailing characters left in the value, it doesn't match
		if (i_val != val.length) { return 0; }
		// Is date valid for month?
		if (month==2) {
			// Check for leap year
			if ( ( (year%4==0)&&(year%100 != 0) ) || (year%400==0) ) { // leap year
				if (date > 29){ return 0; }
			}
			else { if (date > 28) { return 0; } }
		}
		if ((month==4)||(month==6)||(month==9)||(month==11)) {
			if (date > 30) { return 0; }
		}
		// Correct hours value
		if (hh<12 && ampm=="PM") { hh=hh-0+12; }
		else if (hh>11 && ampm=="AM") { hh-=12; }
		var newdate=new Date(year,month-1,date,hh,mm,ss);
		return newdate.getTime();
	},
	getFormat : function(val){
		var preferEuro=(arguments.length==2)?arguments[1]:false;
		generalFormats=new Array('y-M-d','MMM d, y','MMM d,y','y-MMM-d','d-MMM-y','MMM d');
		monthFirst=new Array('M/d/y','M-d-y','M.d.y','MMM-d','M/d','M-d');
		dateFirst =new Array('d/M/y','d-M-y','d.M.y','d-MMM','d/M','d-M');
		var checkList=new Array('generalFormats',preferEuro?'dateFirst':'monthFirst',preferEuro?'monthFirst':'dateFirst');
		var d=null;
		for (var i=0; i<checkList.length; i++) {
			var l=window[checkList[i]];
			for (var j=0; j<l.length; j++) {
				d=twJscSistemaDate.getDateFromFormat(val,l[j]);
				if (d!=0) { return l[j]; }
			}
		}
		return null;
	},
	parseDate : function(val) {
		var f = twJscSistemaDate.getFormat(val);
		if(f){ return twJscSistemaDate.getDateFromFormat(val,f); }
		return null;
	},
	dateAdd : function(timeU, byMany, dateObj, dateFormat) {
		var str = (typeof dateObj=='string');
		if(str){
			if(!dateFormat){ dateFormat = twJscSistemaDate.getFormat(dateObj); }
			dateObj = twJscSistemaDate.getDateFromFormat(dateObj,dateFormat);
		}

		var newDate = new Date(dateObj.valueOf());
		var dVal=dateObj.valueOf();
		switch(timeU.toString().toLowerCase()) {
			case "ms": newDate.setMilliseconds(newDate.getMilliseconds() + byMany); break;
			case "s": newDate.setSeconds(newDate.getSeconds() + byMany); break;
			case "mi": newDate.setMinutes(newDate.getMinutes() + byMany); break;
			case "h": newDate.setHours(newDate.getHours() + byMany); break;
			case "d": newDate.setDate(newDate.getDate() + byMany); break;
			case "m": newDate.setMonth(newDate.getMonth() + byMany); break;
			case "y": newDate.setFullYear(newDate.getFullYear() + byMany); break;
		}
		if(!dateFormat){ return newDate; }
		else { return twJscSistemaDate.formatDate(newDate, dateFormat); }
	}
}
