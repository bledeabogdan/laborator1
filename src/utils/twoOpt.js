
const twoOpt = (array, i, k) => {
    let newArray = new Array(array.length).fill(0);
    
    for(let c=0;c<i;c++){
        newArray[c] = array[c];
    }
    let dec = k;
    for ( let c = i; c <= k; c++ )
    {
        newArray[c]=array[dec];
        dec--;
    }
    for(let c=k+1;c<array.length;c++){
        newArray[c]=array[c];
    }
    return newArray;
}

export default twoOpt;