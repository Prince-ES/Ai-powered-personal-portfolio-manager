import loginBg from '../assets/loginBg1.jpg';
import LoginHeadlines from '../Components/LoginPageComponents/LoginHeadlines';
import LoginCard from '../Components/Shared/AuthCard';
function LoginPage (){
    return (
        <div className="loginPage flex min-h-screen max-lg:flex-col  max-lg:min-w-screen">
            <LoginHeadlines loginBg={loginBg} />
            <LoginCard mode="login"/>
        </div>
    );
}

export default LoginPage;