import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

const RequireAuth = ({ allowedRoles, children }) => {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();
    return (
        user?.role && allowedRoles?.includes(user.role)
            ? children
            : user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
