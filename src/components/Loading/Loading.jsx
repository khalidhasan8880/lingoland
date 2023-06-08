import Lottie from "lottie-react";
import loadingAnimation from "./loading.json";
import './loading.css'
const Loading = () => {
    
    return (
        <div className="loading mx-auto  w-20">
            <Lottie  animationData={loadingAnimation} loop={true} />
        </div>
    );
};

export default Loading;