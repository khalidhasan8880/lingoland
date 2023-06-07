import {
    createBrowserRouter
} from "react-router-dom";
import Button from "./components/Button/Button";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Button></Button>
    },
]);

export default router