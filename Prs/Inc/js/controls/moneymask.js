webix.protoUI({
	/* Based on: https://github.com/plentz/jquery-maskmoney */
	name: "moneymask",
	defaults: {
		template: function(t, e) {
			return e.$renderInput(t)
		},
		label: "",
		labelWidth: 80,
		prefix: "",
		suffix: "",
		affixesStay: true,
		thousands: ",",
		decimal: ".",
		precision: 2,
		allowZero: false,
		allowNegative: false
	},
	browser : null,
	$onFocusValue : "",
	$input : null,
	Ce: !0,
	setMask : function(options){
		if(!options) return;
		if(typeof options !="object") return;
		var keys = ["prefix","suffix","affixesStay","thousands","decimal","precision","allowZero","allowNegative"];
		for(var k in keys){ if(options[keys[k]]){ this.config[keys[k]] = options[keys[k]]; } }
		this.setValue(this.getValue());
	},
	De: function() {

		var _this = this;
		setTimeout(function(){
			_this.$input = $(_this.getInputNode());
			if (!_this.browser) {
				_this.browser = {};
				_this.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
				_this.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
				_this.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
				_this.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
			}
		},10);

		this.Ce && (webix.event(this.getInputNode(), "change", function() {
			var t = this.getValue();
			t != this.s.value && this.setValue(this.getValue(), !0)
		}, this), this.s.suggest && webix.$$(this.s.suggest).linkInput(this))
	},
	$skin: function() {
		this.defaults.height = webix.skin.$active.inputHeight, this.defaults.inputPadding = webix.skin.$active.inputPadding
	},
	$init: function(t) {
		"top" == t.labelPosition && webix.isUndefined(t.height) && (t.height = this.defaults.height + this.le), this.Ns = [], this.Ct(), this.attachEvent("onAfterRender", this.De);
		this.$input = $(this.getInputNode()); //load the input as Jquery object

		this.attachEvent("onAfterRender", function(){
			var t = this;
			t.$input.unbind(".maskMoney");
			//t.$input.bind("keypress.maskMoney", function(e){ return t.keypressEvent(e) });
			//t.$input.bind("keydown.maskMoney", function(e){ return t.keydownEvent(e) });
			//t.$input.bind("keyup.maskMoney", function(e){ t.keyupEvent(e) });
			//t.$input.bind("blur.maskMoney", function(e){ t.blurEvent(e) });
			//t.$input.bind("focus.maskMoney", function(){ t.focusEvent() });
			t.$input.bind("click.maskMoney", function(){ t.clickEvent() });
			t.$input.bind("cut.maskMoney", function(){ t.cutPasteEvent() });
			t.$input.bind("paste.maskMoney", function(){ t.cutPasteEvent() });
			t.$input.bind("mask.maskMoney", function(){ t.mask() });
		});


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

	getInputSelection: function() {
		//var el = this.$input.get(0),
		var el = $(this.getInputNode()).get(0),
			start = 0,
			end = 0,
			normalizedValue,
			range,
			textInputRange,
			len,
			endRange;

		if (typeof el.selectionStart === "number" && typeof el.selectionEnd === "number") {
			start = el.selectionStart;
			end = el.selectionEnd;
		} else {
			range = document.selection.createRange();

			if (range && range.parentElement() === el) {
				len = el.value.length;
				normalizedValue = el.value.replace(/\r\n/g, "\n");

				// Create a working TextRange that lives only in the input
				textInputRange = el.createTextRange();
				textInputRange.moveToBookmark(range.getBookmark());

				// Check if the start and end of the selection are at the very end
				// of the input, since moveStart/moveEnd doesn't return what we want
				// in those cases
				endRange = el.createTextRange();
				endRange.collapse(false);

				if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
					start = end = len;
				} else {
					start = -textInputRange.moveStart("character", -len);
					start += normalizedValue.slice(0, start).split("\n").length - 1;

					if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
						end = len;
					} else {
						end = -textInputRange.moveEnd("character", -len);
						end += normalizedValue.slice(0, end).split("\n").length - 1;
					}
				}
			}
		}

		return {
			start: start,
			end: end
		};
	}, // getInputSelection

	canInputMoreNumbers: function() {
		var cmp = $(this.getInputNode()); //this.$input
		var haventReachedMaxLength = !(cmp.val().length >= cmp.attr("maxlength") && cmp.attr("maxlength") >= 0),
			selection = this.getInputSelection(),
			start = selection.start,
			end = selection.end,
			haveNumberSelected = (selection.start !== selection.end && cmp.val().substring(start, end).match(/\d/)) ? true : false,
			startWithZero = (cmp.val().substring(0, 1) === "0");
		return haventReachedMaxLength || haveNumberSelected || startWithZero;
	},

	setCursorPosition: function(pos) {
		//this.$input.each(function (index, elem) {
		$(this.getInputNode()).each(function (index, elem) {
			if (elem.setSelectionRange) {
				elem.focus();
				elem.setSelectionRange(pos, pos);
			} else if (elem.createTextRange) {
				var range = elem.createTextRange();
				range.collapse(true);
				range.moveEnd("character", pos);
				range.moveStart("character", pos);
				range.select();
			}
		});
	},

	setSymbol: function(value) {
		var operator = "";
		if (value.indexOf("-") > -1) {
			value = value.replace("-", "");
			operator = "-";
		}
		return operator + this.config.prefix + value + this.config.suffix;
	},

	maskValue: function(value) {

		if(typeof value=='number'){
			value = (value.toFixed(this.config.precision)).replace(new RegExp("\\.", "g"), this.config.decimal);
		}

		var negative = (value.indexOf("-") > -1 && this.config.allowNegative) ? "-" : "",
			onlyNumbers = value.replace(/[^0-9]/g, ""),
			integerPart = onlyNumbers.slice(0, onlyNumbers.length - this.config.precision),
			newValue,
			decimalPart,
			leadingZeros;

		// remove initial zeros
		integerPart = integerPart.replace(/^0*/g, "");
		// put settings.thousands every 3 chars
		integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, this.config.thousands);
		if (integerPart === "") {
			integerPart = "0";
		}
		newValue = negative + integerPart;

		if (this.config.precision > 0) {
			decimalPart = onlyNumbers.slice(onlyNumbers.length - this.config.precision);
			leadingZeros = new Array((this.config.precision + 1) - decimalPart.length).join(0);
			newValue += this.config.decimal + leadingZeros + decimalPart;
		}
		return this.setSymbol(newValue);
	},

	maskAndPosition: function(startPos) {
		/*var originalLen = this.$input.val().length,
			newLen;
		this.$input.val(this.maskValue(this.$input.val()));
		newLen = this.$input.val().length;
		startPos = startPos - (originalLen - newLen);
		this.setCursorPosition(startPos);*/
		var originalLen = this.getInputNode().value.length,
			newLen;
		this.getInputNode().value = this.maskValue(this.getInputNode().value);
		newLen = this.getInputNode().value.length;
		startPos = startPos - (originalLen - newLen);
		this.setCursorPosition(startPos);
	},

	mask: function() {
		//var value = this.$input.val();
		var value = this.getInputNode().value;
		if (this.config.precision > 0 && value.indexOf(this.config.decimal) < 0) {
			value += this.config.decimal + new Array(this.config.precision+1).join(0);
		}
		//this.$input.val(this.maskValue(value));
		this.getInputNode().value = this.maskValue(value);
	},

	changeSign: function() {
		//var inputValue = this.$input.val();
		var inputValue = this.getInputNode().value;
		if (this.config.allowNegative) {
			if (inputValue !== "" && inputValue.charAt(0) === "-") {
				return inputValue.replace("-", "");
			} else {
				return "-" + inputValue;
			}
		} else {
			return inputValue;
		}
	},

	preventDefault: function(e) {
		if (e.preventDefault) { //standard browsers
			e.preventDefault();
		} else { // old internet explorer
			e.returnValue = false;
		}
	},

	keypressEvent: function(e) {
		if(this.config.readonly){ return false; }
		e = e || window.event;
		var key = e.which || e.charCode || e.keyCode,
			keyPressedChar,
			selection,
			startPos,
			endPos,
			value;

		//added to handle an IE "special" event
		if (key === undefined) {
			return false;
		}

		// any key except the numbers 0-9
		if (key < 48 || key > 57) {
			// -(minus) key
			if (key === 45) {
				//this.$input.val(this.changeSign());
				this.getInputNode().value = this.changeSign();
				return false;
			// +(plus) key
			} else if (key === 43) {
				//this.$input.val(this.$input.val().replace("-", ""));
				this.getInputNode().value = this.getInputNode().value.replace("-", "");
				return false;
			// enter key or tab key
			} else if (key === 13 || key === 9) {
				return true;
			} else if (this.browser.mozilla && (key === 37 || key === 39) && e.charCode === 0) {
				// needed for left arrow key or right arrow key with firefox
				// the charCode part is to avoid allowing "%"(e.charCode 0, e.keyCode 37)
				return true;
			} else { // any other key with keycode less than 48 and greater than 57
				this.preventDefault(e);
				return true;
			}
		} else if (!this.canInputMoreNumbers()) {
			return false;
		} else {
			this.preventDefault(e);

			keyPressedChar = String.fromCharCode(key);
			selection = this.getInputSelection();
			startPos = selection.start;
			endPos = selection.end;

			/*value = this.$input.val();
			this.$input.val(value.substring(0, startPos) + keyPressedChar + value.substring(endPos, value.length));*/

			value = this.getInputNode().value;
			this.getInputNode().value = value.substring(0, startPos) + keyPressedChar + value.substring(endPos, value.length);

			this.maskAndPosition(startPos + 1);
			return false;
		}
	},

	keydownEvent: function(e) {
		if(this.config.readonly){ return false; }
		e = e || window.event;
		var key = e.which || e.charCode || e.keyCode,
			selection,
			startPos,
			endPos,
			value,
			lastNumber;
		//needed to handle an IE "special" event
		if (key === undefined) {
			return false;
		}

		selection = this.getInputSelection();
		startPos = selection.start;
		endPos = selection.end;

		if (key === 8 || key === 46 || key === 63272) { // backspace or delete key (with special case for safari)
			this.preventDefault(e);

			//value = this.$input.val();
			value = this.getInputNode().value;
			// not a selection
			if (startPos === endPos) {
				// backspace
				if (key === 8) {
					if (this.config.suffix === "") {
					startPos -= 1;
					} else {
						// needed to find the position of the last number to be erased
						lastNumber = value.split("").reverse().join("").search(/\d/);
						startPos = value.length - lastNumber - 1;
						endPos = startPos + 1;
					}
				//delete
				} else {
					endPos += 1;
				}
			}

			//this.$input.val(value.substring(0, startPos) + value.substring(endPos, value.length));
			this.getInputNode().value = value.substring(0, startPos) + value.substring(endPos, value.length);

			this.maskAndPosition(startPos);
			return false;
		} else if (key === 9) { // tab key
			return true;
		} else { // any other key
			return true;
		}
	},

	keyupEvent: function(e) {
		if(!this.config.readonly){
			this.config.value = this.getValue();
		}
	},

	focusEvent: function(){
		/*if(!this.config.readonly){
			this.mask();
			this.$onFocusValue = this.$input.val();
			this.config.value = this.$input.val();
			var input = this.$input.get(0),
				textRange;
			if (input.createTextRange) {
				textRange = input.createTextRange();
				textRange.collapse(false); // set the cursor at the end of the input
				textRange.select();
			}
		}*/
		if(!this.config.readonly){
			this.mask();
			this.$onFocusValue = this.getInputNode().value;
			this.config.value = this.getInputNode().value;
			var input = $(this.getInputNode()).get(0),
				textRange;
			if (input.createTextRange) {
				textRange = input.createTextRange();
				textRange.collapse(false); // set the cursor at the end of the input
				textRange.select();
			}
		}
	},

	cutPasteEvent: function() {
		var t = this;
		setTimeout(function() { t.mask(); }, 0);
	},

	getDefaultMask: function() {
		var n = parseFloat("0") / Math.pow(10, this.config.precision);
		return (n.toFixed(this.config.precision)).replace(new RegExp("\\.", "g"), this.config.decimal);
	},

	blurEvent: function(e) {
		var cmp = $(this.getInputNode()); //this.$input
		if(!this.config.readonly){
			if (this.browser.msie) {
				this.keypressEvent(e);
			}

			if (cmp.val() === "" || cmp.val() === this.setSymbol(this.getDefaultMask())) {
				if (!this.config.allowZero) {
					cmp.val("");
				} else if (!this.config.affixesStay) {
					cmp.val(this.getDefaultMask());
				} else {
					cmp.val(this.setSymbol(this.getDefaultMask()));
				}
			} else {
				if (!this.config.affixesStay) {
					var newValue = cmp.val().replace(this.config.prefix, "").replace(this.config.suffix, "");
					cmp.val(newValue);
				}
			}
			if (cmp.val() !== this.$onFocusValue) {
				//cmp.change();
				$$(this).callEvent('onChange',  []);
				this.$onFocusValue = cmp.val();
				this.config.value = cmp.val();
			}
		}
	},

	clickEvent: function() {
		if(!this.config.readonly){
			var cmp = $(this.getInputNode()); //this.$input
			var input = cmp.get(0),
				length;
			if (input.setSelectionRange) {
				length = cmp.val().length;
				input.setSelectionRange(length, length);
			} else {
				cmp.val(cmp.val());
			}
		}
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
		!t && this.s.required && (t = webix.rules.isNotEmpty);
		var e = (this.getFormView(), this.s.name),
			i = this.getValue(),
			s = {};
		i = (!this.s.allowZero&&i===0?null:i);
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
		if(this.config.value){ this.$setValue(this.config.value); }
		var s = t.inputAlign || "left";
		i = i || t.name || webix.uid();
		var n = this.$renderLabel(t, i),
			r = "";
		if (e) r += e;
		else {
			var a = this.Ee(t);
			r += this.qt("input") + "id='" + i + "' type='" + (t.type || this.name) + "' value='" + (t.value?this.maskValue(t.value):'') + "' style='width: " + a + "px; text-align: " + s + ";' ";

			r += " onfocus='$$(this).focusEvent()'";
			r += " onblur='($$(this)?$$(this).blurEvent(event):null)'";

			r += " onkeypress='return $$(this).keypressEvent(event)'";
			r += " onkeydown='return $$(this).keydownEvent(event)'";
			r += " onkeyup='$$(this).keyupEvent(event)'";


			var h = this.s.attributes;
			if (h)
				for (var o in h) r += " " + o + "='" + h[o] + "'";
			r += " />"
		}
		var l = this.$renderIcon ? this.$renderIcon(t) : "";
		return r += l, r += "</div>", top ? n + "<div class='webix_el_box' style='width:" + this.s.awidth + "px; height:" + this.s.aheight + "px'>" + r + "</div>" : "<div class='webix_el_box' style='width:" + this.s.awidth + "px; height:" + this.s.aheight + "px'>" + n + r + "</div>"
	},
	type_setter: function(t) {
		return t
	},
	oe: !1,
	$setValue: function(t) {
		if(this.getInputNode()){ this.getInputNode().value = this.maskValue(t); }
		this.config.value = this.maskValue(t);
	},
	$getValue: function() {
		var value = (this.getInputNode().value|| "0"),
			isNegative = value.indexOf("-") !== -1,
			decimalPart;
		// get the last position of the array that is a number(coercion makes "" to be evaluated as false)
		$(value.split(/\D/).reverse()).each(function (index, element) {
			if(element) {
				decimalPart = element;
				return false;
			}
		});
		value = value.replace(/\D/g, "");
		if(this.config.precision>0){ value = value.replace(new RegExp(decimalPart + "$"), "." + decimalPart); }
		if (isNegative) { value = "-" + value; }
		return parseFloat(value);
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
