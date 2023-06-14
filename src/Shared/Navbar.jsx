import { Link, NavLink } from "react-router-dom";
import logo from '../assets/icons/logo.png'
import { FaBars, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Switch } from "@headlessui/react";


const Navbar = () => {
    const [open, setOpen] = useState(false)
    const { user, logOut, setEnabled, enabled } = useAuth()
    



    const logOutHandler = () => {
        logOut()
            .then(res => {
                location.reload();
                console.log(res);
            })
            .catch(err => {
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
        {
            user && <li>
            <NavLink to='/dashboard' className={({ isActive }) => (isActive ? 'text-pr' : '')}>
                Dashboard
            </NavLink>
        </li>
        }

        <li title="Dart theme only for Home page">
            <Switch.Group>
                <div className="flex items-center">
                    <Switch.Label className="mr-4">{enabled ? 'Dark' : 'Light'}</Switch.Label>
                    <Switch
                        checked={enabled}
                        onChange={setEnabled}
                        className={`${enabled ? 'bg-teal-500' : 'bg-black'
                            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none  focus:ring-indigo-500 `}
                    >
                        <span
                            className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                        />
                    </Switch>
                </div>
            </Switch.Group>
        </li>
        <li>
            {
                user ? <FaSignOutAlt onClick={logOutHandler} className="hover:text-[#3de09b] cursor-pointer" size={26}></FaSignOutAlt> : ''
            }
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
                    <Link className="hover:text-[#3de09b] cursor-pointer" to='/login'><FaSignInAlt size={26}></FaSignInAlt></Link>
            }
        </li>

    </>

// TODO: USE  LocalStorage FOR STORED DARK MOOD LIGHT MODE DATA & MAKE MORE EASY WITH TAILWIND DARK: SYSTEM




    return (
        <div className={`${enabled ? 'bg-[#082621] text-white':'bg-pr '} flex justify-between mt-0 backdrop-blur-sm   fixed z-10 top-0 w-full px-4 sm:px-12 md:px-28 py-3`}>
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
                <ul className=" sm:hidden w-52 bg-pr  p-3 rounded-lg flex flex-col gap-y-5 absolute right-4 top-20 font-semibold " data-aos="fade-left"
                data-aos-offset="500"
                data-aos-duration="500">
                    {navOptions}
                </ul>
            }

        </div>
    );
};

export default Navbar;