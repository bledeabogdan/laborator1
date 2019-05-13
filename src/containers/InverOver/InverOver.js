import React, { Component } from 'react';
import determineCitiesFromFile from '../../utils/determineCitiesFromFile';
import determineDistanceBetweenAllCities from '../../utils/determineDistanceBetweenCities';
import inverOver from '../../utils/inverOver';
class InverOver extends Component {
    state = {
        distances: null,
        generations: 0,
        candidates: 0,
        prob: 0
    }

    openFile = function (event) {
        var input = event.target;

        var reader = new FileReader();
        reader.onload = () => {
            this.setState({ text: reader.result });
            let t = this.state.text;
            this.setState({ details: determineCitiesFromFile(t) });
        };
        reader.readAsText(input.files[0]);
    }

    inputChangeHandler = event => {
        let state = this.state
        state[event.target.name] = event.target.value;
        this.setState({ ...state });
    }

    citiesAndDistances = () => {
        let distance = determineDistanceBetweenAllCities(this.state.details.citiesCoordinates);
        this.setState({ distances: distance });
    }

    test = () => {
        inverOver(this.state.candidates, this.state.generations, this.state.distances, this.state.prob)
    }

    render() {
        return (
            <div>
                <h1>Inver Over TSP</h1>
                <input id="fileInput" type='file' onChange={event => this.openFile(event)} />
                <button onClick={this.citiesAndDistances}>Cities and distances</button> <br />
                {this.state.distances ? <div><label>Candidates </label><input type="number" name="candidates" onChange={event => this.inputChangeHandler(event)} placeholder="candidates" /> <br />
                <label>Generations </label><input type="number" name="generations" onChange={event => this.inputChangeHandler(event)} placeholder="generations" /><br />
                <label>Probability </label><input type="number" name="prob" onChange={event => this.inputChangeHandler(event)} placeholder="prob" /><br /></div> : null}
                {this.state.prob !== 0 ? <button onClick={this.test}>PSO</button> : null}
            </div>
        )
    }
}

export default InverOver;