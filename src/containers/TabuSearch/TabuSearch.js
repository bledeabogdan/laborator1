import React, { Component } from 'react';
import determineDistanceBetweenAllCities from '../../utils/determineDistanceBetweenCities';
import determineCitiesFromFile from '../../utils/determineCitiesFromFile';
import tabuSearch from '../../utils/tabuSearch';

class TabuSearch extends Component{
    state = {
        text: "",
        details: {},
        distances: null,
        iterations: 0,
        kTabu: 0
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
      kTabuChangeHandler = (event) => {
        this.setState({kTabu: event.target.value});
      }

      test = () =>{
            tabuSearch(this.state.iterations, this.state.kTabu, this.state.distances);
      }

    render(){
        let buttonRender = (this.state.iterations !== 0) && (this.state.temp !== 0) && (this.state.alpha !== 0);
        return(
        <div>
            <h1>Tabu Search - 105 city problem: lin105.tsp</h1>
            <input id="fileInput" type='file' onChange={event => this.openFile(event)} />
            <button onClick={this.citiesAndDistances}>Cities and distances</button>
            {this.state.distances ? <div>
                <label>Iteratii: </label><input type="text" placeholder="Iteratii" onChange={(event)=>this.iterationsChangeHandler(event)} /><br />
                <label>Const tabu: </label><input type="text" placeholder="Const tabu" onChange={(event)=>this.kTabuChangeHandler(event)} />
            </div> : null}
            { buttonRender ? <button onClick={this.test}>TS</button> : null}
        </div>
        );
    }
}

export default TabuSearch;