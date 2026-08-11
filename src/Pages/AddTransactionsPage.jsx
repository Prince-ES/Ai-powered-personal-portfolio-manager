import {useState} from 'react';
import Navbar from '../Components/Navbar.jsx';
import axios from 'axios';
// import '../Dashboard.css';
import DashboardLogo from '../assets/dashboardLogo.svg'
function AddTransactionPage( { getTransactions}){
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('');
    const [transactionDate, setTransactionDate] = useState('');
    const [category, setCategory] = useState('');
    const [notes, setNotes] = useState('');
    const [saveOn, setSaveOn] = useState(false);
    
    function reStartSaveButton (){
        setTimeout(()=>{
            setTitle('');
            setAmount('');
            setType('');
            setTransactionDate('');
            setCategory('');
            setNotes('');
            setSaveOn(false);
        },1000)
    }

    async function saveTransaction(){
       const response = await axios.post('http://localhost:5000/api/transactions/addTransaction',{title:title,amount:amount,type:type,category:category,notes:notes});  
        console.log(response.data);
        await getTransactions();     
    }

    return (
        <div className="dashboard pt-8">
            <Navbar DashboardLogo={DashboardLogo}/>
            <div className="content pt-8 flex flex-col gap-8 relative z-3 items-center justify-center">
                <div className="pageTitle w-full text-3xl bg-black/35 border-y border-white py-4 px-8 text-white font-bold max-md:text-center">
                    Add Transaction
                </div>
                <div className="pageContent flex flex-col gap-4 w-[60%] max-lg:w-[70%] max-md:w-[85%] max-sm:w-[90%]">
                    <div className="transactionTitle flex gap-4 justify-between items-center">
                        <label htmlFor="#" className= "xl:text-center text-2xl font-bold text-white w-[30%]">Title</label>
                        <input type="text" value={title} placeholder="Enter title" className="outline-1 bg-white text-xl px-2 py-2 rounded-[5px] w-[70%]" onChange={(e)=>{setTitle(e.target.value)}}/>
                    </div>
                    <div className="transactionAmount flex gap-4 justify-between items-center">
                        <label htmlFor="" className=" xl:text-center text-2xl font-bold text-white w-[30%]">Amount </label>
                        <input type="number" value={amount} placeholder="Enter Amount" className="outline-1 bg-white text-xl px-2 py-2 rounded-[5px] w-[70%]" onChange={(e)=>{setAmount(e.target.value)}} />
                    </div>
                    <div className="transactionAmount flex gap-4 justify-between items-center">
                        <label htmlFor="#" className= "xl:text-center text-2xl font-bold text-white w-[30%]">Type </label>
                        <div className="type flex justify-between w-[70%] text-xl text-white gap-4">
                            <button className={` w-1/2 py-2 border rounded-[10px] transition-all duration-150 hover:scale-99 ${type === 'Income' ? "bg-gray-600" : "bg-[#0C161D]"}`} onClick={()=>{setType('Income')}}>Income</button>
                            <button className={` w-1/2 py-2 border rounded-[10px] transition-all duration-150 hover:scale-99 ${type === 'Expenses' ? "bg-gray-600" : "bg-[#0C161D]"}`} onClick={()=>{setType('Expenses')}}>Expenses</button>
                        </div>
                    </div>
                    <div className="transactionDate flex justify-between items-center">
                        <label htmlFor="" className=" xl:text-center text-2xl font-bold text-white w-[30%] ">Date </label>
                        <div className="dateAndCategory flex justify-between items-center w-[70%] gap-2 pl-2">
                            <input type="date" value={transactionDate} className="outline-1 bg-white text-xl px-2 py-2 rounded-[5px] w-1/2 " onChange={(e)=>{setTransactionDate(e.target.value)}}/>
                            <input name="" id="" value={category} placeholder="Enter category" onChange={(e)=>{setCategory(e.target.value)}} className="outline-1 bg-white text-xl px-2 py-2 rounded-[5px] w-1/2"/>
                        </div>
                    </div>
                    <div className="transactionNotes  flex gap-4 justify-between items-start">
                        <label htmlFor="" className=" xl:text-center text-2xl font-bold text-white w-[30%]">Notes</label>
                        <textarea name="" id="" value={notes}placeholder="write a note"  className="outline-1 bg-white text-xl px-2 py-2 rounded-[5px] w-[70%] resize-none" rows={5} onChange={(e)=>{setNotes(e.target.value)}} ></textarea>
                    </div>
                    <div className="saveOrCancel flex justify-end w-[100%] text-xl text-white gap-4 pl-8">
                        <button className=" w-[35%] py-2 border rounded-[10px] hover:scale-99 ">Cancel</button>
                        <button className={` w-[35%] py-2 border rounded-[10px] hover:scale-99 ${saveOn? 'bg-gray-600': ' bg-[#0C161D]'}`} onClick={()=>{setSaveOn(true); reStartSaveButton(); saveTransaction();}}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTransactionPage;