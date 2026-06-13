import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import Navbar from '../Components/Shared/Navbar';
import '../Dashboard.css';
import DashboardLogo from '../assets/DashboardLogo.svg';
import img1 from '../assets/indexPageImages/img1.png';
import img2 from '../assets/indexPageImages/img2.png';
import img3 from "../assets/indexPageImages/img3.png";
import img4 from "../assets/indexPageImages/img4.png";
import img5 from "../assets/indexPageImages/img5.png";

function Index (){
    
    const [index, setIndex] = useState(0);
    useEffect(()=>{
       const interval = setInterval(()=>{
            setIndex(prev=>((prev+1)%5))
        },3000)

        return ()=>{clearInterval(interval)}
    },[])
    
    return (
        <div className="dashboard pt-8 fixed  m-0 ">
            <Navbar DashboardLogo={DashboardLogo} indexPage="indexPage"/>
            <div className="content flex justify-between items-center min-w-screen p-8 max-md:px-16 max-md:flex-col-reverse max-md:gap-8">
                <div className=" relative text-white text-5xl max-md:text-5xl z-3 w-1/2 max-md:w-full bg-black/25 border rounded-[10px] py-16 px-4 mr-8 max-md:mr-0 max-md:py-8 max-md:px-8">
                    <h1 className="font-bold mb-4">
                        Track - Analyze - Grow
                    </h1>
                    <h3 className="text-2xl ">
                        Your AI-powered portfolio manager that turns market data into actionable insights.
                    </h3>
                </div>
                <div className="insightsOverview overflow-hidden w-1/2 max-md:w-full">
                    <div className={`images w-full flex transform transition-all duration 0.15s relative z-3    `} style={{transform:`translateX(-${index*100}%)`}}>
                        <div className="flex-shrink-0  w-full  flex items-center justify-center">
                            <img src={img1} className=" rounded-[10px]  h-[550px] w-[400px]  bg-blue-300" />
                        </div>
                        <div className="flex-shrink-0  w-full flex items-center justify-center">
                            <img src={img2} className=" rounded-[10px] h-[550px] w-[400px] bg-blue-300" />
                        </div>
                        <div className="flex-shrink-0  w-full flex items-center justify-center">
                            <img src={img3} className=" rounded-[10px] h-[550px] w-[400px] bg-blue-300" />
                        </div>
                        <div className="flex-shrink-0  w-full flex items-center justify-center">
                            <img src={img4} className=" rounded-[10px] h-[550px] w-[400px] bg-blue-300" />
                        </div>
                        <div className="flex-shrink-0  w-full flex items-center justify-center">
                            <img src={img5} className=" rounded-[10px] h-[550px] w-[400px] bg-blue-300" />
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Index;