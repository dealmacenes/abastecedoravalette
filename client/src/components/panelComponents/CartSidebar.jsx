import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import ProductCartItem from "./ProductCartItem";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";

const CartSidebar = () => {
  const {
    showCartSidebar,
    setShowCartSidebar,
    paymentMethod,
    setPaymentMethod,
  } = useAppContext();
  const [showPMD, setShowPMD] = useState(false);

  const paymentMethods = [
    { method: "Efectivo" },
    { method: "Transferencia" },
    { method: "Tarjeta" },
  ];

  return (
    <>
      {/* BACKDROP solo visible en mobile */}
      {showCartSidebar && (
        <div
          className="hidden lg:block fixed inset-0 bg-transparent z-10"
          onClick={() => setShowCartSidebar(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`flex flex-col fixed top-0 right-0 h-full w-full lg:w-100 bg-neutral-950 z-20 transform transition-transform duration-300 lg:border-l border-neutral-500 p-2 select-none
          ${
            showCartSidebar ? "-translate-x-0" : "-translate-x-[-100%]" // Sidebar retraíble
          }
        `}
      >
        <button
          onClick={() => setShowCartSidebar(!showCartSidebar)}
          className="flex items-center gap-2 mt-2 pl-3 pr-2 py-1 text-neutral-100 bg-neutral-700 rounded border border-neutral-600 hover:bg-neutral-600 size-fit cursor-pointer select-none"
        >
          Ocultar menú <LuChevronRight className="size-6 stroke-1" />
        </button>

        <div className="flex flex-col w-full h-full overflow-y-auto my-5 pb-2 hide-scrollbar gap-2 border-b border-neutral-500">
          <ProductCartItem />
          <ProductCartItem />
          <ProductCartItem />
          <ProductCartItem />
          <ProductCartItem />
          <ProductCartItem />
          <ProductCartItem />
          <ProductCartItem />
          <ProductCartItem />
          <ProductCartItem />
          <ProductCartItem />
          <ProductCartItem />
          <ProductCartItem />
          <ProductCartItem />
          <ProductCartItem />
        </div>

        <div className="flex w-full h-fit mb-5 mt-auto items-center relative">
          <button
            onClick={() => setShowPMD(!showPMD)}
            className="flex w-6/10 h-fit ml-2 pl-3 pr-2 py-2 bg-neutral-700 text-neutral-300 rounded-md border border-neutral-500 cursor-pointer justify-between items-center"
          >
            Metodo: {paymentMethod}{" "}
            <LuChevronDown className="size-6 stroke-1" />{" "}
          </button>
          {/* Selector medio de pago */}
          <div
            hidden={!showPMD}
            onClick={() => setShowPMD(false)}
            className="fixed inset-0"
          />

          <div
            hidden={!showPMD}
            className="absolute bottom-15 left-2 w-6/10 rounded-lg shadow p-2 bg-neutral-700"
          >
            {paymentMethods.map((item, index) => (
              <p
                onClick={() => {
                  setPaymentMethod(item.method);
                  setShowPMD(false);
                }}
                key={index}
                className="px-2 py-1 text-neutral-200 hover:bg-neutral-600 rounded-md cursor-pointer"
              >
                {item.method}
              </p>
            ))}
          </div>

          <div className="flex flex-col mx-auto items-center">
            <p className="text-neutral-400 text-sm">Total de la venta</p>
            <p className="text-neutral-200 text-xl">$ 35.690,50</p>
          </div>
        </div>

        <button className="bg-main rounded font-bold w-full max-w-8/10 mx-auto h-fit py-2 px-5 text-neutral-200 cursor-pointer active:bg-main-accent hover:bg-main-accent">
          CONCLUIR VENTA
        </button>
      </aside>
    </>
  );
};

export default CartSidebar;
