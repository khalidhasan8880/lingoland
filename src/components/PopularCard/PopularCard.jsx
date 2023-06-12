import { toast } from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PopularCard = ({ cls }) => {
    const { user, enabled } = useAuth()
    const axiosSecure = useAxiosSecure()
    const addCartHandler = (id) => {
        console.log(id);
        axiosSecure.put('/carts', { email: user?.email, classId: id })
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    toast.success('successfully added')
                }
            })
    }
    console.log(user);
    return (
        <div className={`${enabled? 'bg-[#082621] text-white':''} p-4 h-[500px] rounded-lg  sm:w-96 w-80 relative ${cls?.seats ? 'shadow-xl':'shadow-none'}`} data-aos="fade-up"
            data-aos-duration="1000">
            <img className="rounded-lg w-full" src={cls?.photo} alt="" />
            <div className="p-1 mt-3 ">
                <div className="flex justify-between items-center">
                    <div className="bg-pr  rounded-full py-1 px-3">
                        <p className="text-[#32f9a6] ">{cls?.className}</p>
                    </div>
                    <div>
                        {
                            cls?.seats > 0
                                ?
                                <button
                                    disabled={!cls?.seats}
                                    onClick={() => addCartHandler(cls?._id)}
                                    className="bg-gradient-to-r from-[#3de09b] to-[#00c4ee] text-white text-center px-3 py-2 cursor-pointer rounded-full">Add to cart
                                </button>
                                :

                                <button
                                    disabled={!cls?.seats}
                                    onClick={() => addCartHandler(cls?._id)}
                                    className="bg-gradient-to-r from-[#e4d0bf] to-[#e4a4a4] text-white text-center px-3 py-2 rounded-full active:top-0">Add to cart
                                </button>
                        }

                    </div>
                </div>
                <div className="px-2 mt-2">
                    <h3 className="text-xl my-5">
                        {cls?.title && cls?.title?.slice(0, 50)}
                    </h3>
                    <h3 className=" my-1">
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
        </div>
    );
};

export default PopularCard;