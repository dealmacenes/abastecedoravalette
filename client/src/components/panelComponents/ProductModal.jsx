// client/src/components/panelComponents/ProductModal.jsx
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useLocation } from "react-router-dom";

const ProductModal = ({ product, onSave }) => {
  const [customPrice, setCustomPrice] = useState(product.suggestedPrice);
  const [stock, setStock] = useState(1);
  const [onSale, setOnSale] = useState(false);
  const [salePercent, setSalePercent] = useState(0);
  const { setShowProductModal, loading } = useAppContext();
  const inInventoryPage = useLocation().pathname.includes("/panel/inventario");

  const handleSave = () => {
    onSave({ customPrice, stock, onSale, salePercent });
  };

  return (
    <>
      <div
        onClick={() => setShowProductModal(false)}
        className="fixed inset-0 z-10 bg-black/30"
      />
      <div className="fixed inset-0 z-20 flex flex-col h-fit gap-4 bg-neutral-800 py-6 px-6 sm:px-10 rounded-lg shadow w-8/10 sm:w-2/3 lg:w-2/5 self-center justify-self-center">
        {inInventoryPage && (
          <h3 className="text-2xl text-neutral-200 -mb-4">
            Seguro querés eliminar el producto del inventario?
          </h3>
        )}
        <h2
          className={`mb-4 font-medium ${
            inInventoryPage
              ? "text-xl text-neutral-400"
              : "text-2xl sm:4xl text-neutral-200"
          }`}
        >
          {product.name}
        </h2>

        {!inInventoryPage && (
          <>
            <label>
              <span className="text-neutral-50">Precio</span>
              <input
                type="number"
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 text-neutral-100 rounded-lg outline-none"
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
              />
            </label>

            <label>
              <span className="text-neutral-50">
                Cuánto ingresa? {"(Stock)"}
              </span>
              <input
                type="number"
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 text-neutral-100 rounded-lg outline-none"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </label>

            <div className="flex justify-between gap-6 mt-2">
              <label className="flex gap-2 items-center bg-neutral-900 rounded px-4 py-2 cursor-pointer">
                <span className="text-neutral-200 text-lg text-nowrap select-none">
                  En oferta
                </span>
                <input
                  type="checkbox"
                  checked={onSale}
                  onChange={(e) => setOnSale(e.target.checked)}
                  className="cursor-pointer"
                />
              </label>

              {onSale && (
                <label className="flex gap-2 items-center">
                  <span className="text-neutral-50">%</span>
                  <input
                    type="number"
                    className="w-full h-fit px-3 py-2 bg-neutral-700 border border-neutral-600 text-neutral-100 rounded-lg outline-none"
                    value={salePercent}
                    onChange={(e) => setSalePercent(e.target.value)}
                  />
                </label>
              )}
            </div>
          </>
        )}

        <div className="flex justify-end gap-4">
          <button disabled={loading}
            className="px-3 py-2 bg-green-700 text-neutral-200 rounded-lg border border-green-800 cursor-pointer"
            onClick={handleSave}
          >
            Guardar
          </button>
          <button disabled={loading}
            className="px-3 py-2 bg-red-700 text-neutral-200 rounded-lg border border-red-800 cursor-pointer"
            onClick={() => setShowProductModal(false)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
