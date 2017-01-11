
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
            renderhtml.showbokdrakar(1);
        } else {
            // ska det visas bokemon eller bokdrakar och hur ofta skall dom visas
            if (chkuser(_userid)) {
                //if (rndHandler.isbokemontime(4)) {
                //    renderhtml.showbokemon(_userid);
                //} else {
                //    renderhtml.showbokdrakar(1);
                //};
                renderhtml.showbokdrakar(1);
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
