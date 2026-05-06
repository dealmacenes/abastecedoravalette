import { Link, NavLink } from "react-router-dom";
import { assets, mobileSidebarItems } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import GoHomeButton from "./GoHomeButton";
import { LuLogIn } from "react-icons/lu";

const MobileSidebar = () => {
  const { showSidebar, setShowSidebar, navigate, isAuth } = useAppContext();

  return (
    <>
      {/* BACKDROP solo visible en mobile */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`flex flex-col fixed top-0 right-0 h-full w-64 bg-neutral-950 z-20 transform transition-transform duration-300 border-l border-neutral-500 p-2 select-none
          ${
            showSidebar ? "-translate-x-0" : "-translate-x-[-100%]" // Sidebar retraíble
          }
        `}
      >
        {/* Sidebar content acá */}
        <div
          onClick={() => setShowSidebar(false)}
          className="flex w-full place-content-center mt-4"
        >
          <GoHomeButton />
        </div>

        <nav className="mt-5 h-fit space-y-1">
          {mobileSidebarItems.map((item, index) => (
            <NavLink
                    key={index}
                    to={item.path}
                    onClick={() => {
                      setShowSidebar(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    end={true}
                    className={({ isActive }) =>
                      `flex items-center gap-2 py-2 my-1 px-2 transition-colors duration-75 rounded-sm ${
                        isActive
                          ? "bg-neutral-800 text-neutral-100 font-semibold"
                          : "text-white hover:bg-neutral-900 font-medium"
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5 stroke-[1.5px]" />
                    <span className="text-base">{item.title}</span>
                  </NavLink>
          ))}
        </nav>
        <div
          hidden={!isAuth}
          onClick={() => {
            navigate("/ingresar");
            setShowSidebar(false);
          }}
          className="flex mt-auto border border-main rounded-sm py-1 px-2 items-center gap-3 text-main font-medium select-none"
        >
          <LuLogIn className="size-5 flex-shrink-0" /> Ingresá / Registrate
        </div>
      </aside>
    </>
  );
};

export default MobileSidebar;
