var $ = require("jquery");
var appsettings = require("./appSettings.js");
var rndHandler = require("./randomBokemonHandler.js");
var api = require("./bokemonServicecalls.js");
var objfighttext = require("./bokemonMsg.js");
var _once = false;
/* Settings */
var user_input = { 
    ubound:450,
    lbound:250
};

var global = { 
    intervalID:0,
    count:0,
    totalRuns: 0,
    fightStory:0
};
var fighter = {
    bokemon: 0,
    bokdrake: 0,
    bokdrakenamn: "",
    bokdrakelevel:0,
    bokemonID: 0,
    bokemonnamn: "",    
    currentUserid:0,
    currentfighter:""
}


module.exports = {
    jqueryFightGameplay: function (drakindex, bokemonindex,fightStory) {
        //init
        fighter.bokdrake = appsettings.drakemon.drakscore[drakindex];
        fighter.bokdrakenamn = appsettings.drakemon.draknamn[drakindex];        
        fighter.bokemon = appsettings.bokemon.score[bokemonindex];
        fighter.bokemonnamn = appsettings.bokemon.namn[bokemonindex];       
        fighter.bokemonID = appsettings.bokemon.monid[bokemonindex];
        fighter.currentUserid = appsettings.currentUserid;
        fighter.currentfighter = "bokdrake";
        global.fightStory = fightStory;

        global.intervalID = window.setInterval(function(){showDamage(getHP())},6000);
     },
    jqueryFightCombatGameplay: function (drakindex, bokemonindex,fightStory) {
        //init
        $('body').on('click', '.combatdrake', function () {
            
            fighter.currentfighter = "bokdrake";
            var currenthp = $(this).attr("rel");
            _once = true;
            $('.combatdrake').stop().stop();
            $('.combatdrake').remove();
            showDamagecombatmode(currenthp);
            return false;
        });

        fighter.bokdrake = appsettings.drakemon.drakscore[drakindex];
        fighter.bokdrakenamn = appsettings.drakemon.draknamn[drakindex];
        fighter.bokdrakeimgsrc = appsettings.drakemon.draksrc[drakindex];
        fighter.bokdrakelevel = appsettings.drakemon.draklev[drakindex];
        fighter.bokemon = appsettings.bokemon.score[bokemonindex];
        fighter.bokemonnamn = appsettings.bokemon.namn[bokemonindex];
        fighter.bokemonID = appsettings.bokemon.monid[bokemonindex];
        fighter.currentUserid = appsettings.currentUserid;
        fighter.currentfighter = "bibblomon";
        global.fightStory = fightStory;

        makeDiv(getHP(), fighter.bokdrakelevel);

    //global.intervalID = window.setInterval(function(){showDamage(getHP())},6000);
    }
};

/* Subfunctions */
var difference = user_input.ubound+1 - user_input.lbound;
function getHP() {
    var rethp = 0;
    var megalosstime = rndHandler.getMegaloss();

    if (megalosstime == 2) { //bibblomons visas ca 33% av gångerna
        rethp = 1500;
    } else {
        rethp =(Math.floor(Math.random() * difference) + user_input.lbound);
    }
    console.log("megalosstime: " + megalosstime + " hp=" + rethp);
    return rethp;
}


