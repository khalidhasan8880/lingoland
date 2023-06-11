
const EnrolledCard = () => {
    return (
        <div className="flex justify-between gap-4  rounded-xl shadow-xl h-72 pe-4" data-aos="fade-up"
            data-aos-duration="1000">
            {/* <img className="w-72 rounded-s-xl" src={cart.photo} alt="" /> */}
            <div className="flex flex-col justify-around">
                <p className="text-[#32f9a6] ">
                    {/* {cart?.className} */}
                </p>
                <h3 className="text-xl">
                    {/* {cart?.title} */}
                </h3>
                <div className="flex gap-x-3 items-center">
                    {/* <img className="rounded-full w-10 h-10" src={cart?.instructorPhoto} alt="" /> */}
                    <h3 className="text-black">{ }</h3>
                </div>
                {/* <p>Instructor Email: {cart.email}</p> */}
                <button
                        className="bg-gradient-to-r from-[#3de09b] to-[#00c4ee] text-white text-center px-6 py-2 cursor-pointer rounded-full mr-2"> Continue Class
                    </button>
            </div>
        </div>
    );
};

export default EnrolledCard;