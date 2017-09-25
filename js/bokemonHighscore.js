// ------------------------
// Start bokemon function 

    // ------------------------
    // Start Jquery
    $(function () {

        var hc_highcorehtml = function () {

            var x = "";
            hc_bokemonServer(function (loophtml) {

                var htmlblock = "<div class='highscore_header'>";
                htmlblock += "<img src='http://www.barnensbibliotek.se/DesktopModules/barnensbiblService/bokemonApi/bibblomon/Bibblomon_Bokdrakarhighscore.png' />";
                htmlblock += "</div><div class='highscore_list'><table><tr><td colspan='3'><div style='text-align:center'><h2>Highscore</h2></div></td></tr>";
                //loop START                    
                htmlblock += loophtml;
                //loop STOPP                    
                htmlblock += "</table></div><div class='highscore_footer'><a href='/bibblomons/tabid/734/Default.aspx' class='bm_wikilink'>BibblomonWiki</a></div>";


                $('.bokemonhighscorecontainer').append(htmlblock);

            });
        };

        // START servercalls-------------------------------------
        var hc_bokemonServer = function (callback) {
            var hc_ServerURL = "http://www.barnensbibliotek.se/DesktopModules/barnensbiblService/bokemonApi";
            var htmllist="";
            $.ajax({
                type: "GET",
                url: hc_ServerURL + "/bokemonService.aspx?callback=?",
                data: { devkey: "monster", cmdtyp: "Highscore", userid: "1", json: "p" },
                dataType: "jsonp",
                success: function (data) {
                    i = 0;
                    $.each(data.barnensbibliotek.bokmonsterhighscorelist, function (item, val) {

                        //loop START                    
                        if (i % 2 == 0) {
                            if (i == 0) {
                                htmllist += "<tr class='firstplace line'>";
                            } else {
                                htmllist += "<tr class='line'>";
                            };                            
                        }
                        else {
                            htmllist += "<tr class=' odd'>";
                        }
                        
                        htmllist += "<td>" + val.plats + "</td>";
                        htmllist += "<td>" + val.username + "</td>";
                        htmllist += "<td class='hc_score'>" + val.score + "p</td></tr>";
                        //loop STOPP    
                        i++;
                    });

                    callback(htmllist);                   
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    // alert("Nått blev fel!");
                    //console.log(xhr + ":: " + ajaxOptions + ":: " + thrownError);

                }
            });

        }

        hc_highcorehtml();
    });
