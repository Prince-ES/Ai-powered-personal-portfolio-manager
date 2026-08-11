import Navbar from '../Components/Shared/Navbar';
import LoginCard from '../Components/Shared/AuthCard';
import DashboardLogo from '../assets/DashboardLogo.svg';

function LoginPage (){
    return (
        <div className="dashboard pt-4 xl:overflow-hidden m-0 flex items-center justify-center">
            <Navbar className="max-sm:hidden fixed top-4 w-full z-4" DashboardLogo={DashboardLogo} mode="Sign up"/>
            <LoginCard mode="login"/>
        </div>
    );
}

export default LoginPage;