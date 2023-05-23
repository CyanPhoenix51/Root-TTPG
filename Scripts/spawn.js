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

const deckDict = {
    "Base" : {GUID: "99FC83E04C43793D89BF1A8BF85DAF2E"},
    "Exiles & Paristans" : {GUID: "977B6F8E4F5FC8134F1A10ACDB4EBD3A"}
};

const Ruins = {};

const landmarks = {};

const factions = {
    "Cats" : {PlayerBoard: "F22B37B54661F999727586BF90EAFCDD", 
              Warrior: "BDE2142A4C14E2811D5CEBA9196CC00F",
              Buildings: ["3B899DA646B1A2C45EF1ED8BD6C0A8D8", "261E4FDF4BD58BDFF931AAAA6CCD6F2E", "302B76BA410768B64F9B818055E599EE"], 
              Tokens: ["893D56FC4138C2F573FA009BAB4D4452", "0B2CEEA24E80724013B227B693350FA7"], 
              oPieces: [], 
              VP: "6EFE95DD45355AC2FF7C49B5414D7870", 
              Container: ""},
    "Corvid" : {PlayerBoard: "8EF245E14E3D23DB45C812AFB33B08EE", 
                Warrior: "028D0F7243CE828CE4EA089E16C87FFC",
                Buildings: [], 
                Tokens: ["A973EEC14994CF5E4B2C709D44D90FE8", "4CC1136E438A76DA940F43B97014507A", "2A791CD4450B1F3197A33A90D82E84D8", "86D1A961432490A161B512B295CCA2BA"],
                VP: "1B9B3AAF4C44ECCD6C86E09B0085066A", 
                oPieces: [],
                Container: ""},
    "Duchy" : {PlayerBoard: "28576DB5446381F4843E68A66E2CAF26", 
               Warrior: "C8F4CA88423B7B0383C39499C0228980",
               Buildings: ["1F03F54442CC61F304193FA3FD658EB5", "D7B7737C4E3931AA7DE3BE908114D435"], 
               Tokens: ["FEC3023C458AFE0E5B3E659990B90B0E"], 
               oPieces: ["279C98394547EB08F6362687958ADABA", "8BBAAEAC487EAC4F9309E38B904F7D61"],
               VP: "1A51FA2947C7E69BE6BBF3935DAFA1C5",
               Container: ""},
    "Eyrie" : {PlayerBoard: "96F488F846144E92AAFF68A564EA7AB6",
               Warrior: "D7C8C3DC4D6EDC5B3572E283A575295F", 
               Buildings: ["5892705E4B2E4E59A9BC91981BDDD8AC"], 
               Tokens: [], 
               oPieces: ["695BED8146B69D817BE474B026DBCB81", "6330328848BD6B94ABFA53958A56CF24"], 
               VP: "84B14C1447DA82876C3063BDE3200975", 
               Container: ""},
    "Keepers" : {PlayerBoard: "B556CF4141B8BC661249DD80362E966D", 
                 Warrior: "D33B118A40333F4F728015BAB7FA0F94",
                 Buildings: ["D06D3C9C49463BE1C80D7AB2FD9BB203", "8878C91E456B1A7BB9A3DA89DD119248", "37C414734C3123254C02E6BCCD549512"], 
                 Tokens: ["0E9E01214C10C398C472DCBC0ED14A21", "30C11E4B47B97789C53E1D8FDAF13A3B", "43645836483E8CEA3A348EA3B6C289E0", 
                          "53DB72824B4B1CCAE5D708834CE697DC", "53DB72824B4B1CCAE5D708834CE697DC", "56114E5A4E16EB05195B52A61965F65A", 
                          "332E7BB94A7F59E641437A8E328A64BC", "A108BF704990EC727758169F6E2DB6E3", "4A79151349F68EDF8421678084036EAD"], 
                 oPieces: ["686E39AA4AEA4FD6462C139F4A3571B8"], 
                 VP: "0CEF6B5F40002E92B761B0A832704952", 
                 Container: ""},
    "Hundreds" : {PlayerBoard: "141181BD4E6F0084C8578A97DB4C7FD8", 
                  Warrior: ["32506AEA455B4943A0575D85BD49ED6B", "4F7BC010410BB4DD84D37280C264FAE5"],
                  Buildings: ["46701D5E4F31C93C6AFA53A5546FF85C"], 
                  Tokens: ["B8965CF2412A769BDE04BF8D87EE3476"], 
                  oPieces: ["DD0A95DD4DB4F62F5BB2A18F774D3355", "B73CFC4E44B5C95E6EF0AE997A1167D8"], 
                  VP: "2101DE524C59D81B8C5CD089017BDA4C", 
                  Container: ""},
    "Lizards" : {PlayerBoard: "80CA07F84104C7312D0AFBA6D8E74D87",
                 Warrior: "62B0D7DE4C5721D3184D91B50C1BE1CD", 
                 Buildings: ["56E2BB9D4394A4F7AB632AA74DC7F56C", "88B9920543BD630478C14CBA95EE78C9", "EA4B4A1445F620261CA053828C0892FA"], 
                 Tokens: [], 
                 oPieces: [], 
                 VP: "", 
                 Container: ""},
    "Riverfolk" : {PlayerBoard: "3EE953AA47DAD02BAB94D4A249234D68", Buildings: [], Tokens: [], oPieces: [], VP: "", Container: ""},
    "Vagabond" : {PlayerBoard: "603E1E7E4D1BD59C86D78FB92C766B4E", Buildings: [], Tokens: [], oPieces: [], VP: "", Container: ""},
    "Woodland" : {PlayerBoard: "A2200FA14FC23B4379A312B166760452", Buildings: [], Tokens: [], oPieces: [], VP: "", Container: ""},
};

const VagabondDict = {};

class Spawn{

    static spawnDeck = () => {

    }

    static spawnMap = (name, setupType = '') => {
        console.log(mapDict[name].GUID);
        const map = world.createObjectFromTemplate(mapDict[name].GUID, new Vector(0, 0.75, 120));
        map.setRotation(new Rotator(0, 90, 0));
        return map;
    };

}

module.exports = { Spawn };

