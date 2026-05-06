import { useState } from "react";
import { panelSidebarItems } from "../../assets/assets";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  HiOutlineCog6Tooth,
  HiOutlineUserCircle,
  HiOutlineRocketLaunch,
} from "react-icons/hi2";
import SellerPanelNavbar from "../../components/panelComponents/SellerPanelNavbar";
import { useAppContext } from "../../context/AppContext";
import { obtenerIniciales } from "../../utils/utils";

const Panel = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const { userData } = useAppContext();
  const name = userData?.name;

  const dropDownItems = [
    { title: "Ajustes", icon: HiOutlineCog6Tooth, path: "/" },
    { title: "Mi perfil", icon: HiOutlineUserCircle, path: "/comunidad" },
    { title: "Mejorar plan", icon: HiOutlineRocketLaunch, path: "/panel" },
  ];
  return (
    <>
      <main>
        <SellerPanelNavbar />
        <div
          hidden={!toggleDropdown}
          onClick={() => setToggleDropdown(false)}
          className="fixed inset-0 pointer-events-auto z-10"
        />
        <div
          hidden={!toggleDropdown}
          className="absolute z-20 flex flex-col left-[0.96rem] bottom-18 bg-neutral-900 border border-neutral-500 w-[15.60rem] p-2 rounded shadow"
        >
          {dropDownItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex py-1 px-2 font-medium rounded text-neutral-200 hover:bg-neutral-800 cursor-pointer text-start gap-2 items-center"
            >
              <item.icon className="size-5" />
              {item.title}
            </Link>
          ))}
        </div>

        <section className="flex lg:pl-[17.5rem]">
          <aside
            id="panelNavigation"
            className="hidden flex-1 fixed top-15 left-0 lg:flex flex-col h-[calc(100vh-3.75rem)] pb-3 w-70 bg-neutral-950 border-r border-neutral-500"
          >
            {/* Sidebar content */}
            <nav className="flex flex-col w-full h-fit mt-5 px-3">
              {panelSidebarItems.map((group, index) => (
                <div key={index} className="mb-4">
                  <span className=" px-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    {group.title}
                  </span>
                  {group.items.map((item, index) => {
                    return (
                      <NavLink
                        key={index}
                        to={item.path}
                        end={true}
                        onClick={() => {
                          setShowSidebar(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={({ isActive }) =>
                          `flex items-center gap-2 py-2 my-1 px-2 transition-colors duration-75 rounded-sm ${
                            isActive
                              ? "bg-neutral-800 text-neutral-100 font-semibold"
                              : "text-white hover:bg-neutral-900 font-medium"
                          }`
                        }
                      >
                        <item.icon className="w-5 h-5 stroke-[1.5px]" />
                        <span>{item.title}</span>
                      </NavLink>
                    );
                  })}
                </div>
              ))}
            </nav>

            <div
              onClick={() => setToggleDropdown(true)}
              className="flex items-center relative w-9/10 mx-auto mt-auto h-fit p-2 px-3 bg-neutral-900 rounded cursor-pointer gap-3 border border-neutral-500"
            >
              <button className="size-10 rounded-full bg-main text-main-text text-sm">
                {obtenerIniciales(name)}
              </button>
              <div className="flex flex-col -space-y-[1px] items-start">
                <p className="text-sm text-neutral-200">{userData.name}</p>
                <p className="text-xs text-neutral-400">@{userData.userName}</p>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <Outlet />
          </div>
        </section>
      </main>
    </>
  );
};

export default Panel;
