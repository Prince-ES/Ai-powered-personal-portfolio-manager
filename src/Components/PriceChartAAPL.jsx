import { Chart as ChartJS, TimeScale, LinearScale, Tooltip, Legend} from "chart.js";
import {Chart} from 'react-chartjs-2';
import {CandlestickController, CandlestickElement} from "chartjs-chart-financial";
import "chartjs-adapter-date-fns";

ChartJS.register(
  TimeScale,
  LinearScale,
  Tooltip,
  Legend,
  CandlestickController,
  CandlestickElement
);

function PriceChartAAPL ({chartData}){
    const priceChartData = [...chartData].reverse().map((item)=>{
       return { x: new Date(item.datetime),
        o: Number(item.open),
        h: Number(item.high),
        l: Number(item.low),
        c: Number(item.close),
       }
    })

    console.log(priceChartData);

    const data = {
        datasets:[
            {
                label:"AAPL",
                data: priceChartData,
                barThickness:6,
                maxBarThickness:6
            }
        ]
    }

    const options = {
        responsive:true,
        maintainAspectRatio:false,
        parsing:false,
        scales:{
            x:{
                type: "time",
                time:{
                    unit:'day',
                },
                offset:true,
            },
            y:{
                position:"right",
            },
        },
    };

    return <Chart type="candlestick" data={data} options={options} />
}


export default PriceChartAAPL;