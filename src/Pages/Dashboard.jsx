// import dashboardBg from '../assets/DashboardBg.png';
import Navbar from '../Components/Shared/Navbar';
import '../Dashboard.css';
import DashboardLogo from '../assets/DashboardLogo.svg';
function Dashboard (){
    return (
        <div className="dashboard pt-8 pb-8 xl:overflow-hidden m-0  ">
            <Navbar DashboardLogo={DashboardLogo} />
            <div className="dashboard-content flex flex-col items-center h-full ">
                <div className="summaryCards w-full px-8 pt-8 pb-8 flex  justify-between max-lg:flex-col">
                    <div className="overviewAndInsights w-[49%] flex flex-col justify-between h-full max-lg:w-full">
                        <div className="overview w-full rounded-[10px] bg-black/35 border border-[374151] text-white flex items-center text-xl  px-8 py-8 mb-8 justify-between max-sm:flex-col ">
                            <div className="netWorth flex flex-col justify-center items-center">
                                <h1 className="label font-bold">
                                    Net Worth
                                </h1>
                                <div className="amount">
                                    $1,23,000
                                </div>
                            </div>
                            <div className="monthlySavings flex flex-col items-center mx-4 max-sm:my-4">
                                <h1 className="label font-bold text-center">
                                    Monthly Savings
                                </h1>
                                <div className="amount">
                                    $1,520
                                </div>
                            </div>
                            <div className="portfolioValue flex flex-col items-center ">
                                <h1 className="label font-bold text-center">
                                    Portfolio Value
                                </h1>
                                <div className="amount">
                                    $55,000
                                </div>
                            </div>
                        </div>
                        <div className="insightst w-full rounded-[10px] bg-black/35 border border-[374151] flex justify-between  text-white max-sm:flex-col max-sm:items-center">
                            <div className="labelAndPiechart w-[50%] flex flex-col px-8 p-4 items-center max-sm:w-full">
                                <h1 className="label text-xl font-bold ">Category Breakdown Pie Chart</h1>
                                <div className="piechart h-50 w-50 rounded-full bg-red-300 mt-4 ">

                                </div>
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
                <div className="recentTransactions w-full px-8 pb-8">
                    <div className=" w-full bg-black/35 border border-[374151] px-8 py-4 text-white rounded-[10px]">
                        <h1 className="label font-bold text-xl">Recent Transactions</h1>
                        <ul>
                            <li>salary +20,000 </li>  
                            <li>Food -500</li>
                        </ul>
                    </div>
                </div>
                

            </div>
        </div>
    );
}

export default Dashboard;