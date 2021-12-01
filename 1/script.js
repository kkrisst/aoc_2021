const fs = require('fs')

const depths = fs.readFileSync('./input.txt', 'utf8').split('\n').map(item => parseInt(item))

// -----------------------------------
// 1.

let increasedCount_1 = 0;

for (let i = 1; i < depths.length; i++) {
    // console.log(`comparing ${depths[i]} to ${depths[i - 1]}, ${depths[i] > depths[i - 1] ? 'increased' : 'NO increase'}`)
    if (depths[i] > depths[i - 1]) increasedCount_1++;
}

console.log(increasedCount_1);

// -----------------------------------
// 2.

const MEASUREMENT_WINDOW_SIZE = 3;
let increasedCount_2 = 0;

for (let i = 0; i < depths.length - (MEASUREMENT_WINDOW_SIZE -1); i++) {
    let windowA = depths[i];
    let windowB = depths[i + MEASUREMENT_WINDOW_SIZE];

    for (let j = i + 1; j < i + MEASUREMENT_WINDOW_SIZE; j++) {
        windowA += depths[j];
        windowB += depths[j];
    }

    if (windowB > windowA) increasedCount_2++;
}

console.log(increasedCount_2);