import React, { Component } from 'react';
import determineDistanceBetweenAllCities from '../../utils/determineDistanceBetweenCities';
import determineCitiesFromFile from '../../utils/determineCitiesFromFile';
import simulatedAnealing from '../../utils/simulatedAnealing';

class SimulatedAnealing extends Component{
    state = {
        text: "",
        details: {},
        distances: null,
        iterations: 0,
        maxTemp: 0,
        minTemp: 0,
        alpha: 0,
        neighborFunction: "2opt"
    }

    openFile = function(event) {
        var input = event.target;
    
        var reader = new FileReader();
        reader.onload = () => {
            this.setState({text: reader.result});
            let t = this.state.text;
            this.setState({details: determineCitiesFromFile(t)});
        };
        reader.readAsText(input.files[0]);
      };

      citiesAndDistances = () => {
        let distance = determineDistanceBetweenAllCities(this.state.details.citiesCoordinates);
        this.setState({distances: distance});
      }

      iterationsChangeHandler = (event) => {
        this.setState({iterations: event.target.value});
      }

      tempChangeHandler = (event) => {
        this.setState({maxTemp: event.target.value});
      }

      minTempChangeHandler = (event) => {
        this.setState({minTemp: event.target.value});
      }

      alphaChangeHandler = (event) => {
        this.setState({alpha: event.target.value});
      }

      selectChangeHandler = (event) =>{
        this.setState({neighborFunction: event.target.value});
      }

      test = () =>{
            simulatedAnealing(this.state.iterations, this.state.maxTemp, this.state.alpha, this.state.minTemp, this.state.distances, this.state.neighborFunction);
      }

    render(){
        let buttonRender = (this.state.iterations !== 0) && (this.state.temp !== 0) && (this.state.alpha !== 0);
        return(
        <div>
            <h1>Simulated Anealing - 105 city problem: lin105.tsp</h1>
            <input id="fileInput" type='file' onChange={event => this.openFile(event)} />
            <button onClick={this.citiesAndDistances}>Cities and distances</button>
            {this.state.distances ? <div>
                <label>Iteratii: </label><input type="text" placeholder="Iteratii" onChange={(event)=>this.iterationsChangeHandler(event)} /><br />
                <label>Temperatura maxima: </label><input type="text" placeholder="Temperatura max" onChange={(event)=> this.tempChangeHandler(event)} /><br />
                <label>Alpha: </label><input type="text" placeholder="Alpha" onChange={(event)=>this.alphaChangeHandler(event)} /><br />
                <label>Temperatura minima: </label><input type="text" placeholder="Temperatura min" onChange={(event)=>this.minTempChangeHandler(event)} /><br />
                <label>Functia de vecinatate: </label><select  onChange={event => this.selectChangeHandler(event)}>
                  <option value="2opt">2Opt</option>
                  <option value="2swap">2Swap</option>
                </select>
            </div> : null}
            { buttonRender ? <button onClick={this.test}>SA</button> : null}
        </div>
        );
    }
}

export default SimulatedAnealing;