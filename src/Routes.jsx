import {
    createBrowserRouter
} from "react-router-dom";
import LayOut from "./LayOut/LayOut";
import Register from "./Pages/Login&Reg/Register";
import Login from "./Pages/Login&Reg/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayOut></LayOut>,
        children:[
            {
                path:'/sign_up',
                element:<Register></Register>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
        ]
    },
]);

export default router