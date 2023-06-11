import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";

const EnrolledClasses = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const {data:enrolledClasses=[], isLoading} = useQuery({
        queryKey:['enrolledClasses', user?.email],
        queryFn:async()=>axiosSecure.get(`/enrolled-classes/${user?.email}`).then(res=>res.data)
    })

    if (isLoading) {
        return <Loading></Loading>
    }
    console.log(enrolledClasses);
    return (
        <div>
            
        </div>
    );
};

export default EnrolledClasses;