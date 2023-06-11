import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import SelectedCard from "../../../components/SelectedCard/SelectedCard";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Button from "../../../components/Button/Button";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";

const MySelectedClasses = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const {data:carts, isLoading} = useQuery({
        queryKey:['carts', user?.email],
        queryFn:async()=>axiosSecure.get(`/carts/${user?.email}`).then(res=>{
            console.log(res.data);
            return res.data
        })
    })
    console.log(carts);
    if (isLoading) {
        return <Loading></Loading>
    }
    
    return (
        <div >
            <Helmet>
                <title>LINGOLAND | My Selected Classes </title>
            </Helmet>
            <SectionTitle>My Selected Classes</SectionTitle>
            <div className="flex flex-wrap justify-between">
            <h1 className="text-2xl my-5">Total selected Cart: {carts?.length}</h1>
            <Link to='/payment' state={{ carts }} className="bg-gradient-to-r from-[#3de09b] to-[#00c4ee] text-white mt-11 text-center px-6 py-2 rounded-full">Pay Now</Link>
            </div>
            <div className="flex flex-wrap">
                
                {
                    carts?.map(cart=> <SelectedCard key={cart._id} cart={cart}></SelectedCard>)
                }
            </div>
        </div>
    );
};

export default MySelectedClasses;