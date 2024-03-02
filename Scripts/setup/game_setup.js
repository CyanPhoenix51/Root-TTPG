const { Canvas, UIElement, Rotator, Border, Vector, Text, Button, world, Card, ImageButton, HorizontalBox } = require('@tabletop-playground/api');
const { Spawn } = require('./spawn/spawn');
const { Shuffle } = require('../lib/shuffle');
const { GameSetupUI } = require('./game_setup_ui');
const { PlayerArea } = require('../lib/player_area/player_area');
const CONFIG = require('../game_ui/game_ui_config');
const TABLE = require("../table/6p-rectangle");

//May change how setup starts but for now this will do
//Eventually break functions out to other scripts/classes

function onSetupPicked(button, player){
    //eventually record data
    world.Root.setupType = button.getText();
    const wSwitch = world.getUIs()[0].widget;
    switch (world.Root.setupType){
        case "Manual Setup":
            break;
        case "AdSet":
            break;
        case "WT 2023":
            wSwitch.setActiveIndex(1); //probably won't be 1 after adding in other setups
            break;
    }
}

function joinRoster(button, player){
    if(world.Root.players.indexOf(player.getName()) === -1){
        world.Root.players.push(player.getName());
        if(world.Root.playerNameText.getText() === ''){
            world.Root.playerNameText.setText(player.getName() + '\n');
        }
        else{
            world.Root.playerNameText.setText(world.Root.playerNameText.getText() + player.getName() + '\n');
        }
    }
}

function startGame(button, player){
    //need setup type
    const wSwitch = world.getUIs()[0].widget;
    switch(world.Root.setupType){
        case "Manual Setup":
            break;
        case "AdSet":
            break;
        case "WT 2023":
            PlayerArea.movePlayersToNonSeat();
            randomizePlayerOrder();
            PlayerArea.seatPlayers();
            wSwitch.setActiveIndex(2); //probably need to change later
            mapRoster(wSwitch, ["Summer", "Winter", "Lake", "Mountain"]);
            const deck = Spawn.deck("Exiles and Paristans");
            deck.deal(5);
            Spawn.adSetCards();
            break;
    }
}

function randomizePlayerOrder(){
    Shuffle.shuffle(world.Root.players);
}

function mapRoster(widget, mapChoices){
    const mapHBox = new HorizontalBox()
        .setChildDistance(CONFIG.spacing);
    for (let mapName of mapChoices){
        const mapBtn = new Button().setText(mapName);
        mapBtn.onClicked.add(mapSelect);
        mapHBox.addChild(mapBtn, 1);
    }
    widget.getActiveWidget().getChild().addChild(mapHBox);
}

function mapSelect(button, player){
    Spawn.map(button.getText());
    //highlight the selected map and disable all of them
    const box = button.getParent();
    //not a good way to do it, Canvas can get all children
    box.getChildAt(0).setEnabled(false);
    box.getChildAt(1).setEnabled(false);
    box.getChildAt(2).setEnabled(false);
    box.getChildAt(3).setEnabled(false);
}

class GameSetup{
    constructor(){
        this._uiSwitcher = new GameSetupUI({
            onSetupPicked,
            joinRoster,
            startGame,
        }).create();
        this._uiSwitcher.setActiveIndex(0);
        this._uiSetup = new UIElement();
        this._uiSetup.useWidgetSize = false;
        this._uiSetup.height = TABLE.tableLayout.GameUI.height;
        this._uiSetup.width = TABLE.tableLayout.GameUI.width;
        this._uiSetup.position = new Vector(TABLE.tableLayout.GameUI.x, TABLE.tableLayout.GameUI.y, TABLE.tableLayout.GameUI.z);
        this._uiSetup.rotation = new Rotator(TABLE.tableLayout.GameUI.pitch, TABLE.tableLayout.GameUI.yaw, 0);
        this._uiSetup.widget = this._uiSwitcher;

        world.addUI(this._uiSetup);
    }

    takeSeats(){
        
    }

    correctTurnOrder(){
        
    }
}

module.exports = { GameSetup };