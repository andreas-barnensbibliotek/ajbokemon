// object
//var _localOrServerURL = "http://www.barnensbibliotek.se/DesktopModules/barnensbiblService/bokemonApi";
var _localOrServerURL = "http://localdev.kivdev.se/DesktopModules/barnensbiblService/bokemonApi";

window.monid = [];
window.namn = [];
window.src = [];
window.lev = [];
window.score = [];
window.info = [];


module.exports = {
    monid: window.monid,
    namn: window.namn,
    src: window.src,
    lev: window.lev,
    score: window.score,
    info: window.info,
    localOrServerURL :_localOrServerURL 
}