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


    if (!chartData || chartData.length === 0) {
        return (
        <div className="flex justify-center items-center text-2xl w-full h-full bg-white" >
            Loading chart...
        </div>
        );
    }

    const priceChartData = [...chartData.values].reverse().map((item)=>{
       return { x: new Date(item.datetime),
        o: Number(item.open),
        h: Number(item.high),
        l: Number(item.low),
        c: Number(item.close),
       }
    })

    const data = {
        datasets:[
            {
                label:chartData.meta.symbol,
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

    return <Chart type="candlestick" data={data} options={options} className="h-[400px]" />
}


export default PriceChartAAPL;