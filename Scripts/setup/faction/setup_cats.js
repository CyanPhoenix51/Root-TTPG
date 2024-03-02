const { GenericFaction } = require('./setup_generic_faction');

const FACTION_DATA = {
    board : "board.faction:base/cats",
    container : "container.warrior:base/cats",
    woodContainer : "",
    vp : "marker.vp:base/cats",
    die : "",
    keep : "",
    recruiter : {id : "", start : 4, end : 20},
    sawmill : {id : "", start : 6, end : 22},
    workshop : {id : "", start : 5, end : 21},
    warrior : "",
    wood : ""
};

class Cats extends GenericFaction{
    constructor(){
        super();
    }
}