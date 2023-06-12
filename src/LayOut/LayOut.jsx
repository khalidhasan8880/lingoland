import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const LayOut = () => {
    const [theme, setTheme] = useState('light')
    const {enabled}  = useAuth()
    // flex flex-col justify-center items-center min-h-screen
    return (
        <div className={`${enabled ? 'bg-black text-white':''} flex flex-col justify-center items-center min-h-screen`}>
            <Navbar setTheme={setTheme}></Navbar>
            <div className="container flex-grow px-4">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default LayOut;