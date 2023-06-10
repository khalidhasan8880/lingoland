import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import { Toaster } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";


const AddClass = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [breakMultiClick, setBreakMultiClick] = useState(false)
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        console.log(data);
        setBreakMultiClick(true)
        
        axiosSecure.post(`/add-class/${user?.email}`, data)
        .then((res)=>{
            console.log(res.data);
            setBreakMultiClick(false)
            reset()
        })
        .catch(()=>{
            setBreakMultiClick(false)
        })
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-pr mx-auto border rounded-xl font-semibold sm:p-11 p-6 shadow-lg">
            <h1 className="text-center text-3xl font-bold ">Add You Class</h1>
            <div className="grid sm:grid-cols-2 gap-4 ">
                <div className="my-7 ">
                    <label className="ms-5">Instructor Name</label>
                    <input readOnly defaultValue={user?.displayName} placeholder="Type Your Class Name" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("instructorName")} />
                </div>
                <div className="my-7 ">
                    <label className="ms-5">Email*</label>
                    <input defaultValue={user?.email} readOnly placeholder="Type Your Email" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("email", { required: true })} />
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 ">
                <div className="my-7 ">
                    <label className="ms-5">Price</label>
                    <input type="number" placeholder="Price" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("price", { required: true })} />
                </div>

                <div className="my-7 ">
                    <label className="ms-5">Available seats</label>
                    <input type="number" placeholder="Available Seats" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("seats", { required: true })} />
                </div>
            </div>



            <div className="grid sm:grid-cols-2 gap-4">
                <div className="my-7 ">
                    <label className="ms-5">Class Name*</label>
                    <input placeholder="Type Your Class Name" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("className", { required: true })} />
                </div>

                <div className="my-7 ">
                    <label className="ms-5">Phone Number</label>
                    <input placeholder="Type Your Phone Number" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("phone")} />
                </div>
            </div>
            <div className="my-7 ">
                <label className="ms-5">Photo Url*</label>
                <input placeholder="Paste Your Photo_url" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("photo", { required: true })} />
            </div>
            <input hidden type="text" defaultValue='pending' {...register("status")} />
            <input hidden type="text" defaultValue={user?.displayName} {...register("instructorName")} />

            {/* submit btn */}
            <button className="bg-gradient-to-r from-[#3de09b] to-[#00c4ee] text-xl active:px-5 text-white sm:text-1xl text-center px-6 py-2 rounded-full" disabled={breakMultiClick}>
                Add Class
            </button>
            <Toaster />
        </form>
    );
};

export default AddClass;