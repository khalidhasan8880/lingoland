
const SelectedCard = ({ cart, paymentForSingleItemHandler }) => {

    const deleteCartHandler = () => {

    }
    return (
        <div className="flex justify-between gap-4  rounded-xl shadow-xl h-72 pe-4" data-aos="fade-up"
        data-aos-duration="1000">
            <img className="w-72 rounded-s-xl" src={cart?.photo} alt="" />
            <div className="flex flex-col justify-around">
                <p className="text-[#32f9a6] ">
                    {cart?.className}
                </p>
                <h3 className="text-xl">
                    {cart?.title}
                </h3>
                <div className="flex gap-x-3 items-center">
                    <img className="rounded-full w-10 h-10" src={cart?.instructorPhoto} alt="" />
                    <h3 className="text-black">{cart?.instructorName}</h3>
                </div>
                <p>Instructor Email: {cart?.email}</p>
                <div className="flex justify-between items-center">
                    <h3>Price: ${cart?.price}</h3>
                    <div>
                        <button
                            onClick={()=> paymentForSingleItemHandler(cart?._id , cart?.price, cart?.className)}
                            className="bg-gradient-to-r from-[#3de09b] to-[#00c4ee] text-white text-center px-6 py-2 cursor-pointer rounded-full mr-2"> Pay
                        </button>
                        <button
                            onClick={() => deleteCartHandler(cart?._id)}
                            className="bg-red-500 ms-auto text-white text-center px-3 py-2 rounded-full">Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectedCard;