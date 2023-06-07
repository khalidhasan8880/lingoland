import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivetRoute = ({children}) => {

    const {user, loading} = useAuth()
    if (loading) {
        return <h1 className="text-center animate-ping">loading...</h1>
    }
    if (user) {
        return children
    }
    <Navigate to='/'></Navigate>
};

export default PrivetRoute;