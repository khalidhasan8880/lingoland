import axios from "axios";
import { useEffect } from "react";

const useAxiosSecure = () => {
    const axiosSecure = axios.create({
        baseURL:'http://localhost:5000/'
    })

    useEffect(()=>{
        axios.interceptors.request.use(config=>{
           const token = localStorage.getItem('access-token')
            if (token) {
                return config.headers.Authorization = `bearer ${token}`;
            }
            return config
        })
        
    },[])
    return axiosSecure
};

export default useAxiosSecure;