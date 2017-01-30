var $ = require("jquery");
var vex = require('./vex.combined.js');
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
            return true;
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
        $('body').on('click', '.nobibblomon', function () {
            vex.closeAll();
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
        $('.fightArenablock').hide();

        inserttextwordbyword('.fightStory .showStartmsg', function(x){
            $('.fightArenablock').hide().fadeIn(4000);
            $('.fightStory .showStartmsg').fadeOut(4000, function () {
                $(this).slideUp(3000); //.animate({ height: 0, opacity: 0 }, 6000);
            });
           
            $('.fightArena').html("<h1>Fighten kan b&ouml;rja!!!</h1>");
            fightgameplay.jqueryFightGameplay(drakindex,bokemonindex);
        });

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


var inserttextwordbyword = function (divtoconnect, callback) {
    var $el = $(divtoconnect),
            text = $el.html(),
            speed = 500; //ms

    $el.empty();
    $el.show();
    var wordArray = text.split(' '),
        i = 0;

    INV = setInterval(function () {
        if (i >= wordArray.length - 1) {
            clearInterval(INV);
        }
        $el.append(wordArray[i] + ' ')
        i++;
        if (i >= wordArray.length) {
            callback();
        }
    }, speed);
};

