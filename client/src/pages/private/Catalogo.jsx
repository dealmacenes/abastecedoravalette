// client/src/pages/private/Catalogo.jsx
import ProductCard from "../../components/panelComponents/ProductCard";
import SearchInputSidebar from "../../components/panelComponents/SearchInputSidebar";
import { CiCirclePlus } from "react-icons/ci";
import { useAppContext } from "../../context/AppContext";
import Spinner from "../../components/Spinner";

const Catalogo = () => {
  const { navigate, inventory, loading } = useAppContext();

  return (
    <>
      <SearchInputSidebar />
      <section className="w-full sm:pl-64 lg:pl-74 px-4 py-5 h-[calc(100vh-3.75rem)] mt-auto">
        {loading ? (
          <div className="text-neutral-300 flex gap-4 text-xl w-full h-full items-center justify-center">
            <Spinner /> Cargando productos...
          </div>
        ) : inventory.length === 0 ? (
          <div className="flex flex-col w-full h-full items-center justify-center select-none">
            <button onClick={() => navigate("/panel/productos")}>
              <CiCirclePlus className="size-30 text-neutral-400 stroke-[0.01px] cursor-pointer" />
            </button>
            <h1 className="w-fit text-neutral-200 text-2xl mt-10">
              No tenés productos en tu inventario.
            </h1>
            <h1 className="w-fit text-neutral-400 text-lg">
              Agregá tu primer producto
            </h1>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {inventory.map((item) => (
              <ProductCard
                key={item._id}
                productName={item.product?.name || "Producto sin nombre"}
                brand={item.product?.brand || "Marca desconocida"}
                image={
                  item.product?.imageUrl ||
                  "https://d3a1v57rabk2hm.cloudfront.net/patasbox1/fashion_mobile-copy-44/images/product_placeholder.jpg?ts=1712738793&host=es.patasbox.com"
                }
                price={item.customPrice}
                stock={item.stock}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Catalogo;
