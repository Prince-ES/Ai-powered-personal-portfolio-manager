import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js';
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

function LineChart({transactions}){

    let income = [];
    let expenses=[];

    const monthBasedTransactionsDistributions = new Map();

    for(const transaction of transactions){
      if(monthBasedTransactionsDistributions.has(new Date(transaction.date).toLocaleString("default",{month:"long"}))){

        if(transaction.type === 'income'){
          monthBasedTransactionsDistributions.get(new Date(transaction.date).toLocaleString("default",{month:"long"})).totalIncome+= transaction.amount;
        }else{
          monthBasedTransactionsDistributions.get(new Date(transaction.date).toLocaleString("default",{month:"long"})).totalExpenses+= transaction.amount;
        } 
      }
      else{

        if(transaction.type=== 'income'){
            monthBasedTransactionsDistributions.set(new Date(transaction.date).toLocaleString("default",{month:"long"}), {
              totalIncome: transaction.amount,
              totalExpenses: 0,
             })
        }else{
            monthBasedTransactionsDistributions.set(new Date(transaction.date).toLocaleString("default",{month:"long"}), {
              totalIncome: 0,
              totalExpenses: transaction.amount,
            })
        }
      }
    }


    const labels = [];
    
    for(const [key,value] of monthBasedTransactionsDistributions){
        labels.push(key);
        income.push(value.totalIncome);
        expenses.push(value.totalExpenses);
    }

    

    const data = {
    labels,
    datasets: [
        {
            label: "Income",
            data: income,
            borderColor:"#07e000",
            tension: 0.3
        },
        {
            label: "Expenses",
            data: expenses,
            borderColor: "red",
            tension: 0.3
        }
    ]
};

    const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "bottom",
            labels: {
                color: "white",
            },
        },
        title: {
            display: true,
            text: "Income vs Expenses",
            color:"white"
        }
    },
    scales: {
        x: {
            ticks: {
                color: "white",
            },
            grid: {
                color: "rgba(255,255,255,0.2)",
            },
        },
        y: {
            ticks: {
                color: "white",
            },
            grid: {
                color: "rgba(255,255,255,0.2)",
            },
        },
    },
    };
    return <Line className="line-chart bg-[#0d1b2a]/75 h-full rounded-[10px]" data={data} options={options}/>
}

export default LineChart;