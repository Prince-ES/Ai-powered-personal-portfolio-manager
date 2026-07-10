import { useState} from 'react';
import {Link} from 'react-router-dom';
import '../Dashboard.css';
import Navbar from '../Components/Shared/Navbar.jsx';
import DashboardLogo from '../assets/DashboardLogo.svg';
import RotateYourPhone from '../assets/rotateYourPhone.mp4';
 function Transactions({transactions}) {
    const [searchInput, setSearchInput] = useState('');
    const [selectInput, setSelectInput] = useState('');
    const [dateInput, setDateInput] = useState('');
    const [amountInput, setAmountInput] = useState('');
    // const [transactions,setTransactions] = useState([]);

    // useEffect(()=>{
    //     async function getTransactions (){
    //         const response = await  axios.get('http://localhost:5000/transactions');
    //         setTransactions(response.data);
    //     }
    //     getTransactions();
    // },[])

    return (
        <div className="dashboard pt-4  max-sm:pt-0">
            <Navbar DashboardLogo={DashboardLogo} className="max-sm:hidden fixed left-0 right-0 z-4"/>
            <video src={RotateYourPhone} autoPlay loop muted playsInline className="relative z-10 hidden max-sm:block w-full max-h-screen object-cover "  ></video>
            <div className="content relative z-3 pt-20 flex justify-center items-center flex-col gap-5 w-full max-sm:hidden">
                <div className="heading flex justify-between w-full  px-8 bg-black/35 border border-white py-4 border-x-0" >
                    <h1 className="headingTitle text-4xl font-bold text-white">
                        Transactions
                    </h1>
                    <Link to="/addTransactionsPage"className="addTransaction text-2xl text-white">
                        + Add Transaction
                    </Link>
                </div>
                <div className="inputBox  w-full px-16 max-md:px-8">
                    <input type="text" value={searchInput} placeholder="Type to search by title..." className="w-full bg-white px-8 py-4 rounded-full text-xl outline-0" onChange={(e)=>{setSearchInput(e.target.value);console.log(e.target.value)}}/>
                </div>
                <div className="filters flex justify-between items-center text-xl max-md:px-8  gap-8 ">
                    <div className="categoryFilter">
                        <select name="category" value={selectInput}className="outline-0 px-4 max-md:px-2 py-4 bg-white  rounded-[10px]" onChange={(e)=>{setSelectInput(e.target.value);console.log(e.target.value)}}>
                            <option value="" disabled>Category</option>
                            <option value="food" >Food</option>
                            <option value="travel">Travel</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="income"> Income </option>
                            <option value="other"> Other </option>
                        </select>
                    </div>
                    <div className="Date">
                        <input type="date" value={dateInput} className="outline-0 px-2 py-4 bg-white  rounded-[10px]"  onChange={(e)=>{setDateInput(e.target.value); console.log(e.target.value)}}/>
                    </div>
                    <div className="amount ">
                        <input type="number" value={amountInput} placeholder='Amount' className="outline-0 rounded-[10px] py-4 px-4 max-md:px-2 bg-white" onChange={(e)=>{setAmountInput(e.target.value); console.log(e.target.value)}}/>
                    </div>
                </div>
                
                <div className="allTransactionsAndSearchResult px-8 py-4 rounded-[10px] flex flex-col gap-4 bg-black/35 text-white w-[90%] max-lg:w-[97%] max-md:w-[99%] border">
                    <div className="header grid grid-cols-[1.2fr_1fr_1fr_1fr_1fr] text-2xl font-bold">
                        <div>Title</div>
                        <div>Category</div>
                        <div>Type</div>
                        <div>Amount</div>
                        <div>Date</div>
                    </div>

                    <div className="transactions-list w-full max-h-[280px] overflow-y-auto scrollbar scrollbar-thumb-[#0C161D] scrollbar-track-white  ">
                        {transactions.map((transaction) => (
                            
                            transaction.title.toLowerCase().startsWith(searchInput.toLowerCase()) &&
                            transaction.category.toLowerCase().startsWith(selectInput.toLowerCase()) &&
                            transaction.date.startsWith(dateInput) &&
                            transaction.amount.toString().startsWith(amountInput) &&
                            <div
                                key={transaction._id}
                                className="grid grid-cols-[1.2fr_1fr_1fr_1fr_1fr] py-1/2 text-xl"
                            >
                                <div>{transaction.title}</div>
                                <div>{transaction.category}</div>
                                <div>{transaction.type}</div>
                                <div>₹ {(transaction.amount).toLocaleString('en-IN',{minimumFractionDigits:2})}</div>
                                <div>
                                    {new Date(transaction.date).toLocaleString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            
            </div>
            
            
        </div>
    );
}

export default Transactions;