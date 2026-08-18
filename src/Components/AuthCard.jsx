import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import checkmark from '../assets/checkmark.png';
import crossmark from '../assets/failed.png';

function AuthCard ({mode}){ 
    const isSignup = mode === "signup";
    let [username, setUsername] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [confirmPassword,setConfirmPassword] = useState('');
    let [responseMsg, setResponseMsg] = useState('');

    const matchPassword = password === confirmPassword;

    const navigate = useNavigate();

    function signupAttemptMsg(){
        setTimeout(()=>{
            setResponseMsg('');
        },3000);
    }

    function navigateToLogin(){
        setTimeout(()=>{
            navigate('/login');
        },2000);
    }

    function resetForm(){
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }

    async function handleSubmit(){
        try{
            const res = await axios.post('http://localhost:5000/api/auth/signup',{
                username:username,
                email:email,
                password:password,
            });
            setResponseMsg(res.data.message);
            signupAttemptMsg();
            resetForm();
            navigateToLogin();
            // navigate('/login'); 

        }catch(error){
            setResponseMsg(error.response?.data?.message || "Something went wrong");
            signupAttemptMsg();

            if(error.response?.status === 409){
                setEmail('');
            }
        }
    }

    return (


        <form className="relative flex flex-col items-left justify-center bg-[#DDDDDD]  border-2 border-white px-8 py-12  rounded-[20px] shadow-2xl relative z-4" onSubmit={(e)=>{e.preventDefault(); handleSubmit()}}>
            {responseMsg && 
            <div className="absolute top-[50%] left-[25%] transform translate-y-[-50%]  bg-black/50 text-white py-2 px-4 rounded-full flex">
                { responseMsg === "Account created successfully" && <img className="h-[25px] mr-1" src={checkmark}/>}
                { responseMsg === "Email already registered" && <img className="h-[25px] mr-1" src={crossmark}/>}
                <span>{responseMsg}</span>
            </div>}
            {isSignup && <input required value={username} onChange={(e)=>{setUsername(e.target.value.trim().replace(/\s/g, ''))}} type="text" placeholder="Username" className="w-[350px] border-1 rounded-[10px] border-black-300 focus:outline-none h-[50px]  bg-gray-50 p-4" />}

            <input required value={email} onChange={(e)=>{setEmail(e.target.value.trim().replace(/\s/g, ''))}} type="email" placeholder="Email" className="w-[350px] border-1 rounded-[10px] border-black-300 focus:outline-none h-[50px]  bg-gray-50 p-4 mt-4" />
            
            <input required value={password} onChange={(e)=>{setPassword(e.target.value.trim().replace(/\s/g, ''))}} type="password" placeholder="Password" className="w-[350px] border border-black-300 focus:outline-none bg-gray-50 p-4 rounded-[10px] mt-4 h-[50px]" />

            {isSignup && <input required value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value.trim().replace(/\s/g, ''))}} type="password" placeholder="Confirm Password" className={`w-[350px]  rounded-[10px] border-1  h-[50px]  bg-gray-50 p-4 mt-4 focus:outline-none
            ${matchPassword? 'border-slate-950' : 'border-2 border-red-400 focus:ring-red-500 focus:outline-red  '}`}  />}

            {!isSignup && <div className="forgotPass mt-2 text-sm ">
                Forgot password? <Link to="#" className="text-blue-600 hover:underline">Click here</Link>
            </div>}

            <button disabled={isSignup && !matchPassword} className={`w-[350px] bg-[#0C161D] text-white h-[45px] rounded-[10px] cursor-pointer  mt-4 text-xl active:bg-gray-600 ${!matchPassword && isSignup ? 'bg-gray-600 pointer-events-none' : ''}`} type="submit">{isSignup ? "Sign up" : "Login"} </button>

            <div className="noAccount mt-2 text-sm  text-center mt-4">
                {isSignup ?
                    (<>Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link></>):
                    (<>Don't have an account?  <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link></>)
                }
            </div>
        </form>                

    )
}

export default AuthCard;