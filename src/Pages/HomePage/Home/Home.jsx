import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useAuth } from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useRole } from "../../../hooks/useRole";
import Loading from "../../../components/Loading/Loading";

const Home = () => {
    // const axiosSecure = useAxiosSecure()
    // const {  loading } = useAuth()
    // const { data} = useQuery({
    //     queryKey: ['data'],
        
    //     enabled: !loading && !!localStorage.getItem('access-token'),
    //     queryFn: async () => {

    //         return axiosSecure.get('/test')
    //         .then(res=>res.data)
    //     }
    // })
    // console.log(data);

    const [data, isLoading] = useRole()
    console.log(data);

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <>
            <Helmet>
                <title>LINGOLAND | Home </title>
            </Helmet>

            <Banner></Banner>
        </>
    );
};

export default Home;