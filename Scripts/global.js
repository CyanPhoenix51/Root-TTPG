const { globalEvents, MulticastDelegate, world } = require('@tabletop-playground/api');
const { GameSetup } = require('./setup/game_setup');
const { PlayerArea } = require('./lib/player-area/player_area');

// globalEvents.onPlayerJoined.add((player) => {
//     process.nextTick(() => {
//         PlayerArea.moveNewPlayerToNonSeat(player);
//     });
// });
world.Root = {
    setupType : "",
    players : [],
    playersNameText : undefined,
    playerAreas : []
}

const gObj = world.getAllObjects();
for(let obj of gObj){
    obj.destroy();
}
let gameSetup = new GameSetup();


//require("scripts")
//right click stuff here
//screenUI here
