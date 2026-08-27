import {Link} from 'react-router-dom';
import {useState} from 'react';
import {useAuth} from '../context/AuthContext.jsx';
function Navbar ({DashboardLogo, className, mode = "log in", currentPage}){
    
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [userProfileData, setUserProfileData] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const {userInfo, setUserInfo} = useAuth();
    // const isIndexPage = indexPage === "indexPage";
    const selectedPageStyles = 'scale-110 font-bold text-gray-400';
    const hidden = className;
    return (
            <div className={`nav flex justify-between h-15 px-8 ${hidden}`}>
                <div className="logo scale-125">
                    <Link to="/">
                        <img src={DashboardLogo} alt="Logo" className="logo-image h-full" />
                    </Link>
                </div>
                <div className={`nav-links bg-[#0C161D] border  text-white text-xl flex justify-between items-center w-[75%] px-28 rounded-full max-lg:px-10 max-lg:text-lg z-2 max-md:flex-col max-md:px-4 max-md:pt-4 max-md:pb-8 max-md:absolute max-md:top-8 max-md:w-auto max-md:top-0 max-md:z-4  max-md:rounded-[10px]  max-md:justify-start max-md:gap-4 max-xl:px-16 ${!isNavOpen ? "max-md:right-[-500px]" : "max-md:right-0"}`}>
                    <div className={`mobileNav-userProfile md:hidden flex items-center border-b pb-4`}>
                        <div className="userlogo p-3 mr-4 rounded-full border text-white text-[11px] ">
                            <i className="fa-regular fa-user "></i>
                        </div>
                        <div>
                            <div className="username">
                                John Doe
                            </div>
                            <div className="email text-sm text-gray-400">
                                john.doe@example.com
                            </div>
                        </div>
                        <div className={`text-md ml-4 cursor-pointer `}>
                            <i className={`fa-solid fa-xmark `} onClick={()=>{setIsNavOpen(prev=>!prev);}}></i>
                        </div>
                    </div>
                    <div className="dashboard-link ">
                        <Link to="/dashboard" className={`${currentPage === "Dashboard" ? selectedPageStyles : '' }`}>Dashboard</Link>
                    </div>
                    <div>
                        <Link to="/portfolio" className={`${currentPage === "Portfolio" ? selectedPageStyles : '' }`}>Portfolio</Link>
                    </div>
                    <div>
                        <Link to="/transactions" className={`${currentPage === "Transactions" ? selectedPageStyles : '' }`}>Transactions</Link>
                    </div>
                    <div>
                        <Link to="/AiInsights" className={`${currentPage === "AI Insights" ? selectedPageStyles : '' }`}>AI Insights</Link>
                    </div>
                    <div>
                        <Link to="/settings" className={`${currentPage === "Settings" ? selectedPageStyles : '' }`}>Settings</Link>
                    </div>
                    <div className="md:hidden">
                        Logout
                    </div>
                </div>
               
                {/* if logged? show user profile else login buttion */}
                {userInfo ? <div className={`userAndBars flex items-center justify-center bg-black text-white text-xl w-20 rounded-full z-3 border py-4 ${isNavOpen ? "max-md:opacity-0" : "opacity-100"}`}>
                    <div>
                        <span className= "hider max-md:hidden relative ">
                            <i className="fa-regular fa-user cursor-pointer hidden " onClick={()=>{setUserProfileData(prev => !prev)}}></i>
                            <div className={`absolute top-12 right-[-20px]
                                            flex flex-col gap-4 pl-4 pr-8 py-4
                                            bg-[#0C161D] border rounded-[10px]
                                            transition-all duration-300 ease-in-out
                                            ${
                                            userProfileData
                                                ? "opacity-100 translate-y-0"
                                                : "opacity-0 translate-y-4 pointer-events-none"
                                            }`}>
                                <div className="usernameAndEmail flex flex-col">
                                    <div className="usernam text-lg">
                                        {userInfo.username}
                                    </div>
                                    <div className="email text-sm text-gray-300">
                                        {userInfo.email}
                                    </div>
                                </div>
                                <div className="text-red-300">
                                    logout
                                </div>
                            </div>                            
                        </span>
                    </div>
                    <span className={`hider md:hidden `} >
                        <i className={`fa-solid fa-bars md:hidden`} onClick={()=>{setIsNavOpen(prev=>!prev);}}></i>
                    </span>                    
                </div>
                
                :

                <Link to={`/${mode.replace(/\s/g, "")}`} className="flex items-center justify-center bg-black text-white text-xl  rounded-full z-3 border py-4 px-8 max-lg:px-4">
                    <div to={`/${mode.replace(/\s/g, "")}`}>
                       {mode}
                    </div>
                </Link>}
                
                
                
            </div>
    )
}

export default Navbar;