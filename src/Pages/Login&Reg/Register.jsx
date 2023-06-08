import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import FormFooter from "../../components/FormFooter/FormFooter";

import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

// import { useContext } from "react";
// import { AuthContext } from "../../AuthProvider/AuthProvider";

const Register = () => {
    const axiosSecure = useAxiosSecure()
    const { createUser, user } = useAuth()

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        // password validation
        if (data.password !== data.confirmPassword) {
            toast.error('Password does not matched');
            return
        }
        if (data.password.length < 6) {
            toast.error('password must be six character or more');
            return
        }

        const { name, photo, email, password, gender, address, phone } = data
        createUser(email,password)
        .then(res=>{
            axiosSecure.put(`/users/${user?.email}`, {name, email:user?.email, gender, address, phone, photo} )
                .then(res=>{
                    console.log(res.data);
                    console.log('saved user in mongodb');
                })
            console.log(res);
            
            
        })
        .catch(err=>{
            console.log(err);
        })
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="md:w-1/2 bg-pr mx-auto border rounded-xl font-semibold sm:p-11 p-6 shadow-lg">
            <h1 className="text-center text-3xl font-bold ">Please Sign Up</h1>
            <div className="my-7 ">
                <label className="ms-5">Name*</label>
                <input placeholder="Type Your Name" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("name", { required: true })} />
            </div>
            <div className="my-7 ">
                <label className="ms-5">Photo Url*</label>
                <input placeholder="Paste Your Photo_url" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("photo", { required: true })} />
            </div>
            <div className="my-7 ">
                <label className="ms-5">Email*</label>
                <input placeholder="Type Your Email" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("email", { required: true })} />
            </div>
            <div className="my-7 ">
                <label className="ms-5">Password*</label>
                <input placeholder="Type Your Password" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("password",
                    {
                        pattern: {
                            value: /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/,
                            message:
                                'Password must be at least 6 characters long, contain at least one capital letter, and one special character',
                        },
                    },
                    { required: true })} />
                {errors.password && <p className="text-red-600 ms-4"> {errors.password?.message} </p>}
            </div>
            <div className="my-7 ">
                <label className="ms-5">Confirm Password*</label>
                <input placeholder="Type Your Password" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("confirmPassword",
                    {
                        pattern: {
                            value: /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/,
                            message:
                                'Password must be at least 6 characters long, contain at least one capital letter, and one special character',
                        },
                    },
                    { required: true })} />
                {errors.confirmPassword && <p className="text-red-600 ms-4"> {errors.confirmPassword?.message} </p>}
            </div>

            {/* optional */}
            <div className="my-7 ">
                <label className="ms-5">Select Gender</label>
                <select className="w-full px-4 py-3 border-2 my-1 rounded-full" {...register("gender")}>
                    <option value="female">female</option>
                    <option value="male">male</option>
                    <option value="other">other</option>
                </select>
            </div>
            <div className="my-7 ">
                <label className="ms-5">Address</label>
                <input placeholder="Type Your Address" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("address")} />
            </div>
            <div className="my-7 ">
                <label className="ms-5">Phone Number</label>
                <input placeholder="Type Your Phone Number" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("phone")} />
            </div>
            {/* submit btn */}
            <Button>submit</Button>
            {/* footer */}
            <FormFooter redirect="/login" redirectTitle="Login"></FormFooter>
            <Toaster />
        </form>
    );
};

export default Register;