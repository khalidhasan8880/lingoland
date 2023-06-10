import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import SelectedCard from "../../../components/SelectedCard/SelectedCard";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const MySelectedClasses = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const {data:carts} = useQuery({
        queryKey:['carts', user?.email],
        queryFn:async()=>axiosSecure.get(`/carts/${user?.email}`).then(res=>{
            console.log(res.data);
            return res.data
        })
    })
    console.log(carts);
    return (
        <div >
            <Helmet>
                <title>LINGOLAND | My Selected Classes </title>
            </Helmet>
            <SectionTitle>My Selected Classes</SectionTitle>
            <div className="flex flex-wrap">
                
                {
                    carts?.map(cart=> <SelectedCard key={cart._id} cart={cart}></SelectedCard>)
                }
            </div>
        </div>
    );
};

export default MySelectedClasses;