function LoginCard (){
    return (
        <div className="rightPart w-1/2  max-lg:min-w-screen flex items-center justify-center bg-taupe-50 p-8">
                <form className="flex flex-col items-left justify-center bg-gray-400 px-8 py-12  rounded-[20px] shadow-lg" required>
                    <input type="text" placeholder="Email or username" className="w-[350px] border-1 rounded-[10px] border-black-300 focus:outline-none h-[60px]  bg-gray-50 p-4" />
                    
                    <input type="password" placeholder="Password" className="w-[350px] border border-black-300 focus:outline-none bg-gray-50 p-4 rounded-[10px] mt-4 " />

                    <div className="forgotPass mt-2 text-sm ">
                        Forgot password? <a href="#" className="text-blue-50 hover:underline">Click here</a>
                    </div>

                    <button className="w-[350px] bg-blue-400 text-white py-2 px-4 rounded-[10px]  mt-4 text-xl">Login</button>

                    <div className="noAccount mt-2 text-sm  text-center mt-4">
                        Don't have an account? <a href="#" className="text-gray-50 hover:underline">Sign up</a>
                    </div>
                </form>
                
            </div>
    )
}

export default LoginCard;