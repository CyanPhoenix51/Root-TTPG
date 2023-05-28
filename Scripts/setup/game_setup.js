const { Canvas, UIElement, Rotator, Border, Vector, Text, Button, world } = require('@tabletop-playground/api')
const { Shuffle } = require('../lib/shuffle')


//May change how setup starts but for now this will do
//Eventually break functions out to other scripts/classes

class SetupGame{
    constructor(){
        this.rosterArray = [];
        this.manSet = new Button().setText("Manual Setup");
        this.manSet.onClicked.add((button, player) => {
            this.bigBoard();
        });

        this.adSet = new Button().setText("ADSET");
        this.adSet.onClicked.add((button, player) => {
            this.bigBoard();
            this.joinGame(setupGame.adSet.getText());
        });

        this.wtSet = new Button().setText("WT 2023");
        this.wtSet.onClicked.add((button, player) => {
            this.bigBoard();
            this.joinGame(setupGame.wtSet.getText());
        });

        this.setupCanvas = new Canvas();
        this.setupCanvas.addChild(this.manSet, 50, 25, 120, 50);
        this.setupCanvas.addChild(this.adSet, 170, 25, 120, 50);
        this.setupCanvas.addChild(this.wtSet, 290, 25, 120, 50);

        this.setupBorder = new Border().setChild(this.setupCanvas);
        
        this.setupUI = new UIElement();
        this.setupUI.useWidgetSize = false;
        this.setupUI.height = 100;
        this.setupUI.width = 460;
        this.setupUI.position = new Vector(0, 60, 92);
        this.setupUI.rotation = new Rotator(60, 90, 0);
        this.setupUI.widget = this.setupBorder;
        world.addUI(this.setupUI);
    }

    bigBoard(){
        for(let child of this.setupCanvas.getChildren()){
            this.setupCanvas.removeChild(child);
        }
        this.setupUI.height = 400;
        this.setupUI.width = 400;
        this.setupUI.position = new Vector(0, 67, 105);
        world.updateUI(this.setupUI);
    }

    joinGame(setupType){
        this.rosterText = new Text().setText("ROSTER");
        this.joinBtn = new Button().setText("Join");
        this.startBtn = new Button().setText("Start");
        this.playerDisplay = new Text().setTextColor([0, 0, 0, 1]).setText("");
        this.playerDisplayBorder = new Border().setChild(this.playerDisplay);
        this.playerDisplayBorder.setColor([256, 256, 256, 1]);
        this.setupCanvas.addChild(this.joinBtn, 210, 250, 50, 50);
        this.setupCanvas.addChild(this.startBtn, 270, 250, 50, 50);
        this.setupCanvas.addChild(this.rosterText, 70, 30, 60, 20);
        this.joinBtn.onClicked.add((button, player) => {
            if(!this.playerDisplay.getText().includes(player.getName())){
                this.rosterArray.push(player);
                this.playerDisplay.setText(this.playerDisplay.getText() + player.getName() + '\n');
                world.updateUI(this.setupUI);
            }
        });

        this.startBtn.onClicked.add((button, player) => {
            if(this.playerDisplay.getText() != ""){
                if(setupType == "WT 2023"){
                    this.mapSelection(setupType);
                    this.takeSeats();
                    this.spawnDeck("Exiles and Paristans");
                }
                else {

                }
            }
        });

        this.setupCanvas.addChild(this.playerDisplayBorder, 50, 50, 100, 300);
        world.updateUI(this.setupUI);
    }

    mapSelection(setupType){
        const mapTemplate = {};
        Object.assign(mapTemplate, require("./spawn/object_guid/map_guid"));
        for(let child of this.setupCanvas.getChildren()){
            this.setupCanvas.removeChild(child);
        }
        this.autumnBtn = new Button().setText("Autumn");
        this.summerBtn = new Button().setText("Summer");
        this.summerBtn.onClicked.add((button, player) => {
            if(setupType == "WT 2023"){
                this.spawnedMap = world.createObjectFromTemplate(mapTemplate[button.getText()], new Vector(0, 0, 87)).setRotation(new Rotator(0, 90, 0));
            }
        });
        this.lakeBtn = new Button().setText("Lake");
        this.mtnBtn = new Button().setText("Mountain");
        this.winterBtn = new Button().setText("Winter");
        if(setupType == "WT 2023"){
            this.setupCanvas.addChild(this.summerBtn, 25, 25, 100, 50);
            this.setupCanvas.addChild(this.lakeBtn, 150, 25, 100, 50);
            this.setupCanvas.addChild(this.mtnBtn, 275, 25, 100, 50);
            this.setupCanvas.addChild(this.winterBtn, 400, 25, 100, 50);
            this.setupUI.height = 100;
            this.setupUI.width = 525;
        }
        this.setupUI.position = new Vector(0, 60, 92);
        world.updateUI(this.setupUI);
    }

    spawnDeck(deck){
        const deckTemplate = {};
        Object.assign(deckTemplate, require("./spawn/object_guid/deck_guid"));
        this.deckHolder = world.createObjectFromTemplate(deckTemplate["Deck Holder"], new Vector(37, 0, 87));
        this.domHolder = world.createObjectFromTemplate(deckTemplate["Dominance Holder"], new Vector(50, 0, 87))
        this.spawnedDeck = world.createObjectFromTemplate(deckTemplate[deck], new Vector(36, -4, 88));
        //this.spawnDeck.
    }

    takeSeats(){
        this.turnOrder = Shuffle.shuffle(this.rosterArray);
        for(player of this.turnOrder){
            
        }
        
    }
}

let setupGame = new SetupGame();