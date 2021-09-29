import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js'

const chartGameCount = 200;

const ScoreHistoryChart = ({ stats }) => {
    const chartCanvasRef = useRef(null);
    const chartRef = useRef(null);
    useEffect(() => {
        if (!chartCanvasRef.current) {
            return;
        }
        chartRef.current = new Chart(chartCanvasRef.current, {
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
                elements: { point: { radius: 0 } },
                scales: {
                    yAxes: [{
                        ticks: {
                            min: -5,
                            max: 5
                        }
                    }],
                    xAxes: [{
                        display: false
                    }]
                }
            }
        });

        return () => {
            chartRef.current.destroy();
            chartRef.current = null; // This was proven to be needed while profiling for memory leaks
        }
    }, [chartCanvasRef.current])

    if (chartRef.current) {
        const data = {
            datasets: [
                {
                    data: stats.gameCountToAverageScore.slice(-chartGameCount),
                },
                {
                    data: stats.gameCountToScore.slice(-chartGameCount),
                },
            ],
            labels: Object.keys(stats.gameCountToScore).slice(-chartGameCount)
        };
        data.datasets.forEach((dataset, i) => chartRef.current.data.datasets[i].data = dataset.data);
        chartRef.current.data.labels = data.labels;
        chartRef.current.update();
    }


    return <canvas ref={chartCanvasRef} height={'300'} width={'700'}></canvas>
}

export default ScoreHistoryChart;