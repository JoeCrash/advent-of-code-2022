const fs = require('fs');
let data = '';
fs.readFile("inputs/day_1_input.txt", "utf-8", (err, data) => {
    if (err) throw err;
    const calorieTotals = parseCalorieInputs(data); //split data and calculate totals for each elf
    const sortedTotals = calorieTotals.sort((a,b) => b - a); //sort the totals in DESC order
    console.log("highest calorie count:", sortedTotals[0]);
    console.log("top 3 calorie total:", sortedTotals[0] + sortedTotals[1] + sortedTotals[2]);
});

function parseCalorieInputs(data){
    return data.split('\n\n').map(elf => {return elf.split('\n').reduce((candy, treats) => +(candy) + +(treats), 0)}); //used ternary to convert string to number.
};