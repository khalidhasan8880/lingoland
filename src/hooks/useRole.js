
import { useAuth } from "./useAuth"
import useAxiosSecure from "./useAxiosSecure"
import { useQuery } from "@tanstack/react-query"

export const useRole = ()=>{
    const axiosSecure = useAxiosSecure()
    const {loading, user} = useAuth()
    const { data, isLoading} = useQuery({
        queryKey: ['userRole'],
        
        enabled: !loading && !!localStorage.getItem('access-token'),
        queryFn: async () => {

            return axiosSecure.get(`/users/role/${user?.email}`)
            .then(res=>res.data)
        }
    })

    return [data, isLoading]
}