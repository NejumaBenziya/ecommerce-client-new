import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = ({ allowedRoles }) => {

  // Get auth state from Redux
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  // Case 1: User is NOT logged in
  if (!isLoggedIn) {

    // redirect to login page
    return <Navigate to="/login" replace />;
  }

  //  Case 2: Logged in but does NOT have required role
  if (allowedRoles && !allowedRoles.includes(role)) {

    // redirect to home page (or you can send to "unauthorized" page)
    return <Navigate to="/" replace />;
  }

  //  Case 3: Authorized → render child routes
  return <Outlet />;
};

export default ProtectedLayout;