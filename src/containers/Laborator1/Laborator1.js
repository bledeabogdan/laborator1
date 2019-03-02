import React, { Component } from 'react';
import axios from 'axios';
import { object } from 'prop-types';
class Laborator1 extends Component {
    state = {
        objects: [],
        solution: "",
        numberOfObjects: 5,
        weight: 524
    }

    componentDidMount() {
        axios.get('https://artificial-inteligence-a6422.firebaseio.com/object5.json')
            .then(response => {
                console.log(response.data);
                let objects = response.data.objects;
                this.setState({objects: objects});
            })
            .catch(err => {
                console.log("Imposible!");
            })
    }

    randomIntFromInterval = (min,max) => {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    generateRandomSolution = () =>{
        let numberOfObjects = this.state.numberOfObjects;
        let number = 0;
        if(numberOfObjects > 30){
            number = this.randomIntFromInterval(1,Math.pow(2,30));
        } else{
            number = this.randomIntFromInterval(1,Math.pow(2,numberOfObjects));
        }
        var string = number.toString(2);
        while (string.length < numberOfObjects){
            string = Math.round(Math.random()) + string;
        }
        console.log("Solutia generata este:", string, ", cu lungimea: ", string.length);
        this.validateSolution(string);
    }

    validateSolution = (string) => {
        console.log(string, string.length);
        let objects = this.state.objects;
        let totalWeight = 0;
        let totalValue = 0;
        for(let i = 0; i < objects.length; i++){
            if(string[i]==='1'){
                totalWeight += objects[i].weight;
                totalValue += objects[i].value;
            }
        }
        if(totalWeight < this.state.weight){
            console.log("Solutia cu greutatea de ",totalWeight, " in valoare de ", totalValue);
        } else{
            console.log("Nu e solutie!");
        }
        console.log()
        console.log(objects);
    }

    weightChangeHandler = (event) => {
        let value = event.target.value;
        this.setState({weight: value});
    }

    numberOfObjectHandler = (event) => {
        var number = event.target.value;
        this.setState({numberOfObjects: number});
    }


    render(){
        return (
            <div>
                <h1>Laborator 1</h1>
                <select onChange={event => { this.weightChangeHandler(event) }}>
                    <option value="524">524</option>
                    <option value="200">200</option>
                </select>
                <select onChange={event => { this.numberOfObjectHandler(event) }}>
                    <option value="5">5</option>
                    <option value="20">20</option>
                    <option value="200">200</option>
                </select>
                <button onClick={this.generateRandomSolution}>Generati o solutie aleatoare</button>
            </div>
        );
    }
}

export default Laborator1;