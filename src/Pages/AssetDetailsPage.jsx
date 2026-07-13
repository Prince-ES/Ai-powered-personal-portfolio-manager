import Navbar from '../Components/Shared/Navbar';
import PriceChartAAPL from '../Components/PriceChartAAPL';
import {useEffect,useState} from 'react';
import {Link,useParams} from 'react-router-dom';
import DashboardLogo from '../assets/dashboardLogo.svg';
import '../Dashboard.css';
import { getPriceChartData } from '../apiCall/getPriceChartData';

function AssetDetailsPage({holdings}){
    const [chartData, setChartData] = useState([]);
    const symbol = useParams().id;

    useEffect(()=>{        
        async function getChartData (){
           const response = await getPriceChartData('MSFT');//get symbol from useParams
           setChartData(response);
        }
        getChartData();
    },[])

    const asset = holdings.find((holding)=>{
        
        return holding.symbol === symbol// get form url
    })

    console.log(asset);
    return (
        <div className="dashboard pt-8">
            <Navbar DashboardLogo={DashboardLogo}/>
            <div className="content flex flex-col items-center gap-8 pt-8 relative z-3">
                <div className="pageTitle text-3xl font-bold text-white w-full max-md:text-center border-y border-white px-8 py-4 bg-black/35">
                    Axis Bank
                </div>
                <div className="pageContent flex flex-col gap-8 px-8 w-full ">
                    <div className="priceChart w-full h-[250px] border border-white bg-white">
                        <PriceChartAAPL chartData ={chartData}/>
                    </div>
                    <div className="prices flex flex-col gap-4 text-white text-xl" >
                        <div className="avgPrice flex gap-4">
                            <label htmlFor="" className="font-bold">Average Price :</label>
                            <div className="price">₹ {asset.averagePrice.toLocaleString('en-IN',{minimumFractionDigit:2})}</div>
                        </div>
                        <div className="currPrice flex gap-4">
                            <label htmlFor="" className="font-bold">Current Price :</label>
                            <div className="price">₹ {asset.currentPrice.toLocaleString('en-IN',{minimumFractionDigit:2})}</div>
                        </div>
                        <div className="profit flex gap-4">
                            <label htmlFor="" className="font-bold">Profit Per Share: </label>
                            <div className="price">₹ {(asset.currentPrice-asset.averagePrice).toLocaleString('en-IN',{minimumFractionDigits:2})}</div>
                        </div>
                        <Link to="/transactions" className="underline">Transaction History</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AssetDetailsPage;