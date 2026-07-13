import {Routes, Route} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import AddTransactionPage from './Pages/AddTransactionsPage.jsx';
import AssetDetailsPage from './Pages/AssetDetailsPage.jsx';
import Portfolio from './Pages/Portfolio.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Transactions from './Pages/Transactions.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import SignupPage from './Pages/SignupPage.jsx';
import Navbar from './Pages/Index.jsx';
import AiInsightsPage from './Pages/AiInsightsPage.jsx';
import Settings from './Pages/Settings.jsx'
import Test from './Pages/Test.jsx';
import './LoginPage.css';


function App() {
  const [transactions,setTransactions] = useState([]);
  const [holdings,setHoldings] = useState([]);
  useEffect(()=>{
      async function getTransactions (){
          const response = await  axios.get('http://localhost:5000/transactions');
          setTransactions(response.data);
      }
      async function getHoldings (){
        const response = await axios.get('http://localhost:5000/holdings');
        setHoldings(response.data);        
      }
      getTransactions();
      getHoldings();
  },[])

  return (
      <Routes>
        <Route path="/signup" element={<SignupPage mode="signup"/>}/>
        <Route path="/login" element={<LoginPage mode="login"/>}/>   
        <Route path="/test" element={<Test/>}></Route>
        <Route path="/" element={<Navbar/>}></Route>
        <Route path="/dashboard" element={<Dashboard transactions={transactions} holdings={holdings}/>} />
        <Route path="/transactions" element={<Transactions transactions={transactions}/>} />
        <Route path="/addTransactionsPage" element={<AddTransactionPage setTransactions={setTransactions}/>}></Route> 
        <Route path="/portfolio" element={<Portfolio holdings={holdings}/>}></Route>  
        <Route path="/assetDetailsPage/:id" element={<AssetDetailsPage holdings={holdings}/>}></Route>  
        <Route path="/aiinsights" element={<AiInsightsPage/>}></Route>    
        <Route path="/settings" element={<Settings/>}></Route>  
      </Routes>
    
    //understand browser router, routes etc
  )
}

export default App


