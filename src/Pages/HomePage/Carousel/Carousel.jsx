// import Swiper from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css/pagination";
import "swiper/css";

const Carousel = () => {

    return (
        <div className="mt-20">
            <Swiper

                pagination={{
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="w-full h-96 bg-slate-300"> we</div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full h-96 bg-slate-300">ewr </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full h-96 bg-slate-300"> wre</div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full h-96 bg-slate-300">wer </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full h-96 bg-slate-300"> wr</div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full h-96 bg-slate-300">we </div>
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Carousel;