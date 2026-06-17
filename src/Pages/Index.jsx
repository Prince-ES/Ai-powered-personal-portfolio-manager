import { Link } from 'react-router-dom';
import {useState, useEffect, useRef} from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import Navbar from '../Components/Shared/Navbar';
import '../Dashboard.css';
import DashboardLogo from '../assets/DashboardLogo.svg';
import img1 from '../assets/indexPageImages/img1.png';
import img2 from '../assets/indexPageImages/img2.png';
import img3 from "../assets/indexPageImages/img3.png";
import img4 from "../assets/indexPageImages/img4.png";
import img5 from "../assets/indexPageImages/img5.png";

function Index (){
    const intervalRef = useRef(null);
    const restartTimer = ()=>{
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(()=>{
            setIndex(prev=>((prev+1)%5));
            console.log('over');
        },5000) 
    }
    const [index, setIndex] = useState(0);
    useEffect(()=>{
        restartTimer();

        return ()=>{clearInterval(intervalRef.current)}
    },[])
    
    return (
        <div className="dashboard pt-8 fixed  m-0 ">
            <Navbar DashboardLogo={DashboardLogo} indexPage="indexPage"/>
            <div className="content flex justify-between items-center min-w-screen p-8 max-lg:px-16 max-lg:flex-col-reverse max-lg:gap-8 gap-8">
                <div className=" relative text-white text-5xl max-lg:text-5xl z-3 w-1/2 max-lg:w-full bg-black/25 border rounded-[10px] py-16 px-8 ml-12 max-lg:ml-0 max-lg:py-8 max-lg:px-8">
                    <h1 className="font-bold mb-4">
                        Track - Analyze - Grow
                    </h1>
                    <h3 className="text-2xl ">
                        Your AI-powered portfolio manager that turns market data into actionable insights.
                    </h3>
                </div>
                <div className="insightsOverview flex items-center justify-center overflow-hidden w-1/2 max-lg:w-full relative ">
                    <div className="leftChevron bg-white/25 absolute z-4 left-12 max-xl:left-0 max-lg:left-16 max-md:left-8 max-sm:left-0" onClick={()=>{setIndex(prev=>(prev-1+5)%5); clearInterval(intervalRef.current);restartTimer(); console.log('leftclick')}}>
                        <ChevronLeft size={32}/>
                    </div>                
                    <div className={`images w-full flex transform transition-all duration-300 relative z-3    `} style={{transform:`translateX(-${index*100}%)`}}>
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
                    <div className="rightChevron bg-white/25  absolute z-4 right-12 max-xl:right-0 max-lg:right-16 max-md:right-8 max-sm:right-0" onClick={()=>{setIndex(prev=>(prev+1)%5); clearInterval(intervalRef.current);restartTimer();}}>
                        <ChevronRight size={32}/>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Index;