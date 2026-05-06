// client/src/utils/ProtectedRoutes.jsx
import { Outlet, Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import LoadingView from "../components/LoadingView";

const ProtectedRoutes = () => {
  const {isAuth} = useAppContext();

  if (isAuth === null) return <LoadingView/>;
  return isAuth ? <Outlet /> : <Navigate to="/ingresar" />;
};

export default ProtectedRoutes;
