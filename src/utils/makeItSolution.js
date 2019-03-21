import randomIntFromInterval from './randomIntFromInterval';

const makeItSolution = (solution, maxWeight) => {
    let indexOf1Array = [];
    for(let index in solution){
        if(solution[index]==='1'){
            indexOf1Array.push(index);
        }
    }
    let randomIndex = randomIntFromInterval(0, indexOf1Array.length);
    solution = [solution.slice(0,randomIndex),'0',solution.slice(randomIndex+1)].join('');
    return solution;
}

export default makeItSolution;