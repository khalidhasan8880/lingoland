import { Helmet } from "react-helmet-async";

// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { useAuth } from "../../../hooks/useAuth";
// import { useQuery } from "@tanstack/react-query";
// import { useRole } from "../../../hooks/useRole";
// import Loading from "../../../components/Loading/Loading";
import PopularClasses from "../PopularClasses/PopularClasses";
import Carousel from "../Carousel/Carousel";
import Instructor from "../../InstructorPage/Instructor";
import AnimationSection from "../AnimationSection/AnimationSection";

const Home = () => {
    

    // const axiosSecure = useAxiosSecure()
    // const {data:classes, isLoading} = useQuery({
    //     queryKey:['classes'],
    //     queryFn:async()=> axiosSecure.get('/classes').then(res=>res.data)
    // })
    // if (isLoading) {
    //     return <Loading></Loading>
    // }
    return (
        <>
            <Helmet>
                <title>LINGOLAND | Home </title>
            </Helmet>
            <Carousel></Carousel>
            {/* ---------------------------------------------------- */}
            <PopularClasses></PopularClasses>
            <Instructor></Instructor>
            <AnimationSection></AnimationSection>
        </>
    );
};

export default Home;