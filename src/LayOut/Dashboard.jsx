
import { useAuth } from "../hooks/useAuth";
import { FaBars, FaUser, FaUsers } from "react-icons/fa";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

const Dashboard = () => {
    // Hooks
    const { user } = useAuth()
    const [openDAshboardNav, setOpenDashboardNav] = useState(false)
    const [drawerLinks, setDrawerLinks] = useState('')



    const role = 'admin'
    useEffect(() => {
        const adminDrawerLinks =
            <>
                <li>
                    <NavLink
                        to='/dashboard/classes'
                        className={({ isActive }) => (isActive ? 'text-pr text-center flex items-center gap-2 justify-center py-2 rounded-md text-1xl font-semibold' : 'text-center flex items-center gap-2 justify-center py-2 rounded-md text-1xl font-semibold')}
                    >
                        <FaUsers size={22}></FaUsers> <span>Manage Classes</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/dashboard'
                        className={({ isActive }) => (isActive ? 'text-pr text-center flex items-center gap-2 justify-center py-2 rounded-md text-1xl font-semibold' : 'text-center flex items-center gap-2 justify-center py-2 rounded-md text-1xl font-semibold')}
                    >
                        <FaUsers size={22}></FaUsers> <span>Manage Users</span>
                    </NavLink>
                </li>
            </>
        if (role === 'admin') {
            setDrawerLinks(adminDrawerLinks)
        }

    }, [])
    return (
        <section>
            <div className="my-5 flex gap-x-4 items-center">
                {
                    user?.photoURL ? 
                    <img className="sm:w-20 w-10 sm:h-20 h-10 rounded-full" src={user?.photoURL} alt="" />
                    : 
                    <div className="flex justify-center items-center sm:w-20 w-10 sm:h-20 h-10 rounded-full bg-pr">
                        <FaUser size={40}></FaUser>
                    </div>
                }
                <div className="flex justify-between items-start flex-col">
                    <h1 className="sm:text-xl ">Welcome Back {user?.displayName}</h1>
                    <h1 className="sm:text-1xl text-sm">{user?.email}</h1>
                    {/* TODO: SHOW DYNAMIC ROLE */}
                    <span className="text-sm bg-[#3de09ce3] rounded-xl px-2  text-center text-white">admin</span>
                </div>
            </div>



            <div title="Drawer" className="w-20 h-20 rounded-full backdrop-blur-sm md:hidden flex justify-center items-center absolute bottom-5 right-5 bg-pr">
                <button onClick={() => setOpenDashboardNav(!openDAshboardNav)} >{openDAshboardNav ? <AiOutlineClose className="text-pr" size={33}></AiOutlineClose> : <FaBars className="text-pr" size={33}></FaBars>}</button>
            </div>



            {
                openDAshboardNav && <div className="flex flex-col md:hidden backdrop-blur-xl bg-opacity-30 items-center justify-center absolute left-0 w-4/6 bg-pr">

                    <ul className="md:w-96 py-4 px-1 ">
                        {drawerLinks}
                    </ul>
                </div>
            }

            <div className="flex">

                <ul className="md:w-96  py-2 px-1 hidden md:grid divide-y-2 bg-pr">
                    {
                        drawerLinks
                    }
                </ul>

                <div className="w-full p-4">
                    <Outlet></Outlet>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;