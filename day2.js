const fs = require('fs');
let data = '';
fs.readFile("inputs/day_2_input.txt", "utf-8", (err, data) => {
    if (err) throw err;
    const scores = parseGuideInputs(data); //split data and play rounds
    console.log('total Points part 1', scores[0]);
    console.log('total Points part 2', scores[1]);

});
function getScores(r){
    let points = {A:1,X:1,B:2,Y:2,C:3,Z:3};
    const scoreA = +points[r.substr(0, 1)];
    let scoreB = +points[r.substr(r.length - 1, 1)];
    return [scoreA, scoreB];
}

function playRoundPart1(r){
    //rock a|x, paper b|y, scissors c|z
    if(r === ''){ return 0;} //return 0 for empty lines
    let scores = getScores(r);
    let myScore = scores[1];
    if((/(A X|B Y|C Z)/).test(r)){
        myScore += 3; //draw
    }else if((/(A Y|B Z|C X)/).test(r)){
        myScore += 6; //win
    }else{
        myScore += 0; //loss
    }
    return myScore; //return round total
}
function playRoundPart2(r){
    if(r === ''){ return 0; } //return 0 for empty lines
    let scores = getScores(r); //X = must lose, Y = must draw, Z = must win
    let theirScore = scores[0], guideRecommends = scores[1]; //set score and recommendation
    let outcome;
    if(guideRecommends === 3){
        if(theirScore === 1) outcome = 2; //rock vs paper
        if(theirScore === 2) outcome = 3; //paper vs scissor
        if(theirScore === 3) outcome = 1; //scissor vs rock
        return outcome += 6;
    }else if(guideRecommends === 2){
        if(theirScore === 1) outcome = 1; //rock
        if(theirScore === 2) outcome = 2; //paper
        if(theirScore === 3) outcome = 3; //scissor
        return outcome += 3;
    }else{
        if(theirScore === 1) outcome = 3; //rock vs scissor
        if(theirScore === 2) outcome = 1; //paper vs rock
        if(theirScore === 3) outcome = 2; //scissor vs paper
        return outcome;
    }
}
function parseGuideInputs(data, partNumber = 1){
    let score = 0, score2 = 0;
    const dataArr = data.split('\n');
    dataArr.pop(); //remove the last empty element from the lazy split
    dataArr.map((r)=>{
        score += playRoundPart1(r);
        score2 += playRoundPart2(r);
    });
    return [score, score2];
};