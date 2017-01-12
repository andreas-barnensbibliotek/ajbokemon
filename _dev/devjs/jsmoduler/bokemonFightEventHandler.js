var $ = require("jquery");
var appsettings = require("./appSettings.js");
var api = require("./bokemonServicecalls.js");
var fighthandler = require("./bokemonfightHTML.js");
var fightgameplay = require("./bokemonFightGameplay.js");

module.exports = {
    jqueryFightEVENTS: function (userid) {
        
        $('body').on('click', '.btnjagaJA', function () {
            
            bokemonfightstep2_valjlist(userid);
            return false;
        });
        $('body').on('click', '.btnjagaNEJ', function () {
            alert("NEJ!");
            return false;
        });
        //välj bokemon till fighten
        $('body').on('click', '.valdfightbokemon', function () {
            valtnr = $(this).attr('rel');
            console.log("drakar: " + appsettings.drakemon.draknamn);
            console.log("bokemon: " + appsettings.bokemon.namn);

            var bokemonid = getbokemonindexfromid(valtnr);
            //var valdbokemon = appsettings.bokemon.namn[bokemonid];
            var valdbokdrake = $('#bokdrakeitm').attr('rel');

            bokemonfightstep3_drakfight(valdbokdrake, bokemonid);
            //alert(valdbokemon);
            return false;
        });
        
    }
}

var bokemonfightstep2_valjlist = function (userid) {
    var valdlistaHtml = fighthandler.drakfightBokemonVal("usrmon", userid, function (htmlblock) {
        $('.vex-dialog-message').html(htmlblock);       
        return false;
    });
    
}

var bokemonfightstep3_drakfight = function (drakindex, bokemonindex) {
    var valdlistaHtml = fighthandler.drakfightArena(drakindex, bokemonindex, function (htmlblock) {
        $('.vex-dialog-message').html(htmlblock);
        fightgameplay.jqueryFightGameplay(drakindex,bokemonindex);
        return false;
    });

}

//hämta rätt bokemon i arrayen via index
var getbokemonindexfromid = function (monid) {
    var indexes = $.map(appsettings.bokemon.monid, function (obj, index) {
        if (obj == monid) {
            return index;
        }
    });

    return indexes[0];
}