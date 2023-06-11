const { Canvas, UIElement, Rotator, Border, Vector, Text, Button, world, Card, ImageButton, HorizontalBox } = require('@tabletop-playground/api');
const { Spawn } = require('./spawn/spawn');
const { Shuffle } = require('../lib/shuffle');
const { GameSetupUI } = require('./game_setup_ui');
const { PlayerArea } = require('../lib/player-area/player_area');
const CONFIG = require('../game_ui/game_ui_config');
const TABLE = require("../table/6p-rectangle");

const mapsTemplate = {};
const deckTemplate = {};

Object.assign(mapsTemplate, require('../setup/spawn/object_guid/map_guid.json'));
Object.assign(deckTemplate, require('../setup/spawn/object_guid/deck_guid.json'));

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
            //move to mapselection
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
        this.turnOrder = Shuffle.shuffle(this.rosterArray);
        let playerNameText = [];
        for(let player of this.turnOrder){
            playerNameText.push(new Text().setText(player.getName()).setFontSize(50));
        }

        const testHolder = world.createObjectFromTemplate("63A3425A40EAEFEC00F77189C2D1F3F8", new Vector(-64, -62, 81));
        testHolder.setRotation(new Rotator(0, 90, 0));
        testHolder.setOwningPlayerSlot(0);
        // const twoHolder = world.createObjectFromTemplate("63A3425A40EAEFEC00F77189C2D1F3F8", new Vector(64, -63, 81));
        // twoHolder.setRotation(new Rotator(0, 90, 0));
        // twoHolder.setOwningPlayerSlot(1);
        this.playerUI = new UIElement();
        this.playerUI.useWidgetSize = false;
        this.playerUI.width = 630;
        this.playerUI.height = 100;

        this.playerUI.position = new Vector(-64, -108, 80);
        this.playerUI.rotation = new Rotator(50, -90, 0);
        this.playerUI.widget = new Border().setChild(playerNameText[0].setJustification(1));
        world.addUI(this.playerUI);

        // this.setupUI.position = new Vector(64, -108, 80);
        // this.setupUI.rotation = new Rotator(50, -90, 0);
        // this.setupUI.widget = new Border().setChild(playerNameText[1].setJustification(1));
        // world.addUI(this.setupUI);

        // this.setupUI.position = new Vector(-45, 108, 130);
        // this.setupUI.rotation = new Rotator(50, -90, 0);
        // this.setupUI.widget = new Border().setChild(playerNameText[0]);
        // world.addUI(this.setupUI);

        // this.setupUI.position = new Vector(-45, -90, 130);
        // this.setupUI.rotation = new Rotator(50, -90, 0);
        // this.setupUI.widget = new Border().setChild(playerNameText[0]);
        // world.addUI(this.setupUI);
    }

    correctTurnOrder(){
        currentOrder = world.getAllPlayers();
        for(let i = 0; i < currentOrder.length; i++){
            if(this.rosterArray[i].getSlot() != currentOrder[i].getSlot()){
                currentOrder[i].switchSlot(currentOrder.length);
                let tempNo = this.rosterArray[i].getSlot();
                this.rosterArray[i].switchSlot(i);
                currentOrder[i].switchSlot(tempNo);
            }
        }
    }

    // createFactionSelection(){
    //     const VagabondCards = {};
    //     Object.assign(VagabondCards, require("./spawn/faction_guid/Vagabond/vagabond_cards.json"));
    //     this.adSetCards = world.createObjectFromTemplate("2EBF5850447848C218D3C8A6ED37EB13", new Vector(-21, -75, 88));
    //     this.adSetCards.setRotation(new Rotator(0, -90, 0));
    //     this.militantCards = this.adSetCards.takeCards(5, true);
    //     this.militantCards.shuffle();
    //     let drawnCard = this.militantCards.takeCards(1);
    //     drawnCard.setPosition(new Vector(-14, -75, 88));
    //     drawnCard.flipOrUpright();
    //     this.adSetCards.addCards(this.militantCards);
    //     this.adSetCards.shuffle();
    //     let factionChoices = [];
    //     for(let i = 0; i < this.rosterArray.length + 4; i++){
    //         drawnCard = this.adSetCards.takeCards(1, true);
    //         drawnCard.setPosition(new Vector(7 * i - 7, -75, 88));
    //         drawnCard.flipOrUpright();
    //         let factionChoice = new Button().setText();

    //         if(drawnCard.getCardDetails().tags.includes("Vagabond")){
    //             let keys = Object.keys(VagabondCards);
    //             //fix double VB being the same one
    //             let chosenKey = Shuffle.choice(keys);
    //             this.chosenVagabond = world.createObjectFromTemplate(VagabondCards[chosenKey], new Vector(7 * i - 7, -73, 130));
    //             this.chosenVagabond.setRotation(new Rotator(0, -90, 0));
    //             this.chosenVagabond.flipOrUpright();
    //         }
    //     }
    // }
}

module.exports = {GameSetup};