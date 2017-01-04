var appsettings = require("./appSettings.js");
var $ = require("jquery");
module.exports = {
    drakfightYesNo: function (valdbokdrakeID) {

        var htmlblock = "<div id='bokemonMessContainer' class='bokemoncontainerSize'>";
        htmlblock += "<div class='bokdrakeinfobox'>";
        htmlblock += "<table><tr><td colspan='2' >";
        htmlblock += "<h3>Draken f&ouml;rst&ouml;r och &auml;ter b&ouml;cker h&auml;r s&aring; den m&aring;ste bort! ";
        htmlblock += "<b>Vill du anv&auml;nda en av dina Bibblemons f&ouml;r att jaga bort den &aring;t oss?</b></h3>";
        htmlblock += "</td></tr>";
        htmlblock += "<tr><td class='btnjaga'><button class='btnjagaJA'>Ja</button></td><td class='btnjaga'>";
        htmlblock += "<button class='btnjagaNEJ'>Nej</button></td></tr>";
        htmlblock += "<tr><td colspan='2' class='drakimg'><img src='" + appsettings.src[valdbokdrakeID] + "'>";
        htmlblock += "</td></tr>";
        htmlblock += "<tr><td colspan='2' class='draknamn'><h2>" + appsettings.namn[valdbokdrakeID] + "</h2>";
        htmlblock += "</td></tr>";
        htmlblock += "<tr><th colspan='2'>Beskrivning</th></tr>";
        htmlblock += "<tr><td colspan='2' class='drakinfo'><p>" + appsettings.info[valdbokdrakeID] + "</p></td></tr>";
        htmlblock += "<tr><th colspan='2'>Egenskaper</th></tr>";
        htmlblock += "<tr><td>Point</td><td><span class='bokdrakecore'>" + appsettings.score[valdbokdrakeID] + "</span>p</td></tr>";
        htmlblock += "<tr><td>Eldbonus</td><td><span class='bokdrakecore'>120</span>p</td></tr>";
        htmlblock += "</table></div></div>";

        return htmlblock;
    },
    drakfightBokemonVal: function (callTyp, usrid, callback) {

        $.ajax({
            type: "GET",
            url: appsettings.localOrServerURL + "/bokemonService.aspx?callback=?",
            data: { devkey: "monster", cmdtyp: callTyp, userid: usrid, json: "p" },
            dataType: "jsonp",
            success: function (data) {

                var htmlblock = "<div class='bokemonuserlist bokemoncontainerSize'>";
                htmlblock += "<table><tr class='listheader'><td colspan='3'>";
                htmlblock += "<h1>V&auml;lj Bibblemon</h1>";
                htmlblock += "<p>V&auml;lj den bibblemon som du vill anv&auml;nda f&ouml;r att ska skr&auml;mma bort bokdraken</p>";
                htmlblock += "</td></tr>";

                var i = 1;
                $.each(data.barnensbibliotek.bokmonsterlist, function (item, val) {

                    htmlblock += "<tr class='listitem' ><td class='col1'>";
                    htmlblock += "<img src='" + val.src + "'></td><td class='col2'>";
                    htmlblock += "<p>" + val.namn + "<br />Level: " + val.lev + "<br />Score:  " + val.score + "p</p></td>";
                    htmlblock += "<td class='col3'><a href='' class='valdfightbokemon' rel='" + val.monid + "'>V&auml;lj</a>";
                    htmlblock += "</td></tr>";
                    i++;
                });

                htmlblock += "</table></div>";

                $('.bokemonBoardMaincontainer').html(htmlblock);
                callback();

            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("Nått blev fel!");
            }
        });
    },
    drakfightArena: function () {

        var htmlblock = "<div id='bokemonfightContainer' class='bokemoncontainerSize'>";
        htmlblock += "<table><tr><td colspan='3' class='fightStory'>";
        htmlblock += "<h1>Arenan</h1>";
        htmlblock += "<p>Din bibblemon m&ouml;ter en elak bokdrake som h&aring;ller p&aring; att elda b&ouml;cker i ett h&ouml;rn p&aring; biblioteket!<br />";
        htmlblock += "Draken m&aring;ste stoppas! <br />Din <span class='bokemonnamn'>droppemon</span> griper in och b&ouml;rjar fighten med bokdraken!!!</p>";
        htmlblock += "</td></tr>";
        htmlblock += "<tr><td colspan='3' class='fightArena'>";
       // htmlblock += "<h2>Bokdraken hinner plocka av bibbemonen</h2><h1>199p</h1>";
        htmlblock += "</td></tr>";
        htmlblock += "<tr><td class='tblcol1 bokemonavatar'><img src='" + bokemonAvatar + "'></td>";
        htmlblock += "<td class='tblcol2'></td><td class='tblcol3 bokdrakevatar'><img src='" + bokDrakeAvatar + "'></td></tr>";
        htmlblock += "<tr><td class='tblcol1'><span class='bokemonscore'>'" + bokemonScore + "'</span>p</td>";
        htmlblock += "<td class='tblcol2'></td><td class='tblcol3'><span class='bokdrakecore'>'" + bokDrakeScore + "'</span>p</td>";
        htmlblock += "</tr></table></div>";

        $('body').append(htmlblock);
    }
};
