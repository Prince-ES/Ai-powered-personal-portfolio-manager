import SignupCard from '../Components/shared/AuthCard';
import SignupHeadlines from '../Components/LoginPageComponents/LoginHeadlines';
import loginBg from '../assets/loginBg1.jpg';
function SignupPage(){
    return (
        <div className="loginPage flex min-h-screen max-lg:flex-col  max-lg:min-w-screen">
            <SignupHeadlines loginBg={loginBg} />
            <SignupCard mode="signup" />
        </div>
    )
}

export default SignupPage;