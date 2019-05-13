import React, { Component } from 'react';
import algoritmEvolutivFunctii from '../../utils/algoritmEvolutivFunctiiReale';
import { Line } from 'react-chartjs-2';
class RealFunction extends Component {
    state = {
        minInterval: -32.768,
        maxInterval: 32.768,
        candidates: 0,
        generations: 0,
        cross: 'direct',
        chartData: {
            labels: [],
            datasets: [
                {
                    label: 'Direct cross',
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 2.5,
                    pointHitRadius: 10,
                    data: []
                },
                {
                    label: 'Complete average cross',
                    backgroundColor: 'rgba(46,134,193,0.4)',
                    borderColor: 'rgba(46,134,193,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(46,134,193,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(46,134,193,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 2.5,
                    pointHitRadius: 10,
                    data: []
                },
                {
                    label: 'Convex cross',
                    backgroundColor: 'rgba(241,196,15,0.4)',
                    borderColor: 'rgba(241,196,15,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(241,196,15,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(241,196,15,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 2.5,
                    pointHitRadius: 10,
                    data: []
                }

            ]
        }
    }

    componentWillMount() {
        this.setState({ statistics: null });
    }

    candidatesChangeHandler = (event) => {
        this.setState({ candidates: event.target.value })
    }

    generationsChangeHandler = (event) => {
        this.setState({ generations: event.target.value })
    }

    handleCrossChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    clearChart = () => {
        let chartData = {...this.state.chartData}
        chartData.labels=[];
        chartData.datasets[0].data = [];
        chartData.datasets[1].data = [];
        chartData.datasets[2].data = [];
        this.setState({chartData:  chartData});
    }

    test = () => {
        let stat = algoritmEvolutivFunctii(this.state.candidates, this.state.generations, this.state.minInterval, this.state.maxInterval, this.state.cross);
        let chartData;
        switch (this.state.cross) {
            case 'direct':
                chartData = { ...this.state.chartData };
                chartData.labels = stat.generations;
                chartData.datasets[0].data = stat.bestFitness;
                break;
            case 'convex':
                chartData = { ...this.state.chartData };
                chartData.labels = stat.generations;
                chartData.datasets[1].data = stat.bestFitness;
                break;
            case 'complete':
                chartData = { ...this.state.chartData };
                chartData.labels = stat.generations;
                chartData.datasets[2].data = stat.bestFitness;
                break;
            default:
                chartData = { ...this.state.chartData };
                chartData.labels = stat.generations;
                chartData.datasets[0].data = stat.bestFitness;
                break;
        }
        this.setState({ chartData: chartData });
    }

    render() {
        let buttonRender = (this.state.candidates !== 0 && this.state.generations !== 0);
        return (
            <div>
                <h2>Functia Ackley</h2>
                <button onClick={this.clearChart}>Clear chart</button><br />
                <label>Numar candidati: </label><input type="number" placeholder="Numar candidati" onChange={(event) => this.candidatesChangeHandler(event)} /><br />
                <label>Numar generatii: </label><input type="number" placeholder="Generatii" onChange={(event) => this.generationsChangeHandler(event)} /><br />
                <label>Incrucisare: </label><select name="cross" onChange={(event) => this.handleCrossChange(event)}>
                    <option value="direct" default>direct cross</option>
                    <option value="convex" default>convex cross</option>
                    <option value="complete" default>complete average cross</option>
                </select>< br />
                {buttonRender ? <button onClick={this.test}>AE</button> : null}
                <Line
                    data={this.state.chartData}
                    width={100}
                    height={50}
                />
            </div>
        )
    }


}

export default RealFunction