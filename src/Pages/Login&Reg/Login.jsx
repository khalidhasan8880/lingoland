import { useState } from "react";
import Button from "../../components/Button/Button";
import FormFooter from "../../components/FormFooter/FormFooter";
import { useForm } from "react-hook-form";
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [errorMessage, setErrorMessage] = useState(null)
    const {logIn}=useAuth()
    const [showPass, setShowPass] = useState(false)
    const { register, handleSubmit } = useForm();
    const navigate= useNavigate()
    const onSubmit = data => 
    {
        console.log(data);
        logIn(data.email, data.password)
        .then(res=>{
            console.log(res);
            navigate('/')
        })
        .catch(err=>{
            console.log(err);
        })
    }
    ;



    return (
        <form onSubmit={handleSubmit(onSubmit)} className="md:w-1/2 bg-pr mx-auto border rounded-xl font-semibold sm:p-11 p-6 shadow-lg">
            <h1 className="text-center text-3xl font-bold ">Please Login</h1>
            <div className="my-7 ">
                <label className="ms-5">Email</label>
                <input placeholder="Type Your Email" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("email", { required: true })} />
            </div>
            <div className="my-7 ">
                <label className="ms-5">Password</label>
                <div className="relative">
                    <input type={showPass?'text':'password'} placeholder="Type Your password" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("password", { required: true })} />
                    {/* icon for show password */}
                    <AiOutlineEyeInvisible onClick={()=>  setShowPass(!showPass)} className="absolute top-5 right-5" size={22}></AiOutlineEyeInvisible>
                </div>

            </div>
            {errorMessage && <p className="text-red-600 ms-4"> {errorMessage} </p>}
            {/* submit btn */}
            <Button>submit</Button>
            {/* footer */}
            <FormFooter redirect="/login" redirectTitle="Login"></FormFooter>

        </form>
    );
};

export default Login;