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
        if (_userid <= 1) {
            if (rndHandler.isbokemontime(3)) {
                renderhtml.showbokdrakar(_userid);
            };
        } else {
            // ska det visas bokemon eller bokdrakar och hur ofta skall dom visas
            if (chkuser(_userid)) {
                if (rndHandler.isbokemontime(2)) { //kolla om drake eller monster ska visas ca var annan sida.
                    if (rndHandler.isbokemontime(3)) { //bibblomons visas ca 33% av gångerna
                        renderhtml.showbokemon(_userid); //ca 20/100 exempel 33/4 =ca 8/100
                    } else {
                        renderhtml.showbokdrakar(_userid); // drakar visas ca 66% av gångerna
                    };
                };
            }
        }
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
