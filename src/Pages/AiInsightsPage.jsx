import Navbar from '../Components/Navbar';
import ReactMarkdown from 'react-markdown';
import {useState, useEffect} from 'react';
import DashboardLogo from '../assets/dashboardLogo.svg';
import { getAiInsights } from '../api/aiInsights';
// import '../Dashboard.css';

function AiInsightsPage ({transactions,prevMonthCategoryDistribution, monthBeforePrevCategoryDistribution}){
    const [analysis, setAnalysis] = useState('');

    // const prevMonthData = [];
    // const monthBeforePrevData = [];

    // function createDataArray(distributions, dataArray){
    //     for(const [key,value] of distributions){
    //         dataArray.push(value);
    //     }
    // }

    // createDataArray(prevMonthCategoryDistribution,prevMonthData);
    // createDataArray(monthBeforePrevCategoryDistribution, monthBeforePrevData);

    // console.log(prevMonthData);
    // console.log(monthBeforePrevData);
    let firstMonthData = [...prevMonthCategoryDistribution.entries()];
    let secondMonthData = [...monthBeforePrevCategoryDistribution.entries()];

    async function getAnalysis( forceNew = false){
        if(firstMonthData.length === 0 || secondMonthData.length === 0){
            setAnalysis('Not Enough data. have altleast two months data i.e, (previous and current so far)');
            return ;
        }
        const cachedAnalysis = localStorage.getItem('aiInsights');
        if(!forceNew && cachedAnalysis){
            setAnalysis(cachedAnalysis);
            return;
        }

        const response = await getAiInsights(firstMonthData, secondMonthData, 'aiInsightsPage');
        localStorage.setItem('aiInsights',response.data);
        setAnalysis(response.data);
    }

    useEffect(()=>{
        // eslint-disable-next-line
        if(transactions.length != 0)getAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[prevMonthCategoryDistribution, monthBeforePrevCategoryDistribution]);
    return (
        <div className="dashboard pt-16">
            <Navbar className="fixed w-full z-4 top-4" DashboardLogo={DashboardLogo} />
            <div className="content flex flex-col items-center gap-8 pt-8 relative z-3">
                <div className="pageTitle text-3xl font-bold text-white w-full max-md:text-center border-y border-white px-8 py-4 bg-black/35">
                    AI Financial Advisor
                </div>
                <div className="pageContent text-white bg-black/35 w-full px-8 py-4 max-md:px-4 flex flex-col gap-8 ">
                    <div className="heading text-2xl font-bold">This Month Compared to Previous</div>
                    <div className="text-lg flex flex-col gap-1 [&_ol]:list-decimal [&_ol]:mb-4 [&_ol]:ml-10 [&_ul]:list-disc  [&_ul]:mb-4 [&_ul]:ml-10">
                        <ReactMarkdown >
                            {analysis ? analysis : "Loading..."}
                        </ReactMarkdown>
                    </div>

                    <button className="newAnalysis text-xl underline flex flex-start cursor-pointer" onClick={()=>{
                        getAnalysis(true);
                    }}>
                        Generate New Analysis
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AiInsightsPage;