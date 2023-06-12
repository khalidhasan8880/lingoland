
const EnrolledCard = ({ cls }) => {
    console.log(cls);
    return (
        <div className="flex gap-4 w-[650px]  rounded-xl shadow-xl h-72 pe-3" data-aos="fade-up"
            data-aos-duration="1000">
            <img className="w-72 rounded-s-xl" src={cls?.photo} alt="" />
            <div className="flex flex-col justify-around">
                <p className="text-[#32f9a6] bg-pr text-center rounded-full px-2 py-1">
          
                    {cls?.className}
                </p>
                <h1 className="text-xl">{cls?.title} </h1>
              
                <button
                    className="bg-gradient-to-r from-[#3de09b] to-[#00c4ee] text-xl text-white text-center px-6 py-2 cursor-pointer rounded-full mr-2"> Continue Class
                </button>
            </div>
        </div>
    );
};

export default EnrolledCard;