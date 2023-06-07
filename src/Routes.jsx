import {
    createBrowserRouter
} from "react-router-dom";
import LayOut from "./LayOut/LayOut";
import Register from "./Pages/Login&Reg/Register";
import Login from "./Pages/Login&Reg/Login";
import Home from "./Pages/HomePage/Home/Home";
import Dashboard from "./LayOut/Dashboard";
import PrivetRoute from "./PrivetRoutes/PrivetRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayOut></LayOut>,
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
                element:<PrivetRoute><Dashboard></Dashboard></PrivetRoute>
            },
        ]
    },
]);

export default router