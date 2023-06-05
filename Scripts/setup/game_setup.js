const { Canvas, UIElement, Rotator, Border, Vector, Text, Button, world, Card, ImageButton, HorizontalBox } = require('@tabletop-playground/api');
const { Shuffle } = require('../lib/shuffle');
const { GameSetupUI } = require('./game_setup_ui');
const { PlayerArea } = require('../lib/player-area/player_area');
const CONFIG = require('../game_ui/game_ui_config');
const TABLE = require("../table/6p-rectangle");

const mapsTemplate = {};

Object.assign(mapsTemplate, require('../setup/spawn/object_guid/map_guid.json'))

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
            //PlayerArea create playerArea Array var
            wSwitch.setActiveIndex(2); //probably need to change later
            mapRoster(wSwitch, ["Summer", "Winter", "Lake", "Mountain"]);
            //spawn holder, deck, and deal cards
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
        mapHBox.addChild(mapBtn);
    }
    console.log(widget.getActiveIndex());
    widget.getActiveWidget().getChild().addChild(mapHBox);
}

function mapSelect(button, player){
    const map = world.createObjectFromTemplate(mapsTemplate[button.getText()], new Vector(0, 0, 0));
    map.rotation = new Rotator(0, 90, 0);
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

    // mapSelection(setupType){
    //     const mapTemplate = {};
    //     const clearingTemplate = {};
    //     const ruinItemsTemplate = {};
    //     const itemCrafts = {};
    //     Object.assign(mapTemplate, require("./spawn/object_guid/map_guid"));
    //     Object.assign(clearingTemplate, require("./spawn/object_guid/clearing_guid"));
    //     Object.assign(ruinItemsTemplate, require("./spawn/faction_guid/Vagabond/ruin_items_guid.json"));
    //     Object.assign(itemCrafts, require("./spawn/object_guid/item_crafts.json"));
    //     this.spawnedMap = false;
    //     for(let child of this.setupCanvas.getChildren()){
    //         this.setupCanvas.removeChild(child);
    //     }
    //     this.autumnBtn = new Button().setText("Autumn");
    //     this.summerBtn = new Button().setText("Summer");
    //     this.summerBtn.onClicked.add((button, player) => {
    //         if(setupType == "WT 2023"){
    //             this.spawnedMap = world.createObjectFromTemplate(mapTemplate[button.getText()], new Vector(0, 0, 87));
    //             this.spawnedMap.setRotation(new Rotator(0, 90, 0));
    //         }
    //         let allSnaps = this.spawnedMap.getAllSnapPoints();
    //         let snapIdx = Array.from(Array(12), (_, x) => x+65);
    //         snapIdx = Shuffle.shuffle(snapIdx);
    //         while(snapIdx.length > 0){
    //             let globalPos = allSnaps[snapIdx[0]].getGlobalPosition();
    //             let snapRot = allSnaps[snapIdx[0]].getSnapRotation();
    //             let clearing = world.createObjectFromTemplate(clearingTemplate["Bunny Clearing"], globalPos);
    //             clearing.setRotation(new Rotator(0, snapRot, 0));
    //             clearing.snap();
    //             snapIdx.shift();
                
    //             globalPos = allSnaps[snapIdx[0]].getGlobalPosition();
    //             snapRot = allSnaps[snapIdx[0]].getSnapRotation();
    //             clearing = world.createObjectFromTemplate(clearingTemplate["Fox Clearing"], globalPos);
    //             clearing.setRotation(new Rotator(0, snapRot, 0));
    //             clearing.snap();
    //             snapIdx.shift();

    //             globalPos = allSnaps[snapIdx[0]].getGlobalPosition();
    //             snapRot = allSnaps[snapIdx[0]].getSnapRotation();
    //             clearing = world.createObjectFromTemplate(clearingTemplate["Mouse Clearing"], globalPos);
    //             clearing.setRotation(new Rotator(0, snapRot, 0));
    //             clearing.snap();
    //             snapIdx.shift();
    //         }
    //         this.ruinItems = [world.createObjectFromTemplate(ruinItemsTemplate["Bag"], [0,0,0]), 
    //                           world.createObjectFromTemplate(ruinItemsTemplate["Boot"], [0,0,0]),
    //                           world.createObjectFromTemplate(ruinItemsTemplate["Hammer"], [0,0,0]),
    //                           world.createObjectFromTemplate(ruinItemsTemplate["Sword"], [0,0,0])];
    //         Shuffle.shuffle(this.ruinItems);
    //         let rIdx = 0;
    //         for(let i = 0; i < allSnaps.length; i++){
    //             switch(true){
    //                 case allSnaps[i].getTags().includes("Ruin"):
    //                     let ruin = world.createObjectFromTemplate("D837A93048CE9F589AAA7C8B8C493F57", allSnaps[i].getGlobalPosition());
    //                     ruin.createSwitcher([this.ruinItems[rIdx]]);
    //                     ruin.snap();
    //                     rIdx++;
    //                     break;
    //                 case allSnaps[i].getTags().includes("Bag"):
    //                     this.item = world.createObjectFromTemplate(itemCrafts["Bag"], allSnaps[i].getGlobalPosition());
    //                     this.item.snap();
    //                     break;
    //                 case allSnaps[i].getTags().includes("Boot"):
    //                     this.item = world.createObjectFromTemplate(itemCrafts["Boot"], allSnaps[i].getGlobalPosition());
    //                     this.item.snap();
    //                     break;
    //                 case allSnaps[i].getTags().includes("Crossbow"):
    //                     this.item = world.createObjectFromTemplate(itemCrafts["Crossbow"], allSnaps[i].getGlobalPosition());
    //                     this.item.snap();
    //                     break;
    //                 case allSnaps[i].getTags().includes("Hammer"):
    //                     this.item = world.createObjectFromTemplate(itemCrafts["Hammer"], allSnaps[i].getGlobalPosition());
    //                     this.item.snap();
    //                     break;
    //                 case allSnaps[i].getTags().includes("Sword"):
    //                     this.item = world.createObjectFromTemplate(itemCrafts["Sword"], allSnaps[i].getGlobalPosition());
    //                     this.item.snap();
    //                     break;
    //                 case allSnaps[i].getTags().includes("Tea"):
    //                     this.item = world.createObjectFromTemplate(itemCrafts["Tea"], allSnaps[i].getGlobalPosition());
    //                     this.item.snap();
    //                     break;
    //                 case allSnaps[i].getTags().includes("Coins"):
    //                     this.item = world.createObjectFromTemplate(itemCrafts["Coins"], allSnaps[i].getGlobalPosition());
    //                     this.item.snap();
    //                     break;
    //             }
    //             // if(allSnaps[i].getTags().includes("Ruin")){
    //             //     let ruin = world.createObjectFromTemplate("D837A93048CE9F589AAA7C8B8C493F57", allSnaps[i].getGlobalPosition());
    //             //     ruin.createSwitcher([this.ruinItems[rIdx]]);
    //             //     ruin.snap();
    //             //     rIdx++;
    //             // }
    //         }

    //         this.bigBoard();
    //         this.createFactionSelection();
    //     });
    //     this.lakeBtn = new Button().setText("Lake");
    //     this.mtnBtn = new Button().setText("Mountain");
    //     this.winterBtn = new Button().setText("Winter");
    //     if(setupType == "WT 2023"){
    //         this.setupCanvas.addChild(this.summerBtn, 25, 25, 100, 50);
    //         this.setupCanvas.addChild(this.lakeBtn, 150, 25, 100, 50);
    //         this.setupCanvas.addChild(this.mtnBtn, 275, 25, 100, 50);
    //         this.setupCanvas.addChild(this.winterBtn, 400, 25, 100, 50);
    //         this.setupUI.height = 100;
    //         this.setupUI.width = 525;
    //     }
    //     this.setupUI.position = new Vector(0, 60, 92);
    //     world.updateUI(this.setupUI);
    // }

    // spawnDeck(deck){
    //     const deckTemplate = {};
    //     Object.assign(deckTemplate, require("./spawn/object_guid/deck_guid"));
    //     this.deckHolder = world.createObjectFromTemplate(deckTemplate["Deck Holder"], new Vector(37, 0, 87));
    //     this.domHolder = world.createObjectFromTemplate(deckTemplate["Dominance Holder"], new Vector(50, 0, 87));
    //     this.spawnedDeck = world.createObjectFromTemplate(deckTemplate[deck], new Vector(36, -4, 88));
    //     this.spawnedDeck.shuffle();
    //     this.spawnedDeck.deal(5);
    //     this.spawnedDeck.snap();
    // }

    // takeSeats(){
    //     this.turnOrder = Shuffle.shuffle(this.rosterArray);
    //     let playerNameText = [];
    //     for(let player of this.turnOrder){
    //         playerNameText.push(new Text().setText(player.getName()).setFontSize(50));
    //     }

    //     const testHolder = world.createObjectFromTemplate("63A3425A40EAEFEC00F77189C2D1F3F8", new Vector(-64, -62, 81));
    //     testHolder.setRotation(new Rotator(0, 90, 0));
    //     testHolder.setOwningPlayerSlot(0);
    //     // const twoHolder = world.createObjectFromTemplate("63A3425A40EAEFEC00F77189C2D1F3F8", new Vector(64, -63, 81));
    //     // twoHolder.setRotation(new Rotator(0, 90, 0));
    //     // twoHolder.setOwningPlayerSlot(1);
    //     this.playerUI = new UIElement();
    //     this.playerUI.useWidgetSize = false;
    //     this.playerUI.width = 630;
    //     this.playerUI.height = 100;

    //     this.playerUI.position = new Vector(-64, -108, 80);
    //     this.playerUI.rotation = new Rotator(50, -90, 0);
    //     this.playerUI.widget = new Border().setChild(playerNameText[0].setJustification(1));
    //     world.addUI(this.playerUI);

    //     // this.setupUI.position = new Vector(64, -108, 80);
    //     // this.setupUI.rotation = new Rotator(50, -90, 0);
    //     // this.setupUI.widget = new Border().setChild(playerNameText[1].setJustification(1));
    //     // world.addUI(this.setupUI);

    //     // this.setupUI.position = new Vector(-45, 108, 130);
    //     // this.setupUI.rotation = new Rotator(50, -90, 0);
    //     // this.setupUI.widget = new Border().setChild(playerNameText[0]);
    //     // world.addUI(this.setupUI);

    //     // this.setupUI.position = new Vector(-45, -90, 130);
    //     // this.setupUI.rotation = new Rotator(50, -90, 0);
    //     // this.setupUI.widget = new Border().setChild(playerNameText[0]);
    //     // world.addUI(this.setupUI);
    // }

    // correctTurnOrder(){
    //     currentOrder = world.getAllPlayers();
    //     for(let i = 0; i < currentOrder.length; i++){
    //         if(this.rosterArray[i].getSlot() != currentOrder[i].getSlot()){
    //             currentOrder[i].switchSlot(currentOrder.length);
    //             let tempNo = this.rosterArray[i].getSlot();
    //             this.rosterArray[i].switchSlot(i);
    //             currentOrder[i].switchSlot(tempNo);
    //         }
    //     }
    // }

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