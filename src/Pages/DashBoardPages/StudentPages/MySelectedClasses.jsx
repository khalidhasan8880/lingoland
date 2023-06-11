import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import SelectedCard from "../../../components/SelectedCard/SelectedCard";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutFormForSingleItem from "../../Payment/CheckoutFormForSingleItem";
// stripe 
const stripePromise = loadStripe(`${import.meta.env.VITE_PK_KEY}`)

// main component
const MySelectedClasses = () => {
    // hooks
    const [purchasedClassId, setPurchasedClassId] = useState('')
    const [purchasedClassPrice, setPurchasedClassPrice] = useState(0)
    let [isOpen, setIsOpen] = useState(false)
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    // fetch data 
    const { data: carts, isLoading, refetch:refetchSelectedCards } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => axiosSecure.get(`/carts/${user?.email}`).then(res => {
            console.log(res.data);
            return res.data
        })
    })
    // 


    function closeModal() {
        setIsOpen(false)
        setPurchasedClassId('')
        setPurchasedClassPrice(0)

    }

    function openModal() {
        setIsOpen(true)
    }

    if (isLoading) {
        return <Loading></Loading>
    }



    // payments related operation
    const paymentForSingleItemHandler = (id, price) => {
        setPurchasedClassId(id)
        setPurchasedClassPrice(price)
        console.log(id);
        openModal()
    }





    return (
        <div >
            
            <Helmet>
                <title>LINGOLAND | My Selected Classes </title>
            </Helmet>
            <div className="flex flex-wrap items-center justify-between">
                <h1 className="text-2xl">Total selected Cart: {carts?.length}</h1>
                {
                    carts.length !== 0 && <Link to='/payment' state={{ carts }} className="bg-gradient-to-r from-[#3de09b] to-[#00c4ee] text-white mt-11 text-center px-6 py-2 rounded-full">Pay For All Classes</Link>
                }
            </div>
            <div className="flex flex-wrap">

                {
                    carts?.map(cart => <SelectedCard
                        key={cart._id}
                        cart={cart}
                        paymentForSingleItemHandler={paymentForSingleItemHandler}
                    ></SelectedCard>)
                }
            </div>






            {/* --------------------------------------------------------- */}
            {/* --------------------------------------------------------- */}
            {/* --------------------------------------------------------- */}


            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex  items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >

                                <Dialog.Panel className=' transform overflow-hidden w-96 rounded-2xl bg-white text-left align-middle shadow-xl transition-all'>
                                    {/* content */}
                                    <Elements stripe={stripePromise}>
                                       <CheckoutFormForSingleItem 
                                       price={purchasedClassPrice}
                                       purchasedClassId={purchasedClassId}
                                       setIsOpen={setIsOpen}
                                       refetchSelectedCards={refetchSelectedCards}
                                       ></CheckoutFormForSingleItem>
                                    </Elements>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>



        </div>
    );
};

export default MySelectedClasses;