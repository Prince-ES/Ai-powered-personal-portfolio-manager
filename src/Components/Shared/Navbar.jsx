import {Link} from 'react-router-dom';
import {useState} from 'react';
function Navbar ({DashboardLogo, indexPage, className}){
    
    const [isNavOpen, setIsNavOpen] = useState(false);

    const isIndexPage = indexPage === "indexPage";
    const hidden = className;
    return (
            <div className={`nav flex justify-between h-15 px-8 ${hidden}`}>
                <div className="logo scale-125">
                    <Link to="/dashboard">
                        <img src={DashboardLogo} alt="Logo" className="logo-image h-full" />
                    </Link>
                </div>
                <div className={`nav-links bg-[#0C161D] border  text-white text-xl flex justify-between items-center w-[75%] px-28 rounded-full max-lg:px-12 z-2 max-md:flex-col max-md:px-4 max-md:pt-4 max-md:pb-8 max-md:absolute max-md:top-8 max-md:w-auto max-md:top-0 max-md:z-4  max-md:rounded-[10px]  max-md:justify-start max-md:gap-4 ${!isNavOpen ? "max-md:right-[-500px]" : "max-md:right-0"}`}>
                    <div className={`mobileNav-userProfile md:hidden flex items-center border-b pb-4`}>
                        <div className="userlogo p-3 mr-4 rounded-full border text-white text-[11px] ">
                            <i className="fa-regular fa-user "></i>
                        </div>
                        <div className="username">
                            John Doe
                        </div>
                        <div className={`text-md ml-4 cursor-pointer `}>
                            <i className={`fa-solid fa-xmark `} onClick={()=>{setIsNavOpen(prev=>!prev);console.log('xmark')}}></i>
                        </div>
                    </div>
                    <div className="dashboard-link  ">
                        <Link to="/dashboard">Dashboard</Link>
                    </div>
                    <div>
                        <Link to="/portfoxlio">Portfolio</Link>
                    </div>
                    <div>
                        <Link to="/transactions">Transactions</Link>
                    </div>
                    <div>
                        <Link to="/settings">Settings</Link>
                    </div>
                </div>
                {!isIndexPage && 
                <div className={`userAndBars flex items-center justify-center bg-black text-white text-xl w-20 rounded-full z-3 border py-4 ${isNavOpen ? "max-md:opacity-0" : "opacity-100"}`}>
                    <Link to="/user-profile" >
                        <span className= "hider max-md:hidden">
                            <i className="fa-regular fa-user"></i>
                        </span>
                      </Link>
                    <span className={`hider md:hidden `} >
                        <i className={`fa-solid fa-bars md:hidden`} onClick={()=>{setIsNavOpen(prev=>!prev); console.log('bars')}}></i>
                    </span>                    
                </div>
                }
                {isIndexPage && 
                <div className="flex items-center justify-center bg-black text-white text-xl  rounded-full z-3 border py-4 px-8 max-lg:px-4">
                    <Link to="/login">
                        Log in
                    </Link>
                </div>
                }  
            </div>
    )
}

export default Navbar;