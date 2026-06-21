import {Routes, Route} from 'react-router-dom';
import AddTransactionPage from './Pages/AddTransactionsPage.jsx';
import AssetDetailsPage from './Pages/AssetDetailsPage.jsx';
import Portfolio from './Pages/Portfolio.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Transactions from './Pages/Transactions.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import SignupPage from './Pages/SignupPage.jsx';
import Navbar from './Pages/Index.jsx';
import Test from './Pages/Test.jsx';
import './LoginPage.css';


function App() {
  

  return (
      <Routes>
        <Route path="/signup" element={<SignupPage mode="signup"/>}/>
        <Route path="/login" element={<LoginPage mode="login"/>}/>   
        <Route path="/test" element={<Test/>}></Route>
        <Route path="/" element={<Navbar/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/transactions" element={<Transactions/>} />
        <Route path="/addTransactionsPage" element={<AddTransactionPage/>}></Route> 
        <Route path="/portfolio" element={<Portfolio/>}></Route>  
        <Route path="assetDetailsPage" element={<AssetDetailsPage/>}></Route>        
      </Routes>
    
    //understand browser router, routes etc
  )
}

export default App


