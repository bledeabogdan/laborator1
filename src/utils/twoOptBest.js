
import evaluateDistance from "./evaluateDistance";
import twoOpt from './twoOpt';

const twoOptBest = (array, distances, memory) => {
    let neighbors = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = i+1; j < array.length; j++) {
            if(memory[i][j] === 0){
                let newA = twoOpt(array,i,j);
                let solution = {
                    path: newA,
                    distance: evaluateDistance(newA, distances),
                    i: i,
                    j: j
                }
                neighbors.push(solution);
            }
        }
    }

    neighbors.sort((p1,p2)=>{
        return p1.distance-p2.distance;
    })
    return neighbors[0];
            
}

export default twoOptBest;