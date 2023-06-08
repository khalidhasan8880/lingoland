import { Navigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import { useAuth } from "../hooks/useAuth";
import { useRole } from "../hooks/useRole";



const AdminRoute = ({ children }) => {
    // hooks
    const { user, loading } = useAuth()
    const role = useRole()
    // conditions
    if (loading) {
        <Loading></Loading>
    }
    if (user && role === 'admin') {
        return children
    }

    return <Navigate to='/login'></Navigate>
};

export default AdminRoute;