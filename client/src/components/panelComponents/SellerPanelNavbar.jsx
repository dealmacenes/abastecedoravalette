import React from "react";
import IconoMenu from "../IconoMenu";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

const SellerPanelNavbar = () => {
  const {
    showPanelSidebar,
    setShowPanelSidebar,
    showCartSidebar,
    setShowCartSidebar,
  } = useAppContext();
  return (
    <>
      <header className="flex h-15 bg-neutral-800 sticky top-0 z-10 items-center px-5 lg:px-0">
        {/* Home button */}
        <Link to="/"
          title="Ir a la página principal"
          className="flex items-center place-content-center text-xl lg:text-2xl lg:w-70 h-full self-center cursor-pointer z-10 select-none lg:border-r border-neutral-500 lg:hover:bg-neutral-900 text-neutral-100 lg:bg-neutral-950 font-bold"
        >
          DeAlmacenes
          <span className="text-main-accent text-xl lg:text-2xl">
            .com
          </span>{" "}
        </Link>

        {/* Carrito y menu de navegación mobile */}
        <div className="flex ml-auto gap-5">
          <div className="relative">
            <HiOutlineShoppingCart
              onClick={() => setShowCartSidebar(!showCartSidebar)}
              className="flex size-10 border border-neutral-100 bg-main cursor-pointer text-neutral-200 rounded-full p-2 active:scale-95"
            />
            <span className="absolute -right-2 -bottom-[0.4rem] max-w-9 min-w-5 h-fit min-h-5 text-neutral-800 font-medium bg-neutral-100 border-t-4 border-l-4 border-neutral-800 rounded-full text-center place-content-center text-xs lg:text-sm px-1 select-none pointer-events-none">
              96
            </span>
          </div>

          {/* Navegacion mobile */}
          <button onClick={() => setShowPanelSidebar(!showPanelSidebar)}>
            <IconoMenu className="lg:hidden flex size-7 cursor-pointer text-neutral-200 rounded-full active:scale-95" />
          </button>
        </div>
      </header>
    </>
  );
};

export default SellerPanelNavbar;
