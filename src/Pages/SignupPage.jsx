import SignupCard from '../Components/Shared/AuthCard';
import Navbar from '../Components/Shared/Navbar' 
import DashboardLogo from '../assets/DashboardLogo.svg';

function SignupPage (){
return(
    <div className="dashboard pt-4 xl:overflow-hidden m-0 flex items-center justify-center">
        <Navbar className="max-sm:hidden fixed top-4 w-full z-4" DashboardLogo={DashboardLogo} mode="Log in"/>
        <SignupCard mode="signup" />
    </div>
)
}

export default SignupPage;