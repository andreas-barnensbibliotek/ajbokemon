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
    if (chkuser(_userid)) {
    
        // start eventhandler -----------------------------
        registerJqueryEvents.jqueryEVENTS(_userid);
        // end eventhandler
        
        var init = function () {
            
            renderhtml.showbokemon(_userid);

        }
        // END init 

        init();
    }
});
