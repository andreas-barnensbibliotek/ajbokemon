var $ = require("jquery");
var appsettings = require("./appSettings.js");
module.exports = {
    testar: function (msg) {
        alert(msg);
    },
    bokemonServerHandler : function (callTyp, usrid, callback) {

        $.ajax({
            type: "GET",
            url: appsettings.localOrServerURL + "/bokemonService.aspx?callback=?",
            data: { devkey: "monster", cmdtyp: callTyp, userid: usrid, json: "p" },
            dataType: "jsonp",
            success: function (data) {

                var i = 1;
                $.each(data.barnensbibliotek.bokmonsterlist, function (item, val) {
                    if (callTyp == "alldrakar") {
                        appsettings.drakemon.drakmonid[i] = val.monid;
                        appsettings.drakemon.draknamn[i] = val.namn;
                        appsettings.drakemon.draksrc[i] = val.src;
                        appsettings.drakemon.draklev[i] = val.lev;
                        appsettings.drakemon.drakscore[i] = val.score;
                        appsettings.drakemon.drakinfo[i] = val.info;

                    } else {
                        appsettings.bokemon.monid[i] = val.monid;
                        appsettings.bokemon.namn[i] = val.namn;
                        appsettings.bokemon.src[i] = val.src;
                        appsettings.bokemon.lev[i] = val.lev;
                        appsettings.bokemon.score[i] = val.score;
                        appsettings.bokemon.info[i] = val.info;
                    }
                    
                    i++;
                });
                console.log(appsettings.drakemon.draknamn);
                callback();
                return false;
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //console.log(xhr + ":: " + ajaxOptions + ":: " + thrownError);
                //alert("Nått blev fel!");
            }
        });
    }, //END bokemonServerHandler-----------------------------------
    bokemonServerCRUDHandler: function (callTyp, usrid, monid, callback) {

        $.ajax({
            type: "GET",
            url: appsettings.localOrServerURL + "/bokemonService.aspx?callback=?",
            data: { devkey: "monster", cmdtyp: callTyp, userid: usrid, monid: monid, json: "p" },
            dataType: "jsonp",
            success: function (data) {

                callback();
                return false;

            },
            error: function (xhr, ajaxOptions, thrownError) {
                // alert("Nått blev fel!");
                //console.log(xhr + ":: " + ajaxOptions + ":: " + thrownError);

            }
        });
    }//END bokemonServerCRUDHandler-----------------------------------
}

