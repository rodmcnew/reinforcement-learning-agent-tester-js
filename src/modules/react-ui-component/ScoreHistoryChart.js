import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Chart from 'chart.js'

const chartGameCount = 200;

export default class ScoreHistoryChart extends Component {
    componentDidMount() {
        let chartCanvas = this.refs.chart;

        let myChart = new Chart(chartCanvas, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Average Final Score',
                        data: [],
                        backgroundColor: 'transparent',
                        borderColor: 'blue',
                        borderWidth: 1,
                        lineTension: 0
                    },
                    {
                        label: 'Final Score',
                        data: [],
                        backgroundColor: 'transparent',
                        borderColor: 'lightgrey',
                        borderWidth: 1,
                        lineTension: 0
                    },
                ]
            },
            options: {
                animation: {
                    duration: 0
                },
                elements: {point: {radius: 0}},
                scales: {
                    yAxes: [{
                        ticks: {
                            min: -1,
                            max: 1
                        }
                    }],
                    xAxes: [{
                        display: false
                    }]
                }
            }
        });

        this.setState({chart: myChart});
    }

    mapStatsToChartData(stats) {
        return {
            datasets: [
                {
                    data: stats.gameCountToAverageScore.slice(-chartGameCount),
                },
                {
                    data: stats.gameCountToScore.slice(-chartGameCount),
                },
            ],
            labels: Object.keys(stats.gameCountToScore).slice(-chartGameCount)
        }
    }

    componentDidUpdate() {
        const chart = this.state.chart;
        const data = this.mapStatsToChartData(this.props.stats);

        data.datasets.forEach((dataset, i) => chart.data.datasets[i].data = dataset.data);

        chart.data.labels = data.labels;
        chart.update();
    }


    render() {
        return (
            <canvas ref={'chart'} height={'300'} width={'700'}></canvas>
        );
    }
}

ScoreHistoryChart.propTypes = {
    stats: PropTypes.object.isRequired
};

