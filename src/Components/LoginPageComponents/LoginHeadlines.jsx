function LoginHeadlines({loginBg}){
    return (
        <div className="leftPart w-1/2  p-12 flex flex-col items-center max-lg:min-w-screen justify-center max-lg:h-1/2 max-lg:py-8" style={{ backgroundImage: `url(${loginBg})`}} >              
        
            <div className="description max-xl:flex max-xl:flex-col max-xl:items-center max-xl:text-center">
                <i className="fa-solid fa-arrow-trend-up text-8xl"></i>
                <div className="title text-5xl font-bold ">
                    Your Portfolio, <br /> Intelligently Managed.
                </div>  
                <div className="caption text-2xl mt-4">
                    AI Insights • Real-Time data
                </div>
            </div>
            
        </div>
    )
}
export default LoginHeadlines;