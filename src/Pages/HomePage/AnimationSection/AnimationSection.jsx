import Lottie from "lottie-react";
import learningAnimation from "./learningAnimation.json";
import { AiFillCaretRight } from 'react-icons/ai'
const AnimationSection = () => {
    return (
        <section className="mt-40">
            <div className="grid sm:grid-cols-2 content-center  ">
                <div className="flex flex-col gap-y-4 justify-center items-start order-2 sm:order-1 p-2">
                    <h2 className="text-3xl font-semibold text-pr">Your Learning Journey, Your Way</h2>
                    <p className="text-sm">Nibh consectetur morbi fusce aliquet scelerisque. Quis dis orci eleifend vel at sed et. Laoreet tristique ut fringilla augue vitae. Turpis volutpat morbi risus imperdiet viverra odio. Fringilla sit ut mattis.</p>
                    <div>
                        <h2 className="text-xl font-semibold mb-3 relative">High-Quality Content Course
                            <AiFillCaretRight className="absolute top-0 -left-6 text-[#3de09b]" size={23}></AiFillCaretRight>
                        </h2>
                        <p>Enim amet enim volutpat luctus ipsum pellentesque massa nisl sed. Sit ut nibh odio morbi diam. Mi euismod diam.</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-3 relative">Interactive Learning Experience
                            <AiFillCaretRight className="absolute top-0 -left-6 text-[#3de09b]" size={23}></AiFillCaretRight>
                        </h2>
                        <p>Enim amet enim volutpat luctus ipsum pellentesque massa nisl sed. Sit ut nibh odio morbi diam. Mi euismod diam.</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-3 relative">Exceptional Student Support
                            <AiFillCaretRight className="absolute top-0 -left-6 text-[#3de09b]" size={23}></AiFillCaretRight>
                        </h2>
                        <p>Enim amet enim volutpat luctus ipsum pellentesque massa nisl sed. Sit ut nibh odio morbi diam. Mi euismod diam.</p>
                    </div>
                </div>
                <div className="order-1 sm:order-2">
                    <Lottie animationData={learningAnimation} loop={true} />
                </div>
            </div>
        </section>
    );
};

export default AnimationSection;