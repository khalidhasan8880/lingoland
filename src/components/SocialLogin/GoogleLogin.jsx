
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const GoogleLogin = () => {
    // hooks
    const {continueWithGoogle} = useAuth()
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    // handler
    const googleLoginHandler = () => {
        continueWithGoogle()
        .then(res=>{
           
            axiosSecure.put(`/users/${res?.user?.email}`, {email:res?.user?.email, name:res?.user?.displayName})
            .then(res=>{
                console.log(res.data);
                navigate('/')
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return (
        <FcGoogle onClick={googleLoginHandler} size={44} className="hover:text-pr cursor-pointer"></FcGoogle>
    );
};

export default GoogleLogin;