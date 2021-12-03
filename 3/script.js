const fs = require('fs');

const report = fs.readFileSync('./input.txt', 'utf8').split('\n');
const number_len = report[0].length;

// -----------------------------------
// 1.

let positions = {};

for (let i = 0; i < report[0].length; i++) {
    positions[i] = 0;
}

for (let line of report) {
    if (line.length !== number_len)
        console.error(`ERROR: number length inconsistent, expected a length of ${number_len} but number is: ${line}`);

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '0') positions[i] -= 1;
        else if (char === '1') positions[i] += 1;
        else console.error(`ERROR: not a binary number`);
    }
}

let gamma = '', epsilon = '';
for (let pos in positions) {
    let value = positions[pos];
    if (value > 0) {
        gamma += '1';
        epsilon += '0';
    } else if (value < 0) {
        gamma += '0';
        epsilon += '1';
    } else {
        console.error(`ERROR: equal number of 1s and 0s in position ${pos}!`)
    }
}

console.log(`gamma: ${gamma}, as base 10 int: ${parseInt(gamma, 2)}`)
console.log(`epsilon: ${epsilon}, as base 10 int: ${parseInt(epsilon, 2)}`)

const powerConsumption = parseInt(gamma, 2) * parseInt(epsilon, 2);
console.log(`Power consumption: ${powerConsumption}`);

// -----------------------------------
// 2.

function findRating (startingList, leastCommonPreferred) {
    let stop = false;
    let binList = startingList;
    let pos = 0;
    let ones = [], zeroes = [];
    
    while (!stop) {
        ones = [], zeroes = [];
    
        for (let line of binList) {
            if (line[pos] === '1') ones.push(line);
            else if (line[pos] === '0') zeroes.push(line);
            else console.error(`ERROR: not a binary number`);
        }
    
        if (ones.length > zeroes.length) binList = leastCommonPreferred ? zeroes : ones;
        else if (ones.length < zeroes.length) binList = leastCommonPreferred ? ones : zeroes;
        else binList = leastCommonPreferred ? zeroes : ones;
    
        if (binList.length === 0)
            console.error(`ERROR: next binList is empty, failed`);
    
        if (binList.length === 1) {
            return binList[0];
        } else if (pos === number_len - 1) {
            stop = true;
            console.error(`ERROR: reached the end of the numbers, still multiple left`);
        } else pos++;
    }
}

const oxygenGeneratorRating = findRating(report, false);
const CO2ScrubberRating = findRating(report, true);

console.log(`Oxygen Generator Rating: ${oxygenGeneratorRating}, as base 10 int: ${parseInt(oxygenGeneratorRating, 2)}`)
console.log(`CO2 Scrubber Rating: ${CO2ScrubberRating}, as base 10 int: ${parseInt(CO2ScrubberRating, 2)}`)

const lifeSupportRating = parseInt(oxygenGeneratorRating, 2) * parseInt(CO2ScrubberRating, 2);
console.log(`Life Support Rating: ${lifeSupportRating}`);
