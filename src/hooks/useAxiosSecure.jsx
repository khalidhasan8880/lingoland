import axios from "axios";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const useAxiosSecure = () => {
    // const navigate = useNavigate()
    const axiosSecure = axios.create({
        baseURL: 'http://localhost:5000/'
    })

    useEffect(() => {
        axios.interceptors.request.use(config => {
            const token = localStorage.getItem('access-token')
            if (token) {
                return config.headers.Authorization = `bearer ${token}`;
            }
            return config
        })

        axios.interceptors.response.use( async (res, err) => {
            if (res) {
                return res
            }
            if (err) {
                if (res.status === 401 && res.status=== 403) {
                    // navigate('/')
                    console.log('eroor shongothito hoyche ');
                }
                return err
            }

        })
    }, [])
    return axiosSecure
};

export default useAxiosSecure;