// ------------------------
// Start bokemonList function 
(function () {
    // ------------------------
    // Start Jquery
    $(function () {

        // kolla om bokemonlistan finns på sidan
        // START container check 
        if ($(".bokemonBoardMaincontainer").length) {

        
        _userid = $('#barnensbiblCurrentUserid').html();
        
        var chkuser = function (uid) {
            var ret = false;

            if (uid == "364") {
                ret = true;
            }
            if (uid == "105") {
                ret = true;
            }
            if (uid == "7017") {
                ret = true;
            }
            return ret;
        };

        // START user logged in
        if(chkuser(_userid)){

            //Jquery div
            _userid = $('#barnensbiblCurrentUserid').html();
            _visituserid = $('#VISITED_USERID').html();
            // serverurler
            //var localOrServerURL = "http://www.barnensbibliotek.se/DesktopModules/barnensbiblService/bokemonApi";
            var localOrServerURL = "http://localdev.kivdev.se/DesktopModules/barnensbiblService/bokemonApi";
            // START servercalls-------------------------------------
            var bokemonUserServerHandler = function (callTyp, usrid, callback) {

                $.ajax({
                    type: "GET",
                    url: localOrServerURL + "/bokemonService.aspx?callback=?",
                    data: { devkey: "monster", cmdtyp: callTyp, userid: usrid, json: "p" },
                    dataType: "jsonp",
                    success: function (data) {

                        //var htmlblock = "<div class='bokemonBoardMaincontainer'>";
                        var htmlblock = "<div class='BM_header'>";
                        htmlblock += "<h1>Bokemon</h1><h3>MainScore</h3>";
                        htmlblock += "<h1>" + data.barnensbibliotek.mainscore + "p</h1>";
                        htmlblock += "<a href='' class='bm_wikilink'>BokemonWiki</a></div>";
                        htmlblock += "<div class='BM_list'><ul>";

                        var i = 1;
                        $.each(data.barnensbibliotek.bokmonsterlist, function (item, val) {

                            htmlblock += "<li>";
                            htmlblock += "<a href='' title='Mer info om din " + val.namn + "' rel=" + val.monid + ">";
                            htmlblock += "<div class='bm_itm_imgcont'>";
                            htmlblock += "<img src='" + val.src + ".png' /></div>";
                            htmlblock += "<div class='bm_itm_infocont'><h1>" + val.namn + "</h1>";
                            htmlblock += "<h2>Level: " + val.lev + "</h2><h2>Score: " + val.score + "p</h2></div></a>";
                            htmlblock += "</li>";
                            i++;
                        });

                        htmlblock += "</ul></div><div class='BM_footer'></div>";

                        $('.bokemonBoardMaincontainer').html(htmlblock);
                        callback();

                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        alert("Nått blev fel!");
                    }
                })
            };


            //init START
            var init = function () {
                //if (_userid == _visituserid) { 
                bokemonUserServerHandler("usrmon", _userid, function () {
                    return false;
                });
                //}
            }
            // END init 

            init();
        } // end user logged in
        }; // END container check 

    }); // end Jquery 

    //-------------------------
    // end bokemon function 
})();
// -------------------------