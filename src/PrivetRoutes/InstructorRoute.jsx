import { Navigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import { useAuth } from "../hooks/useAuth";
import { useRole } from "../hooks/useRole";

const InstructorRoute = ({children}) => {
    const [usersRole, isLoading] = useRole()
   const {user, loading} = useAuth()
    // conditions
    if ( loading || isLoading ) {
        return <Loading></Loading>
    }
    if (user && usersRole?.role === 'instructor') {
        return children
    }

    return <Navigate to='/login' replace></Navigate>
};

export default InstructorRoute;