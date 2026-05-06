// client/src/utils/ProtectedRoutes.jsx
import { Outlet, Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import LoadingView from "../components/LoadingView";

const ProtectedAdminRoutes = () => {
  const {isAdmin} = useAppContext();

  if (isAdmin === null) return <LoadingView/>;
  return isAdmin ? <Outlet /> : <Navigate to="/ingresar" />;
};

export default ProtectedAdminRoutes;
