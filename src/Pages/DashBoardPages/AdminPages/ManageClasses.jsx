import { useQuery } from "@tanstack/react-query";
import { FaEye, FaUser } from "react-icons/fa";
import useClasses from "../../../hooks/useClasses";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Button from "../../../components/Button/Button";
import { Toaster, toast } from "react-hot-toast";

const ManageClasses = () => {
    const { register, handleSubmit, } = useForm();
    const axiosSecure = useAxiosSecure()
    let [isOpen, setIsOpen] = useState(false)
    const [classes, isLoading, refetch] = useClasses()
    const [id, setId] = useState('')
    // modal open & close handler function
    function closeModal() {
        setIsOpen(false)
        setId('')
    }
    function openModal() {
        setIsOpen(true)
    }

    // update to approved class
    const approveHandler = (id) => {
        axiosSecure.patch(`/classes/approve/${id}`)
            .then(res => {
                console.log(res.data);
                refetch()
            })
    }
    // deny 
    const onSubmit = data => {
        closeModal()
        axiosSecure.patch(`/classes/feedback/${id}`, data)
        .then(res=>{
            console.log(res.data);
            toast.success('success')
            refetch()

        })
        .catch(err=>{
            console.log(err);
        })
    }
    const denyHandler = (id) => {
        setId(id)
        openModal()

    }

    return (
        <>
            {
                classes.length > 0 ?
                    <div>
                        <Toaster></Toaster>
                        <Helmet>
                            <title>LINGOLAND | Manage Classes </title>
                        </Helmet>
                        <table className="w-full">
                            <thead className=" bg-pr">
                                <tr>
                                    <th className="p-2 ">
                                        <p className="text-left">Class Name</p>
                                    </th>
                                    <th className="p-2 hidden sm:table-cell">
                                        <p className="text-left">Instructor</p>
                                    </th>

                                    <th className="p-2 hidden sm:table-cell">
                                        <p className="text-left">Instructor Email</p>
                                    </th>
                                    <th className="p-2 hidden sm:table-cell">
                                        <p className="text-left">Seats</p>
                                    </th>
                                    <th className="p-2 hidden sm:table-cell">
                                        <p className="text-left">Status</p>
                                    </th>
                                    <th className="p-2 hidden sm:table-cell">
                                        <p className="text-left">Actions</p>
                                    </th>

                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100">

                                {
                                    classes?.map(cls => {
                                        return (
                                            <tr key={cls._id}>
                                                <td className="p-2 ">
                                                    <div className="flex gap-x-2 items-center cursor-pointer">
                                                        {
                                                            cls?.photo ?
                                                                <img
                                                                    className="rounded-full w-10 h-10"
                                                                    src={cls?.photo}
                                                                    width="40"
                                                                    height="40"
                                                                />
                                                                :
                                                                <FaUser size={22}></FaUser>
                                                        }
                                                        <div className="flex gap-x-2 items-center font-medium text-gray-800">
                                                            <span>{cls?.className}</span>
                                                        </div>

                                                    </div>
                                                </td>

                                                <td className="p-2 hidden sm:table-cell">
                                                    {cls?.instructorName}
                                                </td>

                                                <td className="p-2 hidden sm:table-cell">
                                                    {cls?.email}
                                                </td>
                                                <td className="p-2 hidden sm:table-cell">
                                                    {cls?.seats}
                                                </td>
                                                <td className="p-2 hidden sm:table-cell">
                                                    <p className={cls?.status === 'approved' ? "text-[#3de09b]" : ''}>{cls?.status}</p>
                                                </td>
                                                <td className="p-2 hidden sm:table-cell">
                                                    <div className="flex gap-x-2">
                                                        <button
                                                        disabled={cls?.status !== 'approved' && cls?.status !== 'deny' ? false : true}
                                                            onClick={() => approveHandler(cls?._id)}
                                                            className={`active:top-0 rounded-full py-1 px-2 text-white ${cls?.status !== 'approved'  && cls?.status !== 'deny'? 'bg-[#3de09b] ' : 'bg-[#98ceb7]'}`}>Approve
                                                        </button>
                                                        <button
                                                            disabled={cls?.status === 'deny' || cls?.status === 'approved' ? true : false}
                                                            className={`rounded-full px-2 text-white ${cls?.status === 'deny' || cls?.status === 'approved'  ? 'bg-red-200' : 'bg-red-500'}`}
                                                            onClick={() => denyHandler(cls?._id)}
                                                            >Deny
                                                        </button>
                                                    </div>
                                                </td>


                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    :
                    <h3 className="text-center font-bold text-3xl">
                        No Data Found
                    </h3>
            }













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
                                <Dialog.Panel className='p-12 transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all'>

                                    <form onSubmit={handleSubmit(onSubmit)} className="my-7 ">
                                        <textarea placeholder="Type Your Feedback" className="w-full h-20 px-4 py-3 border-2 focus:outline-none my-1 rounded-lg " {...register("feedback")} />
                                        <Button>Send Feedback</Button>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default ManageClasses;