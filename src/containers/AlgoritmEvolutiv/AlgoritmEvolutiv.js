import React, {Component} from 'react';
import Backpack from '../Backpack/Backpack'

class AlgoritmEvolutiv extends Component {
    render(){ 
        
        return (
            <div>
                <h1>Algoritm evolutiv</h1>
                <Backpack numberOfObjects="20" />
                <Backpack numberOfObjects="200" />
            </div>
        )
    }
}

export default AlgoritmEvolutiv;