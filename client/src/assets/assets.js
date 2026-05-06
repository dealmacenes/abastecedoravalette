// mobileSIdebar Icons
import { PiCompassDuotone, PiArticleDuotone, PiHouseDuotone } from "react-icons/pi";

// panelSidebar Icons
import { HiOutlineCalculator, HiOutlineViewGridAdd, HiOutlineClock, HiOutlineArchive } from "react-icons/hi";
import { LuPackage } from "react-icons/lu";



import icon from "../../icon.svg"
import homeBanner from "./homePortrait.png"
import testProduct from "./canellaAzucar.png"


export const assets = {
  homeBanner,
  icon,
  testProduct, 
}

export const cardContent = [
  {
    title: "Comunidad",
    description: "Creamos una comunidad para que tus dudas, consejos y experiencias tengan un espacio.",
    path: "/comunidad",
  },
  {
    title: "Blog",
    description: "Nuestro blog oficial brinda novedades, información profesional y mucho más!.",
    path: "/blog",
  },
  {
    title: "Calculadora",
    description: "Calculá el precio de venta y cuanta ganancia generan tus productos.",
    path: "/calculadora",
  },
  {
    title: "Punto de venta",
    description: "Herramienta simple para guardar historial de ventas y obtener estadisticas.",
    path: "/panel",
  },
  {
    title: "Gestor de Stock",
    description: "Llevá un control de forma sencilla del inventario de tu almacén.",
    path: "/panel",
  },
  {
    title: "Plantillas",
    description: "Creá carteles de ofertas y más para tu negocio con nuestras plantillas.",
    path: "/generador",
  },
];

export const mobileSidebarItems = [
  {
    icon: PiHouseDuotone,
    title: "Inicio",
    path: "/",
  },
  {
    icon: PiCompassDuotone,
    title: "Comunidad",
    path: "/comunidad",
  },
  {
    icon: PiArticleDuotone,
    title: "Blog",
    path: "/blog",
  },
];

export const panelSidebarItems = [
    {
      title: "INVENTARIO",
      items: [
        { icon: HiOutlineCalculator, title: "Inicio", path: "/panel" },
        { icon: LuPackage, title: "Mis productos", path: "/panel/inventario" },
        { icon: HiOutlineViewGridAdd, title: "Nuevo producto", path: "/panel/productos" },
      ],
    },
    {
      title: "TRANSACCIONES",
      items: [
        { icon: HiOutlineClock, title: "Mis ventas", path: "/panel/ventas" },
        { icon: HiOutlineArchive, title: "Gestion de caja", path: "/panel/caja" },
      ],
    }
];

export const adminSidebarItems = [
    {
      title: "DASHBOARD",
      items: [
        { icon: HiOutlineCalculator, title: "Inicio", path: "/admin" },
      ],
    },
    {
      title: "USUARIOS",
      items: [
        { icon: HiOutlineClock, title: "Lista de usuarios", path: "/admin/users" },
      ],
    },
    {
      title: "PRODUCTOS",
      items: [
        { icon: HiOutlineClock, title: "Subir producto", path: "/admin/upload" },
        { icon: HiOutlineClock, title: "Mas vendidos", path: "/admin/ventas" },
        { icon: HiOutlineArchive, title: "Menor rotación", path: "/admin/caja" },
      ],
    },
    {
      title: "ESTADISTICAS",
      items: [
        { icon: HiOutlineClock, title: "Por zona", path: "/admin/estadisticas/zona" },
        { icon: HiOutlineArchive, title: "Por marca", path: "/admin/estadisticas/marca" },
        { icon: HiOutlineArchive, title: "Por categoría", path: "/admin/estadisticas/categoria" },
      ],
    },
    {
      title: "OTROS",
      items: [
        { icon: HiOutlineClock, title: "Feedback & Bugs", path: "/admin/soporte" },
        { icon: HiOutlineClock, title: "Monetización", path: "/admin/monetizacion" },
        { icon: HiOutlineArchive, title: "Configuración avanzada", path: "/admin/config" },
      ],
    }
];

export const mobilePanelSidebarItems = [
  {
    icon: PiHouseDuotone,
    title: "Inicio",
    path: "/",
  },
  {
    icon: PiCompassDuotone,
    title: "Comunidad",
    path: "/comunidad",
  },
  {
    icon: PiArticleDuotone,
    title: "Blog",
    path: "/blog",
  },
];
