import React, { useEffect, useState } from "react";
import './Card.css';
import { Card, Statistic } from "semantic-ui-react";
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

const BOXES = [
    {title: "Temperatura",
    className: "green",
    },
    {
        title: "Temperatura",
    className: "red",
    },
    {
        title: "pH",
    },
    {
        title: "CO2",
    },
];

function SensorBox() {

    const [chartData, setChartData] = useState({});
    useEffect(()=>{
        const fetchData = async() => {
            const {data} =await axios.get("http://localhost:3070/api/v1/sensor")
            setChartData({
                labels: data.map(item=> item.readingdate),
                datasets: [
                    {
                        label: "Temperatura",
                        data: data.map((item) => item.temperature),
                        fill: "true",
                        borderColor: "rgb(255,99,132)",
                        backgroudColor: "rgb(255,99,132, 0.5)"
                    },
                    {
                        label: "Humidity",
                        data: data.map((item) => item.humidity),
                        fill: "true",
                        borderColor: "rgb(255,108,100)",
                        backgroudColor: "rgb(255,99,132, 0.5)"
                    },
                ]
            })
        }
        fetchData()
    }, [] )

    return(
        <>
            <div className="dashboardLayout-grid">
                <div className="dashboardLayout-boxes">
                    {BOXES.map((box, i) => (
                    <Card className="dashboardLayout-boxes-item" centered raised>
                    <Statistic
                        className={box.className ? box.className : ""}
                        as="h4"
                        label={box.title}
                        value="26"
                    />
                    </Card>
                    ))}    
                </div>
                <div>
                    <div className="chart">
                        {
                            chartData && chartData?.datasets &&(
                                <Line options={options} data={chartData} className='chartSensor'/>
                            )
                        } 
                    </div>
                </div>
            </div>
        </>
    )
}
export default SensorBox;