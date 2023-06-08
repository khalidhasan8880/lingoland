import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useRole } from "../hooks/useRole";
import Loading from "../components/Loading/Loading";



const AdminRoute = ({ children }) => {
   const [data, isLoading] = useRole()
   const {user, loading} = useAuth()
    // conditions
    if ( loading || isLoading ) {
        return <Loading></Loading>
    }
    if (user && data?.role === 'admin') {
        return children
    }

    return <Navigate to='/login' replace></Navigate>
};

export default AdminRoute;