function showDamage(hp){
    var fighttext = "";
    var fightScore = "";
    var fighterriktning = rndHandler.getNyriktning();

    if (fighter.currentfighter == "bokdrake") {
        fighttext = "<h1>" + objfighttext.getrandommsg(global.fightStory, "bibblemon") + "</h1>";
        //fighttext += "<h1>Bibblemon tar snabbt vatten f&ouml;r att sl&auml;cka elden.</h1><h2>Bokdraken f&ouml;rlorar<br> " + hp + "p</h2>"
        fightScore = "<h2>"+fighter.bokdrakenamn+" f&ouml;rlorar<br> " + hp + "p</h2>"

        fighter.bokdrake = fighter.bokdrake - parseInt(hp);
        var bokdrakepoint = parseInt(fighter.bokdrake).toFixed(0);

        $('.bokdrakecore').hide().html(bokdrakepoint + "p").fadeIn(4000);
        if (fighterriktning == 2) { //bibblomons visas ca 33% av gångerna
            fighter.currentfighter = "bokdrake"; //byt fighter nästa
        } else {
            fighter.currentfighter = "bibblomon"; //byt fighter nästa
        };

    } else {
        fighttext = "<h1>" + objfighttext.getrandommsg(global.fightStory, "bokdrake") + "</h1>";
        fightScore = "<h2>"+fighter.bokemonnamn+" f&ouml;rlorar<br> " + hp + "p</h2>"
        //fighttext = "<h1>Bokdraken hinner l&auml;gga p&aring; fler b&ouml;cker.</h1><h2> bibbemonen f&ouml;rlorar<br> " + hp + "p</h2>"
        fighter.bokemon = fighter.bokemon - parseInt(hp);

        $('.bokemonscore').hide().html(fighter.bokemon +"p").fadeIn(4000);
        if (fighterriktning == 2) { //bibblomons visas ca 33% av gångerna
            fighter.currentfighter = "bibblomon"; //byt fighter nästa
        } else {
            fighter.currentfighter = "bokdrake"; //byt fighter nästa
        };
    }

    
    var wehaveawinner = vinnorloose(fighter.bokdrake, fighter.bokemon); 
   
    if (wehaveawinner < 3) {
        var endtext = "";
                
        if (wehaveawinner == 1) {
            //bokemon vann
            endtext += "<h2>Din bibblomon har lyckats att skr&auml;mma iv&auml;g bokdraken!</h2>";
            endtext += "<h1>Vinnaren &auml;r " + fighter.bokemonnamn + "!</h1>";
            updatefighttoserver('gameplaywin');
            
            $('.bokdrakevatar img').fadeOut(4000);
            $('.bokdrakecore').hide()
        }
        if (wehaveawinner == 2) {
            //Bokdraken vann            
            endtext += "<h1>NEEEEJ!!</h1><p>Bokdraken &aring;t upp din bibblomon!<br></p><p>...men var inte ledsen den kommer ut igen!.. om n&aring;gra dagar! </p>";
            endtext += "<h1 style='padding-top:1rem; padding-bottom:1rem;'>Vinnaren &auml;r " + fighter.bokdrakenamn + "!</h1>";
            updatefighttoserver('gameplaylose');
            $('.bokemonavatar img').fadeOut(4000);
            $('.bokemonscore').hide();
            
        }
        endtext += "<button>OK</button>";
        
        $('.fightArenaMesseage').html(endtext);
        $('.fightArena').hide();
        clearInterval(global.intervalID);
    } else {
        $('.fightArena').fadeOut('slow', function () {
            $('.fightArenaMesseage').html(fighttext);
            $(this).html(fightScore)
        }).fadeIn("slow");
    }
         
}

function showDamagecombatmode(hp) {
    var fighttext = "";
    var fightScore = "";
    var fighterriktning = rndHandler.getNyriktning();
  
    if (fighter.currentfighter == "bokdrake") {
        //fighttext = "<h1>" + objfighttext.getrandommsg(global.fightStory, "bibblemon") + "</h1>";
        //fighttext += "<h1>Bibblemon tar snabbt vatten f&ouml;r att sl&auml;cka elden.</h1><h2>Bokdraken f&ouml;rlorar<br> " + hp + "p</h2>"
        //fightScore = "<h2>" + fighter.bokdrakenamn + " f&ouml;rlorar<br> " + hp + "p</h2>"

        fighter.bokdrake = fighter.bokdrake - parseInt(hp);        
        $('.bokdrakecore').hide().html(parseInt(fighter.bokdrake.toFixed(0)) + "p").fadeIn(100);
               
        fighter.currentfighter = "bibblomon"; //byt fighter nästa
       
    } else {
        //fighttext = "<h1>" + objfighttext.getrandommsg(global.fightStory, "bokdrake") + "</h1>";
        //fightScore = "<h2>" + fighter.bokemonnamn + " f&ouml;rlorar<br> " + hp + "p</h2>"
        //fighttext = "<h1>Bokdraken hinner l&auml;gga p&aring; fler b&ouml;cker.</h1><h2> bibbemonen f&ouml;rlorar<br> " + hp + "p</h2>"
        fighter.bokemon = fighter.bokemon - parseInt(hp);
       $('.bokemonscore').hide().html(fighter.bokemon + "p").fadeIn(100);       
       fighter.currentfighter = "bokdrake"; //byt fighter nästa
   }

    WinnerOrLooser(function () {
        console.log("WinnerOrLooser körs");
        $(".combatdrake").remove();
        makeDiv(getHP(),fighter.bokdrakelevel);
    });
}

