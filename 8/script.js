const fs = require('fs');

const dataRaw = fs.readFileSync('input.txt', 'utf8').split('\n').map(line => line.split(' | '));

let data = [];
dataRaw.map(item => {
    data.push({ examples: item[0].split(' '), outputs: item[1].split(' ') })
});

// console.log(data)

// const digitSegmentCounts = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6];
// const uniqueSegmentCountsForDigit = [false, true, false, false, true, false, false, true, true, false]
const uniqueSegmentCounts = [2, 3, 4, 7]

// -----------------------------------
// 1.

let uniqueSum = 0;

for (let line of data) {
    for (let digit of line.outputs) {
        if (uniqueSegmentCounts.indexOf(digit.length) > -1) uniqueSum++;
    }
}

console.log(`Number of digits using a unique number of segments: ${uniqueSum}`);

// -----------------------------------
// 2.

// a: 7 (3 dig)-ben benne van, de nincs benne az 1 (2 dig)-ben
// c: 6-digesek kozul ami nincs benn mind3-ban, ennek a metszete a 7-tel
// f: a megmarado lehetoseg (c-vel kozos)
// e: 6-digesek kozul ami nincs benn mind3-ban, ennek a metszete a 4-tel, ami kimarad
// g: a megmarado lehetoseg (e-vel kozos)
// d: 6-digesek kozul ami nincs benn mind3-ban, nem c es nem e
// b: a megmarado lehetoseg (b-vel kozos)

// b: 8-ban es 4-ben kozos, de nincs benne 1-ben, 2 lehetoseg
// c: 1-ben es 7-ben kozos, 2 lehetoseg
// d: 8-ban es 4-ben kozos, de nincs benne 1-ben, 2 lehetoseg
// e: 8-ban benne de 7-ben es 4-ben nem, 2 lehetoseg
// f: 1-ben es 7-ben kozos, 2 lehetoseg
// g: 8-ban benne de 7-ben es 4-ben nem, 2 lehetoseg

const findIntersection = list => {
    if (list.length === 0) console.error(`ERROR in findIntersection, empty list`);
    if (list.length === 1) return list[0];

    let intersection = list[0].split('');
    let nextIntersection = [];
    for (let i = 1; i < list.length; i++) {
        for (let char of intersection) {
            if (list[i].indexOf(char) > -1) nextIntersection.push(char);
        }

        intersection = nextIntersection;
        nextIntersection = [];
    }

    return intersection.join('');
}

// console.log(findIntersection('asd', 'sdf'))
// console.log(findIntersection('asd', 'sdf', 'dfg'))

const findOddChars = list => {
    if (list.length === 0) console.error(`ERROR in findOddChars, empty list`);
    if (list.length === 1) return list[0];

    let oddChars = [];

    const intersection = findIntersection(list);
    for (let i = 0; i < list.length; i++) {
        for (let char of list[i]) {
            if (intersection.indexOf(char) === -1 && oddChars.indexOf(char) === -1)
                oddChars.push(char);
        }
    }

    return oddChars.join('');
}

// console.log(findOddChars(['asd', 'sdf']))
// console.log(findOddChars(['asd', 'sdf', 'dfg']))

const findUnion = list => {
    if (list.length === 0) console.error(`ERROR in findOddChars, empty list`);
    if (list.length === 1) return list[0];
    
    let union = list[0].split('');
    for (let i = 1; i < list.length; i++) {
        for (let char of list[i])
            if (union.indexOf(char) === -1) union.push(char);
    }

    return union.join('');
}

// console.log(findUnion(['asd', 'sdf']))
// console.log(findUnion(['asd', 'sdf', 'dfg']))

const sortString = str => str.split('').sort().join('');

const findDigits = line => {
    const sample = line;
    let num1, num4, num7, num8;
    let sixDigits = [];

    for (let str of sample.examples) {
        switch (str.length) {
            case (2):
                num1 = str;
                break;
            case (4):
                num4 = str;
                break;
            case (3):
                num7 = str;
                break;
            case (7):
                num8 = str;
                break;
            case (6):
                sixDigits.push(str);
                break;
        }
    }

    // console.log(num1, num4, num7, num8)
    // console.log(sixDigits)

    const sixDigitsOddChars = findOddChars(sixDigits);
    
    // finding segment a
    const A = findOddChars([num1, num7]);
    const C = findIntersection([num7, sixDigitsOddChars])
    const F = findOddChars([C, findIntersection([num1, num7])])
    const E = findIntersection([sixDigitsOddChars, findOddChars([num4, sixDigitsOddChars])])
    const G = findOddChars([E, findOddChars([num8, findUnion([num4, num7])])])
    const D = findOddChars([C, findOddChars([E, sixDigitsOddChars])])
    const B = findOddChars([D, findOddChars([num1, findIntersection([num4, num8])])])
    
    return [
        sortString(A+B+C+E+F+G),
        sortString(C+F),
        sortString(A+C+D+E+G),
        sortString(A+C+D+F+G),
        sortString(B+C+D+F),
        sortString(A+B+D+F+G),
        sortString(A+B+D+E+F+G),
        sortString(A+C+F),
        sortString(A+B+C+D+E+F+G),
        sortString(A+B+C+D+F+G)
    ]
}

let sumOfOutputs = 0;

for (let line of data) {
    const digits = findDigits(line)
    let output = '';
    for (let digit of line.outputs) {
        let digitIndex = digits.indexOf(sortString(digit));
        if (digitIndex === -1) console.error(`ERROR: digit not found for ${digit}`);
        else {
            output += digitIndex;
        }
    }

    sumOfOutputs += parseInt(output);
}

console.log(`Sum of all outputs: ${sumOfOutputs}`);
