import { Navigate, Outlet } from "react-router-dom";
import { getToken, getUser } from "../utils/token";

function ProtectedRoute({ allowedRole }) {

  const token = getToken();

  const user = getUser();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;