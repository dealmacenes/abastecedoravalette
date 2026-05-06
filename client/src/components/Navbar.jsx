import { CgMenuRight } from "react-icons/cg";
import { useAppContext } from "../context/AppContext";
import GoHomeButton from "./GoHomeButton";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { obtenerIniciales } from "../utils/utils";

const Navbar = () => {
  const { showSidebar, setShowSidebar, navigate, isAuth, userData } = useAppContext();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const inPanelPage = useLocation().pathname.includes("/panel");
  const name = userData?.name

  const dropDownItems = [
    { title: "Mi perfil", path: "/perfil" },
    { title: "Inventario", path: "/panel" },
    { title: "Punto de venta", path: "/panel" },
  ];

  return (
    <>
      <header className="flex sticky top-0 w-full h-15 bg-neutral-800 z-10 border-b border-neutral-500 select-none">
        <div className="flex relative w-full h-full items-center justify-between">
          <GoHomeButton />

          <div
            hidden={inPanelPage}
            className="hidden lg:flex gap-10 w-full absolute justify-center text-lg text-neutral-300"
          >
            <Link to="panel">Panel</Link>
            <Link to="panel/inventario">Inventario</Link>
            <Link to="soporte">Soporte</Link>
          </div>

          <div className="lg:flex hidden gap-4 items-center relative mr-5">
            <HiOutlineShoppingCart
              hidden={!inPanelPage}
              className="flex size-10 bg-main-accent cursor-pointer text-main-text rounded-full p-2 active:scale-95"
            />
            {!isAuth && (
              <button
                onClick={() => navigate("/ingresar")}
                className="py-1 px-4 h-fit rounded-full font-medium text-neutral-300 border border-neutral-500 cursor-pointer hover:bg-neutral-700"
              >
                Ingresá
              </button>
            )}

            <button
              onClick={() => setToggleDropdown(!toggleDropdown)} hidden={!isAuth}
              className="hidden lg:block size-10 rounded-full bg-main text-main-text text-sm cursor-pointer focus:ring ring-main-accent ring-offset-2"
            >
              {name ? obtenerIniciales(name) : ""}
            </button>
              <div hidden={!toggleDropdown} onClick={()=>setToggleDropdown(false)} className="fixed inset-0"/>
              <div
                hidden={!toggleDropdown}
                className="absolute flex flex-col right-0 top-[115%] bg-neutral-800 border border-neutral-500 w-40 p-2 rounded shadow opacity-100 transition ease-in-out duration-200 z-10"
              >
                {dropDownItems.map((item, index) => (
                  <p
                    key={index}
                    className="py-1 px-2 text-sm font-medium text-neutral-300 hover:bg-neutral-600 cursor-pointer rounded"
                  >
                    {item.title}
                  </p>
                ))}
              </div>
          </div>

          <CgMenuRight
            onClick={() => setShowSidebar(!showSidebar)}
            className="size-7 active:size-6 flex-shrink-0 text-main lg:hidden mr-5"
          />
        </div>
      </header>
    </>
  );
};

export default Navbar;
