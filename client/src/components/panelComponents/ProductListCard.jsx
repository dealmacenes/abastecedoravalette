// client/src/components/panelComponents/ProductListCard.jsx
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import ProductModal from "./ProductModal";
import axios from "axios";
import toast from "react-hot-toast";

const ProductListCard = ({ product }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const inInventoryPage = useLocation().pathname.includes("/panel/inventario");
  const { showProductModal, setShowProductModal, fetchInventory, setLoading } =
    useAppContext();

  const handleProductAction = async ({
    customPrice,
    stock,
    onSale,
    salePercent,
  }) => {
    try {
      setLoading(true);

      const toastMessage = inInventoryPage
        ? {
            loading: "Eliminando producto...",
            success: <b>Producto eliminado del inventario</b>,
            error: <b>Error al eliminar el producto</b>,
          }
        : {
            loading: "Agregando al inventario...",
            success: <b>Producto agregado correctamente</b>,
            error: <b>Error al agregar el producto</b>,
          };

      const promise = inInventoryPage
        ? axios.delete(`/api/inventory/${product._id}`, {
            withCredentials: true,
          })
        : axios.post(
            "/api/inventory",
            {
              productId: product._id,
              customPrice,
              stock,
              onSale,
              salePercent,
            },
            { withCredentials: true }
          );

      await toast.promise(promise, toastMessage);

      fetchInventory();
      setShowProductModal(null);
    } catch (error) {
      console.error(
        "Error en acción de producto:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showProductModal === product._id && (
        <ProductModal product={product} onSave={handleProductAction} />
      )}

      <article className="flex flex-col w-full h-full rounded-md shadow overflow-hidden bg-neutral-800 border border-neutral-700 select-none">
        {!isLoaded && (
          <div className="aspect-square w-full bg-neutral-600 animate-pulse" />
        )}
        <img
          src={product.imageUrl}
          onLoad={() => setIsLoaded(true)}
          className={`aspect-square w-full object-cover transition-opacity duration-300 bg-white pointer-events-none ${
            isLoaded ? "opacity-100" : "opacity-0 absolute"
          }`}
          alt={product.name}
        />
        <div className="flex flex-col p-2 justify-between h-full">
          <div>
            <div className="flex justify-between items-center gap-2">
              <span className="bg-neutral-900 text-neutral-200 text-xs sm:text-sm px-2 py-1 rounded truncate">
                {product.brand}
              </span>
              <span className="text-neutral-100 font-medium">
                $ {product.suggestedPrice.toLocaleString("es-AR")}
              </span>
            </div>
            <p className="text-neutral-200 text-sm mt-2">{product.name}</p>
          </div>
          <button
            className="mt-3 w-full bg-neutral-950 text-white py-2 rounded flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => setShowProductModal(product._id)}
          >
            {inInventoryPage ? "Eliminar producto" : "Agregar al inventario"}
          </button>
        </div>
      </article>
    </>
  );
};

export default ProductListCard;
