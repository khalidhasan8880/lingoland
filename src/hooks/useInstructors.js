import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useInstructors = () => {
    const axiosSecure = useAxiosSecure()
    const { data = [], isLoading } = useQuery({
        queryKey: ['allInstructor'],
        queryFn: async () => axiosSecure.get('/instructors').then(res => res.data)
    })
    return [data, isLoading]
};

export default useInstructors;