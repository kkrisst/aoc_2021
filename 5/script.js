const fs = require('fs')

const PART2 = true;

const commandsRaw = fs.readFileSync('input.txt', 'utf8').split('\n').map(row => row.split(' -> '))
let commands = commandsRaw.map(row => row.map(coords => coords.split(',').map(item => parseInt(item))))
commands = commands.map(row => { return {from: row[0], to: row[1] } })

// -----------------------------------
// 1.

let allFields = [];
let maxX = Math.max( Math.max(...commands.map(el => el.from[0])), Math.max(...commands.map(el => el.from[1])) );
let maxY = Math.max( Math.max(...commands.map(el => el.to[0])), Math.max(...commands.map(el => el.to[1])) );

for (let vect of commands) {
    if (vect.from[0] === vect.to[0]) {
        // HORIZONTALS

        if (vect.from[1] > vect.to[1]) {
            let temp = vect.from[1];
            vect.from[1] = vect.to[1];
            vect.to[1] = temp;
        }
        for (let y = vect.from[1]; y <= vect.to[1]; y++)
            allFields.push({ from: vect.from[0], to: y })
    } else if (vect.from[1] === vect.to[1]) {
        // VERTICALS

        if (vect.from[0] > vect.to[0]) {
            let temp = vect.from[0];
            vect.from[0] = vect.to[0];
            vect.to[0] = temp;
        }
        for (let x = vect.from[0]; x <= vect.to[0]; x++)
            allFields.push({ from: x, to: vect.from[1] })
    } else if (PART2) {
        // DIAGONALS

        // -----------------------------------
        // 2.
        let xDir = vect.from[0] <= vect.to[0] ? 'positive' : 'negative';
        let yDir = vect.from[1] <= vect.to[1] ? 'positive' : 'negative';

        for (let i = 0; i <= Math.abs(vect.from[0] - vect.to[0]); i++) {
            allFields.push({
                from: xDir === 'positive' ? vect.from[0] + i : vect.from[0] - i,
                to: yDir === 'positive' ? vect.from[1] + i : vect.from[1] - i,
            });
        }
    }
}

// console.log(`maxX: ${maxX}, maxY: ${maxY}`)

let map = []

for (let i = 0; i <= maxY; i++) {
    let row = [];
    for (let j = 0; j <= maxX; j++) {
        row.push(0);
    }

    map.push(row);
}

for (let coords of allFields)
    map[coords.to][coords.from]++;

let overlaps = 0;
for (let row of map) {
    for (let field of row) {
        if (field > 1) overlaps++;
    }
}

console.log('overlaps:', overlaps)