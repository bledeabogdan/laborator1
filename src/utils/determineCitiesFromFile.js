
const determineCitiesFromFile = (text) => {
    var test = text.split('\n');
    var details = {
        numberOfCities: 0,
        citiesCoordinates: []
    }

    var dimension = test[3];
    dimension=dimension.split(': ');
    details.numberOfCities = Number(dimension[1]);

    for(let i=6;i<test.length-2;i++){
        let coordinate = test[i].split(' ');
        let finalCoordinate = {
            x: coordinate[1],
            y: coordinate[2]
        }
        details.citiesCoordinates.push(finalCoordinate);
    }

    return details;
}

export default determineCitiesFromFile;