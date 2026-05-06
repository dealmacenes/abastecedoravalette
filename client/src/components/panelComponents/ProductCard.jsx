// client/src/components/panelComponents/ProductCard.jsx
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useState } from "react";

const ProductCard = ({ productName, brand, image, price, stock }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <article className="flex flex-col w-full h-full rounded-md shadow overflow-hidden bg-neutral-800 border border-neutral-700">
      {!isLoaded && (
        <div className="aspect-square h-full bg-neutral-600 animate-pulse" />
      )}
      <img
        src={image}
        onLoad={() => setIsLoaded(true)}
        className={`aspect-square w-full object-cover pointer-events-none select-none transition-opacity duration-300 bg-neutral-100 ${
          isLoaded ? "opacity-100" : "opacity-0 absolute"
        }`}
        alt={productName}
      />
      <div className="flex flex-col w-full h-full p-2 justify-between">
        <div className="flex flex-col w-full">
          <div className="flex w-full justify-between items-center gap-2">
            <button className="cursor-pointer rounded-md px-[6px] lg:px-2 py-1 text-neutral-200 bg-neutral-900 text-xs sm:text-sm truncate">
              {brand}
            </button>
            <button
              title="Actualizar precio"
              className="text-base flex-shrink-0 sm:text-lg text-neutral-100 font-medium cursor-pointer"
            >
              $ {price.toLocaleString()}
            </button>
          </div>
          <p className="text-sm mt-2 text-neutral-200">{productName}</p>
        </div>
        <div className="mt-5">
          <div className="flex justify-between items-center select-none">
            <p className="text-xs sm:text-sm text-neutral-100 font-medium">
              Stock: {stock}u
            </p>
            <p className="text-xs px-2 py-[2px] lg:py-1 bg-green-600 text-main-text rounded">
              {stock > 0 ? "En Stock" : "Sin stock"}
            </p>
          </div>
          <button className="cursor-pointer flex w-full bg-neutral-950 rounded items-center text-white place-content-center gap-2 mt-3 py-1">
            <HiOutlineShoppingCart className="size-4" />
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
