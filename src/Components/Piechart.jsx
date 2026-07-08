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
    
    for(const [key,value] of monthBasedTransactionsDistributions){
      console.log(key);
        income.push(value.totalIncome);
        expenses.push(value.totalExpenses);
    }

    console.log(income,expenses);

    const labels = [];
    const chartData = [];

    // eslint-disable-next-line no-unused-vars
    for(const [key,value] of categoryBasedDistribution){
        if(value.type === 'expense'){
            labels.push(value.category);
            chartData.push(value.total);
        }
    }

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
      },
    },
  };

   return <div style={{ width: "300px", height: "300px" }}> <Pie data={data} options={options} /> </div>;
}

export default Piechart;