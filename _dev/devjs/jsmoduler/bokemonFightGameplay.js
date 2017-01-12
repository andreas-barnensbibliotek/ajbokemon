var $ = require("jquery");
var appsettings = require("./appSettings.js");

/* Settings */
var user_input = { 
    ubound:1000,
    lbound:250
};

var global = { 
    intervalID:0,
    count:0,
    totalRuns:0 
};
var fighter = {
    bokemon: 0,
    bokdrake:0,
    currentfighter:""
}


module.exports = {
    jqueryFightGameplay: function (drakindex, bokemonindex) {
        //init
        fighter.bokdrake = appsettings.drakemon.drakscore[drakindex];
        fighter.bokemon = appsettings.bokemon.score[bokemonindex];
        fighter.currentfighter = "bokdrake";

        global.intervalID = window.setInterval(function(){showDamage(getHP())},6000);
     }
    
};

 

/* Subfunctions */
var difference = user_input.ubound+1 - user_input.lbound;
function getHP(){
    return (Math.floor(Math.random()*difference)+user_input.lbound);
}


function showDamage(hp){
    var fighttext = "";

    if (fighter.currentfighter == "bokdrake") {
        fighttext = "<h2>Bibblemon tar snabbt vatten f&ouml;r att sl&auml;cka elden. Bokdraken f&ouml;rlorar po&auml;ng!</h2><h1>" + hp + "p</h1>"
        fighter.bokdrake = fighter.bokdrake - parseInt(hp);
        fighter.currentfighter= "bokemon"; //byt fighter nästa
    } else {
        fighttext = "<h2>Bokdraken hinner l&auml;gga på fler b&ouml;cker. bibbemonen f&ouml;rlorar po&auml;ng!</h2><h1>" + hp + "p</h1>"
        fighter.bokemon = fighter.bokemon - parseInt(hp);
        fighter.currentfighter = "bokdrake";
    }

    $('.fightArena').html(fighttext);
    
    

    if (vinnorloose(fighter.bokdrake, fighter.bokemon)) {
        clearInterval(global.intervalID);
        var endtext = "<h2>slut</h2>";

        $('.fightArena').html(endtext);
    }
         
}

var vinnorloose = function(drakpoints, bokemonpoints){
    var ret = false;
    if(drakpoints <= 0){
        ret = true;
    };
    if(bokemonpoints <= 0){
        ret = true;
    };
    
    return ret;
}
