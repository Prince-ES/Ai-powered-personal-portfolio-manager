// import dashboardBg from '../assets/DashboardBg.png';
import Navbar from '../Components/Shared/Navbar';
import Piechart from '../Components/Piechart';
import LineChart from '../Components/LineChart';
import ReactMarkdown from 'react-markdown';
import {useState, useEffect} from 'react';
import axios from 'axios';
import '../Dashboard.css';
import { formatTransactionAmount } from '../Components/Shared/transAmtFormatting';
import DashboardLogo from '../assets/DashboardLogo.svg';
function Dashboard ({transactions, holdings, prevMonthCategoryDistribution, monthBeforePrevCategoryDistribution}){

    const [analysis, setAnalysis] = useState('');
    //net worth calculation
    let income = 0;
    let expenses = 0;
    for(let i = 0; i < transactions.length; i++){
        if(transactions[i].type === 'income'){
            income+=transactions[i].amount;
        }else{
            expenses+=transactions[i].amount;
        }
    }
    // const netWorth = income-expenses;
    
    //portfolio calculation
    let portfolioValue = 0;
    for(let i = 0; i < holdings.length; i++){
        portfolioValue+= holdings[i].quantity * holdings[i].currentPrice;
    }

    const netWorth = (portfolioValue+income)-expenses;

    let monthdata1 = [];
    let monthdata2 = [];

    // eslint-disable-next-line no-unused-vars
    for(const [key,value] of prevMonthCategoryDistribution){
        if(value.type === 'expense'){
            monthdata1.push([key,value]);
        }
    }

    // eslint-disable-next-line no-unused-vars
    for(const [key,value] of monthBeforePrevCategoryDistribution){
        if(value.type === 'expense'){
            monthdata2.push([key,value]);
        }
    }

    async function getAnalysis(){
            if(monthdata1.length === 0 || monthdata2.length === 0){
                setAnalysis('Not Enough Data. Have atleast two months data i.e, (previous and current till date)');
                return;
            }
            const response =await axios.post('http://localhost:5000/getAiAnalysis',{
                data1:monthdata1,
                data2:monthdata2,
                type:'dashboard',
            });

            setAnalysis(response.data);
    }

    useEffect(()=>{
        // eslint-disable-next-line
        if(transactions.length != 0)getAnalysis();
    },[prevMonthCategoryDistribution, monthBeforePrevCategoryDistribution]);

    return (
        <div className="dashboard pt-4 xl:overflow-hidden m-0  ">
            <Navbar className="fixed w-full z-4" DashboardLogo={DashboardLogo} />
            <div className="dashboard-content  pb-4 flex flex-col relative z-3  h-full ">
                <div className="h-screen w-full flex flex-col items-center justify-center">
                    <div className="text-white p-8  flex flex-col items-center justify-center transform translate-y-[-13%] gap-16">
                        <h1 className="gradientTitle text-8xl font-bold text-center">Your <span className='bwGradientText'>Financial</span> Dashboard</h1>
                        <h2 className="text-5xl font-bold text-center">Track your net worth, monitor spending, review investments, and uncover insights—all in one place.</h2>
                    </div>
                </div>
                <div className={`exampleData text-4xl font-bold text-white text-left pl-8 ${transactions.length === 192 ? 'block': 'hidden' } `}>Example Data</div>
                <div className="summaryCards w-full px-8 pt-8 pb-8 flex justify-between flex-col gap-8">
                    <div className="overviewAndInsights  flex flex-col justify-between h-full w-full">
                        <div className="overview w-full rounded-[10px] bg-black/35 border border-[374151] text-white flex items-center text-xl  px-8 py-8 mb-8 justify-between max-sm:flex-col ">
                            <div className="netWorth flex flex-col justify-center items-center">
                                <h1 className="label font-bold">
                                    Net Worth
                                </h1>
                                <div className="amount">
                                    {formatTransactionAmount(netWorth)}
                                </div>
                            </div>
                            <div className="monthlySavings flex flex-col items-center mx-4 max-sm:my-4">
                                <h1 className="label font-bold text-center">
                                    Monthly Savings
                                </h1>
                                <div className="amount">
                                    {formatTransactionAmount(income-expenses)}
                                </div>
                            </div>
                            <div className="portfolioValue flex flex-col items-center ">
                                <h1 className="label font-bold text-center">
                                    Portfolio Value
                                </h1>
                                <div className="amount">
                                    {formatTransactionAmount(portfolioValue)}
                                </div>
                            </div>
                        </div>
                        <div className="insightst w-full rounded-[10px] bg-black/35 border border-[374151] flex justify-between  text-white max-lg:flex-col max-sm:items-center">
                            <div className="labelAndPiechart w-[40%] max-lg:w-full flex flex-col px-8 p-4 gap-4 items-center max-sm:w-full">
                                <h1 className="label text-xl font-bold ">Category Breakdown Pie Chart</h1>
                                <Piechart transactions={transactions}/>
                            </div>
                            <div className="aiInsights w-[60%] max-lg:w-full px-8 py-4 max-sm:w-full max-sm:flex max-sm:items-center max-sm:flex-col">
                                <h1 className="label text-xl font-bold mb-4 ">Ai Insights</h1>
                                <div className="text-lg flex flex-col gap-1 [&_ol]:list-decimal [&_ol]:mb-4 [&_ol]:ml-10 [&_ul]:list-disc  [&_ul]:mb-4 [&_ul]:ml-10">
                                    <ReactMarkdown >
                                        {analysis ? analysis : "Loading..."}
                                    </ReactMarkdown>
                                </div>                           

                            </div>
                        </div>
                    </div>
                    <div className="incomeExpChart w-full h-[500px] p-8  text-white bg-black/35 border border-[374151] rounded-[10px] max-xl:mt-8  flex flex-col">
                        <h1 className="label text-2xl font-bold mb-4 h-[10%]">Income vs Expenses</h1>
                        <div className="chart w-full h-[90%] rounded-[10px]">
                            <LineChart className="bg-white"transactions={transactions}/>
                        </div>  
                    </div>
                </div>
                <div className="recentTransactions w-full px-8">
                    <div className=" w-full bg-black/35 border border-[374151] px-8 py-2 text-white rounded-[10px]">
                        <h1 className="label font-bold text-2xl mb-2">Recent Transactions</h1>
                        <ul className=" gap-1/2 text-lg">
                            {
                                [...transactions].reverse().slice(0,2).map((transaction)=>{
                                   return <div className="grid grid-cols-4 justify-between" key={transaction._id}>
                                            <span>{transaction.title} </span>
                                            <span>{formatTransactionAmount(transaction.amount)}</span>
                                            <span>{transaction.category}</span>
                                            <span>{new Date(transaction.date).toLocaleString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}</span>
                                          </div>
                                })
                            }
                        </ul>
                    </div>
                </div>
                

            </div>
        </div>
    );
}

export default Dashboard;