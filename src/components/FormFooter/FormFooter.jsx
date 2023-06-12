import { Link } from "react-router-dom";
import GoogleLogin from "../SocialLogin/GoogleLogin";

const FormFooter = ({redirect, redirectTitle, redirectMessage}) => {
    return (
        <div className="flex flex-col gap-y-4 items-center mt-10">
            <p className="text-sm ">{redirectMessage} <Link className="text-pr" to={redirect}>{redirectTitle}</Link></p>
            <p className="text-xl font-bold text-center">
                Or
            </p>
            <p> Continue With Social Login</p>

            <GoogleLogin></GoogleLogin>
        </div>
    );
};

export default FormFooter;