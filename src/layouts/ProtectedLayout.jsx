import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = ({ allowedRoles }) => {
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  // not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // logged in but wrong role
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
