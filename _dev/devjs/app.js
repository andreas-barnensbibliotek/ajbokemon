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
        if (uid == "9794") { //yvonne
            ret = true;
        }
        if (uid == "12282") { //katarina Larson
            ret = true;
        }
        if (uid == "34606") { //storasötasupermannen
            ret = true;
        }
        if (uid == "34864") { //(Mia marika) bibblomontestare
            ret = true;
        }
        if (uid == "9657") { // nils-magnus
            ret = true;
        }
        if (uid == "33492") { // elsan04
            ret = true;
        }
        if (uid == "35042") { // hannalilja
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
        // kör på denna kod när vi är klara med beta och går live!!!-------------------------------
        // visas för dom som inte är inloggade!!!!
        if (_userid <= 1) {
            if (rndHandler.isbokemontime(3)) {
                renderhtml.showbokdrakar(_userid);
            };
        } else {
        // kör på denna kod (ovan) när vi är klara med beta och går live!!!-------------------------------

            // ska det visas bokemon eller bokdrakar och hur ofta skall dom visas
            if (chkuser(_userid)) {
                //if (rndHandler.isbokemontime(2)) { //kolla om drake eller monster ska visas ca var annan sida.
                var montyp = rndHandler.BokemonOrBokdrake();
                console.log("typ: "+montyp);
                if (montyp == 2) { //bibblomons visas ca 33% av gångerna
                    console.log("visa bibblomon");
                    renderhtml.showbokemon(_userid); //ca 20/100 exempel 33/4 =ca 8/100
                } else {
                    renderhtml.showbokdrakar(_userid); // drakar visas ca 66% av gångerna
                    console.log("visa bokdrake");
                };
                //};
            }
        } // kör på denna kod när vi är klara med beta och går live!!!-------------------------------
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
