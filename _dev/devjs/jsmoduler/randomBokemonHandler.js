//-------------------------
// start function visa random pokemon viktat
// hämtar random bokemonid från results med sanorlikheten i weights dela sannorlkheten= 1 i antal delar results (8 värden) så får man procentuellt ut hur ofta id ska komma upp random
var weights = [0.25, 0.20, 0.15, 0.1, 0.1, 0.1, 0.05, 0.05]; // probabilities
var results = [1, 2, 3, 4, 5, 6, 7, 8]; // values to return

var drakweights = [0.20, 0.20, 0.25, 0.15, 1]; // probabilities
var drakresults = [1, 2, 3, 4, 5]; // values to return

module.exports = {
    getRandompockemon : function () {
        var num = Math.random(),
        s = 0,
        lastIndex = weights.length - 1;

        for (var i = 0; i < lastIndex; ++i) {
            s += weights[i];
            if (num < s) {
                return results[i];
            }
        }
    },
    getRandomBokdrake: function () {
        var num = Math.random(),
        s = 0,
        lastIndex = drakweights.length - 1;

        for (var i = 0; i < lastIndex; ++i) {
            s += drakweights[i];
            if (num < s) {
                return drakresults[i];
            }
        }
    },
    isbokemontime : function (int_sannolikhet) {
        //var rnd1 = Math.floor(Math.random() * 4) + 1 // sätt här hur ofta bokemons ska visas 4 = cirka 20 /100
        //var rnd2 = Math.floor(Math.random() * 4) + 1 // sätt här hur ofta bokemons ska visas 4 = cirka 20 /100
        //debug values
        var rnd1 = Math.floor(Math.random() * int_sannolikhet) + 1 // sätt här hur ofta bokemons ska visas 4 = cirka 20 /100
        var rnd2 = Math.floor(Math.random() * int_sannolikhet) + 1 // sätt här hur ofta bokemons ska visas 4 = cirka 20 /100

        if (rnd1 == rnd2) {
            return true;
        } else {
            return false;
        }
    }
}
// End function visa random pokemon viktat
//-------------------------