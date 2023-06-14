import { toast } from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useRole } from "../../hooks/useRole";

const PopularCard = ({ cls }) => {
    let [isOpen, setIsOpen] = useState(false)
    const { user, enabled } = useAuth()
    const  [usersRole, isLoading] = useRole()
    const axiosSecure = useAxiosSecure()
    const addCartHandler = (id) => {

        if (!user?.email) {
            return openModal()
        }
        console.log(id);
        axiosSecure.put(`/carts/${user?.email}`, { email: user?.email, classId: id })
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    toast.success('successfully added')
                }
            })
    }



    


    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <div className={`${enabled? 'bg-[#082621] text-white':''} p-4 h-[500px] rounded-lg  sm:w-96 w-80 relative shadow-xl ${cls?.seats ? '':'border-2 border-red-100 bg-red-100 shadow-none'}`} data-aos="fade-up"
            data-aos-duration="1000">
            <img className="rounded-lg h-60 w-full" src={cls?.photo} alt="" />
            <div className="p-1 mt-3 ">
                <div className="flex justify-between items-center">
                    <div className="bg-pr  rounded-full py-1 px-3">
                        <p className="text-[#32f9a6] ">{cls?.className}</p>
                    </div>
                    <div>
                        {
                            cls?.seats > 0 && (usersRole?.role !== 'admin' && usersRole?.role !== 'instructor')
                                ?
                                <button
                                    disabled={!cls?.seats }
                                    onClick={() => addCartHandler(cls?._id)}
                                    className="bg-gradient-to-r from-[#3de09b] to-[#00c4ee] text-white text-center px-3 py-2 cursor-pointer rounded-full">Add to cart
                                </button>
                                :

                                <button
                                    className="bg-[#f47e7e] cursor-not-allowed text-white text-center px-3 py-2 rounded-full active:top-0">Add to cart
                                </button>
                        }

                    </div>
                </div>
                <div className="px-2 mt-2">
                    <h3 className="text-xl my-5">
                        {cls?.title && cls?.title?.slice(0, 50)}
                    </h3>
                    <h3 className={`my-1 ${cls?.seats <= 0 ? 'text-red-600': ''}`}>
                        Available Seats: {cls?.seats} 
                    </h3>
                    <div className="flex justify-between items-center absolute bottom-5 w-64 sm:w-80">
                        <div className="flex gap-x-3 items-center">
                            <img className="rounded-full w-10 h-10" src={cls?.instructorPhoto} alt="" />
                            <h3>{cls?.instructorName}</h3>
                        </div>
                        <div>
                            Price: ${cls?.price}
                        </div>
                    </div>
                </div>
            </div>












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
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                               <Dialog.Panel className="py-11 px-2 transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">

                                        <h2 className="mb-12 text-center text-3xl font-bold">You Need To Login First</h2>

                                        <div className="flex gap-3 flex-wrap">
                                            <Link to='/login' className="w-full rounded-full px-7 py-2 bg-[#00c4ee] text-xl text-center  font-semibold hover:bg-[#48deff] text-white ">Login As Instructor</Link>
                                            <Link to='/login' className="w-full rounded-full px-7 py-2 bg-[#3de09b] hover:bg-[#13ff9d] font-semibold text-white text-xl text-center ">Login As Student</Link>
                                        </div>
                                       
                                    </Dialog.Panel>


                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default PopularCard;