var WinnerOrLooser = function (callback) {

    var wehaveawinner = vinnorloose(fighter.bokdrake, fighter.bokemon);

    if (wehaveawinner < 3) {
        var endtext = "";

        if (wehaveawinner == 1) {
            //bokemon vann
            endtext += "<h2>Din bibblomon har lyckats att skr&auml;mma iv&auml;g bokdraken!</h2>";
            endtext += "<h1>Vinnaren &auml;r " + fighter.bokemonnamn + "!</h1>";
            updatefighttoserver('gameplaywin');

            $('.bokdrakevatar img').fadeOut(4000);
            $('.bokdrakecore').hide()
        }
        if (wehaveawinner == 2) {
            //Bokdraken vann            
            endtext += "<h1>NEEEEJ!!</h1><p>Bokdraken &aring;t upp din bibblomon!<br></p><p>...men var inte ledsen den kommer ut igen!.. om n&aring;gra dagar! </p>";
            endtext += "<h1 style='padding-top:1rem; padding-bottom:1rem;'>Vinnaren &auml;r " + fighter.bokdrakenamn + "!</h1>";
            updatefighttoserver('gameplaylose');
            $('.bokemonavatar img').fadeOut(4000);
            $('.bokemonscore').hide();

        }
        endtext += "<button>OK</button>";

        $('.fightArenaMesseage').html(endtext);
        $('.fightArena').hide();
       // clearInterval(global.intervalID);
    } else {
        //$('.fightArena').fadeOut('slow', function () {
            //$('.fightArenaMesseage').html("test");
        //$(this).html(fightScore)
        _once = false;
            callback();

        //}).fadeIn("slow");
    }
}

var makeDiv = function (hp, draklev) {
  
    var divsize = 40;
    //var divsize = ((Math.random() * 10) + 0).toFixed();
    var color = '#' + Math.round(0xffffff * Math.random()).toString(16);
    $newdiv = $('<div/>').css({
        'width': divsize + 'px',
        'height': divsize + 'px', 
        'z-index' :"99999"
    }).addClass("combatdrake");

    var posx = (Math.random() * ($('#bokemonfightContainer').width() - divsize)).toFixed();
    var posy = (Math.random() * ($('#bokemonfightContainer').height() - divsize)).toFixed();
    var showdelay = 700;
    switch (draklev) {
        case 1:
            showdelay = 700;
            break;
        case 2:
            showdelay = 600;
            break;
        case 3:
            showdelay = 550;
            break;
        case 4:
            showdelay = 500;
            break;
        case 5:
            showdelay = 475;
            break;
        case 6:
            showdelay = 450;
            break;
        case 7:
            showdelay = 425;
            break;
        case 8:
            showdelay = 350;
            break;
        default:           
            showdelay = 700;
            break;
    }

    $newdiv.css({
        'position': 'absolute',
        'left': posx + 'px',
        'top': posy + 'px',
        'display': 'none'
    }).appendTo('#bokemonfightContainer').fadeIn(150).attr("rel", hp).html(
    '<img src="' + fighter.bokdrakeimgsrc + '.png" style="width:width;"/>'
    ).delay(showdelay).fadeOut(150, function () {
       
        fighter.currentfighter = "bibblomon";
        //alert("här");
        //if (_once) {
            showDamagecombatmode(hp);
        //};
        
    });
};




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
