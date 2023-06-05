const { Vector, world, globalEvents } = require('@tabletop-playground/api');
//will need playernameui, vpbuttonui, playercolor, gamesetupui

let _playerAreas = false;

//General area where the player's faction will be located
class PlayerArea {

    static movePlayersToNonSeat(){
        let nonReservedSeat = 0;
        const noOfPlayers = world.getAllPlayers().length;
        noOfPlayers > 6 ? nonReservedSeat = noOfPlayers : nonReservedSeat = 6;
        if(noOfPlayers > 14){
            throw new Error("no avaliable slots");
        }
        //move players and observers to outside reserved seats
        for(let i = 0; i < world.getAllPlayers().length; i++){
            if(!world.getPlayerBySlot(i)){
                //shouldn't happen but just in case
                continue;
            }
            else{
                world.getPlayerBySlot(i).switchSlot(nonReservedSeat);
                nonReservedSeat++;
            }
        }
    }

    static seatPlayers(){
        for(let i = 0; i < world.Root.players.length; i ++){
            const player = world.getPlayerByName(world.Root.players[i]);
            player.switchSlot(i);
        }
    }

    static getAllPlayerAreas(){
        const playerCount = _playerAreas.length;//need only players that have are playing
        if (_playerAreas && _playerAreas.length != playerCount){
            _playerAreas = undefined;
        }

        _playerAreas = [];

        return _playerAreas;
    }

    static getPlayerBySlot(playerSlot){
        for(const playerArea of PlayerArea.getAllPlayerAreas()){
            if(playerArea.playerSlot === playerSlot){
                return playerArea;
            }
        }
    }

    constructor(attrs, player){
        this._pos = new Vector(attrs.pos.x, attrs.pos.y, attrs.pos.z);
        this._color = false;
        this._player = false;
        this._ui = false;
        this._nameUI = false;
        this._faction = false;
        this._points = 0; //tenative
    }

    get color(){
        return this._color;
    }
    get playerSlot(){
        return this._playerSlot;
    }
    get pos(){
        return this._pos;
    }

    scorceButtonUI(){

    }

    getColorOptions(){

    }

    changeColor(color){

    }
}


module.exports = { PlayerArea };