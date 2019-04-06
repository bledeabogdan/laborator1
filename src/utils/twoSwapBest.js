import evaluateDistance from "./evaluateDistance";

const twoSwapBest = (array, distances, memory) => {
    let neighbors = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = i; j < array.length; j++) {
            if(memory[i][j] === 0){
                let neigh = array;
                let aux = neigh[i];
                neigh[i] = neigh[j];
                neigh[j] = aux;
                let solution = {
                     path: neigh,
                     distance: evaluateDistance(neigh, distances),
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

export default twoSwapBest;