// import Swiper from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { Autoplay,Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import useClasses from "../../../hooks/useClasses";
import { useAuth } from "../../../hooks/useAuth";
const Carousel = () => {

    const { enabled } = useAuth()
    const [classes] = useClasses()
    return (
        <div className="mt-20">
            <Swiper

                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >

                {
                    classes?.slice(0, 8).map(cls => <SwiperSlide key={cls?._id}>
                        <div className={`${enabled ? 'bg-[#082621]' : 'bg-[#e2f7f5]'} w-full h-[600px] py-20 `}>
                            <div className="ms-3 sm:w-2/3 sm:gap-x-4 sm:ms-10 flex flex-wrap divide-x-4 gap-2 divide-[#3de09b]">
                                <img className="w-72 sm:h-96 h-72 sm:w-96  sm:rounded-s-xl" src={cls?.photo} alt="" />
                                <div className="flex py-4 flex-col gap-y-4 items-start px-3 justify-center "
                                >

                                    <div >
                                        
                                        <h2 data-aos="fade-right"
                                            data-aos-duration="200"
                                            data-aos-easing="ease-in-sine"
                                            className="text-xl sm:text-5xl font-semibold mb-3">{cls?.className}</h2>
                                        <p
                                            data-aos="fade-right"
                                            data-aos-offset="300"
                                            data-aos-easing="ease-in-sine"
                                            className="sm:text-2xl font-semibold">{cls?.title}</p>
                                        
                                    </div>

                                </div>
                            </div>
                        </div>
                    </SwiperSlide>)
                }



            </Swiper>
        </div>
    );
};

export default Carousel;








