
import Navbar from '../Components/Shared/Navbar';
import {useState} from 'react';
import {Link} from 'react-router-dom'
import '../Dashboard.css';
import DashboardLogo from '../assets/dashboardLogo.svg'
import RotateYourPhone from '../assets/rotateYourPhone.mp4'

function Portfolio({holdings}){
    let investedAmount = 0;//total of all the symbol's avg * quantity
    let currentValue = 0;//total of all symbol's current price * quantity
    
    for(const holding of holdings){
        investedAmount+= holding.averagePrice * holding.quantity;//prices of buying could be diff therefore average.
        currentValue+= holding.currentPrice * holding.quantity;
    }

        const pnl = currentValue-investedAmount;
    return (
        <div className="dashboard pt-8 max-sm:pt-0">
            <video src={RotateYourPhone} autoPlay loop muted playsInline className="relative z-10 hidden max-sm:block w-full max-h-screen object-cover "  ></video>
            
            <Navbar className="max-sm:hidden" DashboardLogo={DashboardLogo}/>
            <div className="max-sm:hidden content pt-8 pb-8 flex flex-col relative z-3">
                <div className="pageTitle w-full mb-4 text-3xl bg-black/35 border-y border-white py-4 px-8 text-white font-bold max-md:text-center">
                    Portfolio
                </div>
                <div className="pageContent  flex flex-col  gap-4 px-8">
                    <div className="overview w-full flex justify-between  max-md:px-2 gap-2 text-2xl text-white ">
                        <div className="investedAmount bg-black/35 border border-white flex gap-2 items-center justify-center flex-col rounded-[10px] px-4 py-2">
                            <label htmlFor="" className="font-bold">Invested Amount</label>
                            <div className="amount">₹{Number(investedAmount.toFixed(2)).toLocaleString('en-IN',{minimumFractionDigits:2})}</div>
                        </div>
                        <div className="currentValue bg-black/35 border border-white flex gap-2 items-center justify-center flex-col rounded-[10px] px-4 py-2">
                            <label htmlFor="" className="font-bold">Current Value</label>
                            <div className="amount">₹{Number(currentValue.toFixed(2)).toLocaleString('en-IN',{minimumFractionDigits:2})}</div>
                        </div>
                        <div className="investedAmount bg-black/35 border border-white flex gap-2 items-center justify-center flex-col rounded-[10px] px-8 py-2">
                            <label htmlFor="" className="font-bold">Total P/L</label>
                            <div className="amount">₹{pnl.toLocaleString('en-IN',{minimumFractionDigits:2})}</div>
                        </div>
                    </div>
                    <div className="charts flex max-lg:flex-col max-lg:gap-4 justify-between max-lg:w-full">
                        <div className="portfolioCalc bg-black/35 w-[49%] max-lg:w-full flex flex-col items-center justify-center gap-4 border border-white rounded-[10px] pb-4 pt-2 px-4">
                            <div className="heading text-2xl font-bold text-white self-start max-lg:w-full max-lg:text-center ">Portfolio Calculation</div>
                            <div className="pieChart h-[250px] w-[250px] rounded-full bg-red-300"></div>
                        </div>
                        <div className="portfolioCalc bg-black/35 w-[49%] max-lg:w-full flex flex-col items-center justify-center gap-4 border border-white rounded-[10px] pb-4 pt-2 px-4">
                            <div className="heading text-2xl font-bold text-white self-start">Price Chart</div>
                            <div className="pieChart h-full w-full border border-white"></div>
                        </div>
                    </div>
                    
                    <div className="border border-white rounded-[10px] w-full bg-black/35 text-white p-6 flex flex-col gap-4">
                        <div className="grid grid-cols-5 pr-[15px]">
                            
                            <div className="text-xl font-bold">Asset</div>
                            <div className="text-xl font-bold">Qty</div>
                            <div className="text-xl font-bold">Avg Price</div>
                            <div className="text-xl font-bold">CMP</div>
                            <div className="text-xl font-bold">Profit/Loss</div>
                         </div> 
                         <div className="items max-h-[240px] overflow-y-scroll">
                            {
                                holdings.map((holding)=>{
                                    let pnlColor = holding.currentPrice * holding.quantity - holding.averagePrice * holding.quantity > 0 ? true : false;
                                    return <div className="grid grid-cols-5 gap-y-1">
                                            <Link to="/assetDetailsPage" className="hover:underline">
                                                {holding.symbol}
                                            </Link>
                                            <span>{holding.quantity}</span>
                                            <span>{holding.averagePrice.toLocaleString("en-In",{minimumFractionDigits:2})}</span>
                                            <span>{holding.currentPrice.toLocaleString("en-In",{minimumFractionDigits:2})}</span>
                                            <span className={`${pnlColor ? "text-green-400": "text-red-400"}`}>₹ {(holding.currentPrice * holding.quantity - holding.averagePrice * holding.quantity).toLocaleString('en-IN',{minimumFractionDigits:2})}</span>
                                    </div>
                                })
                            }
                         </div>
                            
                            {/* <Link to="/assetDetailsPage" className="hover:underline">
                            Axis
                            </Link>
                            <span>10</span>
                            <span>1200</span>
                            <span>1350</span>
                            <span className="text-green-400">1500</span>

                            
                            <span>TCS</span>
                            <span>5</span>
                            <span>3800</span>
                            <span>3950</span>
                            <span className="text-green-400">750</span> */}
                       
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Portfolio;