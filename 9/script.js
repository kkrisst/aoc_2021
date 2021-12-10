const fs = require('fs');
const { performance } = require('perf_hooks');

const RUN_PART_ONE = true;
const RUN_PART_2 = true;

const mapRaw = fs.readFileSync('input.txt', 'utf8').split('\n')
const map = mapRaw.map(line => line.split('').map(el => parseInt(el)));

// console.log(map)

const maxX = map[0].length - 1;
const maxY = map.length - 1;

// console.log(`maxX: ${maxX}, maxY: ${maxY}`);

const findAdjacents = (x, y) => {
    
    let adjacents = [];
    
    if (x > 0) adjacents.push(map[y][x - 1]);
    if (x < maxX) adjacents.push(map[y][x + 1]);
    
    if (y > 0) adjacents.push(map[y - 1][x]);
    if (y < maxY) adjacents.push(map[y + 1][x]);
    
    return adjacents;
}

// -----------------------------------
// 1.

if (RUN_PART_ONE) {
    const part1Start = performance.now();

    let sumOfRiskLevels = 0;
    
    for (let y = 0; y <= maxY; y++) {
        for (let x = 0; x <= maxX; x++) {
            let currentValue = map[y][x];
            let adjacents = findAdjacents(x, y);
            const lowPoint = adjacents.reduce((prev, curr) => prev && curr > currentValue, true);
            if (lowPoint) sumOfRiskLevels += currentValue + 1;
        }
    }
    
    console.log(`Sum of low point risk levels: ${sumOfRiskLevels}`);

    const part1End = performance.now();
    console.log(`Part 1: ${part1End - part1Start} ms.`);
}

// -----------------------------------
// 2.

    // find the basin size
        // find the adjacents that are greater and not null, add +1 for them, set them to null, then run the basin size search recursively
    // save the basin size in a list
    // find the 3 largest basin sizes and multiply them///

if (RUN_PART_2) {
    const part2Start = performance.now();

    let map2 = map.slice();

    const findBasinSize = (x, y) => {
        let basinSize = 1;

        if (x > 0 && !isNaN(map2[y][x - 1]) && map2[y][x] < map2[y][x - 1] && map2[y][x - 1] < 9) {
            basinSize += findBasinSize(x - 1, y);
            map2[y][x - 1] = null;
        }
        if (x < maxX && !isNaN(map2[y][x + 1]) && map2[y][x] < map2[y][x + 1] && map2[y][x + 1] < 9) {
            basinSize += findBasinSize(x + 1, y);
            map2[y][x + 1] = null;
        }
        
        if (y > 0 && !isNaN(map2[y - 1][x]) && map2[y][x] < map2[y - 1][x] && map2[y - 1][x] < 9) {
            basinSize += findBasinSize(x, y - 1);
            map2[y - 1][x] = null;
        }
        if (y < maxY && !isNaN(map2[y + 1][x]) && map2[y][x] < map2[y + 1][x] && map2[y + 1][x] < 9) {
            basinSize += findBasinSize(x, y + 1);
            map2[y + 1][x] = null;
        }

        return basinSize;
    }

    let basinSizes = [];

    for (let y = 0; y <= maxY; y++) {
        for (let x = 0; x <= maxX; x++) {
            let currentValue = map2[y][x];
            let adjacents = findAdjacents(x, y);
            const lowPoint = adjacents.reduce((prev, curr) => prev && curr > currentValue, true);
            if (lowPoint) {
                let basinSize = findBasinSize(x, y);
                basinSizes.push(basinSize);
            }
        }
    }

    if (basinSizes.length < 3) {
        console.error(`ERROR: number of basins found is less than 3 (${basinSizes.length})`)
    } else {
        basinSizes.sort((a, b) => {
            if (a > b) return 1;
            else if (a < b) return -1;
            else return 0;
        });

        let l = basinSizes.length;
        console.log(`Product of the 3 largest basinSize: ${basinSizes[l - 1] * basinSizes[l - 2] * basinSizes[l - 3]}`);
    }

    const part2End = performance.now();
    console.log(`Part 2: ${part2End - part2Start} ms.`);
}    
