import {
    createBrowserRouter
} from "react-router-dom";
import LayOut from "./LayOut/LayOut";
import Register from "./Pages/Login&Reg/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayOut></LayOut>,
        children:[
            {
                path:'/sign_up',
                element:<Register></Register>
            }
        ]
    },
]);

export default router