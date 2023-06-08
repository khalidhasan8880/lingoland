import axios from "axios";
// import { useNavigate } from "react-router-dom";

const useAxiosSecure = () => {
    // const navigate = useNavigate()
    const axiosSecure = axios.create({
        baseURL: 'http://localhost:5000/'
    })


    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        if (token) {
            config.headers.Authorization = token
        }
        
        return config;
      }, function (error) {
        return Promise.reject(error);
      });

   
      axiosSecure.interceptors.response.use( async (res, err) => {
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

    return axiosSecure
};

export default useAxiosSecure;