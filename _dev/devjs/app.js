var appsettings = require("./jsmoduler/appSettings.js");
var rndHandler = require("./jsmoduler/randomBokemonHandler.js");
var renderhtml = require("./jsmoduler/bokemonHTML.js");
var registerJqueryEvents = require("./jsmoduler/eventhandler.js");
var $ = require("jquery");


$(function () {

    
    //Jquery div
    var _userid = $('#barnensbiblCurrentUserid').html();
    
    //_userid = 7017;
    var chkuser = function (uid) {
        var ret = false;

        if (uid == "364") {
            ret = true;
        }
        if (uid == "105") {
            ret = true;
        }
        if (uid == "7017") {
            ret = true;
        }
        appsettings.currentUserid = uid;
        return ret;
    };

    // START user logged in
   
    if (_userid < 1) {
        _userid = 1;
    }
    // start eventhandler -----------------------------
    registerJqueryEvents.jqueryEVENTS(_userid);
    // end eventhandler
        
    var init = function () {
        // k�r p� denna kod n�r vi �r klara med beta och g�r live!!!-------------------------------
        // visas f�r dom som inte �r inloggade!!!!
        //if (_userid <= 1) {
        //    if (rndHandler.isbokemontime(3)) {
        //        renderhtml.showbokdrakar(_userid);
        //    };
        //} else {
        // k�r p� denna kod (ovan) n�r vi �r klara med beta och g�r live!!!-------------------------------

            // ska det visas bokemon eller bokdrakar och hur ofta skall dom visas
            if (chkuser(_userid)) {
                //if (rndHandler.isbokemontime(2)) { //kolla om drake eller monster ska visas ca var annan sida.
                var montyp = rndHandler.BokemonOrBokdrake();
                console.log("typ: "+montyp);
                if (montyp == 2) { //bibblomons visas ca 33% av g�ngerna
                    console.log("visa bibblomon");
                    renderhtml.showbokemon(_userid); //ca 20/100 exempel 33/4 =ca 8/100
                } else {
                    renderhtml.showbokdrakar(_userid); // drakar visas ca 66% av g�ngerna
                    console.log("visa bokdrake");
                };
                //};
            }
        //} // k�r p� denna kod n�r vi �r klara med beta och g�r live!!!-------------------------------
        //renderhtml.showbokemon(_userid);
            
        

        // END init 
    }

    $('.startar').on('click', function () {
       
    });

    //$("#modal").iziModal({
    //    openFullscreen: true
    //    });

        init();
    
});
