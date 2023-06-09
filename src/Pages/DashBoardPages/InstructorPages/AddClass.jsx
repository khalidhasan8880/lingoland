import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Button from "../../../components/Button/Button";
import { Toaster } from "react-hot-toast";


const AddClass = () => {
    const axiosSecure = useAxiosSecure()
    const { createUser, user } = useAuth()

    const { register, handleSubmit, } = useForm();
    const onSubmit = data => {
        
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="md:w-1/2 bg-pr mx-auto border rounded-xl font-semibold sm:p-11 p-6 shadow-lg">
        <h1 className="text-center text-3xl font-bold ">Please Sign Up</h1>
        <div className="my-7 ">
            <label className="ms-5">Class Name*</label>
            <input placeholder="Type Your Class Name" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("className", { required: true })} />
        </div>
        <div className="my-7 ">
            <label className="ms-5">Instructor Name</label>
            <input readOnly defaultValue={user?.displayName} placeholder="Type Your Class Name" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("instructorName")} />
        </div>
        <div className="my-7 ">
            <label className="ms-5">Photo Url*</label>
            <input placeholder="Paste Your Photo_url" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("photo", { required: true })} />
        </div>
        <div className="my-7 ">
            <label className="ms-5">Email*</label>
            <input defaultValue={user?.email} readOnly placeholder="Type Your Email" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("email", { required: true })} />
        </div>
        
        <div className="my-7 ">
            <label className="ms-5">Price</label>
            <input placeholder="Price" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("price", { required: true })} />
        </div>
        
        <div className="my-7 ">
            <label className="ms-5">Available seats</label>
            <input placeholder="Price" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("seats", { required: true })} />
        </div>
        
     
        <div className="my-7 ">
            <label className="ms-5">Phone Number</label>
            <input placeholder="Type Your Phone Number" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("phone")} />
        </div>
        {/* submit btn */}
        <Button>Add Class </Button>
        <Toaster />
    </form>
    );
};

export default AddClass;