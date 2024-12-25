import { useLocation, Navigate, Outlet } from "react-router-dom";
import { BASE } from "../constants/routeConstants";

const RequireAuth = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  return token ? (
    <Outlet />
  ) : (
    <Navigate to={BASE} state={{ from: location }} replace />
  );
};

export default RequireAuth;
