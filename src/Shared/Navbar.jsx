import { Link, NavLink } from "react-router-dom";
import logo from '../assets/icons/logo.png'
import { FaBars } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";


const Navbar = () => {
    const [open, setOpen] = useState(false)
    const {user } = useAuth()

    // 
    const navOptions = <>

        <li>
            <NavLink to='/' className={({ isActive }) => (isActive ? 'text-pr' : '')}>
                Home
            </NavLink>
        </li>
        <li>
            <NavLink to='/instructors' className={({ isActive }) => (isActive ? 'text-pr' : '')}>
                Instructors
            </NavLink>
        </li>
        <li>
            <NavLink to='/classes' className={({ isActive }) => (isActive ? 'text-pr' : '')}>
                Classes
            </NavLink>
        </li>
        <>{user?.email}</>
    </>

    return (
        <div className="flex justify-between bg-pr mt-0 backdrop-blur-sm  bg-opacity-30 fixed z-10 top-0 w-full px-4 sm:px-12 md:px-28 py-3">
            <Link to='/'>
                <div className="flex items-center">
                    <img className="w-10 sm:w-12" src={logo} alt="" />
                    <h1 className="text-1xl sm:text-2xl">LINGOLAND</h1>
                </div>
            </Link>
            <ul className="hidden sm:flex items-center gap-x-7 justify-between font-semibold">
                {navOptions}
            </ul>

            
            {/* for small devices  */}

            <button className="sm:hidden" onClick={() => setOpen(!open)}>
                {   open? 
                    <AiOutlineClose className="text-pr" size={22}></AiOutlineClose>
                    :
                    <FaBars className="text-pr" size={22}></FaBars>
                }
            </button>

            {
                open &&
                <ul className=" sm:hidden absolute right-4 top-12 font-semibold ">
                    {navOptions}
                </ul>
            }

        </div>
    );
};

export default Navbar;