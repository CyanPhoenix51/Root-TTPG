const { world } = require('@tabletop-playground/api')

//Objective of this script
//gneric so need to spawn the correct map
//rotate it corretly
//spawn Craftable Items, Ruins, and any landmarks
//spawn Clearing Numbers

const mapDict = {
    "Autumn" : {GUID: "09B4F948491B210D3FA9CD9AC86DF4CE", Landmarks: "", Special: ""},
    "Summer" : {GUID: "", Landmark: "", Special: ""},
    "Winter" : {GUID: "", Landmark: "", Special: ""},
    "Lake" : {GUID: "", Landmark: "Ferry", Special: ""},
    "Mountain" : {GUID: "", Landmark: "Tower", Special: "Closed Paths"}
};

const Ruins = {};

const landmarks = {};

const factions = {};

class Spawn{
    static spawnMap = (name, setupType = '') => {
        console.log(mapDict[name].GUID);
        const map = world.createObjectFromTemplate(mapDict[name].GUID, new Vector(0, 0.75, 120));
        //map.setRotation(new Rotator(0, 90, 0));
        return map;
    };

}

module.exports = { Spawn };

