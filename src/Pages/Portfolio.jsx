
import Navbar from '../Components/Shared/Navbar';
import {Link} from 'react-router-dom'
import '../Dashboard.css';
import DashboardLogo from '../assets/dashboardLogo.svg'

function Portfolio(){
    return (
        <div className="dashboard pt-8">
            <Navbar DashboardLogo={DashboardLogo}/>
            <div className="content pt-8 flex flex-col relative z-3">
                <div className="pageTitle w-full text-3xl bg-black/35 border-y border-white py-4 px-8 text-white font-bold max-md:text-center">
                    Portfolio
                </div>
                <div className="pageContent py-4 flex flex-col  gap-4 px-8">
                    <div className="overview w-full flex justify-between  max-md:px-2 gap-2 text-2xl text-white ">
                        <div className="investedAmount bg-black/35 border border-white flex items-center justify-center flex-col rounded-[10px] px-4 py-8">
                            <label htmlFor="" className="font-bold">Invested Amount</label>
                            <div className="amount">$100</div>
                        </div>
                        <div className="currentValue bg-black/35 border border-white flex items-center justify-center flex-col rounded-[10px] px-4 py-8">
                            <label htmlFor="" className="font-bold">Current Value</label>
                            <div className="amount">$102</div>
                        </div>
                        <div className="investedAmount bg-black/35 border border-white flex items-center justify-center flex-col rounded-[10px] px-8 py-8">
                            <label htmlFor="" className="font-bold">Total P/L</label>
                            <div className="amount">$2</div>
                        </div>
                    </div>
                    <div className="charts flex justify-between ">
                        <div className="portfolioCalc bg-black/35 w-[49%] flex flex-col items-center justify-center gap-4 border border-white rounded-[10px] pb-4 pt-2 px-4">
                            <div className="heading text-2xl font-bold text-white self-start">Portfolio Calculation</div>
                            <div className="pieChart h-[150px] w-[150px] rounded-full bg-red-300"></div>
                        </div>
                        <div className="portfolioCalc bg-black/35 w-[49%] flex flex-col items-center justify-center gap-4 border border-white rounded-[10px] pb-4 pt-2 px-4">
                            <div className="heading text-2xl font-bold text-white self-start">Price Chart</div>
                            <div className="pieChart h-full w-full border border-white"></div>
                        </div>
                    </div>
                    
                    <div className=" border border-white rounded-[10px] w-full  flex items-center justify-between px-8 py-4 bg-black/35 text-white">
                        <div className="flex flex-col items-center justify-center gap-2    ">
                            <div className="heading text-xl font-bold">
                                Asset
                            </div>
                            <div className="items flex flex-col items-center justify-center">
                                <Link to="/assetDetailsPage">Axis</Link>
                                <span>TCS</span>
                            </div>
                        </div>
                        <div className="assets flex flex-col items-center justify-center gap-2">
                            <div className="heading text-xl font-bold">
                                Qty
                            </div>
                            <div className="items flex flex-col items-center justify-center">
                                <span>10</span>
                                <span>5</span>
                            </div>
                        </div>
                        <div className="assets flex flex-col items-center justify-center gap-2">
                            <div className="heading text-xl font-bold">
                                Avg Price
                            </div>
                            <div className="items flex flex-col items-center justify-center">
                                <span>1200</span>
                                <span>3800</span>
                            </div>
                        </div>
                        <div className="assets flex flex-col items-center justify-center gap-2">
                            <div className="heading text-xl font-bold">
                                CMP
                            </div>
                            <div className="items flex flex-col items-center justify-center">
                                <span>1350</span>
                                <span>3950</span>
                            </div>
                        </div>
                        <div className="assets flex flex-col items-center justify-center gap-2">
                            <div className="heading text-xl font-bold">
                                Profit/Loss
                            </div>
                            <div className="items flex flex-col items-center justify-center">
                                <span>1500</span>
                                <span>750</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Portfolio;