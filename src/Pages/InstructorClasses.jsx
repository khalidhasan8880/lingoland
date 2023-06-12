import { useParams } from "react-router-dom";
import useInstructors from "../hooks/useInstructors";
import Loading from "../components/Loading/Loading";
import { useEffect, useState } from "react";
import PopularCard from "../components/PopularCard/PopularCard";

const InstructorClasses = () => {
   

    const {email} = useParams()
    const [data, isLoading] = useInstructors()
    const [classes, setClasses] = useState([])
    useEffect(()=>{
        if (data?.classes || email || !isLoading) {
            setClasses(data.classes.filter(cls=> cls.email === email))
        }
    },[data?.classes, email])
    console.log(classes);

    if (isLoading || !email ) {
        return <Loading></Loading>
    }


    return (
        <section>
           
            <>
                {
                    classes?.length !== 0 ?  classes.map(cls =>   <PopularCard
                        key={cls?._id}
                        cls={cls}
                        ></PopularCard>)
                        :
                        <h2 className="text-center text-3xl">No classes Found</h2>
                }
            </>
            
        </section>
    );
};

export default InstructorClasses;