const determineDistanceBetweenCities = (citiesCoordinates) => {
    let distanceBetweenCities = new Array(citiesCoordinates.length);
    for (let i = 0; i < distanceBetweenCities.length; i++) {
        distanceBetweenCities[i] = new Array(citiesCoordinates.length).fill(0);
    }
    for (let i = 0; i < citiesCoordinates.length; i++) {
        for (let j = 0; j < citiesCoordinates.length; j++) {
            let distance = (Math.sqrt(Math.pow((Number(citiesCoordinates[i].x) - Number(citiesCoordinates[j].x)), 2) + Math.pow((Number(citiesCoordinates[i].y) - Number(citiesCoordinates[j].y)), 2))).toFixed(2);
            distanceBetweenCities[i][j] = Number(distance);
        }
    }

    return distanceBetweenCities;
}

export default determineDistanceBetweenCities;