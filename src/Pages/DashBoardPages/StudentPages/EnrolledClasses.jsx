import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";
import EnrolledCard from "../../../components/EnrolledCard/EnrolledCard";

const EnrolledClasses = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const {data:classes, isLoading} = useQuery({
        queryKey:['enrolledClasses', user?.email],
        queryFn:async()=>axiosSecure.get(`/enrolled-classes/${user?.email}`).then(res=>res.data)
    })

    if (isLoading) {
        return <Loading></Loading>
    }
    console.log(classes);
    return (
        <div>
            {
                classes?.map(cls=> <EnrolledCard key={cls?._id} cls={cls}></EnrolledCard>)
            }
        </div>
    );
};

export default EnrolledClasses;