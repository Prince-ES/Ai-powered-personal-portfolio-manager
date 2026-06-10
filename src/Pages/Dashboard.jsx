import {Link} from 'react-router-dom';
// import dashboardBg from '../assets/DashboardBg.png';
import '../Dashboard.css';
import DashboardLogo from '../assets/DashboardLogo.svg';
function Dashboard (){
    return (
        <div className="dashboard pt-8 ">
            <div className="nav flex justify-between md:h-20 px-8 ">
                <div className="logo">
                    <img src={DashboardLogo} alt="Logo" className="logo-image h-full" />
                </div>
                <div className="nav-links bg-black text-slate-400 text-2xl flex justify-between items-center w-[75%] px-28 rounded-full">
                    <div className="dashboard-link  ">
                        <Link to="/">Dashboard</Link>
                    </div>
                    <div>
                        <Link to="/portfolio">Portfolio</Link>
                    </div>
                    <div>
                        <Link to="/transactions">Transactions</Link>
                    </div>
                    <div>
                        <Link to="/settings">Settings</Link>
                    </div>
                </div>
                <div className="user flex items-center justify-center bg-black text-white text-2xl w-20 rounded-full">
                    <Link to="/user-profile" >
                        <i class="fa-regular fa-user"></i>
                    </Link>
                </div>
            </div>
            <div className="dashboard-content flex flex-col items-center h-full ">
                <div className="summaryCards w-full px-8 pt-8 pb-8 flex justify-between h-full">
                    <div className="overviewAndInsights w-[49%] ">
                        <div className="overview h-30  w-full rounded-[10px] bg-black text-white flex items-center text-xl  px-8 justify-between">
                            <div className="netWorth flex flex-col items-center">
                                <h1 className="label font-bold">
                                    Net Worth
                                </h1>
                                <div className="amount">
                                    $1,23,000
                                </div>
                            </div>
                            <div className="monthlySavings flex flex-col items-center ">
                                <h1 className="label font-bold">
                                    Monthly Savings
                                </h1>
                                <div className="amount">
                                    $1,520
                                </div>
                            </div>
                            <div className="portfolioValue flex flex-col items-center ">
                                <h1 className="label font-bold">
                                    Portfolio Value
                                </h1>
                                <div className="amount">
                                    $55,000
                                </div>
                            </div>
                        </div>
                        <div className="insightst w-full rounded-[10px] bg-black flex justify-between mt-4  text-white">
                            <div className="labelAndPiechart w-[50%] flex flex-col px-8 p-4 items-center">
                                <h1 className="label text-xl font-bold">Category Breakdown Pie Chart</h1>
                                <div className="piechart h-50 w-50 rounded-full bg-red-300 mt-4 ">

                                </div>
                            </div>
                            <div className="aiInsights w-[50%] px-8 py-4">
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
                    <div className="incomeExpChart w-[49%] h-103 text-white bg-black rounded-[10px] ">
                        Income vs expenditure chart.   
                    </div>
                </div>
                <div className="recentTransactions h-30 bg-black px-8 pt-4 w-[96%] text-white rounded-[10px]">
                    <h1 className="label font-bold text-xl">Recent Transactions</h1>
                    <ul>
                        <li>salary +20,000 </li>  
                        <li>Food -500</li>
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;