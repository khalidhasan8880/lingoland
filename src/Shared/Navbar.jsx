import { Link, NavLink } from "react-router-dom";
import logo from '../assets/icons/logo.png'
import { FaBars, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";


const Navbar = () => {
    const [open, setOpen] = useState(false)
    const { user, logOut } = useAuth()
    // 
    const logOutHandler = () => {
        logOut()
        .then(res=>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
        })
    }
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
        <li>
            <NavLink to='/dashboard' className={({ isActive }) => (isActive ? 'text-pr' : '')}>
                Dashboard
            </NavLink>
        </li>
        <li>
            {
                user?.uid ?
                <Link to='/my_profile'>
                    {
                        user?.photoURL ?
                            <img
                                className="rounded-full w-10 h-10"
                                src={user?.photoURL}
                                width="40"
                                height="40"
                            />
                            :
                            <FaUser size={22}></FaUser>
                    }
                </Link>
                :
                <Link className="hover:text-[#3de09b] cursor-pointer"  to='/login'><FaSignInAlt size={26}></FaSignInAlt></Link>
            }
        </li>
        <li>
           {user?.email}
        </li>
        <li>
            {
                user ? <FaSignOutAlt onClick={logOutHandler} className="hover:text-[#3de09b] cursor-pointer" size={26}></FaSignOutAlt>: ''
            }
        </li>

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
                {open ?
                    <AiOutlineClose className="text-pr" size={22}></AiOutlineClose>
                    :
                    <FaBars className="text-pr" size={22}></FaBars>
                }
            </button>

            {
                open &&
                <ul className=" sm:hidden  bg-pr backdrop-blur-3xl p-3 rounded-lg flex flex-col gap-y-3 absolute right-4 top-20 font-semibold ">
                    {navOptions}
                </ul>
            }

        </div>
    );
};

export default Navbar;