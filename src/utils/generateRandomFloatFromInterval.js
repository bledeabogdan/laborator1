const generateRandomFloatFromInterval = (min,max) =>{
    return Math.random() * (max - min) + min;
}

export default generateRandomFloatFromInterval;