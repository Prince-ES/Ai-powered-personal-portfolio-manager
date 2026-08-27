import {useState} from 'react';
import Navbar from '../Components/Navbar';
import DashboardLogo from '../assets/dashboardLogo.svg';
// import '../Dashboard.css';

function Settings (){

    const [select,setSelect] = useState('INR');
    return (
        <div className="dashboard pt-4">
            <Navbar DashboardLogo={DashboardLogo} currentPage="Settings"/>
            <div className="content flex flex-col gap-8 pt-8 relative z-3">
                <div className="pageTitle text-3xl font-bold text-white w-full max-md:text-center border-y border-white px-8 py-4 bg-black/35">
                    Settings
                </div>
                <div className="pageContent p-8 max-sm:p-4 bg-black/35 text-white flex flex-col gap-8">
                    <div className="profile flex flex-col ">
                        <label htmlFor="" className="text-2xl font-bold mb-2    ">Profile</label>
                        <div className="name flex gap-4 text-xl">
                            <label htmlFor="">Name : </label>
                            <span>Prince</span>
                        </div>
                        <div className="name flex gap-4 text-xl ">
                            <label htmlFor="" >Email : </label>
                            <span className="text-lg">mauryaprince379@gmail.com</span>
                        </div>
                    </div>
                    <div className="theme flex flex-col gap-2">
                        <label htmlFor="" className="text-2xl font-bold">Theme</label>
                        <div className="themes text-xl">
                             <div className="dark text-lg">Dark (in Process...)</div>
                             <div className="light text-lg">Light</div>
                        </div>
                       
                    </div>
                    <div className="currency flex flex-col gap-4 w-[250px]">
                        <label htmlFor="" className="text-2xl font-bold">currency</label>
                        <div className="saveCurr flex flex-col gap-4 ">
                            <select name="" id="" value={select}  className="text-black bg-white outline-0 py-2 px-2 rounded-[10px]" onChange={(e)=>{setSelect(e.target.value);console.log(e.target.value)}}>
                                <option value="INR" >INR</option>
                                <option value="USD">USD</option>
                                <option value="BTC">BTC</option>
                                <option value="ETH">ETH</option>
                            </select>
                            <div className="save text-xl bg-[#0C161D] border border-white py-2 px-2 text-center rounded-[10px] hover:bg-gray-800 active:bg-gray-600 " >Save</div>
                            <span>(Defaut is INR, rest are in process.)</span>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;