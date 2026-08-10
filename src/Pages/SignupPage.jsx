import SignupCard from '../Components/shared/AuthCard';
function SignupPage(){
    return (
        <div className="loginPage flex min-h-screen max-lg:flex-col  max-lg:min-w-screen">
            <SignupCard mode="signup" />
        </div>
    )
}

export default SignupPage;