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
                    appsettings.monid[i] = val.monid;
                    appsettings.namn[i] = val.namn;
                    appsettings.src[i] = val.src;
                    appsettings.lev[i] = val.lev;
                    appsettings.score[i] = val.score;
                    appsettings.info[i] = val.info;

                    i++;
                });
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

