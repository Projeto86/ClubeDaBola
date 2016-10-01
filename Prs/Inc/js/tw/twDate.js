var twDate = function(_initialDate){

    this._d = new Date();
    if(typeof _initialDate==='string'||typeof _initialDate==='number'){ this._d = new Date(_initialDate); }
    if(typeof _initialDate==='object'){ this._d = new Date(date.getDate()); }

    this.clearTime = function(){
        this._d.setHours(0);
        this._d.setMinutes(0);
        this._d.setSeconds(0);
        this._d.setMilliseconds(0);
    };

    this.toDate = function(){ return new Date(this._d.getTime()); };
    this.getDate = function(){ return this._d.getDate(); };
    this.getDay = function(){ return this._d.getDay(); };
    this.getFullYear = function(){ return this._d.getFullYear(); };
    this.getHours = function(){ return this._d.getHours(); };
    this.getMilliseconds = function(){ return this._d.getMilliseconds(); };
    this.getMinutes = function(){ return this._d.getMinutes(); };
    this.getMonth = function(){ return this._d.getMonth(); };
    this.getSeconds = function(){ return this._d.getSeconds(); };
    this.getTime = function(){ return this._d.getTime(); };
    this.setDate = function(_value){ this._d.setDate(_value); };
    this.setFullYear = function(_value){ this._d.setFullYear(_value); };
    this.setHours = function(_value){ this._d.setHours(_value); };
    this.setMilliseconds = function(_value){ this._d.setMilliseconds(_value); };
    this.setMinutes = function(_value){ this._d.setMinutes(_value); };
    this.setMonth = function(_value){ this._d.setMonth(_value); };
    this.setSeconds = function(_value){ this._d.setSeconds(_value); };
    this.setTime = function(_value){ this._d.setTime(_value); };

    var normalizeUnits = function(_unit){
        if(typeof _unit!=='string' || !_unit) return '';
        var chk1 = /^(years?)$|^(quarters?)$|^(months?)$|^(weeks?)$|^(days?)$|^(hours?)$|^(minutes?)$|^(seconds?)$|^(milliseconds?)$/i;
        var chk2 = /^(y|Q|M|w|d|h|m|s)$|^(ms)$/;
        if(!chk1.test(_unit)&&!chk2.test(_unit)) return '';
        return _unit.replace(/^years?$/i, 'y')
            .replace(/^quarters?$/i, 'Q')
            .replace(/^months?$/i, 'M')
            .replace(/^weeks?$/i, 'w')
            .replace(/^days?$/i, 'd')
            .replace(/^hours?$/i, 'h')
            .replace(/^minutes?$/i, 'm')
            .replace(/^seconds?$/i, 's')
            .replace(/^milliseconds?$/i, 'ms');
    };

    this.add = function(_value, _unit){
        if(isNaN(_value)||typeof _unit!=='string') return;
        _value = parseInt(_value);
        if(!_value||!_unit) return;

        switch(normalizeUnits(_unit)){
            case "y": this._d.setFullYear(this._d.getFullYear()+_value); break;
            case "M": this._d.setMonth(this._d.getMonth()+_value); break;
            case "d": this._d.setDate(this._d.getDate()+_value); break;
            case "h": this._d.setHours(this._d.getHours()+_value); break;
            case "m": this._d.setMinutes(this._d.getMinutes()+_value); break;
            case "s": this._d.setSeconds(this._d.getSeconds()+_value); break;
            case "ms": this._d.setMilliseconds(this._d.getMilliseconds()+_value); break;
        }
        return this;
    };

    this.subtract = function(_value, _unit){
        if(isNaN(_value)) return;
        _value = parseInt(_value);
        if(!_value) return;
        if(_value>0){ _value = -1 * _value; }
        this.add(_value, _unit);
    };

    this.clone = function(){ return new twDate(this._d.getTime()); };

    var monthDiff = function(a, b) {
        // difference in months
        var wholeMonthDiff = ((b.getFullYear() - a.getFullYear()) * 12) + (b.getMonth() - a.getMonth()), // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months'); // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months'); // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }
        return (wholeMonthDiff + adjust);
    };

    this.diff = function(_compareTo, _unit, _asFloat){
        if(!_compareTo || !_compareTo.getTime) return null;

        var _output, _delta, _zoneDelta;
        _compareTo = new twDate(_compareTo.getTime());
        _unit = normalizeUnits(_unit);

        if (_unit === 'y' || _unit === 'M' || _unit === 'Q') {
            _output = monthDiff(this, _compareTo);
            if (_unit === 'Q') { _output = _output / 3; }
            else if (_unit === 'y') { _output = _output / 12; }
        } else {
            _delta = _compareTo - this._d;
            _output = _unit === 's' ? _delta / 1e3 : // 1000
                _unit === 'm' ? _delta / 6e4 : // 1000 * 60
                _unit === 'h' ? _delta / 36e5 : // 1000 * 60 * 60
                _unit === 'd' ? _delta / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                _unit === 'w' ? _delta / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                _delta;
        }
        return _asFloat ? _output : Math.floor(_output);
    };

    this.valueOf = function(){ return this._d.getTime(); };
};
