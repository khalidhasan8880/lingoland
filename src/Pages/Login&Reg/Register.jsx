import { useForm } from "react-hook-form";

const Register = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
     console.log(register);
    return (
        <div className="mt-40">
            heo
            <form onSubmit={handleSubmit(onSubmit)} className="md:w-1/2 mx-auto border rounded-xl663.*-">
                <input {...register("firstName", { required: true, maxLength: 20 })} />
                <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
                <input type="number" {...register("age", { min: 18, max: 99 })} />
                <input type="submit" />
            </form>
        </div>
    );
};

export default Register;