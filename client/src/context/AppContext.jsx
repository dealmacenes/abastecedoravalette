// client/src/context/AppContext.jsx
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showPanelSidebar, setShowPanelSidebar] = useState(false);
  const [showCartSidebar, setShowCartSidebar] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Efectivo");
  const navigate = useNavigate();
  const [showProductModal, setShowProductModal] = useState(null);
  const [loading, setLoading] = useState(true);

  // Estado específico para inventario
  const [inventory, setInventory] = useState([]);

  // Función para obtener inventario (used by ProductListCard and Catalogo)
  const fetchInventory = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/inventory/latest");
      setInventory(data);
    } catch (err) {
      console.error("Error al obtener inventario:", err);
      setInventory([]);
    } finally {
      setLoading(false);
    }
  };

  // Check auth
  const [isAuth, setIsAuth] = useState(null); // null: cargando, false: no auth, true: auth
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get("/api/user/data", {
          withCredentials: true,
        });
        setUserData(data.user);
        setIsAuth(true);
        setIsAdmin(data.user.role === "admin");
      } catch (err) {
        setIsAuth(false);
        setIsAdmin(false);
      }
    };

    checkAuth();
    // Obtenemos inventario al cargar el contexto
    fetchInventory();
  }, []);

  axios.defaults.withCredentials = true;

  return (
    <AppContext.Provider
      value={{
        isAdmin,
        showSidebar,
        setShowSidebar,
        showPanelSidebar,
        setShowPanelSidebar,
        showCartSidebar,
        setShowCartSidebar,
        searchValue,
        setSearchValue,
        paymentMethod,
        setPaymentMethod,
        showAuth,
        setShowAuth,
        navigate,
        isAuth,
        userData,
        showProductModal,
        setShowProductModal,
        loading,
        setLoading,
        // Inventario
        inventory,
        fetchInventory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
