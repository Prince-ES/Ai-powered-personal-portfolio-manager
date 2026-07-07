import {Chart as chartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';

chartJS.register(ArcElement, Tooltip, Legend);

function Piechart({transactions}){
    //get category wise spent for all transactions
     const categoryBasedDistribution = new Map();
    
    for(const transaction of transactions){
        if(categoryBasedDistribution.has(transaction.category)){
            categoryBasedDistribution.get(transaction.category).total += transaction.amount;
        }else{
            categoryBasedDistribution.set(transaction.category,{
                category: transaction.category,
                total:transaction.amount,
                type:transaction.type,
            })
        }
    }

    const labels = [];
    const chartData = [];

    // eslint-disable-next-line no-unused-vars
    for(const [key,value] of categoryBasedDistribution){
        if(value.type === 'Expenses'){
            labels.push(value.category);
            chartData.push(value.total);
        }
    }

    const data = {
        labels:labels,
        datasets:[{
            data:chartData,
            backgroundColor: [
          "green",
          "red",
          "blue",
          "pink",
          "yellow",
          "purple", 
        ],
        borderColor: "#fff",
        borderWidth: 2,
        }]
    }

    const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
        color: "white",
      },
      },
      tooltip:{
        callbacks: {
        label: function (context) {
          return `₹ ${context.raw}`;
        }
      }
      },
      title: {
        display: true,
        text: "expenses by Category",
      },
    },
  };

   return <div style={{ width: "300px", height: "300px" }}> <Pie data={data} options={options} /> </div>;
}

export default Piechart;