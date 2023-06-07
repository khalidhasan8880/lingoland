
import { FcGoogle } from "react-icons/fc";

const GoogleLogin = () => {
    // handler
    const googleLoginHandler = () => {
        console.log('clicked');
    }

    return (
        <FcGoogle onClick={googleLoginHandler} size={44} className="hover:text-pr cursor-pointer"></FcGoogle>
    );
};

export default GoogleLogin;