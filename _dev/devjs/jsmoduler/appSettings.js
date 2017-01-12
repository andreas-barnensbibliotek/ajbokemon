// object
//var _localOrServerURL = "http://www.barnensbibliotek.se/DesktopModules/barnensbiblService/bokemonApi";
var _localOrServerURL = "http://localdev.kivdev.se/DesktopModules/barnensbiblService/bokemonApi";

window.monid = [];
window.namn = [];
window.src = [];
window.lev = [];
window.score = [];
window.info = [];

window.drakmonid = [];
window.draknamn = [];
window.draksrc = [];
window.draklev = [];
window.drakscore = [];
window.drakinfo = [];

module.exports = {
    bokemon: {
        monid: window.monid,
        namn: window.namn,
        src: window.src,
        lev: window.lev,
        score: window.score,
        info: window.info        
    },
    drakemon: {
        drakmonid: window.drakmonid,
        draknamn: window.draknamn,
        draksrc: window.draksrc,
        draklev: window.draklev,
        drakscore: window.drakscore,
        drakinfo: window.drakinfo
    },
    localOrServerURL: _localOrServerURL
}