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

    console.log(monthBasedTransactionsDistributions);

    const labels = [];
    
    for(const [key,value] of monthBasedTransactionsDistributions){
        labels.push(key);
        income.push(value.totalIncome);
        expenses.push(value.totalExpenses);
    }

    console.log(income,expenses);
    

    const data = {
    labels,
    datasets: [
        {
            label: "Income",
            data: income,
            borderColor: "green",
            backgroundColor: "rgba(0, 128, 0, 0.2)",
            tension: 0.3
        },
        {
            label: "Expenses",
            data: expenses,
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            tension: 0.3
        }
    ]
};

    const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
            labels: {
                color: "white",
            },
        },
        title: {
            display: true,
            text: "Income vs Expenses"
        }
    }
};
    return <Line data={data} options={options}/>
}

export default LineChart;