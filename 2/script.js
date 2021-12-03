const fs = require('fs');

const commandList = fs.readFileSync('./input.txt', 'utf8').split('\n');
const commands = commandList.map(item => {
    let parts = item.split(' ');
    return { commandType: parts[0], value: parseInt(parts[1]) };
})

let positionA = { horizontal: 0, depth: 0 };

// -----------------------------------
// 1.

for (let com of commands) {
    switch (com.commandType) {
        case ('forward'):
            positionA.horizontal += com.value;
            break;
        case ('up'):
            positionA.depth -= com.value;
            break;
        case('down'):
        positionA.depth += com.value;
            break;
    }
}

console.log(`End position: ${JSON.stringify(positionA)}`);
console.log(`Horizontal x Depth: ${positionA.horizontal * positionA.depth}`)


// -----------------------------------
// 2.

let positionB = { horizontal: 0, depth: 0, aim: 0 };

for (let com of commands) {
    switch (com.commandType) {
        case ('forward'):
            positionB.horizontal += com.value;
            positionB.depth += positionB.aim * com.value;
            break;
        case ('up'):
            positionB.aim -= com.value;
            break;
        case('down'):
            positionB.aim += com.value;
            break;
    }
}

console.log(`End position: ${JSON.stringify(positionB)}`);
console.log(`Horizontal x Depth: ${positionB.horizontal * positionB.depth}`)
