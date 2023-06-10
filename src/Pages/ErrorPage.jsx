import Lottie from "lottie-react";
import errorAnimation from "../../public/404.json";
import { Link } from "react-router-dom";
const ErrorPage = () => {
    
    return (
       <div className="h-[80vh] w-full container mx-auto">
         <Lottie  animationData={errorAnimation} loop={true} />
         <Link to='/' className="bg-gradient-to-r bg-[#8C8C8C] hover:text-white text-2xl font-semibold text-center px-6 py-2 rounded-full hover:from-[#3de09b] hover:to-[#00c4ee] mx-auto block w-40 relative bottom-6">Go Home</Link>
       </div>
    );
};

export default ErrorPage;