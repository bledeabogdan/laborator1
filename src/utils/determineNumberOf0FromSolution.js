
const determineIndexesOf0FromSolution = (solution) => {
    let indexArrayOf0 = [];
    let solutionArray = solution.split('');
    for(let index in solutionArray){
        if(solutionArray[index]==='0'){
            indexArrayOf0.push(index);
        }
    }
    return indexArrayOf0 ;
}

export default determineIndexesOf0FromSolution;