import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './Pages/LoginPage.jsx';
import SignupPage from './Pages/SignupPage.jsx';
import './LoginPage.css';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage mode="signup"/>}/>
        <Route path="/login" element={<LoginPage mode="login"/>}/>      
      </Routes>
    </Router>
    
    //understand browser router, routes etc
  )
}

export default App
