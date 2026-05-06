import { Link, NavLink } from "react-router-dom";
import {
  assets,
  mobilePanelSidebarItems,
  panelSidebarItems,
} from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { LuLogIn } from "react-icons/lu";

const MobilePanelSidebar = () => {
  const { showPanelSidebar, setShowPanelSidebar, navigate } = useAppContext();

  return (
    <>
      {/* BACKDROP solo visible en mobile */}
      {showPanelSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          onClick={() => setShowPanelSidebar(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`flex flex-col fixed top-0 right-0 h-full w-64 bg-neutral-950 z-20 transform transition-transform duration-300 border-l border-neutral-500 p-2 select-none
          ${
            showPanelSidebar ? "-translate-x-0" : "-translate-x-[-100%]" // Sidebar retraíble
          }
        `}
      >
        {/* Sidebar content acá */}
        <nav className="flex flex-col w-full h-fit mt-5">
          {panelSidebarItems.map((group, index) => (
            <div key={index} className="mb-4">
              <span className=" px-2 text-xs font-semibold uppercase tracking-wider text-white">
                {group.title}
              </span>
              {group.items.map((item, index) => {
                return (
                  <NavLink
                    key={index}
                    to={item.path}
                    onClick={() => {
                      setShowPanelSidebar(false);
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
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default MobilePanelSidebar;
