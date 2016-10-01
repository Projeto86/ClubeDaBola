var twDateControler = function(initialTicks){

    this.$actual = new Date(initialTicks);
    this.$intervalId = null;
    this.$updatesCounter = 0;

    this.$sync = function(){
        this.$clearInterval();
        this.$updatesCounter = 0;
        var t = this;
        TW.api("time/get", {}, function(r){
            if(r){ if(r.status==200){ t.$actual = new Date(r.response); } }
            t.$setInterval();
        });
    };

    this.$clearInterval = function(){
        if(this.$intervalId){ clearInterval(this.$intervalId); }
    };

    this.$setInterval = function(){
        var t = this;
        this.$intervalId = setInterval(function(){
            t.$actual.setSeconds(t.$actual.getSeconds()+1);
            t.$updatesCounter++;
            if(t.$updatesCounter>=18){ t.$sync(); }
        }, 1000);
    };

    this.toDate = function(){
        return new Date(this.$actual.getTime());
    };

    this.toString = function(dateFormat){
        return twJscSistemaDate.formatDate(this.toDate(), dateFormat);
    };

    this.dateAdd = function(timeU, byMany, dateFormat){
        if(dateFormat){ return twJscSistemaDate.dateAdd(timeU, byMany, this.toString(dateFormat), dateFormat); }
        else { return twJscSistemaDate.dateAdd(timeU, byMany, this.toDate()); }
    };

    var w = this;
    $(window).on("blur", function(){ w.$clearInterval(); });
    $(window).on("focus", function(){ w.$sync(); });

    this.$setInterval();

};
