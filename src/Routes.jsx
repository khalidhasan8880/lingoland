import {
    createBrowserRouter
} from "react-router-dom";
import LayOut from "./LayOut/LayOut";
import Register from "./Pages/Login&Reg/Register";
import Login from "./Pages/Login&Reg/Login";
import Home from "./Pages/HomePage/Home/Home";
import Dashboard from "./LayOut/Dashboard";
import PrivetRoute from "./PrivetRoutes/PrivetRoute";
import ManageUser from "./Pages/DashBoardPages/AdminPages/ManageUser";
import AdminRoute from "./PrivetRoutes/AdminRoute";
import InstructorRoute from "./PrivetRoutes/InstructorRoute";
import AddClass from "./Pages/DashBoardPages/InstructorPages/AddClass";
import MyClasses from "./Pages/DashBoardPages/InstructorPages/MyClasses";
import ErrorPage from "./Pages/ErrorPage";
import ManageClasses from "./Pages/DashBoardPages/AdminPages/ManageClasses";
// import AdminRoute from "./PrivetRoutes/AdminRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayOut></LayOut>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            
            {
                path:'/sign_up',
                element:<Register></Register>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            // dashboard
            {
                path:'/dashboard',
                element:<PrivetRoute><Dashboard></Dashboard></PrivetRoute>,
                children:[
                    {
                        path:'manage_user',
                        element:<AdminRoute><ManageUser></ManageUser></AdminRoute>
                    },
                    {
                        path:'manage_classes',
                        element:<AdminRoute><ManageClasses></ManageClasses></AdminRoute>
                    },
                    // instructor routes
                    {
                        path:'add_class',
                        element:<InstructorRoute><AddClass></AddClass></InstructorRoute>
                    },
                    {
                        path:'my_classes',
                        element:<InstructorRoute><MyClasses></MyClasses></InstructorRoute>
                    },
                ]

            },
        ]
    },
]);

export default router