
import Navbar from '../Components/Navbar';
import PortfolioPieChart from '../Components/PortfolioPieChart';
import PriceChartAAPL from '../Components/PriceChartAAPL';
// import {useState} from 'react';
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react';
import { priceChartData } from '../api/priceChartData';
// import '../Dashboard.css';
import DashboardLogo from '../assets/dashboardLogo.svg'
import RotateYourPhone from '../assets/rotateYourPhone.mp4'
import { formatTransactionAmount } from '../Components/transAmtFormatting';

function Portfolio({holdings}){

    const [chartData,setChartData] = useState([]);
    let investedAmount = 0;//total of all the symbol's avg * quantity
    let currentValue = 0;//total of all symbol's current price * quantity
    
    for(const holding of holdings){
        investedAmount+= holding.averagePrice * holding.quantity;//prices of buying could be diff therefore average.
        currentValue+= holding.currentPrice * holding.quantity;
    }

    const pnl = currentValue-investedAmount;

    const symbolBasedDistribution = new Map();

    for(const holding of holdings){
        let currentHoldingValue = holding.currentPrice* holding.quantity;
        if(symbolBasedDistribution.has(holding.symbol)){
            let getHolding = symbolBasedDistribution.get(holding.symbol);
            let newAveragePriceTotal = holding.averagePrice * holding.quantity;
            let currentAveragePriceTotal = getHolding.averagePrice * getHolding.quantity;
            let commonAverage = (newAveragePriceTotal + currentAveragePriceTotal)/(getHolding.quantity + holding.quantity);
            getHolding.totalAmount+= currentHoldingValue;
            getHolding.averagePrice = commonAverage;
            getHolding.currentPrice = holding.currentPrice;
            getHolding.quantity+= holding.quantity;

        }else{
            symbolBasedDistribution.set(holding.symbol,{
                totalAmount:currentHoldingValue,
                symbol:holding.symbol,
                currentPrice:holding.currentPrice,
                quantity:holding.quantity,
                averagePrice:holding.averagePrice,
                id:holding._id
            })
        }
    }

    useEffect(()=>{
        
        async function getChartData (){
            const response = await priceChartData('MSFT');
            setChartData(response);
        }
        getChartData();
        
        const intervalId = setInterval(getChartData,60000*60);
        return ()=>{clearInterval(intervalId)};
    },[])

    return (
        <div className="dashboard pt-4 max-sm:pt-0">
            <video src={RotateYourPhone} autoPlay loop muted playsInline className="relative z-10 hidden max-sm:block w-full max-h-screen object-cover "  ></video>
            
            <Navbar className="max-sm:hidden fixed w-full z-4" DashboardLogo={DashboardLogo}/>
            <div className="max-sm:hidden content pt-4 pb-4 flex flex-col relative z-3 gap-8">
                <div className="h-screen w-full flex flex-col items-center justify-center">
                    <div className="text-white p-8  flex flex-col items-center justify-center transform translate-y-[-13%] gap-16">
                        <h1 className="gradientTitle text-8xl font-bold text-center">Investment Portfolio</h1>
                        <h2 className="text-5xl font-bold text-center">Monitor your holdings, track performance, analyze allocation, and discover opportunities to strengthen your portfolio.</h2>
                    </div>
                </div>
                <div className={`pageTitle w-full text-3xl bg-black/35 border-y border-white py-4 px-8 text-white font-bold max-md:text-center ${holdings.length === 19 ? 'block': 'hidden' }`}>
                    Example Portfolio
                </div>
                {/* <div className="exampleData text-4xl font-bold text-white text-left pl-8">Example Data</div> */}
                <div className="pageContent  flex flex-col  gap-4 px-8">
                    <div className="overview w-full flex justify-between  max-md:px-2 gap-2 text-xl text-white ">
                        <div className="investedAmount bg-black/35 border border-white flex gap-2 items-center justify-center flex-col rounded-[10px] px-4 py-2">
                            <label htmlFor="" className="font-bold text-2xl">Invested Amount</label>
                            <div className="amount">{formatTransactionAmount(investedAmount)}</div>
                        </div>
                        <div className="currentValue bg-black/35 border border-white flex gap-2 items-center justify-center flex-col rounded-[10px] px-4 py-2">
                            <label htmlFor="" className="font-bold text-2xl">Current Value</label>
                            <div className="amount">{formatTransactionAmount(currentValue)}</div>
                        </div>
                        <div className="investedAmount bg-black/35 border border-white flex gap-2 items-center justify-center flex-col rounded-[10px] px-8 py-2">
                            <label htmlFor="" className="font-bold text-2xl">Total P/L</label>
                            <div className="amount">{formatTransactionAmount(pnl)}</div>
                        </div>
                    </div>
                    <div className="charts flex max-lg:flex-col max-lg:gap-4 justify-between max-lg:w-full">
                        <div className="portfolioCalc bg-black/35 w-[38%] max-lg:w-full flex flex-col items-center justify-center gap-4 border border-white rounded-[10px] pb-4 pt-2 px-4">
                            <div className="heading text-2xl font-bold text-white self-start max-lg:w-full max-lg:text-center ">Portfolio Calculation</div>
                            <div className="pieChart h-[350px] w-[350px] w-full flex items-center justify-center">
                                <PortfolioPieChart holdings={holdings} symbolBasedDistribution={symbolBasedDistribution}/>
                            </div>
                        </div>
                        <div className="portfolioCalc bg-black/35 w-[60%] max-lg:w-full flex flex-col items-center justify-center gap-4 border border-white rounded-[10px] pb-4 pt-2 px-4">
                            <div className="heading text-2xl font-bold text-white self-start">Price Chart</div>
                            <div className="pieChart h-full w-full border bg-white border-white">
                                <PriceChartAAPL chartData={chartData}/>
                            </div>
                        </div>
                    </div>
                    
                    <div className="border border-white rounded-[10px] w-full bg-black/35 text-white p-6 flex flex-col gap-4">
                        <div className="grid grid-cols-5 pr-[15px] text-2xl font-bold">
                            
                            <div className="">Asset</div>
                            <div className="">Qty</div>
                            <div className="">Avg Price</div>
                            <div className="">CMP</div>
                            <div className="">Profit/Loss</div>
                         </div> 
                         <div className="items  max-h-[280px] overflow-y-scroll">
                            {
                                [...symbolBasedDistribution.entries()].map(([key,value])=>{
                                    let pnlColor = value.currentPrice * value.quantity - value.averagePrice * value.quantity > 0 ? true : false;
                                    return <div className="grid grid-cols-5 gap-y-1 text-xl" key={value.id}>
                                            <Link to="/assetDetailsPage/AXISBANK" className="hover:underline">
                                                {key}
                                            </Link>
                                            <span>{value.quantity}</span>
                                            <span> {formatTransactionAmount(value.averagePrice)}</span>
                                            <span>{formatTransactionAmount(value.currentPrice)}</span>
                                            <span className={`${pnlColor ? "text-green-400": "text-red-400"}`}>{formatTransactionAmount(value.currentPrice * value.quantity - value.averagePrice * value.quantity)}</span>
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