var $ = require("jquery");
var appsettings = require("./appSettings.js");
var api = require("./bokemonServicecalls.js");
var objfighttext = require("./bokemonMsg.js");

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
    bokdrake: 0,
    bokemonID: 0,
    currentUserid:0,
    currentfighter:""
}


module.exports = {
    jqueryFightGameplay: function (drakindex, bokemonindex) {
        //init
        fighter.bokdrake = appsettings.drakemon.drakscore[drakindex];
        fighter.bokemon = appsettings.bokemon.score[bokemonindex];
        fighter.bokemonID = appsettings.bokemon.monid[bokemonindex];
        fighter.currentUserid = appsettings.currentUserid;
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
        fighttext = "<h1>" + objfighttext.getrandommsg("eld", "bibblemon") + "</h1>";
        //fighttext += "<h1>Bibblemon tar snabbt vatten f&ouml;r att sl&auml;cka elden.</h1><h2>Bokdraken f&ouml;rlorar<br> " + hp + "p</h2>"
        fighttext += "<h2>Bokdraken f&ouml;rlorar<br> " + hp + "p</h2>"

        fighter.bokdrake = fighter.bokdrake - parseInt(hp);
        $('.bokdrakecore').hide().html(fighter.bokdrake + "p").fadeIn(4000);
        fighter.currentfighter= "bokemon"; //byt fighter nästa
    } else {
        fighttext = "<h1>" + objfighttext.getrandommsg("eld", "bokdrake") + "</h1>";
        fighttext += "<h2> bibbemonen f&ouml;rlorar<br> " + hp + "p</h2>"
        //fighttext = "<h1>Bokdraken hinner l&auml;gga p&aring; fler b&ouml;cker.</h1><h2> bibbemonen f&ouml;rlorar<br> " + hp + "p</h2>"
        fighter.bokemon = fighter.bokemon - parseInt(hp);        
        $('.bokemonscore').hide().html(fighter.bokemon +"p").fadeIn(4000);
        fighter.currentfighter = "bokdrake";
    }

    
    var wehaveawinner = vinnorloose(fighter.bokdrake, fighter.bokemon); 
   
    if (wehaveawinner < 3) {
        var endtext = "";
                
        if (wehaveawinner == 1) {
            //bokemon vann
            endtext += "<h2>Din bokemon har lyckats att skr&auml;mma iv&auml;g bokdraken!</h2>";
            endtext += "<h1>Vinnaren &auml;r Bokemon!</h1>";
            updatefighttoserver('gameplaywin');
            
            $('.bokdrakevatar img').fadeOut(4000);
            $('.bokdrakecore').hide()
        }
        if (wehaveawinner == 2) {
            //Bokdraken vann            
            endtext += "<h1>NEEEEJ!!</h1><p>Bokdraken &aring;t upp din bokemon!<br></p><p style='font-size:0.9em;'>...men var inte ledsen den kommer ut igen!.. om n&aring;gra dagar! </p>";
            endtext += "<h1>Vinnaren &auml;r Bokdraken!</h1>";
            updatefighttoserver('gameplaylose');
            $('.bokemonavatar img').fadeOut(4000);
            $('.bokemonscore').hide();
            
        }
        endtext += "<button>OK</button>";
        $('.fightArena').html(endtext);
        clearInterval(global.intervalID);
    } else {
        $('.fightArena').fadeOut('slow', function () {
            $(this).html(fighttext)
        }).fadeIn("slow");
    }
         
}

var vinnorloose = function (drakpoints, bokemonpoints) {
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
};

var updatefighttoserver = function (winorlose) {

    var x = fighter.currentUserid;
    var y = fighter.bokemonID;

    api.bokemonServerCRUDHandler(winorlose, fighter.currentUserid, fighter.bokemonID, function () { return true; });
    return true;
}