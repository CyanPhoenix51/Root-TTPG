const { world } = require('@tabletop-playground/api');
const TABLE = require('../../table/6p-rectangle');
const mapCONFIG = require('../map_setup');
const { Shuffle } = require('../../lib/shuffle');

//Objective of this script
//gneric so need to spawn the correct map
//rotate it corretly
//spawn Craftable Items, Ruins, and any landmarks
//spawn Clearing Numbers

const decks = {};
Object.assign(decks, require('./object_guid/deck_guid.json'));
const maps = {};
Object.assign(maps, require('./object_guid/map_guid.json'));
const ruins = {};
Object.assign(ruins, require('./faction_guid/Vagabond/ruin_items_guid.json'));
const itemCrafts = {};
Object.assign(itemCrafts, require('./object_guid/item_crafts.json'));
const clearingTemplate = {};
Object.assign(clearingTemplate, require('./object_guid/clearing_guid.json'));
const factions = [];


class Spawn{

    //Spawns chosen deck, holder, and dominance
    static deck(deckName){
        const dominanceHolder = world.createObjectFromTemplate(decks["Dominance Holder"], new Vector(TABLE.tableLayout.dominance.x, TABLE.tableLayout.dominance.y, 131));
        dominanceHolder.freeze();
        const deckHolder = world.createObjectFromTemplate(decks["Deck Holder"], new Vector(TABLE.tableLayout.deckHolder.x, TABLE.tableLayout.deckHolder.y, 131));
        deckHolder.freeze();
        const deck = world.createObjectFromTemplate(decks[deckName], new Vector(TABLE.tableLayout.deck.x, TABLE.tableLayout.deck.y, 132));
        deck.snap();
        deck.shuffle();
        return deck;
    }

    //spawns the choosen map
    static map(mapName){
        const map = world.createObjectFromTemplate(maps[mapName], new Vector(0, 0.925, 131));
        map.setRotation(new Rotator(0, 90, 0));
        this.ruinsAndItems(map, mapName);
        this.clearingMarkers(map, mapName);
    }

    //from map() will spawn craftable items and ruins
    //might want to standardize ruin snaps but items definitely are (31 - 42)
     static ruinsAndItems(map, mapName){
        const mapSnaps = map.getAllSnapPoints();

        const ruinSnaps = mapCONFIG.map[mapName].ruins;
        let ruin = false;
        world.Root.ruins = Shuffle.shuffle(world.Root.ruins);
        for(let i = 0; i < ruinSnaps.length; i++){
            ruin = world.createObjectFromTemplate(ruins["Ruin"], mapSnaps[ruinSnaps[i]].getGlobalPosition());
            ruin.createSwitcher([world.createObjectFromTemplate(ruins[world.Root.ruins[i]], [0, 0, 0])]);
            ruin.snap();
        }
        let item = false;
        for(let i = mapCONFIG.map.items.start; i < mapCONFIG.map.items.end; i++){
            switch(true){
                case mapSnaps[i].getTags().includes("Bag"):
                    item = world.createObjectFromTemplate(itemCrafts["Bag"], mapSnaps[i].getGlobalPosition());
                    break;
                case mapSnaps[i].getTags().includes("Boot"):
                    item = world.createObjectFromTemplate(itemCrafts["Boot"], mapSnaps[i].getGlobalPosition());
                    break;
                case mapSnaps[i].getTags().includes("Crossbow"):
                    item = world.createObjectFromTemplate(itemCrafts["Crossbow"], mapSnaps[i].getGlobalPosition());
                    break;
                case mapSnaps[i].getTags().includes("Hammer"):
                    item = world.createObjectFromTemplate(itemCrafts["Hammer"], mapSnaps[i].getGlobalPosition());
                    break;
                case mapSnaps[i].getTags().includes("Sword"):
                    item = world.createObjectFromTemplate(itemCrafts["Sword"], mapSnaps[i].getGlobalPosition());
                    break;
                case mapSnaps[i].getTags().includes("Tea"):
                    item = world.createObjectFromTemplate(itemCrafts["Tea"], mapSnaps[i].getGlobalPosition());
                    break;
                case mapSnaps[i].getTags().includes("Coins"):
                    item = world.createObjectFromTemplate(itemCrafts["Coins"], mapSnaps[i].getGlobalPosition());
                    break;
            }
            item.snap();
            world.Root.items.push(item);
        }
        item = false;
    }

    static clearingMarkers(map, mapName){
        const mapSnaps = map.getAllSnapPoints();
        let clearings = ["Bunny", "Bunny","Bunny","Bunny", "Fox", "Fox", "Fox", "Fox", "Mouse", "Mouse", "Mouse", "Mouse"];
        clearings = Shuffle.shuffle(clearings);
        for(let i = mapCONFIG.map[mapName].clearings.start; i < mapCONFIG.map[mapName].clearings.end; i++){
            const clearing = world.createObjectFromTemplate(clearingTemplate[clearings.pop()], mapSnaps[i].getGlobalPosition());
            clearing.snap();
        }
    }

    static adSetCards(){
        const adSetDeck = world.createObjectFromTemplate("2EBF5850447848C218D3C8A6ED37EB13", new Vector(TABLE.tableLayout.adSet.x, TABLE.tableLayout.adSet.y, 131));
        const first = Shuffle.choice([1,2,3,4,5]);
        adSetDeck[first].position(new Vector())
    }

    //when a faction is choosen will spawn at the correct player area
    static faction(index){

    }

    //battle mat that will roll die for battles
    battleMat(){

    }

}

module.exports = { Spawn };

