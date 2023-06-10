import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Instructor = () => {
    const axiosSecure = useAxiosSecure()
    const {data:instructors}=useQuery({
        queryKey:['instructor'],
        queryFn:async()=>axiosSecure.get('/instructors').then(res=>res.data)
    })
    console.log(instructors);
    return (
        <div>
            
        </div>
    );
};

export default Instructor;