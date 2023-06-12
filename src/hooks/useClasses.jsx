import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useClasses = () => {
    const axiosSecure = useAxiosSecure();
    const {data:classes, isLoading}= useQuery({
        queryKey:['classes'],
        queryFn:async()=>axiosSecure.get('/classes').then(res=>res.data)
    }) 
    return [classes, isLoading]
};

export default useClasses;