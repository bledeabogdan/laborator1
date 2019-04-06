import randomIntFromInterval from './randomIntFromInterval';

const twoOpt = (array) => {
    let newArray = new Array(array.length).fill(0);
    let i = randomIntFromInterval(0,array.length-1);
    let k = randomIntFromInterval(0, array.length-1);
    while (k===i || Math.abs(k-i)<2){
        k=randomIntFromInterval(0, array.length)
    }
    if(i>k){
        let aux = i;
        i = k;
        k = aux;
    }
    for(let c=0;c<=i;c++){
        newArray[c] = array[c];
    }
    let dec = k;
    for ( let c = i+1; c <= k-1; c++ )
    {
        newArray[c]=array[dec-1];
        dec--;
    }
    for(let c=k;c<array.length;c++){
        newArray[c]=array[c];
    }
    return newArray;
}

export default twoOpt;