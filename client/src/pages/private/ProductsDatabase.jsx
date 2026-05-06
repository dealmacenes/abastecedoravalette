import { useEffect, useState } from "react";
import axios from "axios";
import ProductListCard from "../../components/panelComponents/ProductListCard";
import SearchInputSidebar from "../../components/panelComponents/SearchInputSidebar";
import toast from "react-hot-toast";
import ProductModal from "../../components/panelComponents/ProductModal";


const ProductsDatabase = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "/api/products", { withCredentials: true }
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error al obtener productos:", error);
        toast.error("Error al obtener productos")
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
    <section className="relative flex flex-col md:flex-row h-full w-full p-2 lg:p-4 gap-2 items-center">
      <SearchInputSidebar/>
      <section className="grid grid-cols-2 md:grid-cols-3 ml-auto sm:w-[calc(100vw-17.5rem)] lg:w-[calc(100vw-38rem)] h-full gap-2 sm:gap-4 pb-10">
        {products.map((product) => (
          <ProductListCard key={product._id} product={product} />
        ))}
      </section>
    </section>
    </>
  );
};

export default ProductsDatabase;
