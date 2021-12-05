const fs = require('fs')

const rawData = fs.readFileSync('input.txt', 'utf8')
const sequence = rawData.split('\n')[0].split(',').map(el => parseInt(el))

// console.log(sequence)

let boardsRaw = rawData.split('\n\n')
boardsRaw.shift()

let boards = [];
for (let b of boardsRaw) {
    const rows = b.split('\n');
    
    boards.push(rows.map(r => r.trimStart().split(/\s+/).map(el => { 
        return { val: parseInt(el), found: false }
    })));
}

// console.log(JSON.stringify(boards))

const checkAllFound = (list) => list.reduce((prev, curr) => prev && curr.found, true);

const checkBoards = (boards) => {
    let bingoBoards = [];
    for (let i = 0; i < boards.length; i++) {
        let b = boards[i];

        // checking rows for bingo
        for (let row of b) {
            // console.log(row)
            let winner = checkAllFound(row);
            if (winner) bingoBoards.push(i);
        }

        // checking columns for bingo
        for (let j = 0; j < b[0].length; j++){
            let col = b.map(row => row[j]);
            let winner = checkAllFound(col);
            if (winner) bingoBoards.push(i);
        }
    }

    return bingoBoards;
}

let num, bingoBoards;
let boardsToMessUp = boards.slice();
let boardFound;

for (let i = 0; i < sequence.length; i++) {
    num = sequence[i];
    
    for (let b of boardsToMessUp) {
        for (let row of b) {
            let done = false;
            for (let field of row) {
                if (field.val === num) {
                    field.found = true;
                    done = true;
                    break;
                }
            }

            if (done) break;
        }
    }

    if (i >= 4) {
        bingoBoards = checkBoards(boardsToMessUp);

        // -----------------------------------
        // 1.
        // if (bingoBoards.length > 0) {
        //     boardFound = boardsToMessUp[bingoBoards[0]];
        //     break;
        // }

        // -----------------------------------
        // 2.
        if (bingoBoards.length > 0) {
            if (boardsToMessUp.length === 1) {
                boardFound = boardsToMessUp[0];
                break;
            }
            let newBoards = []
            for (let k = 0; k < boardsToMessUp.length; k++) {
                if (bingoBoards.indexOf(k) === -1) newBoards.push(boardsToMessUp[k]);
            }
            boardsToMessUp = newBoards;
            bingoBoards = [];
        }
    }
}

// console.log(JSON.stringify(boardsToMessUp))

if (bingoBoards.length === 0) console.error('ERROR: no bingo found!')
else {
    console.log(`Board found: #${JSON.stringify(boardFound)}, last drawn number: ${num}`)
    
    let unmarkedSum = 0;
    for (let row of boardFound) {
        for (let field of row) {
            if (!field.found) unmarkedSum += field.val;
        }
    }

    console.log(`Value: ${unmarkedSum * num}`)
}
