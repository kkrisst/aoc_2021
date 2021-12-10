const fs = require('fs');
const { performance } = require('perf_hooks');

const lines = fs.readFileSync('input.txt', 'utf8').split('\n');

const start = performance.now();

const bracesMap = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>'
}

const syntaxScoreTable = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
}

const autocompleteScoreTable = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
}

let syntaxScore = 0;
let autocompleteScoreList = [];

for (let line of lines) {
    console.log('testing line: ', line);

    let buffer = [];
    let corrupted = false; let corruptedChar = '';

    for (let char of line) {
        if ([ '(', '[', '{', '<' ].indexOf(char) > -1) {
            buffer.unshift(bracesMap[char]);
        } else if ([ ')', ']', '}', '>' ].indexOf(char) > -1) {
            if (buffer.length === 0 || char !== buffer[0]) {
                corrupted = true;
                corruptedChar = char;
                break;
            } else buffer.shift();
        } else console.error(`ERROR: invalid character: ${char}`);   
    }

    if (corrupted) {
        console.log(`  --- corrupted, found character: ${corruptedChar}`);
        if (corruptedChar in syntaxScoreTable) syntaxScore += syntaxScoreTable[corruptedChar];
    } else if (buffer.length > 0) {
        console.log('  --- incomplete line');
        let score = 0;
        for (let missingChar of buffer) {
            score = score * 5 + autocompleteScoreTable[missingChar];
        }
        autocompleteScoreList.push(score);
    }
    else console.log('  --- complete and valid line')
}

autocompleteScoreList.sort((a, b) => {
    if (a < b) return 1;
    else if (a > b) return -1;
    else return 0;
})

console.log(`Total syntax error score: ${syntaxScore}`);
console.log(`Middle autocorrect score: ${autocompleteScoreList[(autocompleteScoreList.length - 1) / 2]}`);

const end = performance.now();
console.log(`Program finished in ${(end - start).toFixed(3)} ms`);
