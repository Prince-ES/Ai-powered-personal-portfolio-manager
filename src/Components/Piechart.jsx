import {Chart as chartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';

chartJS.register(ArcElement, Tooltip, Legend);

function Piechart({transactions}){
    //get category wise spent for all transactions
     const categoryBasedDistribution = new Map();
    
    for(const transaction of transactions){
      const category = transaction.category.toLowerCase();
        if(categoryBasedDistribution.has(category)){
            categoryBasedDistribution.get(category).total += transaction.amount;
        }else{
            categoryBasedDistribution.set(category,{
                category:(category),
                total:transaction.amount,
                type:transaction.type,
            })
        }
    }

    const labels = [];
    const chartData = [];

    // eslint-disable-next-line no-unused-vars
    for(const [key,value] of categoryBasedDistribution){
        if(value.type.toLowerCase() === 'expense'){
            labels.push(value.category);
            chartData.push(value.total.toFixed(2));
        }
    }

    console.log(transactions,chartData,labels);
    const colors = [
        "#4CAF50",
        "#F44336",
        "#2196F3",
        "#FF9800",
        "#9C27B0",
        "#FFEB3B",
        "#009688",
        "#E91E63",
        "#3F51B5",
        "#795548",
        "#607D8B",
        "#8BC34A"
      ];

    const backgroundColors = labels.map((_,index)=>{
      return colors[index % colors.length]
    })

    const data = {
        labels:labels,
        datasets:[{
            data:chartData,
            backgroundColor:backgroundColors,
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
        color:"white"
      },
    },
  };

   return <div style={{ width: "300px", height: "300px" }}> <Pie data={data} options={options} /> </div>;
}

export default Piechart;