
const evaluateDistance = (perm, distances) => {
    let newPerm = [];
    for(let i=0;i<perm.length;i++){
        newPerm[i]=perm[i]-1;
    }
    let fullDistance = 0;
    for(let i=0;i<=newPerm.length-2;i++){
        fullDistance += distances[newPerm[i]][newPerm[i+1]];
    }

    fullDistance += distances[newPerm[0]][newPerm[newPerm.length-1]];
    return fullDistance;
}

export default evaluateDistance;