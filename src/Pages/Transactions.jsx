import {useState} from 'react';
import '../Dashboard.css';
import Navbar from '../Components/Shared/Navbar.jsx';
import DashboardLogo from '../assets/DashboardLogo.svg';
import RotateYourPhone from '../assets/rotateYourPhone.mp4';
function Transactions(){
    const [searchInput, setSearchInput] = useState('');
    const [selectInput, setSelectInput] = useState('');
    const [dateInput, setDateInput] = useState('');
    const [amountInput, setAmountInput] = useState('');
    return (
        <div className="dashboard pt-8 max-sm:pt-0">
            <Navbar DashboardLogo={DashboardLogo} className="max-sm:hidden"/>
            <video src={RotateYourPhone} autoPlay loop muted playsInline className="relative z-10 hidden max-sm:block w-full max-h-screen object-cover "  ></video>
            <div className="content relative z-3 py-8 flex justify-center items-center flex-col gap-8 w-full max-sm:hidden">
                <div className="heading flex justify-between w-full  px-8 bg-black/35 border border-white py-4 border-x-0" >
                    <h1 className="headingTitle text-4xl font-bold text-white">
                        Transactions
                    </h1>
                    <h2 className="addTransaction text-2xl text-white">
                        + Add Transaction
                    </h2>
                </div>
                <div className="inputBox w-[50%] flex max-xl:w-[60%] max-lg:w-[70%] max-md:w-[80%]">
                    <input type="text" value={searchInput} placeholder="Type to search..." className="w-full bg-white px-8 py-4 rounded-full text-xl outline-0" onChange={(e)=>{setSearchInput(e.target.value);console.log(e.target.value)}}/>
                </div>
                <div className="filters flex justify-center w-[50%] text-xl  gap-4">
                    <div className="categoryFilter">
                        <select name="category" value={selectInput}className="outline-1 px-2 py-1 bg-white/25  rounded-[10px]" onChange={(e)=>{setSelectInput(e.target.value);console.log(e.target.value)}}>
                            <option value="">Category</option>
                            <option value="food" >Food</option>
                            <option value="travel">Travel</option>
                            <option value="entertainment">Entertainment</option>
                        </select>
                    </div>
                    <div className="Date">
                        <input type="date" value={dateInput} className="outline-1 px-2 py-1 bg-white/35  rounded-[10px]"  onChange={(e)=>{setDateInput(e.target.value); console.log(e.target.value)}}/>
                    </div>
                    <div className="amount ">
                        <input type="number" value={amountInput} placeholder='Amount' className="outline-1  rounded-[10px] py-1 px-2 bg-white/50" onChange={(e)=>{setAmountInput(e.target.value); console.log(e.target.value)}}/>
                    </div>
                </div>
                <div className="allTransactionsAndSearchResult px-8 py-4 rounded-[10px] flex justify-between bg-black/35 text-white w-[80%] border">
                    <div className="title ">
                        <div className="heading text-xl font-bold">
                            Title
                        </div>
                        <ul className="items pt-4">
                            <li>Salary</li>
                            <li>Swiggy</li>
                            <li>Petrol</li>
                            <li>Profit</li>
                            <li>Salary</li>
                            <li>Swiggy</li>
                            <li>Petrol</li>
                            <li>Profit</li>
                            
                        </ul>
                    </div>
                    <div className="title">
                        <div className="heading text-xl font-bold text-center">
                            Category
                        </div>
                        <ul className="items pt-4 text-center">
                            <li>Income</li>
                            <li>Food</li>
                            <li>Travel</li>
                            <li>Income</li>
                            <li>Income</li>
                            <li>Food</li>
                            <li>Travel</li>
                            <li>Income</li>
                        </ul>
                    </div>
                    <div className="title">
                        <div className="heading text-xl font-bold text-center">
                            Amount
                        </div>
                        <ul className="items pt-4 text-center">
                            <li>+20,000</li>
                            <li>-500</li>
                            <li>-1000</li>
                            <li>+2500</li>
                            <li>+20,000</li>
                            <li>-500</li>
                            <li>-1000</li>
                            <li>+2500</li>
                        </ul>
                    </div>
                    <div className="title">
                        <div className="heading text-xl font-bold text-center">
                            Date
                        </div>
                        <ul className="items pt-4 text-center">
                            <li>12/06/2026</li>
                            <li>15/06/2026</li>
                            <li>16/06/2026</li>
                            <li>19/06/2026</li>
                            <li>12/06/2026</li>
                            <li>15/06/2026</li>
                            <li>16/06/2026</li>
                            <li>19/06/2026</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            
        </div>
    );
}

export default Transactions;