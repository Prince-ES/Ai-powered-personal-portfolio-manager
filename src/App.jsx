import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useEffect, useState} from 'react';
import AddTransactionPage from './Pages/AddTransactionsPage.jsx';
import AssetDetailsPage from './Pages/AssetDetailsPage.jsx';
import Portfolio from './Pages/Portfolio.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Transactions from './Pages/Transactions.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import SignupPage from './Pages/SignupPage.jsx';
import Index from './Pages/Index.jsx';
import AiInsightsPage from './Pages/AiInsightsPage.jsx';
import Settings from './Pages/Settings.jsx'
import Test from './Pages/Test.jsx';
import { getExampleTransactions, getTransactions } from './api/transactions.js';
import { getExampleHoldings, getHoldings } from './api/holdings.js';

function App() {
  const [transactions,setTransactions] = useState([]);
  const [holdings,setHoldings] = useState([]);

    async function updateTransactions (){
        let response = await  getTransactions();
        console.log(response.data.message);
        if(response.data.message === 'No transactions exists'){
            response = await getExampleTransactions();
            console.log('example data called');
        }
        setTransactions(response.data);
        return response.data;
    }

    useEffect(()=>{

        async function updateHoldings (){
            let response = await getHoldings();
            if(response.data.message === "No holdings found"){
                response = await getExampleHoldings();
            }
            setHoldings(response.data);        
        }     
  
        // eslint-disable-next-line
        updateTransactions();
        updateHoldings();
    },[])

    let prevMonthTransactions = [];
    let monthBeforePrevTransactions = [];

    let prevMonthCategoryDistribution = new Map();
    let monthBeforePrevCategoryDistribution = new Map ();

   
    for(const transaction of transactions){
        if(new Date(transaction.date).getMonth() === new Date().getMonth()){
            prevMonthTransactions.push(transaction);    
        }
        if(new Date(transaction.date).getMonth() ===new Date().getMonth()-1){
            monthBeforePrevTransactions.push(transaction);
        }
    }

    function categoryBasedDistributionFn(monthArrayItems, distributionObj){
        for(const monthArrayItem of monthArrayItems ){
            if(distributionObj.has(monthArrayItem.category)){
                const getItem = distributionObj.get(monthArrayItem.category);
                getItem.amount += monthArrayItem.amount;
            }else{
                distributionObj.set(monthArrayItem.category,{
                    amount:monthArrayItem.amount,
                    type:monthArrayItem.type
                })
            }
        }
    }

    categoryBasedDistributionFn(prevMonthTransactions,prevMonthCategoryDistribution);
    categoryBasedDistributionFn(monthBeforePrevTransactions, monthBeforePrevCategoryDistribution);
    
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage mode="signup"/>}/>
        <Route path="/login" element={<LoginPage mode="login"/>}/>   
        <Route path="/test" element={<Test/>}></Route>
        <Route path="/" element={<Index/>}></Route>
        <Route path="/dashboard" element={<Dashboard transactions={transactions} holdings={holdings} prevMonthCategoryDistribution={prevMonthCategoryDistribution} monthBeforePrevCategoryDistribution={monthBeforePrevCategoryDistribution}/>} />
        <Route path="/transactions" element={<Transactions transactions={transactions}/>} />
        <Route path="/addTransactionsPage" element={<AddTransactionPage setTransactions={setTransactions} updateTransactions={updateTransactions}/>}></Route> 
        <Route path="/portfolio" element={<Portfolio holdings={holdings}/>}></Route>  
        <Route path="/assetDetailsPage/:id" element={<AssetDetailsPage holdings={holdings}/>}></Route>  
        <Route path="/aiinsights" element={<AiInsightsPage transactions={transactions} prevMonthCategoryDistribution={prevMonthCategoryDistribution} monthBeforePrevCategoryDistribution={monthBeforePrevCategoryDistribution} />}></Route>    
        <Route path="/settings" element={<Settings/>}></Route>  
      </Routes>
    </BrowserRouter>
    
    //understand browser router, routes etc
  )
}

export default App


