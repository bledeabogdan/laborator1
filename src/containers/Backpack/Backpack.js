import React, { Component } from 'react';
import axios from 'axios';
import algoritmEvolutiv from '../../utils/algoritmEvolutiv';
class Backpack extends Component {
    state = {
        candidates: 0,
        generations: 0,
        backpack: 20,
        maxWeight: 0,
        objects: []
    }

    componentDidMount(){
        axios.get('https://artificial-inteligence-a6422.firebaseio.com/object' + this.props.numberOfObjects + '.json')
        .then(response => {
            this.setState({
                objects: response.data.objects,
                maxWeight: response.data.weight
            });
        })
        .catch(err => {
            console.log("Something went wrong!");
        })
    }

    candidatesChangeHandler = (event) =>{
        this.setState({candidates: event.target.value})
    }

    generationsChangeHandler = (event) => {
        this.setState({generations: event.target.value})
    }

    test = () => {
        algoritmEvolutiv(this.state.candidates,this.state.generations,this.state.objects,this.state.maxWeight);
    }

    render(){
        let buttonRender = (this.state.candidates !==0 && this.state.generations !==0);
        return(
            <div>
                <h2>Rucsac {this.props.numberOfObjects}</h2>
                <label>Numar candidati: </label><input type="number" placeholder="Numar candidati" onChange={(event)=>this.candidatesChangeHandler(event)} /><br />
                <label>Njumar generatii: </label><input type="number" placeholder="Generatii" onChange={(event)=> this.generationsChangeHandler(event)} /><br />
                {buttonRender ? <button onClick={this.test}>AE</button> : null}
            </div>
    )
        }
}

export default Backpack;