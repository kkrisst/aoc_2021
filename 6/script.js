const fs = require('fs');

const { performance } = require('perf_hooks');

const initial = fs.readFileSync('input.txt', 'utf8').split(',').map(el => parseInt(el));

// console.log(initial)

// -----------------------------------
// 1.

const t0 = performance.now();

const ENABLE_PART_1 = false;
const NUM_OF_DAYS_1 = 80;

if (ENABLE_PART_1) {
    let school = initial.slice();
    let nextSchool = [];
    
    for (let i = 0; i < NUM_OF_DAYS_1; i++) {
        for (let fish of school) {
            if (fish === 0) nextSchool.push(6, 8);
            else nextSchool.push(fish - 1);
        }
    
        school = nextSchool;
        nextSchool = [];
    }
    
    console.log(`Number of fish after ${NUM_OF_DAYS_1} days: ${school.length}`);
    const t1 = performance.now();
    console.log(`Solution 1: ${t1 - t0} ms.`);
}

// -----------------------------------
// 2.

const t2 = performance.now();

const findDescendantCount = (limit, value) => {
    let add = 1;

    if (value + 7 <= limit) add += findDescendantCount(limit, value + 7);
    if (value + 9 <= limit) add += findDescendantCount(limit, value + 9);

    return add;
}

const NUM_OF_DAYS_2 = 256;
let school2 = initial.slice();
let count = 0;

for (let i = 0; i < school2.length; i++) {
    let fish = school2[i];
    let extra = 1 + findDescendantCount(NUM_OF_DAYS_2, fish + 1);

    const tn = performance.now();
    let percentile = i / school2.length;
    console.log(`${i}/${school2.length} - ${(percentile * 100).toFixed(2)}% - ${((((parseInt(tn) - parseInt(t2)) / percentile) - parseInt(tn)) / 1000).toFixed(2)}s remaining - ongoing for ${((parseInt(tn) - parseInt(t2)) / 1000).toFixed(2)}`);
    
    count += extra;
}

console.log(`Number of fish after ${NUM_OF_DAYS_2} days: ${count}`)

const t3 = performance.now();
console.log(`Solution 2: ${((t3 - t2) / 1000).toFixed(2)}s`);
