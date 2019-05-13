import twoSwap from './twoSwap';
import twoOpt from './twoOpt';
import twoSwap2 from './twoSwap2';
import randomIntFromInterval from './randomIntFromInterval';


const randomNeighborhood = (c, neighborFunction, distances) => {
    if (neighborFunction === '2swap') {
        // return twoSwap2(c, distances);
        return twoSwap(c);
    } else {
        let i = randomIntFromInterval(0, c.length - 1);
        let k = randomIntFromInterval(0, c.length - 1);
        while (k === i || Math.abs(k - i) < 2) {
            k = randomIntFromInterval(0, c.length - 1)
        }
        if (i > k) {
            let aux = i;
            i = k;
            k = aux;
        }
        return twoOpt(c, i, k);
    }
}

export default randomNeighborhood;