var $ = require("jquery");
var api = require("./bokemonServicecalls.js");
module.exports = {
    jqueryEVENTS : function (userid) {

        window.once = true;
        $('body').on('click', '#bokemonitm', function () {          
            console.log('1. ' + window.once);
            if (window.once) {
                window.once = false;
                console.log('2. ' + window.once);
                
                var monsterid = $(this).attr('rel');
                api.bokemonServerCRUDHandler("addmon", userid, monsterid, function () {
                    $('.bokemonjailed').hide();
                    $('.bokemonFreeblock').fadeIn(500, function () {
                        $('.speech').fadeIn(800);

                        //alert("takeBokemon! " + monid);
                        $(this).delay(3000).fadeOut(500, function () {
                            console.log('3. ' + window.once);
                            window.once = true;
                        })

                        return false;
                    })

                });
            }
            console.log('4. ' + window.once);
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
    }
}