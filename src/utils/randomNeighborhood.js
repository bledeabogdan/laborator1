import twoSwap from './twoSwap';
import twoOpt from './twoOpt';

const randomNeighborhood = (c, neighborFunction) => {
    if(neighborFunction === '2swap'){
        return twoSwap(c);
    } else{
        return twoOpt(c);
    }
}

export default randomNeighborhood;