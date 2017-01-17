﻿
module.exports = {
    getrandommsg: function (fight, typ) {
        var rettext = "";

        if (fight == "eld") {
            if (typ == "bokdrake") {
                rettext = textlista.eld.fightbokdraken[pickRandomProperty(textlista.eld.fightbokdraken)];
            }
            if (typ == "bibblemon") {
                rettext = textlista.eld.fightbibblemon[pickRandomProperty(textlista.eld.fightbibblemon)];
            }
        }
        if (fight == "forstor") {
            if (typ == "bokdrake") {
                rettext = textlista.forstor.fightbokdraken[pickRandomProperty(textlista.forstor.fightbokdraken)];
            }
            if (typ == "bibblemon") {
                rettext = textlista.forstor.fightbibblemon[pickRandomProperty(textlista.forstor.fightbibblemon)];
            }       
        }
        return rettext;
    }
};


var pickRandomProperty = function(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1 / ++count)
            result = prop;
    return result;
}

var textlista = {
    eld: {
        start: "Bokdraken h&aring;ller p&aring; att elda b&ouml;cker i ett h&ouml;rn p&aring; biblioteket!",
        fightbibblemon: {
            0: "Bibblemon tar en hink med vatten och h&auml;ller p&aring; elden",
            1: "Bibblemom sprutar vatten med en brandslang",
            2: "Bibblemon tar en brandfilt och sl&auml;cker elden",
            3: "Bibblemon spottar p&aring; elden",
            4: "Bibblemon anv&auml;nder en brandspruta p&aring; elden"
        },
        fightbokdraken: {
            0: "Bokdraken torkar vattnet med en h&aring;rtork!",
            1: "bokdraken sprutar eld och vattnet f&ouml;rsvinner!",
            2: "Bokdraken g&ouml;r en knut p&aring; vattenslangen som din bibblemon anv&auml;nder,vattnet f&ouml;rsvinner",
            3: "bokdraken h&auml;ller bensin p&aring; elden! Elden flammar upp!",
            4: "bokdraken biter h&aring;l i vattenhinken som din bibblemon anv&auml;nder. Vattnet rinner ut."
        },
        end: ""
    },
    forstor: {
        start: "Bokdraken h&aring;ller p&aring; att f&ouml;rst&ouml;ra b&ouml;cker och skr&auml;mma bes&ouml;karna p&aring; biblioteket!",
        fightbibblemon: {
            0: "Biblemon skr&auml;mmer bokdraken",
            1: "Bibblemon tar b&ouml;cker fr&aring;n bokdraken",
            2: "Bibblemon fryser bokdraken",
            3: "Bibblemon lurar bokdraken",
            4: "Bibblemon g&ouml;r en f&auml;lla f&ouml;r bokdraken",
            5: "Bibblemon st&auml;nger in bokdraken i en bur",
            6: "Bibblemon g&ouml;r bokdraken yr"
        },
        fightbokdraken: {
            0: "Bokdraken tuggar s&ouml;nder b&ouml;ckerna!",
            1: "Bokdrake l&auml;gger tuggummi i b&ouml;ckerna. dom g&aring;r inte att &ouml;ppna!",
            2: "Bokdraken blandar och r&ouml;r till alla b&ouml;cker!",
            3: "Bokdraken river ut sidor fr&aring;n b&ouml;ckerna!",
            4: "Bokdraken g&ouml;mmer b&ouml;cker",
            5: "Bokdraken suddar ut text i b&ouml;ckerna!",
            6: "Bokdraken ritar gubbar i b&ouml;ckerna!"
        },
        end: ""
    }
}