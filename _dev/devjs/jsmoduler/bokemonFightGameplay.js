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
        $('.bokdrakecore').html(fighter.bokdrake);
        fighter.currentfighter= "bokemon"; //byt fighter nästa
    } else {
        fighttext = "<h2>Bokdraken hinner l&auml;gga p&aring; fler b&ouml;cker. bibbemonen f&ouml;rlorar po&auml;ng!</h2><h1>" + hp + "p</h1>"
        fighter.bokemon = fighter.bokemon - parseInt(hp);        
        $('.bokemonscore').html(fighter.bokemon);
        fighter.currentfighter = "bokdrake";
    }

    $('.fightArena').html(fighttext);
    
    
    var wehaveawinner = vinnorloose(fighter.bokdrake, fighter.bokemon); 
   
    if (wehaveawinner < 3) {
        var endtext = "<h2>Kampen slutade!</h2>";
                
        if (wehaveawinner == 1) {
            //bokemon vann
            endtext += "<h1>Vinnaren &auml;r Bokemon!</h1>";
            endtext += "<p> Din bokemon har lyckats att skrämma iv&auml;g bokdraken!</p>";
        }
        if (wehaveawinner == 2) {
            //bokemon vann
            endtext += "<h1>Vinnaren &auml;r Bokdraken!</h1>";
            endtext += "<p>Bokdraken &aring;t upp din bokemon! Var inte ledsen den kommer ut igen!.. om n&aring;gra dagar! </p>";
        }
        endtext += "<button>OK</button>";
        $('.fightArena').html(endtext);
        clearInterval(global.intervalID);
    }
         
}

var vinnorloose = function(drakpoints, bokemonpoints){
    var ret = 3;
    if (drakpoints <= 0) {
        fighter.bokdrake = 0;
        ret = 1;
    };
    if (bokemonpoints <= 0) {
        fighter.bokemon = 0;
        ret = 2;
    };
    
    return ret;
}
