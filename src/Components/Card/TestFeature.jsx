import React, { useEffect, useState } from "react";
import './Card.css';
import { Card, Statistic} from "semantic-ui-react";
import axios, { formToJSON } from 'axios';
import 'dracula-ui/styles/dracula-ui.css'
import { Button} from "dracula-ui";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import '../Card/Card.css';

  ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
  );

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: '',
      },
    },
  };

  import '../Card/Card.css';

const NODE_URL = "http://localhost:3070/api/v1/arduino/now";
const CHART_URL = "http://localhost:3070/api/v1/sensor"

function SensorBox() {
    const [isOn, setIsOn] = useState(false);
    const [isAguaOn, setAguaOn] = useState(false);
    const [isLuzOn, setLuzOn] = useState(false);
    const [boxData, setBoxData] = useState({});
    const [chartData, setChartData] = useState({});

    useEffect(()=>{
        const intervalId = setInterval(async () => {
            const response = await axios.get(NODE_URL);
            setBoxData(response.data);
          }, 50000);
        const fetchData = async() => {
            const {data} =await axios.get("http://localhost:3070/api/v1/sensor")
            console.log(data)
            var date;
            setChartData({
                labels: data.map((item)=> {
                     const date = new Date(item.readingdate);
                    return date.toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'short',
                        hour: 'numeric',
                        minute: 'numeric'
                    });
                }),
                datasets: [
                    {
                        label: "Temperatura",
                        data: data.map((item) => item.temperature),
                        fill: true,
                        borderColor: "#bd93f9",
                        backgroudColor: "rgba(53, 162, 235, 0.5)"
                    },
                    {
                        label: "Humidity",
                        data: data.map((item) => item.humidity),
                        fill: true,
                        borderColor: "rgb(139, 233, 253)",
                        backgroudColor: "rgb(255,99,132)"
                    },
                    {
                        label: "pH",
                        data: data.map((item) => item.ph),
                        fill: true,
                        borderColor: "rgb(255, 87, 51)",
                        backgroudColor: "rgb(255, 87, 51, 0.7)"
                    },
                ]
            })
        }
        fetchData();
          return () => clearInterval(intervalId);
        }, []);

    const BOXES = [
        {title: "Temperatura",
        className: "red",
        value: boxData?.temperature,
        },
        {
            title: "Umidade",
            className: "green",
            value: boxData?.humidity
        },
        {
            title: "pH",
            className: "white",
            value: boxData?.ph

        },
        {
            title: "CO2",
            className: "red",
            value: boxData?.co2 + " ppm",
        },
    ];


    const handleClick = () => {
        setIsOn(!isOn);

        const requestURL = isOn? 'http://192.168.30.104:8080/fan=1' : 'http://192.168.30.104:8080/fan=0';
        axios.post(requestURL);
    }

    const handleClick1 = () => {
        setAguaOn(!isAguaOn);
        const requestURL1 = isOn? 'http://192.168.30.104:8080/agua=1' : 'http://192.168.30.104:8080/agua=0';
        axios.post(requestURL1);
    }

    const handleClick2 = () => {
        setLuzOn(!isLuzOn);

        const requestURL2 = isOn? 'http://192.168.30.104:8080/luz=1' : 'http://192.168.30.104:8080/luz=0';
        axios.post(requestURL2);
    }

    return(
        <>
            <div className="dashboardLayout-grid">
                <div className="dashboardLayout-boxes">
                    {BOXES.map((box, i) => (
                    <Card className="dashboardLayout-boxes-item" centered raised>
                        <boxData/>
                    <Statistic
                        className={box.className ? box.className : ""}
                        as="h4"
                        label={box.title}
                        value={box.value? box.value: "_"}
                    />
                    </Card>
                    ))}
                </div>
                <div>
                  <div className="dashboardLayout_grid_chart">
                    Sensores Arduino
                      {
                        chartData && chartData?.datasets &&(
                                <Line options={options} data={chartData} className='chartSensor'/>
                                )
                    }
                  </div>

                </div>
            </div>
            <div className='card_btn'>

                <Button color="purple" size="lg" m="sm" onClick={handleClick}>
                    {isOn ? 'Ligar Ventilação' : 'Desligar Ventilação'}
                </Button>


                <Button color="purple" size="lg" m="sm" onClick={handleClick2}>
                {isLuzOn ? 'Ligar Iluminação' : 'Desligar Iluminação'}
                </Button>


                <Button color="purple" size="lg" m="sm" onClick={handleClick1}>
                {isAguaOn ? 'Ligar Irrigação' : 'Desligar Irrigação'}
                </Button>
            </div>
        </>
        )
}
export default SensorBox;