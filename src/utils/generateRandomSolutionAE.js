import randomIntFromInterval from './randomIntFromInterval';
import determineValueAndWeight from './determineValueAndWeightOfSolution';

const generateRandomSequence = (n) => {
    let number = 0;
    if(n > 30){
        number = randomIntFromInterval(1,Math.pow(2,30)-1);
    } else{
        number = randomIntFromInterval(1,Math.pow(2,n)-1);
    }
    var string = number.toString(2);
    while (string.length < n){
        string = Math.round(Math.random()) + string;
    }

    return string;
}

const generateRandomSolution = (objects, maxWeight) => {
    let solution = {sequence: "", value: 0, weight: 0};
    solution.sequence = generateRandomSequence(objects.length);
    let valueAndWeight = determineValueAndWeight(solution.sequence, objects);
    solution.value = valueAndWeight.value;
    solution.weight = valueAndWeight.weight;
    while(solution.weight > maxWeight){
        solution.sequence = generateRandomSequence(objects.length);
        valueAndWeight = determineValueAndWeight(solution.sequence, objects);
        solution.value = valueAndWeight.value;
        solution.weight = valueAndWeight.weight;
    }
    return solution;
}

export default generateRandomSolution;