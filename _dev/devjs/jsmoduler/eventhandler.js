// --------------------------------------------------------------------------------------------------------------------------
// EVENT HANDLER BOKEMON
// --------------------------------------------------------------------------------------------------------------------------

var $ = require("jquery");
var vex = require('./vex.combined.js');
vex.defaultOptions.className = 'vex-theme-os'
var api = require("./bokemonServicecalls.js");
var fighthtmlhandler = require("./bokemonfightHTML.js");
var registerJqueryfightEvents = require("./bokemonFightEventHandler.js");

module.exports = {
    jqueryEVENTS : function (userid) {

        registerJqueryfightEvents.jqueryFightEVENTS(userid);

        window.once = true;
        $('body').on('click', '#bokemonitm', function () {          
            alert("japp")
            //console.log('1. ' + window.once);
             if (window.once) {
                window.once = false;
                //console.log('2. ' + window.once);
                
                var monsterid = $(this).attr('rel');
                api.bokemonServerCRUDHandler("addmon", userid, monsterid, function () {
                    $('.bokemonjailed').hide();
                    $('.bokemonFreeblock').fadeIn(500, function () {
                        $('.speech').fadeIn(800);
                        
                        //alert("takeBokemon! " + monid);
                        $(this).delay(3000).fadeOut(500, function () {
                            //console.log('3. ' + window.once);                          
                            window.once = true;
                        })
                        return false;
                    })
                });
            }
            //console.log('4. ' + window.once);
            return false;
        });

        $('body').on('mouseenter', '#bokemonitm', function () {            
            $('.Bokemonifo').show();
            $('.bokemoninfoblock p').show();
        });

        $('body').on('mouseleave', '#bokemonitm',function () {           
            $('.Bokemonifo').hide();
            $('.bokemoninfoblock p').hide();
        });
                
        $('body').on('click', '.Bokemonifo', function () {           
            return false;
        });

        $('body').on('click', '#bokdrakeitm', function () {
            //console.log('1. ' + window.once);
            if (window.once) {
                window.once = false;
                //console.log('2. ' + window.once);
                if (userid <= 1) {
                    $('.bokemonjailed').hide();
                    $('.bokemonFreeblock').fadeIn(500, function () {
                        $('.speech').fadeIn(800);

                        //alert("takeBokemon! " + monid);
                        $(this).delay(6000).fadeOut(200, function () {
                            //console.log('3. ' + window.once);
                            $('.bokdrake').hide();
                            window.once = true;
                        })
                        return false;
                    })

                } else {
                   
                    $('#bokdrakeitm').hide();
                    var monsterid = $(this).attr('rel');
                    var fighthtml = fighthtmlhandler.drakfightYesNo(monsterid);
                    //$('#maincontainer').append("<div id='modal-BokemonFightbox'></div>");
                    //$("#dialog").dialog();
                    //$('#modal-BokemonFightbox').html(fighthtml);

                    //$('#maincontainer').append(fighthtml);
                    
                    //var htmlblock = "<div id='bokemonfightContainer' class='bokemoncontainerSize'>";
                    //htmlblock += "<table><tr><td colspan='3' class='fightStory'>";
                    //htmlblock += "<h1>Arenan</h1>";
                    //htmlblock += "<p>Din bibblemon m&ouml;ter en elak bokdrake som h&aring;ller p&aring; att elda b&ouml;cker i ett h&ouml;rn p&aring; biblioteket!<br />";
                    //htmlblock += "Draken m&aring;ste stoppas! <br />Din <span class='bokemonnamn'>droppemon</span> b&ouml;rjar fighten med bokdraken!!!</p>";
                    //htmlblock += "</td></tr>";
                    //htmlblock += "<tr><td colspan='3' class='fightArena'>";
                    //htmlblock += "<h2>Bokdraken hinner plocka av bibbemonen</h2><h1>199p</h1>";
                    //htmlblock += "</td></tr>";
                    //htmlblock += "<tr><td class='tblcol1 bokemonavatar'><img src=''></td>";
                    //htmlblock += "<td class='tblcol2'></td><td class='tblcol3 bokdrakevatar'><img src=''></td></tr>";
                    //htmlblock += "<tr><td class='tblcol1'><span class='bokemonscore'>1111</span>p</td>";
                    //htmlblock += "<td class='tblcol2'></td><td class='tblcol3'><span class='bokdrakecore'>11111</span>p</td>";
                    //htmlblock += "</tr></table></div>";
                    vex.dialog.open(
                        {
                            unsafeMessage: fighthtml,
                            overlayClosesOnClick: false
                        }
                    )
                    
                    
                    return false;
                }

            }
            //console.log('4. ' + window.once);
            return false;
        });
    }
}