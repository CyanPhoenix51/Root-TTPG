const { WidgetSwitcher, VerticalBox, Button, Border, HorizontalBox, LayoutBox, Canvas } = require("@tabletop-playground/api");
const CONFIG = require("../game_ui/game_ui_config");
//const TABLE = require("../table/6p-rectangle");

class GameSetupUI {
    constructor(callbacks) {
        this._callbacks = callbacks;
        /*
        widgets needed for this
        manual Setup
        adSet
        maps
        deck
        factions
        tools/rules
        */
    }

    create(){
        const title = new Text()
            .setFontSize(CONFIG.fontSize * (1/3))
            .setText("Welcome to Root: A Game of Woodland Might and Right")
            .setJustification(1);
            //figure out a font

        const startHBox = new HorizontalBox().setChildDistance(CONFIG.spacing);
        const startVBox = new VerticalBox().setChildDistance(CONFIG.spacing);
        startVBox.addChild(title);
        startVBox.addChild(startHBox);

        const btn01 = this._createButton("Manual Setup", this._callbacks.onSetupPicked)
            .setFontSize(CONFIG.fontSize * (5/12));
        const btn02 = this._createButton("adSet", this._callbacks.onSetupPicked)
            .setFontSize(CONFIG.fontSize / 2);
        const btn03 = this._createButton("WT 2023", this._callbacks.onSetupPicked)
            .setFontSize(CONFIG.fontSize / 2);
        startHBox.addChild(btn01, 1);
        startHBox.addChild(btn02, 1);
        startHBox.addChild(btn03, 1);

        const uiSwitcher = new WidgetSwitcher();

        const startBorder = new Border();
        startBorder.setChild(startVBox);
        uiSwitcher.addChild(startBorder);

        const rosterTitle = new Text()
            .setText("ROSTER")
            .setJustification(1);

        let nameDisplay = new Text()
            .setTextColor([0, 0, 0, 1])
            .setText("");
        world.Root.playerNameText = nameDisplay;

        const nameDisplayCanvas = new Canvas()
            .addChild(nameDisplay, 10, 10, 200, 300);

        const nameDisplayBorder = new Border()
            .setColor([256, 256, 256, 1]);
        
        nameDisplayBorder.setChild(nameDisplayCanvas);
        const nameVBox = new VerticalBox();
        nameVBox.addChild(rosterTitle, 0);
        nameVBox.addChild(nameDisplayBorder, 1);

        const joinBtn = this._createButton("JOIN", this._callbacks.joinRoster);
        const startBtn = this._createButton("START", this._callbacks.startGame);

        const btnVBox = new VerticalBox().setChildDistance(CONFIG.spacing);

        btnVBox.addChild(joinBtn, 0);
        btnVBox.addChild(startBtn, 0);

        const joinHBox = new HorizontalBox().setChildDistance(CONFIG.spacing);
        joinHBox.addChild(nameVBox, 1);
        joinHBox.addChild(btnVBox);

        const joinBorder = new Border();
        joinBorder.setChild(joinHBox);

        uiSwitcher.addChild(joinBorder);

        uiSwitcher.addChild(new Border().setChild(new VerticalBox()));

        return uiSwitcher;
    }

    _createButton(label, onClicked){
        const button = new Button().setFontSize(CONFIG.fontSize).setText(label);
        button.onClicked.add(onClicked);
        return button;
    }
}
module.exports = { GameSetupUI };