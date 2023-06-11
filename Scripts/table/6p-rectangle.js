//z = 131

module.exports = {
    //start on left side closest to camera position from spawning into game going clockwise
    player : [
        {
            slot: 1,
            yaw: 90,
            pos: {x: -45, y: -54.5},
            holder: {x: -45.0, y: -86.0},
            //container?
            playerCounts: [4, 5, 6]
        },
        {
            slot: 2,
            yaw: 90,
            pos: {x: 45, y: -54.5},
            holder: {x: 45.0, y: -86.0},
            playerCounts: [4, 5, 6]
        },
        {
            slot: 3,
            yaw: -90,
            pos: {x: 45, y: 56.5},
            holder: {x: 45.0, y: 86.0},
            playerCounts: [3, 4, 5, 6]
        },
        {
            slot: 4,
            yaw: -90,
            pos: {x: 45, y: 56.5},
            holder: {x: -45.0, y: 86.0},
            playerCounts: [3, 4, 5, 6]
        },
        {
            slot: 5,
            yaw: 90,
            pos: {x: 0, y: -54.5},
            holder: {x: 0, y: -86.0},
            playerCounts: [1, 2, 3, 5, 6]
        },
        {
            slot: 6,
            yaw: -90,
            pos: {x: 0, y: 56.5},
            holder: {x: 0, y: 86.0},
            playerCounts: [2, 4, 5, 6]
        }
    ],
    tableLayout : {
        GameUI: {
            x: -105,
            y: 0,
            z: 155,
            pitch: 60,
            yaw: 180,
            height: 500,
            width: 500
        },
        deck: {x: 39.678, y: -3.724},
        deckHolder : {x: 40.594, y: 0.399},
        dominance : {x: 54.829, y: 0.314},
        adSet : {x: -85, y: 20},
    }
};