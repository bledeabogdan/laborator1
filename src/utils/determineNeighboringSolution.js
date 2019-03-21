import determineValueAndWeightOfSolution from './determineValueAndWeightOfSolution'
import randomIntFromInterval from './randomIntFromInterval';

const neighboringValidSolution = (solution, indexArray) => {
    
    let randomI = randomIntFromInterval(0,indexArray.length-1);
    let randomIndex = indexArray[randomI];
    let posibleSolution;
    let solutionArray = solution.split('');
    for(let i in solutionArray){
        if(i===randomIndex){
            solutionArray[i]='1'
        }
    }
    posibleSolution = solutionArray.join('');
    return posibleSolution;
}

const determineNeighboringSolution = (objectSolution, indexArray, objects, maxWeight) =>{
    
    let posibleSolution = neighboringValidSolution(objectSolution.solution, indexArray);
    let values = determineValueAndWeightOfSolution(posibleSolution, objects);
    let numberOfTimes = 0;
    while(values.weight > maxWeight){
        if(numberOfTimes===indexArray.length){
            return false;
        }else{
            posibleSolution = neighboringValidSolution(objectSolution.solution, indexArray);
            values = determineValueAndWeightOfSolution(posibleSolution, objects);
        }
        numberOfTimes++;
    }

    return {solution: posibleSolution, ...values};
    
}

export default determineNeighboringSolution;