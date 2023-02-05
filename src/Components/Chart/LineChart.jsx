import React from 'react'
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
import '../Card/Card.css';

ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend
);
import axios from 'axios';

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'SENSORES',
    },
  },
};


function LineChart() {
    const [chartData, setChartData] = useState({});
    useEffect(()=>{
        const fetchData = async() => {
            const {data} =await axios.get("http://localhost:3070/api/v1/sensor")
            setChartData({
                labels: data.map((item)=> item.readingdate),
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
  return (
    <div>
      {
        chartData && chartData?.datasets &&(
        <Line options={options} data={chartData} className='chartSensor'/>
        )
      }       

<div>
        <div className="dashboardGrid-chart">
          New users/projects trend per day
        </div>
        <AreaChart
          width={700}
          height={250}
          data={PREVIOUS_WEEK_DATA}
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
            name="Projects"
            type="monotone"
            dataKey="projects"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            name="Users"
            type="monotone"
            dataKey="users"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </div>



    </div>
  )
}

export default LineChart