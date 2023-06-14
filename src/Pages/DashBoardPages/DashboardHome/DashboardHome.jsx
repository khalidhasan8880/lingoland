import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useAuth } from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";
import { useRole } from "../../../hooks/useRole";

const DashboardHome = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [usersRole, isLoading] = useRole()
    const { data } = useQuery({
        queryKey: ['data-count'],
        enabled: !loading && !!localStorage.getItem('access-token'),
        queryFn: async () => axiosSecure.get(`/data-count/${user?.email}`).then(res => res.data)
    })


    if (isLoading || loading) {
        return <Loading></Loading>
    }
    console.log(data);
    return (
        <div>
            {/* ------admin--------- */}
            {
                usersRole?.role === 'admin'
                &&
                <div className="flex flex-wrap justify-center items-center gap-5 mx-auto">
                    <div className="w-44 h-32 shadow-lg px-1 rounded-xl flex flex-col gap-y-3 justify-center items-center">
                        <h2 className="text-center text-xl font-bold">Total Users</h2>
                        <h2 className="text-center text-2xl sm:text-4xl font-bold">{data?.userCount}</h2>
                    </div>
                    <div className="w-44 h-32 shadow-lg px-1 rounded-xl flex flex-col gap-y-3 justify-center items-center">
                        <h2 className="text-center text-xl font-bold">Total Instructors</h2>
                        <h2 className="text-center text-2xl sm:text-4xl font-bold">{data?.instructorCount}</h2>
                    </div>
                    <div className="w-44 h-32 shadow-lg px-1 rounded-xl flex flex-col gap-y-3 justify-center items-center">
                        <h2 className="text-center text-xl font-bold">Total Classes</h2>
                        <h2 className="text-center text-2xl sm:text-4xl font-bold">{data?.classesCount}</h2>
                    </div>
                    <div className="w-44 h-32 shadow-lg px-1 rounded-xl flex flex-col gap-y-3 justify-center items-center ">
                        <h2 className="text-center text-xl font-bold">Pending Classes</h2>
                        <h2 className="text-center text-2xl sm:text-4xl font-bold">{data?.pendingClasses}</h2>
                    </div>

                </div>
            }

            {/* ------instructor------------ */}

            {
                usersRole?.role === 'instructor'
                &&
                <div className="flex flex-wrap justify-center items-center gap-5 mx-auto">
                    <div className="w-44 h-32 shadow-lg px-1 rounded-xl flex flex-col gap-y-3 justify-center items-center">
                        <h2 className="text-center text-xl font-bold">My Classes</h2>
                        <h2 className="text-center text-2xl sm:text-4xl font-bold">{data?.myClasses}</h2>
                    </div>
                    <div className="w-44 h-32 shadow-lg px-1 rounded-xl flex flex-col gap-y-3 justify-center items-center">
                        <h2 className="text-center text-xl font-bold">Approved</h2>
                        <h2 className="text-center text-2xl sm:text-4xl font-bold">{data?.myApprovedClasses}</h2>
                    </div>
                    <div className="w-44 h-32 shadow-lg px-1 rounded-xl flex flex-col gap-y-3 justify-center items-center">
                        <h2 className="text-center text-xl font-bold">Pending</h2>
                        <h2 className="text-center text-2xl sm:text-4xl font-bold">{data?.myPendingClasses}</h2>
                    </div>
                    <div className="w-44 h-32 shadow-lg px-1 rounded-xl flex flex-col gap-y-3 justify-center items-center ">
                        <h2 className="text-center text-xl font-bold">Deny</h2>
                        <h2 className="text-center text-2xl sm:text-4xl font-bold">{data?.denyClasses}</h2>
                    </div>

                </div>
            }

            {/*-------- student  ----------*/}

            {
                usersRole?.role !== 'instructor' && usersRole?.role ==! 'admin'
                &&
                <div className="flex flex-wrap justify-center items-center gap-5 mx-auto">
                    <div className="w-44 h-32 shadow-lg px-1 rounded-xl flex flex-col gap-y-3 justify-center items-center">
                        <h2 className="text-center text-xl font-bold">Selected Classes</h2>
                        <h2 className="text-center text-2xl sm:text-4xl font-bold">{data?.mySelectedClasses}</h2>
                    </div>
                    <div className="w-44 h-32 shadow-lg px-1 rounded-xl flex flex-col gap-y-3 justify-center items-center">
                        <h2 className="text-center text-xl font-bold">Successful Payment</h2>
                        <h2 className="text-center text-2xl sm:text-4xl font-bold">{data?.myTotalNumberOfPayment}</h2>
                    </div>
                </div>
            }
        </div>
    );
};

export default DashboardHome;