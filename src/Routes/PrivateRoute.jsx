import { useContext } from "react";
import { AuthContex } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({ children }) => {

    const location = useLocation()

    const { user,loading } = useContext(AuthContex)
    if(loading){
        return <div>Loading....</div>
    }
    if (user) {
        return children
    }


    return <Navigate to='/login' state={{from : location}} replace></Navigate>
};

export default PrivateRoute;