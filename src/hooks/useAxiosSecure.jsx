import axios from "axios";
import { useEffect } from "react";

const useAxiosSecure = () => {
   
    const axiosSecure = axios.create({
        baseURL: import.meta.env.VITE_API
    });
    useEffect(() => {
        // Create an instance of Axios
        
        
      
        // Request interceptor
        const requestInterceptor = axiosSecure.interceptors.request.use(
          (config) => {
            // Modify the request config if needed (e.g., add headers, authentication tokens)
            const token = localStorage.getItem('access-token')
            if (token) {
                
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
          },
          (error) => {
            // Handle request errors
            console.error('Request Interceptor Error:', error);
            return Promise.reject(error);
          }
        );
    
        // Response interceptor
        const responseInterceptor = axiosSecure.interceptors.response.use(
          (response) => {
            // Process the response data if needed
            // console.log('Response Interceptor:', response);
            return response;
          },
          (error) => {
            // Handle response errors
            // console.error('Response Interceptor Error:', error);
            return Promise.reject(error);
          }
        );
    
        // Clean up interceptors on component unmount
        return () => {
          axiosSecure.interceptors.request.eject(requestInterceptor);
          axiosSecure.interceptors.response.eject(responseInterceptor);
        };

        
      }, [axiosSecure]);
     return axiosSecure

};

export default useAxiosSecure;













