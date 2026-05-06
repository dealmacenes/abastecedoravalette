import { useState } from "react";
import { assets } from "../../assets/assets";
import { IoCloseCircle } from "react-icons/io5";


const ProductCartItem = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
      <article className=" group flex w-full h-15 p-2 px-3 gap-3 bg-neutral-800 hover:bg-neutral-700 transition-colors duration-75 rounded justify-between relative">
        <button className="group-hover:bg-neutral-700 absolute top-0 left-0 bg-neutral-800 rounded-full p-1 cursor-pointer">
          <IoCloseCircle className="flex-shrink-0 size-6 text-neutral-200 stroke-1"/>
        </button>
        <div className="flex gap-3">
          {/* Loader shimmer */}
          {!isLoaded && (
            <div className="aspect-square h-full bg-neutral-600 animate-pulse rounded" />
          )}

          {/* Imagen con fade-in */}
          <img
            src={assets.testProduct}
            onLoad={() => setIsLoaded(true)}
            className={`aspect-square h-full object-cover rounded pointer-events-none select-none transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0 absolute"
            }`}
            alt="Producto"
          />

          <div className="flex flex-col h-full cursor-default justify-center">
            <p className="text-neutral-200 truncate w-50 text-base">
              Azúcar Común Cannella 1kg
            </p>
            <div className="flex gap-3">
              <p className="flex items-center text-sm sm:text-base gap-2 text-neutral-400 border-r border-neutral-500 pr-3">
                Cantidad:{" "}
                <span
                  title="Precio sugerido por el proveedor"
                  className="text-neutral-50 flex items-center gap-1"
                >
                  2
                </span>
              </p>
              <p className="flex items-center text-sm sm:text-base gap-2 text-neutral-400">
                $1.300{" "}
                <span
                  title="Precio sugerido por el proveedor"
                  className="text-neutral-50 flex items-center gap-1"
                >
                  c/u
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col my-auto h-full w-fit pl-2 items-center text-neutral-300 border-l border-neutral-500">
          <p className="text-sm text-neutral-400">Total</p>
          <p>$ 15.600</p>
        </div>
      </article>
    </>
  );
};

export default ProductCartItem;
