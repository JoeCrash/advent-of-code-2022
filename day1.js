const fs = require('fs');
let data = '';
fs.readFile("inputs/day_1_input.txt", "utf-8", (err, data) => {
    if (err) throw err;
    const calorieTotals = parseCalorieInputs(data); //split data and calculate totals for each elf
    const highest = calorieTotals.sort((a,b) => b - a)[0]; //sort the totals in DESC order and return the first index
    console.log("highest calorie count:", highest);
});

function parseCalorieInputs(data){
    return data.split('\n\n').map(elf => {return elf.split('\n').reduce((candy, treats) => +(candy) + +(treats), 0)}); //used ternary to convert string to number.
}


