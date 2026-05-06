//client/src/App.jsx
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MobilePanelSidebar from "./components/panelComponents/MobilePanelSidebar";
import CartSidebar from "./components/panelComponents/CartSidebar";

// Public pages
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/public/Home";
import Community from "./pages/public/Community";
import Calculator from "./pages/public/Calculator";
import Blog from "./pages/public/Blog";
import CardGenerator from "./pages/public/CardGenerator";
import AuthPage from "./pages/public/AuthPage";

// Private pages
import Panel from "./pages/private/Panel";
import Catalogo from "./pages/private/Catalogo";
import ProductsDatabase from "./pages/private/ProductsDatabase";
import Inventory from "./pages/private/Inventory";

// Admin pages
import AdminPanel from "./pages/admin/AdminPanel";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UploadProduct from "./pages/admin/UploadProduct";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import ProtectedAdminRoutes from "./utils/ProtectedAdminRoutes";

function App() {
  return (
    <>
      <MobilePanelSidebar />
      <CartSidebar />
      <Toaster />
      <Routes>
        <Route path="ingresar" element={<AuthPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="comunidad" element={<Community />} />
          <Route path="calculadora" element={<Calculator />} />
          <Route path="blog" element={<Blog />} />
          <Route path="generador" element={<CardGenerator />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/panel" element={<Panel />}>
            <Route index element={<Catalogo />} />
            <Route path="productos" element={<ProductsDatabase />} />
            <Route path="inventario" element={<Inventory />} />
          </Route>
        </Route>

        <Route element={<ProtectedAdminRoutes />}>
          <Route path="/admin" element={<AdminPanel />}>
            <Route index element={<AdminDashboard />} />
            <Route path="upload" element={<UploadProduct />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
