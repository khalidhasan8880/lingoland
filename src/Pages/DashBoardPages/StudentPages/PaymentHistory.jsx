import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useAuth } from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";

const PaymentHistory = () => {
    const axiosSecure= useAxiosSecure()
    const {user}=useAuth()
    const {isLoading, data:payments} = useQuery({
        queryKey:['paymentHistory'],
        queryFn:async()=>axiosSecure.get(`/payments/${user?.email}`).then(res=>res.data)
    })
    console.log(payments);
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            
            <table className="w-full">
                <thead className=" bg-pr">
                    <tr>
                        <th className="p-2 ">
                            <p className="text-left">Name</p>
                        </th>
                        <th className="p-2 ">
                            <p className="text-left">Class/item Id</p>
                        </th>
                        <th className="p-2 ">
                            <p className="text-left">Price</p>
                        </th>
                        <th className="p-2 ">
                            <p className="text-left">Transaction Id</p>
                        </th>
                    </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">

                    {
                        payments?.map(payment => {
                            return (
                                <tr key={user._id}>
                                    <td className="p-2 ">
                                       <p>{payment?.purchasedClassName}</p>
                                    </td>

                                    <td className="p-2 ">
                                        <p>{payment?.purchasedClassId} </p>
                                    </td>
                                    <td className="p-2  ">
                                        <p> {payment?.price}</p>
                                    </td>
                                    <td className="p-2 ">
                                        <p>{ payment?.transactionId}</p>                                     
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;