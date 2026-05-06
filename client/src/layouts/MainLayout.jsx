import MobileSidebar from "../components/MobileSidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import LoadingView from "../components/LoadingView";

const MainLayout = () => {
  const {loading} = useAppContext();
  return (
    <>
    {loading && (<LoadingView/>)}
    <div className="relative"> 
      <Navbar/>
      <MobileSidebar/>
      <div className="overflow-y-auto h-[calc(100vh-3.75rem)] hide-scrollbar">
        <Outlet/>
      </div>

    </div>
    </>
  )
};

export default MainLayout;
