import {useState} from 'react';
import {Link} from 'react-router-dom';

function AuthCard ({mode}){ 
    const isSignup = mode === "signup";
    let [username, setUsername] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [confirmPassword,setConfirmPassword] = useState('');

    const matchPassword = password === confirmPassword;
    return (
        <div className="rightPart w-1/2  max-lg:min-w-screen flex items-center justify-center bg-taupe-50 p-8">
                <form className="flex flex-col items-left justify-center bg-gray-400 px-8 py-12  rounded-[20px] shadow-lg" >
                   {isSignup && <input required value={username} onChange={(e)=>{setUsername(e.target.value);console.log('username updated')}} type="text" placeholder="Name" className="w-[350px] border-1 rounded-[10px] border-black-300 focus:outline-none h-[50px]  bg-gray-50 p-4" />}

                    <input required value={email} onChange={(e)=>{setEmail(e.target.value);console.log('email updated')}} type="text" placeholder="Email" className="w-[350px] border-1 rounded-[10px] border-black-300 focus:outline-none h-[50px]  bg-gray-50 p-4 mt-4" />
                    
                    <input required value={password} onChange={(e)=>{setPassword(e.target.value);console.log('password updated')}} type="password" placeholder="Password" className="w-[350px] border border-black-300 focus:outline-none bg-gray-50 p-4 rounded-[10px] mt-4 h-[50px]" />

                   {isSignup && <input required value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value);console.log('confirmPassword updated')}} type="password" placeholder="Confirm Password" className={`w-[350px]  rounded-[10px] border-1  h-[50px]  bg-gray-50 p-4 mt-4 focus:outline-none
                   ${matchPassword? 'border-slate-950' : 'border-2 border-red-400 focus:ring-red-500 focus:outline-red  '}`}  />}

                    {!isSignup && <div className="forgotPass mt-2 text-sm ">
                        Forgot password? <Link to="#" className="text-blue-50 hover:underline">Click here</Link>
                    </div>}

                    <button className="w-[350px] bg-blue-400 text-white h-[45px] rounded-[10px]  mt-4 text-xl">{isSignup ? "Sign up" : "Login"}</button>

                    <div className="noAccount mt-2 text-sm  text-center mt-4">
                        {isSignup ?
                            (<>Already have an account? <Link to="/login" className="text-gray-50 hover:underline">Log in</Link></>):
                            (<>Don't have an account?  <Link to="/signup" className="text-gray-50 hover:underline">Sign up</Link></>)
                        }
                    </div>
                </form>                
            </div>
    )
}

export default AuthCard;