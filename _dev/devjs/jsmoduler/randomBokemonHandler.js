//-------------------------
// start function visa random pokemon viktat
// hämtar random bokemonid från results med sanorlikheten i weights dela sannorlkheten= 1 i antal delar results (8 värden) så får man procentuellt ut hur ofta id ska komma upp random
var weights = [0.17, 0.17, 0.17, 0.11, 0.11, 0.08, 0.05, 0.05, 0.03, 0.03, 0.02, 0.01]; // probabilities
var results = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // values to return

var drakweights = [0.21, 0.21, 0.20, 0.16, 0.10, 0.07, 0.03, 0.02 ]; // probabilities
var drakresults = [1, 2, 3, 4, 5, 6, 7, 8]; // values to return

var monordrakweights = [0.66, 0.34]; // probabilities
var monordrakresults = [1, 2]; // values to return

module.exports = {
    getRandompockemon : function () {
        return sanoliktrandom(weights, results);
    },
    getRandomBokdrake: function () {
        return sanoliktrandom(drakweights, drakresults);
    },    
    BokemonOrBokdrake: function () {
        return sanoliktrandom(monordrakweights, monordrakresults);
    },
    isbokemontime : function (int_sannolikhet) {
        //var rnd1 = Math.floor(Math.random() * 4) + 1 // sätt här hur ofta bokemons ska visas 4 = cirka 20 /100
        //var rnd2 = Math.floor(Math.random() * 4) + 1 // sätt här hur ofta bokemons ska visas 4 = cirka 20 /100
        // om int_sannolikhet 1 alltid return true, om int_sannolikhet= 10 visas ca 10/100, int_sannolikhet= 4 visas ca 25 /100,   
        //debug values
        var rnd1 = Math.floor(Math.random() * int_sannolikhet) + 1 // sätt här hur ofta bokemons ska är int_sannolikhet =4 är det cirka 25 /100
        var rnd2 = Math.floor(Math.random() * int_sannolikhet) + 1 // sätt här hur ofta bokemons ska visas 4 = cirka 25 /100

        if (rnd1 == rnd2) {
            return true;
        } else {
            return false;
        }
    }
}

var sanoliktrandom = function (arrweight, arrresult) {
    var num = Math.random(),
            s = 0,
            lastIndex = arrweight.length;

    for (var i = 0; i < lastIndex; ++i) {
        s += arrweight[i];
        if (num < s) {
            return arrresult[i];
        }
    };
};

// End function visa random pokemon viktat
//-------------------------

//ANVÄND DENNA FUNKTION FÖR ATT TESTA DIREKT I FIREBUG CONSOLE -------------------------
//function testar(int_sannolikhet) {
//    //var rnd1 = Math.floor(Math.random() * 4) + 1 // sätt här hur ofta bokemons ska visas 4 = cirka 20 /100
//    //var rnd2 = Math.floor(Math.random() * 4) + 1 // sätt här hur ofta bokemons ska visas 4 = cirka 20 /100
//    //debug values
//    var rnd1 = Math.floor(Math.random() * int_sannolikhet) + 4 // sätt här hur ofta bokemons ska visas 4 = cirka 20 /100
//    var rnd2 = Math.floor(Math.random() * int_sannolikhet) + 4 // sätt här hur ofta bokemons ska visas 4 = cirka 20 /100

//    if (rnd1 == rnd2) {
//        return true;
//    } else {
//        return false;
//    }
//};
//var x = 0;
//for (i = 0; i < 100; i++) {
//    if (testar(5)) {
//        console.log(i + "true");
//        x++;
//    } else {
//        console.log(i);
//    };
//}
//console.log("totalt " + x);
//ANVÄND DENNA FUNKTION FÖR ATT TESTA DIREKT I FIREBUG CONSOLE-----------------------------------------------------