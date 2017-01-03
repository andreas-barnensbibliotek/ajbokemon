// ------------------------
// Start bokemon function 
(function () {
    // ------------------------

    // Start Jquery
    $(function () {

        //Jquery div
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
        if (chkuser(_userid)) {
            // serverurler
            //var localOrServerURL = "http://www.barnensbibliotek.se/DesktopModules/barnensbiblService/bokemonApi";
            var localOrServerURL = "http://localdev.kivdev.se/DesktopModules/barnensbiblService/bokemonApi";

            // object
            var monid = new Array;
            var namn = new Array;
            var src = new Array;
            var lev = new Array; ;
            var score = new Array;
            var info = new Array;


            //-------------------------
            // start function visa random pokemon viktat
            // hämtar random bokemonid från results med sanorlikheten i weights dela sannorlkheten= 1 i antal delar results (8 värden) så får man procentuellt ut hur ofta id ska komma upp random
            var weights = [0.25, 0.20, 0.15, 0.1, 0.1, 0.1, 0.05, 0.05]; // probabilities
            var results = [1, 2, 3, 4, 5, 6, 7, 8]; // values to return

            var getRandompockemon = function () {
                var num = Math.random(),
                s = 0,
                lastIndex = weights.length - 1;

                for (var i = 0; i < lastIndex; ++i) {
                    s += weights[i];
                    if (num < s) {
                        return results[i];
                    }
                }

            }
            // End function visa random pokemon viktat
            //-------------------------

            // START servercalls-------------------------------------
            var bokemonServerHandler = function (callTyp, usrid, callback) {

                $.ajax({
                    type: "GET",
                    url: localOrServerURL + "/bokemonService.aspx?callback=?",
                    data: { devkey: "monster", cmdtyp: callTyp, userid: usrid, json: "p" },
                    dataType: "jsonp",
                    success: function (data) {

                        var i = 1;
                        $.each(data.barnensbibliotek.bokmonsterlist, function (item, val) {
                            monid[i] = val.monid;
                            namn[i] = val.namn;
                            src[i] = val.src;
                            lev[i] = val.lev;
                            score[i] = val.score;
                            info[i] = val.info;

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

            }

            // START servercalls-------------------------------------
            var bokemonServerCRUDHandler = function (callTyp, usrid, monid, callback) {

                $.ajax({
                    type: "GET",
                    url: localOrServerURL + "/bokemonService.aspx?callback=?",
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

            }

            // END servercalls-------------------------------------
            // functions

            var isbokemontime = function () {
                //var rnd1 = Math.floor(Math.random() * 4) + 1 // sätt här hur ofta bokemons ska visas 4 = cirka 20 /100
                //var rnd2 = Math.floor(Math.random() * 4) + 1 // sätt här hur ofta bokemons ska visas 4 = cirka 20 /100
                //debug values
                var rnd1 = Math.floor(Math.random() * 1) + 1 // sätt här hur ofta bokemons ska visas 4 = cirka 20 /100
                var rnd2 = Math.floor(Math.random() * 1) + 1 // sätt här hur ofta bokemons ska visas 4 = cirka 20 /100

                if (rnd1 == rnd2) {
                    return true;
                } else {
                    return false;
                }

            }


            var showbokemon = function () {

                var uid = parseInt(_userid);
                var uid = _userid;
                if (uid > 0) {

                    if (isbokemontime()) {

                        var x = "";
                        bokemonServerHandler('allmon', uid, function () {

                            var valdbokemonID = getRandompockemon();

                            var htmlblock = "<div id='bokemonitm' rel='" + monid[valdbokemonID] + "'>";
                            htmlblock += "<span class='bokemonjailed'><a href='' class='takeBokemon' >";
                            htmlblock += "<img src='" + src[valdbokemonID] + "_bar.gif' alt='" + namn[valdbokemonID] + " Level: " + lev[valdbokemonID] + "' />";
                            htmlblock += "</a>";
                            htmlblock += "<span class='bokemonscore' rel=" + score[valdbokemonID] + "></span>";
                            htmlblock += "<a href='' class='Bokemonifo' style='display:none;' >";
                            htmlblock += "<h2>" + namn[valdbokemonID] + "</h2>";
                            htmlblock += "</a>";
                            htmlblock += "<div class='bokemoninfoblock' style='display:none;'>";
                            htmlblock += "<p>" + info[valdbokemonID] + "</p>";
                            htmlblock += "</div></span>";
                            htmlblock += "<div class='bokemonFreeblock' style='display:none;'>";
                            htmlblock += "<p class='speech'>Du räddade mej! Tack!</p>";
                            htmlblock += "<img  src='" + src[valdbokemonID] + ".png' alt='" + namn[valdbokemonID] + " Level: " + lev[valdbokemonID] + "' />";
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
                        })

                    }


                }


            }

            // end Functions ----------------------
            // start eventhandler 

            var _once = true;

            $('#bokemonitm').live('click', function () {
                console.log('1. ' + _once);
                if (_once) {
                    _once = false;
                    console.log('2. ' + _once);
                    var userid = _userid;
                    var monsterid = $(this).attr('rel');
                    bokemonServerCRUDHandler("addmon", userid, monsterid, function () {
                        $('.bokemonjailed').hide();
                        $('.bokemonFreeblock').fadeIn(500, function () {
                            $('.speech').fadeIn(800);

                            //alert("takeBokemon! " + monid);
                            $(this).delay(3000).fadeOut(500, function () {
                                console.log('3. ' + _once);
                                _once = true;
                            })

                            return false;
                        })

                    });
                }
                console.log('4. ' + _once);
                return false;
            });

            $('#bokemonitm').live({
                mouseenter: function () {
                    $('.Bokemonifo').show();
                    $('.bokemoninfoblock p').show();
                },
                mouseleave: function () {
                    $('.Bokemonifo').hide();
                    $('.bokemoninfoblock p').hide();
                }
            });
            $('.Bokemonifo').live('click', function () {
                return false;
            });

            // end eventhandler

            //init START
            var init = function () {


                showbokemon();

            }
            // END init 

            init();

        }; // end user logged in


    }); // end Jquery 

    //-------------------------
    // end bokemon function 
})();
// -------------------------