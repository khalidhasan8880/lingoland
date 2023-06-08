import { Tab } from "@headlessui/react";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
    // from-[#3de09b] to-[#00c4ee]
    const {user} = useAuth()
    console.log(user);
    return (
        <section>
            <div className="my-5 flex gap-x-4 items-center">
                {user?.photoURL && <img className="w-20 h-20 rounded-full" src={user?.photoURL} alt="" />}
                <div className="flex justify-between flex-col">
                <h1 className="text-xl">Welcome Back {user?.displayName}</h1>
                <h1 className="text-1xl">{user?.email}</h1>
                </div>
            </div>
            
            <Tab.Group >
                <Tab.List className='grid grid-cols-2'>
                    <Tab
                        className={({ selected }) => selected ? 'bg-gradient-to-r from-[#3de09b] to-[#00c4ee] text-xl sm:text-3xl text-center w-full py-3 rounded-s-full border-none focus:outline-none text-white' : 'bg-gradient-to-r from-[#3de09b] to-[#00c4ee] text-xl rounded-s-full sm:text-3xl text-center w-full py-3  border-none focus:outline-none'}
                    >
                        Manage Classes
                    </Tab>
                    <Tab
                        className={({ selected }) => selected ? 'bg-gradient-to-r from-[#3de09b] to-[#00c4ee] text-xl sm:text-3xl text-center w-full py-3  rounded-e-full border-none focus:outline-none text-white' : 'bg-gradient-to-r from-[#3de09b] to-[#00c4ee] text-xl sm:text-3xl text-center w-full py-3 rounded-e-full  border-none focus:outline-none'}
                    >
                        Manage Users
                    </Tab>
                    {/* <Tab>Manage Users</Tab> */}
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>Content 1</Tab.Panel>
                    <Tab.Panel>Content 2</Tab.Panel>
                    {/* <Tab.Panel>Content 3</Tab.Panel> */}
                </Tab.Panels>
            </Tab.Group>

        </section>
    );
};

export default Dashboard;