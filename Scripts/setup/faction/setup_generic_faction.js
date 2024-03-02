const { Spawn } = require('../spawn/spawn');

/*
 * Base Faction Class that all factions share
 */
class GenericFaction{

    constructor(playerArea, boardID, containerID, markerID, improvementID){
        this._playerArea = playerArea;
        this.playerBoard(boardID);
        this.cardImprovement(improvementID);
        this.warriorContainer(containerID);
        this.vpMarker(markerID);
    }

    get playerArea(){
        return this._playerArea;
    }

    playerBoard(boardID){
        Spawn.spawn(boardID, this.playerArea.pos, this.playerArea.rot);
    }

    cardImprovement(improvementID){
        Spawn.spawn(improvementID, 0, 0);
    }

    warriorContainer(containerID){
        Spawn.spawn(containerID, 0, 0);
    }

    vpMarker(markerID){

    }
}

module.exports = { GenericFaction };