var $ = require("jquery");
var api = require("./bokemonServicecalls.js");
module.exports = {
    jqueryFightEVENTS: function (userid) {


    }
}

/* Settings */
var user_input = {
    ubound: 1000,
    lbound: 0
};

var global = {
    intervalID: 0,
    count: 0,
    totalRuns: 30
};


/* Main Function */
$(document).ready(function(){
   	 
    global.intervalID = window.setInterval(function(){showDamage(getHP())},2050);
    
    
});

 

/* Subfunctions */
var difference = user_input.ubound+1 - user_input.lbound;
function getHP(){
    return (Math.floor(Math.random()*difference)+user_input.lbound);
}


var char1 = jQuery('.char1');
function showDamage(hp){
    o = jQuery('<div class="hp" />').html(hp);
    char1.prepend(o);
    o.fadeOut(2500);
   	 
    if(++global.count >= global.totalRuns){clearInterval(global.intervalID);}
   	 
}
