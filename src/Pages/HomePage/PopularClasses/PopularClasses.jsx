import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PopularCard from "../../../components/PopularCard/PopularCard";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Loading from "../../../components/Loading/Loading";

const PopularClasses = () => {

    const axiosSecure = useAxiosSecure()
    const {data:classes, isLoading} = useQuery({
        queryKey:['classes'],
        queryFn:async()=> axiosSecure.get('/classes/popular').then(res=>res.data)
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <section>
            <SectionTitle>Our Popular Classes</SectionTitle>
            <div className="grid gap-5 sm:grid-cols-3 font-semibold place-content-center ">
                {
                    classes?.map(cls=><PopularCard 
                        key={cls._id}
                        cls={cls}
                    ></PopularCard>)
                }
                
            </div>
        </section>
    );
};

export default PopularClasses;