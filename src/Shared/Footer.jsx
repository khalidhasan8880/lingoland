import { useEffect, useState } from "react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    useEffect(() => {
        const handleResize = () => {
            setScreenHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    console.log(screenHeight);
    return (
        <footer className="w-full">
            <div className="container mx-auto py-8 px-4">
                <div>

                </div>

                <div className="text-center mt-20">
                    <div className="flex justify-evenly w-40 mx-auto my-4">
                        <FaFacebook className="cursor-pointer hover:text-[#3de09b]" size={32}></FaFacebook>
                        <FaLinkedin className="cursor-pointer hover:text-[#3de09b]" size={32}></FaLinkedin>
                        <FaTwitter className="cursor-pointer hover:text-[#3de09b]" size={32}></FaTwitter>
                    </div>
                    <div className="flex gap-x-4 justify-center items-center my-2">
                        <p>Address: Dhaka, Bangladesh</p> ||
                        <p>Phone: +0239894380903</p>
                    </div>
                    <p className="text-sm opacity-75">&copy; {currentYear} Lingoland. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
