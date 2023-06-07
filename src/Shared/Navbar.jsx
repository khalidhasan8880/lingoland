import { Link, NavLink } from "react-router-dom";
import logo from '../assets/icons/logo.jpg'
import { FaBars } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import { useState } from "react";


const Navbar = () => {
    const [open, setOpen] = useState(false)


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

    </>

    return (
        <div className="flex justify-between bg-[#ebfbfa] fixed z-10 top-2 w-full px-4 sm:px-12 md:px-28">
            <Link to='/'>
                <div className="flex items-center">
                    <img className="w-10 sm:w-14" src={logo} alt="" />
                    <h1 className="text-2xl sm:text-3xl">LINGOLAND</h1>
                </div>
            </Link>
            <ul className="hidden sm:flex items-center gap-x-7 justify-between sm:text-xl sm:font-semibold">
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
                <ul className=" sm:hidden absolute right-4 top-12 sm:text-xl sm:font-semibold">
                    {navOptions}
                </ul>
            }

        </div>
    );
};

export default Navbar;