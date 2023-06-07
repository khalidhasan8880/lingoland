import { useState } from "react";
import Button from "../../components/Button/Button";
import FormFooter from "../../components/FormFooter/FormFooter";
import { useForm } from "react-hook-form";
const Login = () => {
    const [errorMessage, setErrorMessage]  = useState(null)
    const { register, handleSubmit} = useForm();
    const onSubmit = data => console.log(data);



    return (
        <form onSubmit={handleSubmit(onSubmit)} className="md:w-1/2 bg-pr mx-auto border rounded-xl font-semibold sm:p-11 p-6 shadow-xl">
            <h1 className="text-center text-3xl font-bold ">Please Sign Up</h1>
            <div className="my-7 ">
                <label className="ms-5">Name*</label>
                <input placeholder="Type Your Name" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("Name", { required: true })} />
            </div>
            <div className="my-7 ">
                <label className="ms-5">Name*</label>
                <input placeholder="Type Your Name" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("Name", { required: true })} />
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