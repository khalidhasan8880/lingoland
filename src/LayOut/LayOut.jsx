import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";

const LayOut = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <Navbar></Navbar>
            <div className="container flex-grow">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default LayOut;