import {
    createBrowserRouter
} from "react-router-dom";
import LayOut from "./LayOut/LayOut";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayOut></LayOut>
    },
]);

export default router