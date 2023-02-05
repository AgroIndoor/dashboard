import React, { useEffect, useState } from "react";
import './Card.css';
import { Card, Statistic} from "semantic-ui-react";
import axios, { formToJSON } from 'axios';
import 'dracula-ui/styles/dracula-ui.css'
import { Button} from "dracula-ui";

import {
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Area,
} from "recharts";

  import '../Card/Card.css';

const NODE_URL = "http://localhost:3070/api/v1/arduino/now";
const CHART_URL = "http://localhost:3070/api/v1/sensor"

function SensorBox() {
    const [isOn, setIsOn] = useState(false);
    const [boxData, setBoxData] = useState({});
    const [chartData, setChartData] = useState({});

    useEffect(()=>{
        const intervalId = setInterval(async () => {
            const response = await axios.get(NODE_URL);
            setBoxData(response.data);
          }, 13000);

          const fetchData = async() => {
            const {data} =await axios.get("http://localhost:3070/api/v1/sensor")
              setChartData(data.map(item => (
                  {
                      name: item?.readingdate,
                      temperature: item?.temperature,
                      humidity: item?.humidity,
                      ph: item?.ph,
                      co2: item?.co2,
                  }

                 )));
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
                  </div>
                    <AreaChart
                      width={700}
                      height={300}
                      data={chartData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area
                        name="Temperatura"
                        type="monotone"
                        dataKey="temperature"
                          stroke="#ff79c6"
                        fillOpacity={1}
                        fill="url(#colorUv)"
                      />
                      <Area
                        name="Umidade"
                        type="monotone"
                        dataKey="humidity"
                        stroke="#82ca9d"
                        fillOpacity={1}
                        fill="url(#colorPv)"
                      />

                    </AreaChart>
                </div>
            </div>
            <div>

<Button color="purple" size="lg" m="sm" onClick={handleClick}>
                    {isOn ? 'Ligar Ventilação' : 'Desligar Ventilação'}
                </Button>


                <Button color="purple" size="lg" m="sm" onClick={handleClick}>
                {isOn ? 'Ligar Ventilação' : 'Desligar Ventilação'}
                </Button>


                <Button color="purple" size="lg" m="sm" onClick={handleClick}>
                {isOn ? 'Ligar Ventilação' : 'Desligar Ventilação'}
                </Button>
            </div>
        </>
    )
}
export default SensorBox;