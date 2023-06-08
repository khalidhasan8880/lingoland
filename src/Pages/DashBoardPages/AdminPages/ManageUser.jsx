import { FaEye, FaUser, FaUserCog, FaUserGraduate } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

// import { useRole } from "../../../hooks/useRole";

const ManageUser = () => {
    const axiosSecure = useAxiosSecure()

    let [modalData, setModalData] = useState({})
    let [users, setUsers] = useState([])
    let [isOpen, setIsOpen] = useState(false)


    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)

    }

    const modalDataHandler = (user) => {
        openModal()
        setModalData(user)
    }


    useEffect(() => {
        axiosSecure.get('/users',)
            .then(res => {
                console.log(res.data);
                setUsers(res.data)
            })
    }, [])


    const updateUserHandler = (id) => {
        console.log('clicked');
    }



    return (
        <div className="container mx-auto">


            <table className="w-full">
                <thead className=" bg-pr">
                    <tr>
                        <th className="p-2 ">
                            <p className="text-left">Name</p>
                        </th>
                        <th className="p-2 hidden sm:table-cell">
                            <p className="text-left">Email</p>
                        </th>
                        <th className="p-2 sm:hidden">
                            <p className="text-left">Options</p>
                        </th>
                        <th className="p-2 hidden sm:table-cell">
                            <p className="text-left">Update User</p>
                        </th>
                        <th className="p-2 hidden sm:table-cell">
                            <p className="text-left">Email</p>
                        </th>
                    </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">

                    {
                        users?.map(user => {
                            return (
                                <tr key={user._id}>
                                    <td className="p-2 ">
                                        <div onClick={() => modalDataHandler(user)} className="flex gap-x-2 items-center cursor-pointer">
                                            {
                                                user?.picture_url ?
                                                    <img
                                                        className="rounded-full w-10 h-10"
                                                        src={user?.picture_url}
                                                        width="40"
                                                        height="40"
                                                    />
                                                    :
                                                    <FaUser size={22}></FaUser>
                                            }
                                            <div className="flex gap-x-2 items-center font-medium text-gray-800">
                                                <span>khalid hasa</span> <FaEye size={20}></FaEye></div>
                                        </div>
                                    </td>

                                    <td className="p-2 hidden sm:table-cell">
                                        {user?.email}
                                    </td>


                                    <td className="p-2 hidden sm:table-cell">
                                        <FaUserCog onClick={() => updateUserHandler(user?._id)} size={23}></FaUserCog>
                                    </td>
                                    <td className="p-2 sm:hidden">
                                        delete
                                    </td>

                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>



















            {/* 
------------------------------
modal modal modal content
-----------------------------
*/}

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
                                <Dialog.Panel className="py-11 px-4 transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">

                                    <div className="my-5 flex flex-col justify-center gap-x-4 items-center">
                                        {
                                            modalData?.photoURL ?
                                                <img className="sm:w-20 w-10 sm:h-20 h-10 rounded-full" src={modalData?.photoURL} alt="" />
                                                :
                                                <div className="flex justify-center items-center sm:w-20 w-10 sm:h-20 h-10 rounded-full bg-pr">
                                                    <FaUser size={30}></FaUser>
                                                </div>
                                        }
                                        <div className="flex justify-center items-start text-center  flex-col">
                                            <h1 className="sm:text-xl ">Welcome Back {modalData?.displayName}</h1>
                                            <h1 className="sm:text-1xl text-sm">{modalData?.email}</h1>
                                            {/* TODO: SHOW DYNAMIC ROLE */}
                                            <span className="text-sm bg-[#3de09ce3] rounded-xl px-2  text-center text-white">admin</span>
                                        </div>


                                    </div>
                                    <div className="my-4">
                                        <p>Phone:{modalData?.phone}</p>
                                        <p> Address:{modalData?.address}</p>
                                        <p>Gender:{modalData?.gender}</p>
                                    </div>
                                    <div className="mt-3 gap-x-2 flex justify-between">
                                        <button className="bg-[#3de09ce3] rounded-full text-white py-1 px-2">Make Admin</button>
                                        <button className="bg-[#00c4ee] rounded-full text-white py-1 px-2">Make Instructor</button>
                                        <button className="bg-[#ff4242e3] rounded-full text-white py-1 px-2">Delete</button>
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

export default ManageUser;