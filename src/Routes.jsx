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
import MySelectedClasses from "./Pages/DashBoardPages/StudentPages/MySelectedClasses";
import Instructor from "./Pages/InstructorPage/Instructor";
import Payment from "./Pages/Payment/Payment";
import PaymentHistory from "./Pages/DashBoardPages/StudentPages/PaymentHistory";
import EnrolledClasses from "./Pages/DashBoardPages/StudentPages/EnrolledClasses";
import Classes from "./Pages/Classes/Classes";
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
            {
                path:'/instructors',
                element:<Instructor></Instructor>
            },
            {
                path:'/payment',
                element:<Payment></Payment>
            },
            {
                path:'/classes',
                element:<Classes></Classes>
            },
            

            // dashboard
            {
                path:'/dashboard',
                element:<PrivetRoute><Dashboard></Dashboard></PrivetRoute>,
                children:[
                    {
                        path:'payment_history',
                        element:<PrivetRoute><PaymentHistory></PaymentHistory></PrivetRoute>
                    },
                    {
                        path:'enrolled_classes',
                        element:<PrivetRoute><EnrolledClasses></EnrolledClasses></PrivetRoute>
                    },
                    {
                        path:'my_selected_class',
                        element:<PrivetRoute><MySelectedClasses></MySelectedClasses></PrivetRoute>
                    },
                    // admin routes
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