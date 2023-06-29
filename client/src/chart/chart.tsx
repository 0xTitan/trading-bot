import { useState, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, LineController, TimeScale, CategoryScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from "react-chartjs-2";
import transformDataForChart from './transformDatas';
import pairModel from '../apollo/pairModel';
import client from '../apollo/apolloClient';




//ChartJS.register(Tooltip, Legend, TimeScale, LinearScale, PointElement, CategoryScale);

ChartJS.register(LineController, LineElement, PointElement, LinearScale, TimeScale, CategoryScale, Title);

function PairChart() {
    const ref = useRef();
    const { loading, error, data } = useQuery(pairModel, { client });

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const chartData = transformDataForChart(data.pairs);
    console.log(chartData);

    return (
        <div>
            <Line ref={ref} data={chartData} options={{
                responsive: true,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'minute',
                        }
                    },
                },
            }} />
        </div>
    );

    // const dataTest = {
    //     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    //     datasets: [
    //         {
    //             label: 'First dataset',
    //             data: [33, 53, 85, 41, 44, 65],
    //             fill: true,
    //             backgroundColor: 'rgba(75,192,192,0.2)',
    //             borderColor: 'rgba(75,192,192,1)'
    //         },
    //         {
    //             label: 'Second dataset',
    //             data: [33, 25, 35, 51, 54, 76],
    //             fill: false,
    //             borderColor: '#742774',
    //         },
    //     ],
    // };

    //return <Line ref={ref} data={dataTest} />
};

export default PairChart;
