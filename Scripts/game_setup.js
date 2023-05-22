const { Canvas, UIElement, Rotator, Border, Vector, Text } = require('@tabletop-playground/api')
const spawnMap = require('./spawn')

//List of buttons initial
/* 
    Manual Setup
    Adset
    Winter Tournament
    Both Decks
    All 4 maps
    Faction selector

*/

let setups = [new Button().setText("Manual Setup"), new Button().setText("ADSET"), new Button().setText("GSG WT 2023")];
setups[0].onClicked.add((button) => {
    //Manual Setup
});
setups[1].onClicked.add((button) => {
    //ADSET
});
setups[2].onClicked.add((button) => {
    //GSG WT setup function
});

let maps = [new Button().setText("Autumn"), new Button().setText("Summer"), new Button().setText("Winter"), new Button().setText("Lake"), new Button().setText("Mountain")];
maps[0].onClicked.add((button, player) => {
    spawnMap(button.getText());
})
let decks = [new Button().setText("Base Deck"), new Button().setText("Exiles & Paristans")];
let factionSelect = new Button().setText("Faction Board");


let canvas = new Canvas();
padding = 170;
let offsetMult = 0;

for (let btn of setups){
    canvas.addChild(btn, (padding * offsetMult) + 50, 50, 120, 75); //change numbers to place them spaced evenly
    offsetMult++;
}

offsetMult = 0;

for (let btn of decks){
    canvas.addChild(btn, (padding * setups.length) + (padding * offsetMult) + 50, 50, 120, 75);
    offsetMult++;
}

offsetMult = 0;

for (let btn of maps){
    canvas.addChild(btn, (padding * offsetMult) + 50, 200, 120, 75); //change numbers to place them spaced evenly
    offsetMult++;
}

canvas.addChild(factionSelect, 50, 300, 120, 75);
canvas.addChild(new Button().setText("Clear Table"), 730, 300, 120, 75);

let ui = new UIElement();
ui.useWidgetSize = false;
ui.width = 900;
ui.height = 400;
ui.position = new Vector(-110, 0, 160); // Current table is just under 120cm tall
ui.rotation = new Rotator(60, 180, 0);
ui.widget = new Border().setChild(canvas);
world.addUI(ui);

let playerNameText = [new Text(), new Text(), new Text(), new Text(), new Text()];
for(let i = 0; i < playerNameText.length; i++){
    playerNameText[i].setText("Player " + (i + 1)).setFontSize(20);
    playerNameText[i].setJustification(1);
}

let playerUI = new UIElement();
playerUI.useWidgetSize = false;
playerUI.width = 300;
playerUI.height = 100;

playerUI.position = new Vector(-45, -90, 130);
playerUI.rotation = new Rotator(50, -90, 0);
playerUI.widget = new Border().setChild(playerNameText[0]);
world.addUI(playerUI);

playerUI.position = new Vector(45, -90, 130);
playerUI.rotation = new Rotator(50, -90, 0);
playerUI.widget = new Border().setChild(playerNameText[1]);
world.addUI(playerUI);
playerUI.position = new Vector(45, 90, 130);
playerUI.rotation = new Rotator(50, 90, 0);
playerUI.widget = new Border().setChild(playerNameText[2]);
world.addUI(playerUI);
playerUI.position = new Vector(-45, 90, 130);
playerUI.rotation = new Rotator(50, 90, 0);
playerUI.widget = new Border().setChild(playerNameText[3]);
world.addUI(playerUI);

//Figure out if this is suitable especially for 5th and 6th player
// for(let i = 0; i < playerNameText.length; i++){
//     if(i == 1){
//         playerUI.position = new Vector(50, -90, 130);
//     }
//     else{
//         playerUI.position = new Vector(-50, -90, 130);
//     }
//     playerUI.widget = new Border().setChild(playerNameText[i]);
//     world.addUI(playerUI);
// }