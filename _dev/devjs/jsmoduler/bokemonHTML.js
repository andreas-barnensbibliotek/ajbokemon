var appsettings = require("./appSettings.js");
var rndHandler = require("./randomBokemonHandler.js");
var api = require("./bokemonServicecalls.js");
var $ = require("jquery");
module.exports = {
    showbokemon: function (usrid) {
        //var uid = parseInt(usrid);
        var uid = usrid;
        if (uid > 0) {
            if (rndHandler.isbokemontime(4)) { //isbokemontime(int_sannolikhet) = 4 visas varje gång, 4 = ca 25/100 osv..
                var x = "";
                api.bokemonServerHandler('allmon', uid, function () {

                    var valdbokemonID = rndHandler.getRandompockemon();
                    if (typeof (appsettings.bokemon.monid[valdbokemonID]) != "undefined") {
                        
                        var htmlblock = "<div id='bokemonitm' rel='" + appsettings.bokemon.monid[valdbokemonID] + "'>";
                        htmlblock += "<span class='bokemonjailed'><a href='' class='takeBokemon' >";
                        htmlblock += "<img src='" + appsettings.bokemon.src[valdbokemonID] + "_bur.png' alt='" + appsettings.bokemon.namn[valdbokemonID] + " Level: " + appsettings.bokemon.lev[valdbokemonID] + "' />";
                        htmlblock += "</a>";
                        htmlblock += "<span class='bokemonscore' rel=" + appsettings.bokemon.score[valdbokemonID] + "></span>";
                        htmlblock += "<a href='' class='Bokemonifo' style='display:none;' >";
                        htmlblock += "<h2>" + appsettings.bokemon.namn[valdbokemonID] + "</h2>";
                        htmlblock += "</a>";
                        htmlblock += "<div class='bokemoninfoblock' style='display:none;'>";
                        htmlblock += "<p>" + appsettings.bokemon.info[valdbokemonID] + "</p>";
                        htmlblock += "</div></span>";
                        htmlblock += "<div class='bokemonFreeblock' style='display:none;'>";
                        htmlblock += "<p class='speech'>Du r&auml;ddade mej! Tack!</p>";
                        htmlblock += "<img  src='" + appsettings.bokemon.src[valdbokemonID] + ".png' alt='" + appsettings.bokemon.namn[valdbokemonID] + " Level: " + appsettings.bokemon.lev[valdbokemonID] + "' />";
                        htmlblock += "</div>";
                        htmlblock += "</div>";

                        $('body').append(htmlblock);


                        var docHeight = $(document).height(),
                        docWidth = $(document).width(),
                        divWidth = $('#bokemonitm').width(),
                        divHeight = $('#bokemonitm').height(),
                        heightMax = docHeight - divHeight,
                        widthMax = docWidth - divWidth;

                        $('#bokemonitm').css({
                            left: Math.floor(Math.random() * widthMax),
                            top: Math.floor(Math.random() * heightMax)
                        });
                    };
                })
            } else { console.log("visa bokemon:inte nu!"); }

        }
    },
    showbokdrakar: function (usrid) {
        //var uid = parseInt(usrid);
        var uid = usrid;
        if (uid > 0) {
            if (rndHandler.isbokemontime(4)) { //isbokemontime(int_sannolikhet) = 4 visas varje gång, 4 = ca 25/100 osv..
                var x = "";
                api.bokemonServerHandler('alldrakar', uid, function () {

                    var valdbokemonID = rndHandler.getRandomBokdrake();
                    
                    if (typeof (appsettings.drakemon.drakmonid[valdbokemonID]) != "undefined") {
                        var htmlblock = "<div id='bokdrakeitm' class='bokdrake' rel='" + appsettings.drakemon.drakmonid[valdbokemonID] + "'>";
                        htmlblock += "<span class='bokemonjailed'><a href='' class='takeBokemon' >";
                        htmlblock += "<img src='" + appsettings.drakemon.draksrc[valdbokemonID] + ".png' alt='" + appsettings.drakemon.draknamn[valdbokemonID] + " Level: " + appsettings.drakemon.draklev[valdbokemonID] + "' />";
                        htmlblock += "</a>";
                        htmlblock += "<span class='bokemonscore' rel=" + appsettings.drakemon.drakscore[valdbokemonID] + "></span>";
                        htmlblock += "<a href='' class='Bokemonifo' style='display:none;' >";
                        htmlblock += "<h2>" + appsettings.drakemon.draknamn[valdbokemonID] + "</h2>";
                        htmlblock += "</a>";
                        htmlblock += "<div class='bokemoninfoblock' style='display:none;'>";
                        htmlblock += "<p>" + appsettings.drakemon.drakinfo[valdbokemonID] + "</p>";
                        htmlblock += "</div>";
                        htmlblock += "</span>";
                        htmlblock += "<div class='bokemonFreeblock' style='display:none;'>";
                        htmlblock += "<p class='speech'><b>Hj&auml;lp oss f&aring;nga bokdrakarna!</b><br />"
                        htmlblock += "Logga in och hj&auml;lp oss att f&aring; bort dessa hemska bokdrakar!</p>";
                        htmlblock += "<img  src='http://localdev.kivdev.se/DesktopModules/barnensbiblService/bokemonApi/bokemon/Nallemon.gif' alt='Barnensbibliotek säger' />";
                        htmlblock += "</div>";
                        htmlblock += "</div>";
                        
                        $('body').append(htmlblock);


                        var docHeight = $(document).height(),
                        docWidth = $(document).width(),
                        divWidth = $('#bokdrakeitm').width(),
                        divHeight = $('#bokdrakeitm').height(),
                        heightMax = docHeight - divHeight,
                        widthMax = docWidth - divWidth;

                        $('#bokdrakeitm').css({
                            left: Math.floor(Math.random() * widthMax),
                            top: Math.floor(Math.random() * heightMax)
                        });
                    };
                })
            } else { console.log("visa bokdrake:inte nu!"); }
        }
    }
}
