import Navbar from '../Components/Shared/Navbar';
import ReactMarkdown from 'react-markdown';
import {useState, useEffect} from 'react';
import axios from 'axios';
import DashboardLogo from '../assets/dashboardLogo.svg';
import '../Dashboard.css';

function AiInsightsPage ({transactions}){
    const [analysis, setAnalysis] = useState('');


    const prevMonthTransactions = [];
    const monthBeforePrevTransactions = [];

    for(const transaction of transactions){
        if(new Date(transaction.date).getMonth() === new Date().getMonth()-1){
            prevMonthTransactions.push(transaction);    
        }
        if(new Date(transaction.date).getMonth() ===new Date().getMonth()-2){
            monthBeforePrevTransactions.push(transaction);
        }
    }

    const prevMonthCategoryDistribution = new Map();
    const monthBeforePrevCategoryDistribution = new Map ();

    function categoryBasedDistributionFn(monthArrayItems, distributionObj){
        for(const monthArrayItem of monthArrayItems ){
            if(distributionObj.has(monthArrayItem.category)){
                const getItem = distributionObj.get(monthArrayItem.category);
                getItem.amount += monthArrayItem.amount;
            }else{
                distributionObj.set(monthArrayItem.category,{
                    amount:monthArrayItem.amount,
                })
            }
        }
    }

    categoryBasedDistributionFn(prevMonthTransactions,prevMonthCategoryDistribution);
    categoryBasedDistributionFn(monthBeforePrevTransactions, monthBeforePrevCategoryDistribution);

    // const prevMonthData = [];
    // const monthBeforePrevData = [];

    // function createDataArray(distributions, dataArray){
    //     for(const [key,value] of distributions){
    //         dataArray.push(value);
    //     }
    // }

    // createDataArray(prevMonthCategoryDistribution,prevMonthData);
    // createDataArray(monthBeforePrevCategoryDistribution, monthBeforePrevData);

    async function getAnalysis(){
            const response =await axios.post('http://localhost:5000/getAiAnalysis',{
                prevMonthCategoryDistribution,
                monthBeforePrevCategoryDistribution
            });
            setAnalysis(response.data);
    }

    useEffect(()=>{
        // eslint-disable-next-line
        getAnalysis();
    },[]);
    return (
        <div className="dashboard pt-4">
            <Navbar DashboardLogo={DashboardLogo}/>
            <div className="content flex flex-col items-center gap-8 pt-8 relative z-3">
                <div className="pageTitle text-3xl font-bold text-white w-full max-md:text-center border-y border-white px-8 py-4 bg-black/35">
                    AI Financial Advisor
                </div>
                <div className="pageContent text-white bg-black/35 w-full px-8 py-4 max-md:px-4 flex flex-col gap-8 ">
                    <div className="heading text-2xl font-bold">This Month Analysis</div>
                    <div className="text-lg flex flex-col gap-1 [&_ol]:list-decimal [&_ol]:mb-4 [&_ol]:ml-10 [&_ul]:list-disc  [&_ul]:mb-4 [&_ul]:ml-10">
                        <ReactMarkdown >
                            {analysis ? analysis : "Loading..."}
                        </ReactMarkdown>
                    </div>

                    <button className="newAnalysis text-xl underline flex flex-start" onClick={getAnalysis}>
                        Generate New Analysis
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AiInsightsPage;