import {Chart as chartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';

chartJS.register(ArcElement, Tooltip, Legend);

function PortfolioPieChart ({symbolBasedDistribution}){

    let chartData = [];
    let labelsData = [];

    for(const [key,value] of symbolBasedDistribution){
        console.log(key);
        chartData.push(value.totalAmount);
        labelsData.push(value.symbol);
    }

    console.log(chartData);

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

    const backgroundColors = labelsData.map((_,index)=>{
        return colors[index % colors.length];
    })
    

    const data = {
        labels:labelsData,
        datasets:[{
            data:chartData,
            backgroundColor:backgroundColors,
        borderColor: "#fff",
        borderWidth: 2,
        }]
    }

    const options = {
    responsive: true,
    layout:{
      padding:{
        right:20,
      }
    },
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
          return `₹ ${(context.raw).toLocaleString("en-IN", {
            minimumFractionDigits: 2
          })}`;
        }
      }
      },
      title: {
        display: true,
        text: "Portfolio Distribution",
        color:"white",
        font:{
            size:15
        }
      },
    },
  };


    return <Pie  data={data} options={options} />
}

export default PortfolioPieChart;

// tooltip: {
//   callbacks: {
//     label: (context) =>
//       `₹ ${context.raw.toLocaleString("en-IN", {
//         minimumFractionDigits: 2,
//       })}`,
//   },
// },