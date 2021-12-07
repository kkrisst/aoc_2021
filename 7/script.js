const fs = require('fs')

const positions = fs.readFileSync('./input.txt', 'utf8').split(',').map(item => parseInt(item))
// console.log(positions);

let min = positions[0];
let max = positions[0];

for (let pos of positions) {
    if (pos < min) min = pos;
    else if (pos > max) max = pos;
}

// console.log(`min: ${min}, max: ${max}`)

let leastFuel = -1;
let bestPosition = 0;

// -----------------------------------
// 1.

for (let i = min; i <= max; i++) {
    let fuelSum = 0;
    for (let pos of positions) {
        fuelSum += Math.abs(i - pos);
    }

    if (fuelSum < leastFuel || leastFuel === -1) {
        leastFuel = fuelSum;
        bestPosition = i;
    }
}

console.log(`PART 1: The best position is ${bestPosition}, fuel used: ${leastFuel}`);

// -----------------------------------
// 2.

const findSumOfConsecutiveNumberSequence = (start, end) => {
    return (end / 2) * (start + end);
}

const sequenceSumCache = [];

let leastFuel2 = -1;
let bestPosition2 = 0;
for (let i = min; i <= max; i++) {
    let fuelSum = 0;
    for (let pos of positions) {
        let diff = Math.abs(i - pos);
        
        if (isNaN(sequenceSumCache[diff])) {
            let sequenceSum = findSumOfConsecutiveNumberSequence(1, diff)
            sequenceSumCache[diff] = sequenceSum;
        }

        fuelSum += sequenceSumCache[diff];
    }

    if (fuelSum < leastFuel2 || leastFuel2 === -1) {
        leastFuel2 = fuelSum;
        bestPosition2 = i;
    }
}

console.log(`PART 2: The best position is ${bestPosition2}, fuel used: ${leastFuel2}`);
