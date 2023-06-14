
import { useAuth } from "../hooks/useAuth";
import { FaBars, FaBookReader, FaEdit, FaHistory, FaUser, FaUsers } from "react-icons/fa";
import { ImEnter } from "react-icons/im";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AiOutlineClose, AiOutlineVideoCameraAdd } from "react-icons/ai";
import { useRole } from "../hooks/useRole";
import Loading from "../components/Loading/Loading";

const Dashboard = () => {
    // Hooks
    const { user } = useAuth()
    const [data, ] =useRole()
    const [openDAshboardNav, setOpenDashboardNav] = useState(false)
    const [drawerLinks, setDrawerLinks] = useState('')
    const [usersRole, isLoading] =useRole()

    if (isLoading) {
        <Loading></Loading>
    }

    
    useEffect(() => {
        const adminDrawerLinks =
            <>
                <li>
                    <NavLink
                        to='/dashboard/manage_classes'
                        className={({ isActive }) => (isActive ? 'text-pr flex items-center gap-2  py-2 rounded-md text-1xl font-semibold' : 'flex items-center gap-2  py-2 rounded-md text-1xl font-semibold')}
                    >
                        <FaEdit size={22}></FaEdit> <span>Manage Classes</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/dashboard/manage_user'
                        className={({ isActive }) => (isActive ? 'text-pr flex items-center gap-2  py-2 rounded-md text-1xl font-semibold' : 'flex items-center gap-2  py-2 rounded-md text-1xl font-semibold')}
                    >
                        <FaUsers size={22}></FaUsers> <span>Manage Users</span>
                    </NavLink>
                </li>
            </>
        const instructorDrawerLinks =
            <>
                <li>
                    <NavLink
                        to='/dashboard/add_class'
                        className={({ isActive }) => (isActive ? 'text-pr flex items-center gap-2 py-2 rounded-md text-1xl font-semibold' : 'text-center flex items-center gap-2 py-2 rounded-md text-1xl font-semibold')}
                    >
                        <AiOutlineVideoCameraAdd size={22}></AiOutlineVideoCameraAdd><span>Add Class</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/dashboard/my_classes'
                        className={({ isActive }) => (isActive ? 'text-pr flex items-center gap-2 py-2 rounded-md text-1xl font-semibold' : 'text-center flex items-center gap-2 py-2 rounded-md text-1xl font-semibold')}
                    >
                        <FaBookReader size={22}></FaBookReader><span>My Classes</span>
                    </NavLink>
                </li>
            </>
        const studentDrawerLinks = 
        <>
                <li>
                    <NavLink
                        to='/dashboard/my_selected_class'
                        className={({ isActive }) => (isActive ? 'text-pr flex items-center gap-2 py-2 rounded-md text-1xl font-semibold' : 'text-center flex items-center gap-2 py-2 rounded-md text-1xl font-semibold')}
                    >
                        <FaBookReader size={22}></FaBookReader><span> My Selected Class</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/dashboard/enrolled_classes'
                        className={({ isActive }) => (isActive ? 'text-pr flex items-center gap-2 py-2 rounded-md text-1xl font-semibold' : 'text-center flex items-center gap-2 py-2 rounded-md text-1xl font-semibold')}
                    >
                        <ImEnter size={22}></ImEnter> <span>Enrolled Classes</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/dashboard/payment_history'
                        className={({ isActive }) => (isActive ? 'text-pr flex items-center gap-2 py-2 rounded-md text-1xl font-semibold' : 'text-center flex items-center gap-2 py-2 rounded-md text-1xl font-semibold')}
                    >
                        <FaHistory></FaHistory> <span>Payment History</span>
                    </NavLink>
                </li>
            </>
        if (usersRole?.role === 'admin') {
            setDrawerLinks(adminDrawerLinks)
        }else if(usersRole?.role === 'instructor'){
            setDrawerLinks(instructorDrawerLinks)
        }else{
            setDrawerLinks(studentDrawerLinks)
        }

    }, [usersRole])
    return (
        <section>
            <div className="my-5 flex gap-x-4 items-center">
                {
                    user?.photoURL ? 
                    <img className="sm:w-20 w-10 sm:h-20 h-10 rounded-full" src={user?.photoURL} alt="" />
                    : 
                    <div className="flex justify-center items-center sm:w-20 w-10 sm:h-20 h-10 rounded-full bg-pr">
                        <FaUser size={30}></FaUser>
                    </div>
                }
                <div className="flex justify-between items-start flex-col">
                    <h1 className="sm:text-xl ">Welcome Back {user?.displayName}</h1>
                    <h1 className="sm:text-1xl text-sm">{user?.email}</h1>
                    {/* TODO: SHOW DYNAMIC ROLE */}
                    <span className="text-sm bg-[#3de09ce3] rounded-xl px-2  text-center text-white">{data?.role}</span>
                </div>
            </div>



            <div onClick={() => setOpenDashboardNav(!openDAshboardNav)}  title="Drawer" className="z-50 w-16 h-16 rounded-full backdrop-blur-sm md:hidden flex justify-center items-center fixed bottom-10 right-7 bg-pr">
                <button >{openDAshboardNav ? <AiOutlineClose className="text-pr" size={33}></AiOutlineClose> : <FaBars className="text-pr" size={33}></FaBars>}</button>
            </div>



            {
                openDAshboardNav && <div className="z-50 md:hidden h-96 custom-blur ps-2  rounded-sm fixed left-0 w-4/6 " data-aos="fade-right"
                data-aos-offset="500"
                data-aos-duration="500">

                    <ul className="md:w-96 py-4 px-1 ">
                        {drawerLinks}
                    </ul>
                </div>
            }

            <div className="flex">

                <ul className="md:w-60 rounded-lg h-96  p-3 hidden md:block ">
                    {
                        drawerLinks
                    }
                </ul>

                <div className="w-full ps-4">
                    <Outlet></Outlet>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;