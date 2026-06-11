import {Routes, Route} from 'react-router-dom';
import Dashboard from './Pages/Dashboard.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import SignupPage from './Pages/SignupPage.jsx';
import './LoginPage.css';

function App() {
  

  return (
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/signup" element={<SignupPage mode="signup"/>}/>
        <Route path="/login" element={<LoginPage mode="login"/>}/>      
      </Routes>
    
    //understand browser router, routes etc
  )
}

export default App
