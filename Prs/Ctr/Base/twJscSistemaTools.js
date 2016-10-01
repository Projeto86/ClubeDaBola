var twJscSistemaTools = {
	replace : function(o, e, s) {
		var p = 0;
		var t = "" + o;
		while(t.indexOf(e)>=0){ p = t.indexOf(e); t = "" + (t.substring(0, p) + s + t.substring((p + e.length), t.length)); }
		return (t);
	}
};