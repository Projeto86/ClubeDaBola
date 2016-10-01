webix.protoUI({
	name: "mapicon",
	$skin: function() {
		this.defaults.height = webix.skin.$active.inputHeight;
	},
	defaults: {
		template: function(t) {
			return "<button type='button' " + (t.tabFocus ? "" : "tabindex='-1'") + " style='height:100%;width:100%;' class='webix_icon_button'><span class='webix_icon mg map-" + t.icon + " '></span>" + (t.badge ? "<span class='webix_badge'>" + t.badge + "</span>" : "") + "</button>";
		},
		width: 33
	},
	setIcon : function(icon){
		this.define('icon', icon);
		this.refresh();
	},
	oe: function() {}
}, webix.ui.button);
