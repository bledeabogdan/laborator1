import evaluateDistance from "./evaluateDistance";

const twoSwap2 = (array, distances) => {
    let neighbors = [];
    
    for (let i = 0; i < array.length; i++) {
        for (let j = i; j < array.length; j++) {
                var neigh = Array.from(array);
                let aux = neigh[i];
                neigh[i] = neigh[j];
                neigh[j] = aux;
                let distance = evaluateDistance(neigh, distances);
                neighbors.push({path: neigh, distance: distance});
            }
        }
    neighbors.sort((a,b)=>{
        return a.distance-b.distance;
    })
    return neighbors[0].path;
}

export default twoSwap2;