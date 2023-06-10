import { useState } from "react";
import { FaEdit, FaUser } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import { useAuth } from "../../../hooks/useAuth";
import { Dialog } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";

const MyClasses = () => {
    // hooks 
    const axiosSecure = useAxiosSecure()
    // const [classes, setClasses] = useState([])
    // const [loading, setLoading] = useState(true)

    const { register, handleSubmit, reset } = useForm();
    const [modalContent, setModalContent] = useState('')
    const [actionModal, setActionModal] = useState('feedback')
    let [isOpen, setIsOpen] = useState(false)
    const { user } = useAuth()



    function closeModal() {
        setIsOpen(false)

    }

    function openModal() {
        setIsOpen(true)
    }


    // react hook from handler
    const onSubmit = data => {
        console.log(data);
        axiosSecure.post(`/classes/update/${data._id}`, data)
            .then(res => {
                console.log(res.data);
                refetch()
            })
    };



    // useEffect(() => {
    //     axiosSecure.get(`/classes/${user?.email}`,)
    //         .then(res => {
    //             console.log(res.data);
    //             setClasses(res.data)
    //             setLoading(false)
    //         })
    //         .catch(()=>{
    //             setLoading(false)
    //         })
    // }, [])
    const { data: classes = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['classes', user?.email],
        queryFn: async () => {
            return axiosSecure.get(`/classes/${user?.email}`,)
                .then(res => {
                    console.log(res.data);
                    return res.data
                })
        }
    })

    if (loading) {
        return <Loading></Loading>
    }



    const viewFeedBackHandler = (feedback) => {
        setActionModal('feedback')
        setModalContent(feedback)
        openModal()
    }


    const deleteClsHandler = (id) => {
        axiosSecure.delete(`/classes/delete/${id}`)
            .then(res => {
                console.log(res.data);
                refetch()
            })
    }


    const editClassHandler = (cls) => {
        setActionModal(false)
        setModalContent(cls)
        setIsOpen(true)
    }


    return (
        <>
            {classes.length > 0 ?
                <div>
                    <Helmet>
                        <title>LINGOLAND | My Classes </title>
                    </Helmet>
                    <table className="w-full">
                        <thead className=" bg-pr">
                            <tr>
                                <th className="p-2 ">
                                    <p className="text-left">Class Name</p>
                                </th>
                                <th className="p-2 hidden sm:table-cell">
                                    <p className="text-left">Enrolled Students</p>
                                </th>
                                <th className="p-2 hidden sm:table-cell">
                                    <p className="text-left">Status</p>
                                </th>
                                <th className="p-2 sm:hidden">
                                    <p className="text-left">Options</p>
                                </th>
                                <th className="p-2 hidden sm:table-cell">
                                    <p className="text-left">Update Class</p>
                                </th>
                                <th className="p-2 hidden sm:table-cell">
                                    <p className="text-left">Feedback</p>
                                </th>
                                <th className="p-2 hidden sm:table-cell">
                                    <p className="text-left">Delete User</p>
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
                                                {cls?.enrolledStudents}
                                            </td>
                                            <td className="p-2 hidden sm:table-cell">
                                                <span
                                                    className={`rounded-full px-2 ${cls?.status === "approved" ? 'bg-[#3de09b] text-white' : ''}`}> {cls?.status}
                                                </span>

                                            </td>


                                            <td className="p-2">
                                                <FaEdit onClick={() => editClassHandler(cls)} size={22}></FaEdit>
                                            </td>
                                            <td className="p-2">
                                                <button
                                                    disabled={cls?.status === 'deny' && cls?.feedback ? false : true}
                                                    className={cls?.status === 'deny' && cls?.feedback ? '' : "text-white active::top-0"}
                                                    onClick={() => viewFeedBackHandler(cls?.feedback)}>
                                                    View FeedBack
                                                </button>
                                            </td>
                                            <td className="p-2 hidden sm:table-cell">
                                                <button onClick={() => deleteClsHandler(cls?._id)} className="text-sm bg-[#e03d3de3] rounded-xl px-2  text-center text-white"> Delete </button>
                                            </td>

                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>















                    <Dialog
                        open={isOpen}
                        onClose={() => {
                            closeModal()
                            setActionModal(null)
                        }}
                        className="relative z-50"
                    >
                        {/* The backdrop, rendered as a fixed sibling to the panel container */}
                        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                        {/* Full-screen scrollable container */}
                        <div className="fixed inset-0 overflow-y-auto">
                            {/* Container to center the panel */}
                            <div className="flex min-h-full items-center justify-center p-4">

                                {/* The actual dialog panel  */}
                                <Dialog.Panel className="mx-auto">
                                    {
                                        actionModal === 'feedback' ?
                                            <div className="bg-white p-11 rounded-xl">
                                                <Dialog.Title className='text-3xl text-center'>FeedBack By Admin</Dialog.Title>
                                                {
                                                    modalContent ? <p className="mt-7 text-center">{modalContent}</p> : 'no feedback'
                                                }
                                            </div>
                                            :
                                            <div>
                                                <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-pr mx-auto border rounded-xl font-semibold sm:p-11 p-6 shadow-lg">
                                                    <h1 className="text-center text-3xl font-bold ">Add You Class</h1>
                                                    <div className="grid sm:grid-cols-2 gap-4 ">
                                                        <div className="my-7 ">
                                                            <label className="ms-5">Instructor Name</label>
                                                            <input readOnly defaultValue={user?.displayName} placeholder="Type Your Class Name" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("instructorName")} />
                                                        </div>
                                                        <div className="my-7 ">
                                                            <label className="ms-5">Email*</label>
                                                            <input defaultValue={user?.email} readOnly placeholder="Type Your Email" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("email", { required: true })} />
                                                        </div>
                                                    </div>

                                                    <div className="grid sm:grid-cols-2 gap-4 ">
                                                        <div className="my-7 ">
                                                            <label className="ms-5">Price</label>
                                                            <input defaultValue={modalContent?.price} type="number" placeholder="Price" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("price", { required: true })} />
                                                        </div>

                                                        <div className="my-7 ">
                                                            <label className="ms-5">Available seats</label>
                                                            <input defaultValue={modalContent?.seats} type="number" placeholder="Available Seats" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("seats", { required: true })} />
                                                        </div>
                                                    </div>



                                                    <div className="grid sm:grid-cols-2 gap-4">
                                                        <div className="my-7 ">
                                                            <label className="ms-5">Class Name*</label>
                                                            <input defaultValue={modalContent?.className} placeholder="Type Your Class Name" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("className", { required: true })} />
                                                        </div>

                                                        <div className="my-7 ">
                                                            <label className="ms-5">Phone Number</label>
                                                            <input defaultValue={modalContent?.phone} placeholder="Type Your Phone Number" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("phone")} />
                                                        </div>
                                                    </div>
                                                    <div className="my-7 ">
                                                        <label className="ms-5">Photo Url*</label>
                                                        <input defaultValue={modalContent?.photo} placeholder="Paste Your Photo_url" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("photo", { required: true })} />
                                                    </div>
                                                    <div className="my-7 ">
                                                        <label className="ms-5">Add A Class Sort Title*</label>
                                                        <input placeholder="Your Class Title" className="w-full px-4 py-3 border-2 my-1 rounded-full " {...register("title", { required: true })} />
                                                    </div>
                                                    <input hidden type="text" defaultValue='pending' {...register("status")} />
                                                    <input hidden type="text" defaultValue={modalContent?._id} {...register("_id")} />
                                                    <input hidden type="text" defaultValue={user?.displayName} {...register("instructorName")} />
                                                    {/* submit btn */}
                                                    <button type="submit"
                                                        className="bg-gradient-to-r from-[#3de09b] to-[#00c4ee] text-xl active:px-5 text-white sm:text-1xl text-center px-6 py-2 rounded-full" >
                                                        Update Class
                                                    </button>
                                                    <Toaster />
                                                </form>
                                            </div>
                                    }

                                </Dialog.Panel>
                            </div>
                        </div>
                    </Dialog>


                </div>
                :
                <span className="text-3xl text-center">No Classes</span>
            }
        </>
    );
};

export default MyClasses;