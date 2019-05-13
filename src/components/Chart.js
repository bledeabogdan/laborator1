import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: props.generations,
                datasets: [
                    {
                        label: 'Direct cross',
                        fillColor: 'rgba(220,220,220,0.2)',
                        strokeColor: 'rgba(220,220,220,1)',
                        pointColor: 'rgba(220,220,220,1)',
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(220,220,220,1)',
                        data: props.fitness
                    },
                    {
                        label: 'Complete average cross',
                        fillColor: 'rgba(220,220,220,0.2)',
                        strokeColor: 'rgba(220,220,220,1)',
                        pointColor: 'rgba(220,220,220,1)',
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(220,220,220,1)',
                        data: props.fitnessComplete
                    },
                    {
                        label: 'Convex cross',
                        fillColor: 'rgba(220,220,220,0.2)',
                        strokeColor: 'rgba(220,220,220,1)',
                        pointColor: 'rgba(220,220,220,1)',
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(220,220,220,1)',
                        data: props.fitnessConvex
                    }

                ]
            }
        }
    }

    render() {
        return (
            <Line
                data={this.state.chartData}
                width={100}
                height={50}
                options={{ maintainAspectRatio: false }}
                redraw
            />
        )
    }
}

export default Chart;