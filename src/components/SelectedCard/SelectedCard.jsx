
const SelectedCard = ({ cart }) => {

    const deleteCartHandler = () => {

    }
    return (
        <div className="flex justify-between gap-4  rounded-xl shadow-xl h-72 pe-4">
            <img className="w-72 rounded-s-xl" src={cart.photo} alt="" />
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
                <p>Instructor Email: {cart.email}</p>
                <div className="flex justify-between items-center">
                    <h3>Price: ${cart.price}</h3>
                    <button
                        onClick={() => deleteCartHandler(cart?._id)}
                        className="bg-red-500 ms-auto text-white text-center px-3 py-2 rounded-full">Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SelectedCard;