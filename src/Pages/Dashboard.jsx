import {Link} from 'react-router-dom';
// import dashboardBg from '../assets/DashboardBg.png';
import '../Dashboard.css';
import DashboardLogo from '../assets/DashboardLogo.svg';
function Dashboard (){
    return (
        <div className="dashboard pt-8">
            <div className="nav flex justify-between md:h-20 px-8 ">
                <div className="logo">
                    <img src={DashboardLogo} alt="Logo" className="logo-image h-full" />
                </div>
                <div className="nav-links bg-black text-slate-400 text-2xl flex justify-between items-center w-[75%] px-28 rounded-full">
                    <div className="dashboard-link  ">
                        <Link to="/">Dashboard</Link>
                    </div>
                    <div>
                        <Link to="/portfolio">Portfolio</Link>
                    </div>
                    <div>
                        <Link to="/transactions">Transactions</Link>
                    </div>
                    <div>
                        <Link to="/settings">Settings</Link>
                    </div>
                </div>
                <div className="user flex items-center justify-center bg-black text-white text-2xl w-20 rounded-full">
                    <Link to="/user-profile" >
                        <i class="fa-regular fa-user"></i>
                    </Link>
                </div>
            </div>


        </div>
    );
}

export default Dashboard;