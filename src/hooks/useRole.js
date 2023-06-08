import { useState } from "react"
import { useAuth } from "./useAuth"
import useAxiosSecure from "./useAxiosSecure"

export const useRole = ()=>{
    const [role, setRole] = useState('')
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()

    axiosSecure.get(`/users/role/${user?.email}`)
    .then(res=>{
        console.log(res.data);
        setRole(res?.data?.role)
    })
    .catch(err=>{
        console.log(err);
    })

    return role
}