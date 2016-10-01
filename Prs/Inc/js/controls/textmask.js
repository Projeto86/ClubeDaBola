webix.protoUI({
	/* Based on: https://github.com/igorescobar/jQuery-Mask-Plugin */
	name: "textmask",
	Ce: !0,
	De: function() {
		var _this = this;
		this.Ce && (webix.event(_this.getInputNode(), "change", function() {
			var t = _this.getValue();
			t != _this.s.value && _this.setValue(_this.getValue(), !0)
		}, _this), _this.s.suggest && webix.$$(_this.s.suggest).linkInput(_this))
	},
	$skin: function() {
		this.defaults.height = webix.skin.$active.inputHeight, this.defaults.inputPadding = webix.skin.$active.inputPadding
	},
	$init: function(t) {
		"top" == t.labelPosition && webix.isUndefined(t.height) && (t.height = this.defaults.height + this.le), this.Ns = [], this.Ct(), this.attachEvent("onAfterRender", this.De);
		this.setMaskConfig();
		this.setMaskEvents();
		this.attachEvent("onAfterRender", function(){
			this.setMaskConfig();
			if(this.config.value){ this.$setValue(this.config.value); }
		});
		//this.$ready.push(this.setMaskEvents);
		//this.$ready.push(this.setMaskConfig);

	},
	$renderIcon: function() {
		var t = this.s;
		if (t.icon) {
			var e = t.aheight - 2 * t.inputPadding,
				i = (e - 18) / 2 - 1;
			return "<span style='height:" + (e - i) + "px;padding-top:" + i + "px;' class='webix_input_icon fa-" + t.icon + "'></span>"
		}
		return ""
	},
	hasFocus : false,
	hasChanged : false,
	invalid : [],
	globals_oldValue : "",
	globals_initialValue : "",
	globals_mask : "",
	globals_regexMask : null,
	globals_options : { clearIfNotMatch : false },
	globals_byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
	globals_translation: {
		'9': {pattern: /\d/},
		'0': {pattern: /\d/, optional: true},
		'#': {pattern: /\d/, recursive: true},
		'A': {pattern: /[a-zA-Z0-9]/},
		'S': {pattern: /[a-zA-Z]/}
	},
	setMaskConfig: function(){
		if(typeof this.config.inputmask=="string"){ this.globals_mask = this.config.inputmask; }
		if(typeof this.config.inputmask=="object"){
			if(typeof this.config.inputmask.mask=="string"){ this.globals_mask = this.config.inputmask.mask; }
			if(typeof this.config.inputmask.options=="object"){ this.globals_options = this.config.inputmask.options; }
		};

		this.globals_oldValue = this.getValue();
		this.globals_regexMask = this.getRegexMask();
	},
	setMaskEvents: function(){
		this.attachEvent("onFocus", this.maskEventsOnFocus);
		this.attachEvent("onBlur", this.maskEventsOnBlur);
		this.attachEvent("onKeyPress", this.maskEventsOnKeyPress);
	},
	maskEventsOnFocus : function(){
		if(!this.config.readonly){
			this.hasFocus = true;
			this.hasChanged = false;
			this.globals_initialValue = this.getValue();
		}
	},
	maskEventsOnBlur : function(){
		if(!this.config.readonly){
			this.hasFocus = false;
			if (this.globals_options.clearIfNotMatch && !this.globals_regexMask.test(this.getValue())){
				if(this.globals_oldValue!=""){
					this.blockEvent();
					this.setValue('');
					this.unblockEvent();
					if(this.globals_initialValue==""){ this.hasChanged = false; }
				}
			}
			this.validate();
			if(this.hasChanged){ $$(this).callEvent('onChange',  []); }
		}
	},
	maskEventsOnKeyPress : function(keyCode, e, keyPressTimedout){
		if(this.config.readonly){ return false; }

		if(!keyPressTimedout){
			if (this.globals_byPassKeys.indexOf(keyCode)<0) {
				var obj = this;
				setTimeout(function(){ obj.maskEventsOnKeyPress(0,e,true); }, 0);
				return (keyCode===8||keyCode===46||keyCode===35||keyCode===36)||(this.getValue().length!==this.globals_mask.length);
			}
			return true;
		}

		this.invalid = [];
		var p = this.getInputNode();
		if(e.location==3){ keyCode-=48; }
		if (this.globals_byPassKeys.indexOf(keyCode) === -1) {

			var caretPos = this.getCaret(),
			currVal = this.getValue(),
			currValL = currVal.length,
			changeCaret = caretPos < currValL,
			newVal = this.getMasked(),
			newValL = newVal.length,
			maskDif = this.getMCharsBeforeCount(newValL - 1) - this.getMCharsBeforeCount(currValL - 1);

			this.blockEvent();
			p.value = newVal; //+this.getPlaceholder(newVal.length)
			this.setCaret(newVal.length);
			this.unblockEvent();

			// change caret but avoid CTRL+A
			if (changeCaret && !(keyCode === 65 && e.ctrlKey)) {
				// Avoid adjusting caret on backspace or delete
				if (!(keyCode === 8 || keyCode === 46)) {
					caretPos = this.caretPos(caretPos, currValL, newValL, maskDif);
				}
				this.setCaret(caretPos);
			}


			this.callbacks(e);
			return false;
		}
		return true;
	},
	callbacks: function(e) {
		var val = this.getValue(),
			mask = this.globals_mask;

		this.hasChanged = val !== this.globals_initialValue;
		this.globals_oldValue = val;

		var fieldObj = $$(this);
		var invalid = this.invalid;
		setTimeout(function(){
			if(val.length === mask.length){ fieldObj.callEvent("onCompleted", []); }
			if(invalid.length > 0){ fieldObj.callEvent("onInvalid", [invalid]); }
		},5);
	},
	caretPos: function(originalCaretPos, oldLength, newLength, maskDif) {
		var mask = this.globals_mask;
		var translation = this.globals_translation[mask.charAt(Math.min(originalCaretPos - 1, mask.length - 1))];

		return !translation ? this.caretPos(originalCaretPos + 1, oldLength, newLength, maskDif) : Math.min(originalCaretPos + newLength - oldLength - maskDif, newLength);
	},
	getCaret: function () {
		try {
			var sel,
			pos = 0,
			ctrl = this.getInputNode(),
			dSel = document.selection,
			cSelStart = ctrl.selectionStart;

			// IE Support
			if (dSel && navigator.appVersion.indexOf('MSIE 10') === -1) {
				sel = dSel.createRange();
				sel.moveStart('character', -this.getInputNode().value.length);
				pos = sel.text.length;
			}
			// Firefox support
			else if (cSelStart || cSelStart === '0') {
				pos = cSelStart;
			}

			return pos;
		} catch (e) {}
	},
	setCaret: function(pos) {
		try {
			if (this.hasFocus) {
				var range, ctrl = this.getInputNode();
				if (ctrl.setSelectionRange) {
					ctrl.setSelectionRange(pos,pos);
				} else if (ctrl.createTextRange) {
					range = ctrl.createTextRange();
					range.collapse(true);
					range.moveEnd('character', pos);
					range.moveStart('character', pos);
					range.select();
				}
			}
		} catch (e) {}
	},
	getPlaceholder : function(pos){
		var placeholder = "", mask = this.globals_mask;
		for (var i = pos; i < mask.length; i++) {
			translation = this.globals_translation[mask.charAt(i)];
			placeholder+=(translation?"_":mask.charAt(i));
		}
		return placeholder;
	},
	maskText: function(text){
		var mask = this.globals_mask;

		var buf = [],
			value = (text||""),
			m = 0,
			maskLen = mask.length,
			v = 0,
			valLen = value.length,
			offset = 1,
			addMethod = 'push',
			resetPos = -1,
			lastMaskChar,
			check;

		if (this.globals_options.reverse) {
			addMethod = 'unshift';
			offset = -1;
			lastMaskChar = 0;
			m = maskLen - 1;
			v = valLen - 1;
			check = function() { return m > -1 && v > -1; };
		} else {
			lastMaskChar = maskLen - 1;
			check = function(){ return m < maskLen && v < valLen; };
		}

		while (check()) {
			var maskDigit = mask.charAt(m),
				valDigit = value.charAt(v),
				translation = this.globals_translation[maskDigit];

			if (translation) {
				if (valDigit.match(translation.pattern)) {
					buf[addMethod](valDigit);
					if (translation.recursive) {
						if (resetPos === -1) { resetPos = m; }
						else if (m === lastMaskChar) { m = resetPos - offset; }
						if (lastMaskChar === resetPos) { m -= offset; }
					}
					m += offset;
				} else if (translation.optional) {
					m += offset;
					v -= offset;
				} else if (translation.fallback) {
					buf[addMethod](translation.fallback);
					m += offset;
					v -= offset;
				} else {
					this.invalid.push({ p: v, v: valDigit, e: translation.pattern });
				}
				v += offset;
			} else {
				buf[addMethod](maskDigit);
				if (valDigit === maskDigit) { v += offset; }
				m += offset;
			}
		}

		var lastMaskCharDigit = mask.charAt(lastMaskChar);
		if (maskLen === valLen + 1 && !this.globals_translation[lastMaskCharDigit]) {
			buf.push(lastMaskCharDigit);
		}

		return buf.join('');

	},
	getMasked: function() {
		return this.maskText(this.getValue());
	},
	getMCharsBeforeCount: function(index, onCleanVal) {
		var mask = this.globals_mask;
		for (var count = 0, i = 0, maskL = mask.length; i < maskL && i < index; i++) {
			if (!this.globals_translation[mask.charAt(i)]) {
				index = onCleanVal ? index + 1 : index;
				count++;
			}
		}
		return count;
	},
	getRegexMask: function() {
		var maskChunks = [], mask = this.globals_mask,
			translation, pattern, optional, recursive, oRecursive, r;

		for (var i = 0; i < mask.length; i++) {
			translation = this.globals_translation[mask.charAt(i)];

			if (translation) {

				pattern = translation.pattern.toString().replace(/.{1}$|^.{1}/g, '');
				optional = translation.optional;
				recursive = translation.recursive;

				if (recursive) {
					maskChunks.push(mask.charAt(i));
					oRecursive = {
						digit: mask.charAt(i),
						pattern: pattern
					};
				} else {
					maskChunks.push(!optional && !recursive ? pattern : (pattern + '?'));
				}

			} else {
				maskChunks.push(mask.charAt(i).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
			}
		}

		r = maskChunks.join('');

		if (oRecursive) {
			r = r.replace(new RegExp('(' + oRecursive.digit + '(.*' + oRecursive.digit + ')?)'), '($1)?')
				.replace(new RegExp(oRecursive.digit, 'g'), oRecursive.pattern);
		}

		return new RegExp(r);
	},
	Ct: function() {
		if (!this.Dt) {
			var t = this.getFormView();
			t && this.Bt("enter", function(e, i) {
				t.callEvent("onSubmit", [e, i])
			}, this)
		}
	},
	relatedView_setter: function(t) {
		return this.attachEvent("onChange", function() {
			var t = this.getValue(),
				e = this.s.relatedAction,
				i = this.s.relatedView,
				s = webix.$$(i);
			if (!s) {
				var n = this.getTopParentView();
				n && n.$$ && (s = n.$$(i))
			}
			"enable" == e ? t ? s.enable() : s.disable() : t ? s.show() : s.hide()
		}), t
	},
	validateEvent_setter: function(t) {
		return "blur" == t && this.attachEvent("onBlur", this.validate), "key" == t && this.attachEvent("onTimedKeyPress", this.validate), t
	},
	validate: function() {
		var t = this.s.validate;
		var r = this.globals_regexMask;
		!t && (t = function(v){ return (v!=''?r.test(v):true) });

		var e = (this.getFormView(), this.s.name),
			i = this.getValue(),
			s = {};
		return s[e] = i, t && !this.getFormView().Se(t, i, s, e) ? !1 : !0
	},
	$setSize: function(t, e) {
		if (webix.ui.view.prototype.$setSize.call(this, t, e)) {
			if (!t || !e) return;
			var i = this.s;
			"top" == i.labelPosition && (i.inputHeight = this.dc - this.le, i.labelWidth = 0), this.render()
		}
	},
	Ee: function(t) {
		var e = (this.we || 0) - (t.label ? this.s.labelWidth : 0) - 2 * webix.skin.$active.inputPadding - (t.iconWidth || 0);
		return 0 > e ? 0 : e
	},
	Fe: function(t, e) {
		var i = t.id || webix.uid(),
			s = e.Ee(t),
			n = t.inputAlign || "left",
			r = (this.$renderIcon ? this.$renderIcon(t) : "", this.s.aheight - 2 * webix.skin.$active.inputPadding - 2),
			a = t.text || t.value || (t.placeholder ? "<span class='webix_placeholder'>" + t.placeholder + "</span>" : ""),
			h = "<div class='webix_inp_static' tabindex='0' onclick='' style='line-height:" + r + "px;width: " + s + "px; text-align: " + n + ";' >" + a + "</div>";
		return e.$renderInput(t, h, i)
	},
	qt: function(t) {
		var e = "<" + t + (this.s.placeholder ? " placeholder='" + this.s.placeholder + "' " : " ");
		this.s.readonly && (e += "readonly='true' ");
		var i = this.s.attributes;
		if (i)
			for (var s in i) e += s + "='" + i[s] + "' ";
		return e
	},
	$renderLabel: function(t, e) {
		var i = t.labelAlign || "left",
			s = "top" == this.s.labelPosition,
			n = s ? "display:block;" : "width: " + this.s.labelWidth + "px;",
			r = "",
			a = s ? this.le - 2 : this.s.aheight - 2 * this.s.inputPadding;
		return t.label && (r = "<label style='" + n + "text-align: " + i + ";line-height:" + a + "px;' onclick='' for='" + e + "' class='webix_inp_" + (s ? "top_" : "") + "label " + (t.required ? "webix_required" : "") + "'>" + (t.label || "") + "</label>"), r
	},
	$renderInput: function(t, e, i) {
		var s = t.inputAlign || "left";
		i = i || t.name || webix.uid();
		var n = this.$renderLabel(t, i),
			r = "";
		if (e) r += e;
		else {
			var a = this.Ee(t);
			r += this.qt("input") + "id='" + i + "' type='" + (t.type || this.name) + "' value='" + (this.globals_oldValue || "") + "' style='width: " + a + "px; text-align: " + s + ";'";
			var h = this.s.attributes;
			if (h)
				for (var o in h) r += " " + o + "='" + h[o] + "'";
			r += " />"
		}
		var l = this.$renderIcon ? this.$renderIcon(t) : "";
		return r += l, r += "</div>", top ? n + "<div class='webix_el_box' style='width:" + this.s.awidth + "px; height:" + this.s.aheight + "px'>" + r + "</div>" : "<div class='webix_el_box' style='width:" + this.s.awidth + "px; height:" + this.s.aheight + "px'>" + n + r + "</div>"
	},
	defaults: {
		template: function(t, e) {
			return e.$renderInput(t)
		},
		label: "",
		labelWidth: 80
	},
	type_setter: function(t) {
		return t
	},
	oe: !1,
	$setValue: function(t) {
		t = t.toString();
		this.getInputNode().value = this.maskText(t);
		this.globals_oldValue = this.maskText(t);
	},
	$getValue: function() {
		return this.getInputNode().value
	},
	suggest_setter: function(t) {
		if (t) {
			if ("string" == typeof t) {
				var e = webix.$$(t);
				if (e) return webix.$$(t).s.id;
				t = {
					body: {
						url: t,
						dataFeed: t
					}
				}
			} else webix.isArray(t) ? t = {
				body: {
					data: this.Be(t)
				}
			} : t.body || (t.body = {});
			webix.extend(t, {
				view: "suggest"
			});
			var i = webix.ui(t);
			return this.Ns.push(i), i.s.id
		}
		return !1
	}
}, webix.ui.button)
