import React, {Component} from 'react';
import Backpack from '../Backpack/Backpack'
import RealFunction from '../RealFunction/RealFunction';


class AlgoritmEvolutiv extends Component {
    render(){ 
        
        return (
            <div>
                <h1>Algoritm evolutiv - backpack, functii reale</h1>
                <Backpack numberOfObjects="20" />
                <Backpack numberOfObjects="200" />
                <RealFunction />
            </div>
        )
    }
}

export default AlgoritmEvolutiv;