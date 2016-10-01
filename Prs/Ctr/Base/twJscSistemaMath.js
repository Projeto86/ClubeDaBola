

var twJscSistemaMath = {
	Add : function(one,two) {
		var parttwo = 0;
		
		one = String(one).split('.');
		if (one[1]) {
			if (parseFloat(one[0] + '.' + one[1]) < 0) {
				one[2] = - parseFloat(one[1]);
			} else {
				one[2] = parseFloat(one[1]);
			}
		}
		
		two = String(two).split('.');
		if (two[1]) {
			if (parseFloat(two[0] + '.' + two[1]) < 0) {
				two[2] = - parseFloat(two[1]);
			} else {
				two[2] = parseFloat(two[1]);
			}
		}
		
		if (one[2] && two[2]) {
			var tempnum = two[2] * Math.pow(10,one[1].length - two[1].length);
			parttwo = (one[2] + tempnum) / Math.pow(10,one[1].length);
		} else if (one[1]) {
			parttwo = one[2] / Math.pow(10,one[1].length);
		} else if (two[1]) {
			parttwo = two[2] / Math.pow(10,two[1].length);
		}
		
		return parseFloat(one[0]) + parseFloat(two[0]) + parttwo;
	},
	
	Subtract : function(one,two) {
		return twJscSistemaMath.Add(one,- two);
	},
	
	Multiply : function(one,two) {
		var parttwo = 0;
		
		one = String(one).split('.');
		if (one[1]) {
			if (parseFloat(one[0] + '.' + one[1]) < 0) {
				one[1] = - parseFloat('0.' + one[1]);
			} else {
				one[1] = parseFloat('0.' + one[1]);
			}
		}
		
		two = String(two).split('.');
		if (two[1]) {
			if (parseFloat(two[0] + '.' + two[1]) < 0) {
				two[1] = - parseFloat('0.' + two[1]);
			} else {
				two[1] = parseFloat('0.' + two[1]);
			}
		}
		
		if (one[1] && two[1]) {
			parttwo = one[1] * two[1];
		}
		if (one[1]) {
			parttwo = twJscSistemaMath.Add(parttwo,parseFloat(two[0]) * one[1]);
		}
		if (two[1]) {
			parttwo = twJscSistemaMath.Add(parttwo,parseFloat(one[0]) * two[1]);
		}
		
		return parseFloat(one[0]) * parseFloat(two[0]) + parttwo;
	},
	
	Divide : function(one,two) {
		return twJscSistemaMath.Multiply(one,1 / two);
	},
	
	Log : function(one,two) {
		if (isNaN(two)) {
			two = 10;
		}
		return twJscSistemaMath.Divide(Math.log(one),Math.log(two));
	},
	
	Root : function(number,size) {
		if (isNaN(size)) {
			size = 2;
		}
		return Math.pow(number,twJscSistemaMath.Divide(1,size));
	},
	
	Round : function(number,size) {
		if (isNaN(size)) {
			size = 0;
		}
		return Math.round(number * Math.pow(10,size)) / Math.pow(10,size);
	},
	
	FromString : function(string,comma,noreplace,prefix) {
		numbers = new Array();
		numbers['0'] = 0; numbers['1'] = 1; numbers['2'] = 2; numbers['3'] = 3; numbers['4'] = 4; numbers['5'] = 5; numbers['6'] = 6; numbers['7'] = 7; numbers['8'] = 8; numbers['9'] = 9;
		if (!prefix) {
			prefix = new Array();
			prefix['Y'] = 1000000000000000000000000; prefix['Z'] = 1000000000000000000000; prefix['E'] = 1000000000000000000; prefix['P'] = 1000000000000000; prefix['T'] = 1000000000000; prefix['G'] = 1000000000; prefix['M'] = 1000000; prefix['k'] = 1000; prefix['h'] = 100; prefix['d'] = 0.1; prefix['c'] = 0.01; prefix['m'] = 0.001; prefix['µ'] = 0.000001; prefix['n'] = 0.000000001; prefix['p'] = 0.000000000001; prefix['f'] = 0.000000000000001; prefix['a'] = 0.000000000000000001; prefix['z'] = 0.000000000000000000001; prefix['y'] = 0.000000000000000000000001;
		}
		
		var dot = 0;
		var j = 0;
		var minus = 1;
		var partone = 0;
		var parttwo = 0;
		
		for (var i = 0; i < string.length; i++) {
			if (string.substr(i,1) == 'e' || string.substr(i,1) == 'E') {
				var parts = twJscSistemaMath.Add(partone,parttwo / Math.pow(10,j));
				var exponent = twJscSistemaMath.FromString(string.substr(i + 1),comma,noreplace,prefix);
				return minus * twJscSistemaMath.Multiply(parts,Math.pow(10,exponent));
			} else if (!dot) {
				if (string.substr(i,1) == '-' && !partone) {
					minus = - minus;
				} else if (numbers[string.substr(i,1)] || numbers[string.substr(i,1)] == '0') {
					partone = partone * 10 + numbers[string.substr(i,1)];
				} else if (string.substr(i,1) == '.' && !comma || string.substr(i,1) == ',' && comma) {
					dot = 1;
				} else if (prefix[string.substr(i,1)] && !noreplace) {
					partone *= prefix[string.substr(i,1)];
				}
			} else {
				if (numbers[string.substr(i,1)] || numbers[string.substr(i,1)] == '0') {
					parttwo = parttwo * 10 + numbers[string.substr(i,1)];
					j++;
				} else if (prefix[string.substr(i,1)] && !noreplace) {
					parttwo *= prefix[string.substr(i,1)];
				}
			}
		}
		return minus * twJscSistemaMath.Add(partone,parttwo / Math.pow(10,j));
	},
	
	ToString : function(number,comma,exponent) {
		string = String(number);
		
		if (!exponent) {
			var eArray = string.split('e');
			if (eArray[1]) {
				eArray[1] = parseFloat(eArray[1]);
				var XeArray = eArray[0].split('.');
				if (XeArray[1]) {
					eArray[0] = XeArray[0] + XeArray[1];
					eArray[1] += XeArray[1].length;
				}
				string = eArray[0];
				if (eArray[1] > 0) {
					for (var i = 0; i < eArray[1]; i++) {
						string += '0';
					}
				} else if (string.length > - eArray[1]) {
					string = string.substr(0,string.length + eArray[1]) + '.' + string.substr(string.length + eArray[1]);
				} else if (string.length == - eArray[1]) {
					string = '0.' + string;
				} else if (string.length < - eArray[1]) {
					for (var i = 0; i < - eArray[1]; i++) {
						string = '0' + string;
					}
					string = '0.' + string;
				}
			}
		}
		
		if (comma) {
			var cArray = string.split('.');
			if (cArray[1]) {
				string = cArray[0] + ',' + cArray[1];
			}
		}
		
		return string;
	},
	
	FromDecimal : function(number,to) {
		Math.round(to);
		if (to == 10) {
			return twJscSistemaMath.ToString(number);
		}
		
		var chars = new Array();
		chars[0] = '0'; chars[1] = '1'; chars[2] = '2'; chars[3] = '3'; chars[4] = '4'; chars[5] = '5'; chars[6] = '6'; chars[7] = '7'; chars[8] = '8'; chars[9] = '9'; chars[10] = 'A'; chars[11] = 'B'; chars[12] = 'C'; chars[13] = 'D'; chars[14] = 'E'; chars[15] = 'F'; chars[16] = 'G'; chars[17] = 'H'; chars[18] = 'I'; chars[19] = 'J'; chars[20] = 'K'; chars[21] = 'L'; chars[22] = 'M'; chars[23] = 'N'; chars[24] = 'O'; chars[25] = 'P'; chars[26] = 'Q'; chars[27] = 'R'; chars[28] = 'S'; chars[29] = 'T'; chars[30] = 'U'; chars[31] = 'V'; chars[32] = 'W'; chars[33] = 'X'; chars[34] = 'Y';  chars[35] = 'Z';
		
		var minus = '';
		if (number < 0) {
			minus = '-';
			number = - number;
		}
		
		var string = '';
		while (number) {
			number = String(number /to).split('.');
			string = chars[Math.round(twJscSistemaMath.Multiply(parseFloat('0.' + number[1]),to))] + string;
			number = parseFloat(number[0]);
		}
		return minus + string;
	},
	
	ToDecimal : function(string,from) {
		Math.round(from);
		if (from == 10) {
			return twJscSistemaMath.FromString(string);
		}
		
		var chars = new Array();
		chars['0'] = 0; chars['1'] = 1; chars['2'] = 2; chars['3'] = 3; chars['4'] = 4; chars['5'] = 5; chars['6'] = 6; chars['7'] = 7; chars['8'] = 8; chars['9'] = 9; chars['A'] = 10; chars['B'] = 11; chars['C'] = 12; chars['D'] = 13; chars['E'] = 14; chars['F'] = 15; chars['G'] = 16; chars['H'] = 17; chars['I'] = 18; chars['J'] = 19; chars['K'] = 20; chars['L'] = 21; chars['M'] = 22; chars['N'] = 23; chars['O'] = 24; chars['P'] = 25; chars['Q'] = 26; chars['R'] = 27; chars['S'] = 28; chars['T'] = 29; chars['U'] = 30; chars['V'] = 31; chars['W'] = 32; chars['X'] = 33; chars['Y'] = 34; chars['Z'] = 35;
		
		var j = 0;
		var minus = 1;
		var number = 0;
		
		string.toUpperCase();
		for (var i = string.length - 1; i >= 0; i--) {
			if (chars[string.substr(i,1)] || chars[string.substr(i,1)] == '0') {
				number += chars[string.substr(i,1)] * Math.pow(from,j);
				j++;
				minus = 1;
			} else if (string.substr(i,1) == '-') {
				minus = - minus;
			}
		}
		return minus * number;
	},
	
	FromRoman : function(roman) {
		var chars = new Array();
		chars['N'] = 1000000; chars['O'] = 500000; chars['P'] = 100000; chars['Q'] = 50000; chars['R'] = 10000; chars['S'] = 5000; chars['M'] = 1000; chars['D'] = 500; chars['C'] = 100; chars['L'] = 50; chars['X'] = 10; chars['V'] = 5; chars['I'] = 1;
		
		var decimal = 0;
		var minus = 1;
		var state = 0;
		
		roman.toUpperCase();
		for (var i = roman.length - 1; i >= 0; i--) {
			if (roman.substr(i,1) == '-') {
				minus = - minus;
			} else if (state > chars[roman.substr(i,1)]) {
				decimal -= chars[roman.substr(i,1)];
				minus = 1;
			} else {
				decimal += chars[roman.substr(i,1)];
				state = chars[roman.substr(i,1)];
				minus = 1;
			}
		}
		return minus * decimal;
	},
	
	ToRoman : function(number) {
		Math.round(numbers);
		var chars = new Array();
		chars['N'] = 1000000; chars['O'] = 500000; chars['P'] = 100000; chars['Q'] = 50000; chars['R'] = 10000; chars['S'] = 5000; chars['M'] = 1000; chars['D'] = 500; chars['C'] = 100; chars['L'] = 50; chars['X'] = 10; chars['V'] = 5; chars['I'] = 1;
		
		var last = '';
		var roman = '';
		if (number < 0) {
			roman = '-';
			number = - number;
		}
		
		for (var letter in chars) {
			var decimal = chars[letter];
			var temp = '';
			while (number >= decimal) {
				number -= decimal;
				temp += letter;
			}
			if (last && temp.length == 4) {
				temp = letter + last;
			} else if (temp == '' && number > (0.8 * decimal)) {
				temp = twJscSistemaMath.ToRoman( - (number - decimal)) + letter;
				number = 0;
			}
			last = letter;
			roman += temp;
		}
		return roman;
	},
	
	ToMoney : function(avValor, avTipo){
		var avValorTemporario = avValor.toString();
		var avPosicaoVirgurla; 
		var avQuantidadePontoVirgula = 0;
		var avQuantidadePontoVirgulaFinais = 0; 
		var acPosicaoPontos = -1; 
		var avDecimais = "";
		var avTracoNegativo = ""; 
		var avDecimaisTemporario = ""; 
		var avPonto = ".";
		var avVirgula = ","; 
		var avResto = "00"; 
		var avValorZerado = false;
		var avValorTransicao = avValorTemporario; 
		var avTamanho = avValorTemporario.length;
		var avCaracteresValidos = new Array("0","1","2","3","4","5","6","7","8","9");
		var avCaracter = "";
	
		if (typeof(avTipo) != "string"){ return ("Faltando o tipo da moeda"); }
		
		avTipo = avTipo.toUpperCase();
		
		if ((avTipo != "R")&&(avTipo != "U")) { return ("Tipo da moeda inválido"); }
		
		switch(avTipo){
			//Tipo dollar
			case "U":
				avPonto = ",";
				avVirgula = ".";
				break;
			//Tipo real
			case "R":
				avPonto = ".";
				avVirgula = ",";
				break;
		}
		
		for (av_a = 0; av_a < avTamanho; av_a++){ 
			avCaracter = avValorTransicao.charAt(av_a); 
			if ((avCaracter == avPonto)||(avCaracter == avVirgula)){ avQuantidadePontoVirgula ++; } 
		}
		
		for (av_b = 0; av_b < avTamanho; av_b++){
			avCaracter = avValorTransicao.charAt(av_b);
			if(avCaracter == "-"){ avTracoNegativo = "-"; } 
			else { 
				for (av_c = 0; av_c < 11; av_c++){ 
					if (avCaracter == avCaracteresValidos[av_c]){ avDecimais += avCaracter; } 
				} 
			}
			if ((avCaracter == avPonto)||(avCaracter == avVirgula)){ 
				avQuantidadePontoVirgulaFinais++; 
				if (avQuantidadePontoVirgulaFinais == avQuantidadePontoVirgula) { avDecimais += avVirgula; }
			}
		}
		avTamanho = avDecimais.length;
		avPosicaoVirgurla = avDecimais.indexOf(avVirgula);
		if (avTamanho == 0){ return ("0" + avVirgula + "00"); }
		if (avPosicaoVirgurla != -1){ 
			avResto = avDecimais.substring(avTamanho, (avPosicaoVirgurla + 1)); 
			avValorTransicao = avDecimais.substring(0, avPosicaoVirgurla); 
			if (avResto.length == 1){ avResto += "0"; } 
			if (avResto.length > 2){
				var avRestoNumero = parseFloat(avResto.substr(0, 2));
				if(parseFloat(avResto.substr(2, 1)) >= 5){
					var avRestoNumero = parseFloat(avResto.substr(0, 2)) + 1;
				}
				if(avRestoNumero == 100){ 
					avRestoNumero = 0;
					avValorTransicao = (parseFloat(avValorTransicao)+1).toString();
				}
				if(avRestoNumero <=9){ avRestoNumero = "0" + avRestoNumero; }
				avResto = avRestoNumero.toString();
			}
		}
		avTamanho = avValorTransicao.length;
	
		for (av_d = 0; av_d < avTamanho; av_d++){ 
			avCaracter = avValorTransicao.charAt(av_d); 
			if ((avCaracter != "0")||(avValorZerado)){ 
				if(avCaracter != "-"){ 
					avDecimaisTemporario += avCaracter; 
					avValorZerado = true; 
				} 
			} 
		}
	
		if (!avValorZerado) { avDecimaisTemporario = "0"; }
	
		avDecimais = ""; 
		avTamanho = avDecimaisTemporario.length;
	
		for (av_e = (avTamanho - 1); av_e >= 0; av_e--){ 
			if (acPosicaoPontos < 2) { 
				avDecimais = avDecimaisTemporario.charAt(av_e) + avDecimais; 
				acPosicaoPontos ++; 
			} else { 
				avDecimais = avDecimaisTemporario.charAt(av_e) + avPonto + avDecimais; 
				acPosicaoPontos = 0;
			} 
		}
	
		return (avTracoNegativo + avDecimais + avVirgula + avResto);
	}
}