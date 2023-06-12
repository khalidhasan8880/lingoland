import { Link } from "react-router-dom";

const InstructorCard = ({instructor}) => {
    return (
        <div className="p-4 h-[500px] bg-white rounded-lg shadow-xl sm:w-96 w-80 relative "  data-aos="fade-up"
        data-aos-duration="1000">
            <img className="rounded-lg w-full h-72" src={instructor?.photo} alt="" />
            <div className="p-1 mt-3 ">
                
                <div className="px-2">
                    <h3 className="text-2xl">
                        {instructor?.name}
                    </h3>
                    <h3 className="">
                        {instructor?.email}
                    </h3>
                    <div className="flex justify-between items-center absolute bottom-5 w-64 sm:w-80">
                        <div className="flex gap-x-3 items-center">
                        
                        </div>
                        <Link 
                            to={`/classes/instructor/${instructor?.email}`}
                            className="bg-gradient-to-r from-[#3de09b] to-[#00c4ee] text-white text-center px-3 py-2 rounded-full">See More Classes
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorCard;