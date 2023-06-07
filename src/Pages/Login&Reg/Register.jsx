import { useForm } from "react-hook-form";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <section>
            heo
            <form onSubmit={handleSubmit(onSubmit)} className="md:w-1/2 mx-auto border rounded-xl font-semibold p-5">
                <div className="my-7 ">
                    <label className="ms-5">Name*</label>
                    <input placeholder="Type Your Name" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("Name", { required: true })} />
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
                    <input placeholder="Type Your Password" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("password", { required: true })} />
                    {errors.password && <p className="text-red-600 ms-4"> Password must be at least 6 characters a capital letter & a special character or more</p>}
                </div>
                <div className="my-7 ">
                    <label className="ms-5">Confirm Password*</label>
                    <input placeholder="Type Your Password" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("confirmPassword", { required: true })} />
                    {errors.confirmPassword && <p className="text-red-600 ms-4"> Password must be at least 6 characters a capital letter & a special character or more</p>}
                </div>

                {/* optional */}
                <div className="my-7 ">
                    <label className="ms-5">Email</label>
                    <select className="w-full px-4 py-3 border-2 my-1 rounded-full" {...register("gender")}>
                        <option value="female">female</option>
                        <option value="male">male</option>
                        <option value="other">other</option>
                    </select>
                </div>
                <div className="my-7 ">
                    <label className="ms-5">Address</label>
                    <input placeholder="Type Your Address" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("address", { required: true })} />
                </div>
                <div className="my-7 ">
                    <label className="ms-5">Phone Number</label>
                    <input placeholder="Type Your Phone Number" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("phoneNumber", { required: true })} />
                </div>
                


                <input type="submit" />
            </form>
        </section>
    );
};

export default Register;