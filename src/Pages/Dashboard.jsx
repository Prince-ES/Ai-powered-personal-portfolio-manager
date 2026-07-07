// import dashboardBg from '../assets/DashboardBg.png';
import Navbar from '../Components/Shared/Navbar';
import Piechart from '../Components/Piechart'
import '../Dashboard.css';
import DashboardLogo from '../assets/DashboardLogo.svg';
function Dashboard ({transactions, holdings}){
    //net worth calculation
    let income = 0;
    let expenses = 0;
    for(let i = 0; i < transactions.length; i++){
        if(transactions[i].type === 'Income'){
            income+=transactions[i].amount;
        }else{
            expenses+=transactions[i].amount;
        }
    }
    const netWorth = income-expenses;
    
    //portfolio calculation
    let portfolioValue = 0;
    for(let i = 0; i < holdings.length; i++){
        portfolioValue+= holdings[i].quantity * holdings[i].currentPrice;
    }

    return (
        <div className="dashboard pt-8 xl:overflow-hidden m-0  ">
            <Navbar DashboardLogo={DashboardLogo} />
            <div className="dashboard-content  pb-8 flex flex-col items-center h-full ">
                <div className="summaryCards w-full px-8 pt-8 pb-8 flex  justify-between max-lg:flex-col">
                    <div className="overviewAndInsights w-[49%] flex flex-col justify-between h-full max-lg:w-full">
                        <div className="overview w-full rounded-[10px] bg-black/35 border border-[374151] text-white flex items-center text-xl  px-8 py-8 mb-8 justify-between max-sm:flex-col ">
                            <div className="netWorth flex flex-col justify-center items-center">
                                <h1 className="label font-bold">
                                    Net Worth
                                </h1>
                                <div className="amount">
                                    ₹{netWorth.toLocaleString("en-IN")}
                                </div>
                            </div>
                            <div className="monthlySavings flex flex-col items-center mx-4 max-sm:my-4">
                                <h1 className="label font-bold text-center">
                                    Monthly Savings
                                </h1>
                                <div className="amount">
                                    ₹{(income-expenses).toLocaleString("en-IN")}
                                </div>
                            </div>
                            <div className="portfolioValue flex flex-col items-center ">
                                <h1 className="label font-bold text-center">
                                    Portfolio Value
                                </h1>
                                <div className="amount">
                                    ₹{portfolioValue.toLocaleString("en-IN")}
                                </div>
                            </div>
                        </div>
                        <div className="insightst w-full rounded-[10px] bg-black/35 border border-[374151] flex justify-between  text-white max-sm:flex-col max-sm:items-center">
                            <div className="labelAndPiechart w-[50%] flex flex-col px-8 p-4 gap-4 items-center max-sm:w-full">
                                <h1 className="label text-xl font-bold ">Category Breakdown Pie Chart</h1>
                                <Piechart transactions={transactions}/>
                            </div>
                            <div className="aiInsights w-[50%] px-8 py-4 max-sm:w-full max-sm:flex max-sm:items-center max-sm:flex-col">
                                <h1 className="label text-xl font-bold ">Ai Insights</h1>
                                <ol className="mt-4 ">
                                    <li>Food speding increased by 20%...</li>
                                    <li className="mt-1">Savings dropped 10%...</li>
                                    <li className="mt-1">Food speding increased by 40%...</li>
                                    <li className="mt-1">Savings dropped 10%...</li>
                                </ol>
                                

                            </div>
                        </div>
                    </div>
                    <div className="incomeExpChart w-[49%] min-h-full p-8  text-white bg-black/35 border border-[374151] rounded-[10px] max-lg:mt-8 max-lg:w-full">
                        Income vs expenditure chart.   
                    </div>
                </div>
                <div className="recentTransactions w-full px-8">
                    <div className=" w-full bg-black/35 border border-[374151] px-8 py-2 text-white rounded-[10px]">
                        <h1 className="label font-bold text-2xl mb-2">Recent Transactions</h1>
                        <ul className=" gap-1/2 text-lg">
                            {
                                transactions.slice(0,2).map((transaction)=>{
                                   return <div className="grid grid-cols-4 justify-between" key={transaction._id}>
                                            <span>{transaction.title} </span>
                                            <span>{transaction.amount}</span>
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