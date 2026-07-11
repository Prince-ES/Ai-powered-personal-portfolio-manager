import Navbar from '../Components/Shared/Navbar';
import {Link} from 'react-router-dom';
import DashboardLogo from '../assets/dashboardLogo.svg';
import '../Dashboard.css';

function AiInsightsPage (){
    return (
        <div className="dashboard pt-4">
            <Navbar DashboardLogo={DashboardLogo}/>
            <div className="content flex flex-col items-center gap-8 pt-8 relative z-3">
                <div className="pageTitle text-3xl font-bold text-white w-full max-md:text-center border-y border-white px-8 py-4 bg-black/35">
                    AI Financial Advisor
                </div>
                <div className="pageContent text-white bg-black/35 w-full px-8 py-4 max-md:px-4 flex flex-col gap-8 ">
                    <div className="heading text-2xl font-bold">This Month Analysis</div>
                    <div className="analysis text-lg ">
                        Your food spending increased 22%.                           
                                                             
                         You saved 14% less than last month.                        
                                                                                     
                         Consider reducing entertainment expenses.
                          Your food spending increased 22%.                           
                                                             
                         You saved 14% less than last month.                        
                                                                                     
                         Consider reducing entertainment expenses.
                          Your food spending increased 22%.                           
                                                             
                         You saved 14% less than last month.                        
                                                                                     
                         Consider reducing entertainment expenses.
                          Your food spending increased 22%.                           
                                                             
                         You saved 14% less than last month.                        
                                                                                     
                         Consider reducing entertainment expenses.
                          Your food spending increased 22%.                           
                                                             
                         You saved 14% less than last month.                        
                                                                                     
                         Consider reducing entertainment expenses.
                    </div>
                    <Link className="newAnalysis text-xl underline" to="/aiinsights">
                        Generate New Analysis
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AiInsightsPage;