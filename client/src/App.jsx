import { useState, useRef, useEffect } from "react";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaBars,
  FaTimes,
  FaChevronRight,
} from "react-icons/fa";
import { FaHandshake } from "react-icons/fa6";
import { IoOpenOutline } from "react-icons/io5";
import { GiCow, GiPig, GiChicken, GiSheep, GiSlicedSausage } from "react-icons/gi";
import { ChevronRight, ChevronLeft, MapPin } from "lucide-react";
import { LuBeef } from "react-icons/lu";
import { Helmet } from "react-helmet-async";
import { PiCowFill, PiHandshakeFill, PiTruckFill } from "react-icons/pi";
import { MdOutlineFoodBank } from "react-icons/md";
import { TbMeat } from "react-icons/tb";

// ─── DATA ────────────────────────────────────────────────────────────────────

// Fuente de verdad: solo las 3 categorías de animales.
// Los items con `tags` aparecerán también en las secciones cruzadas
// (ej: tags: ["embutidos"] → aparece en la sección EMBUTIDOS).
const BASE_CUTS = {
  vacuna: [
    {
      name: "1/2 Res",
      desc: "Fresca y lista para despostar",
      img: "/mediaRes.png",
    },
    {
      name: "Lomo",
      desc: "El corte más tierno y premium",
      img: "/lomoVaca.jpg",
    },
    {
      name: "Bife Ancho",
      desc: "Jugoso y marmolado, estrella del asado",
      img: "/bifeAncho.jpeg",
    },
    {
      name: "Bife Angosto",
      desc: "Tierno y magro, ideal a la parrilla",
      img: "/bifeAngosto.jpeg",
    },
    {
      name: "Bife de Chorizo",
      desc: "Clásico jugoso con su tapa de grasa",
      img: "/bifeDeChorizo.jpg",
    },
    {
      name: "Entraña",
      desc: "Sabor intenso, imperdible en la parrilla",
      img: "/entrana.png",
    },
    {
      name: "Asado",
      desc: "El clásico argentino infaltable",
      img: "/asado.jpg",
    },
    {
      name: "Tapa de Asado",
      desc: "Sabrosa y tradicional a la parrilla",
      img: "/tapaDeAsado.jpg",
    },
    {
      name: "Vacío",
      desc: "Jugoso y sabroso a la parrilla",
      img: "/vacio.jpg",
    },
    {
      name: "Matambre",
      desc: "Fino y versátil, relleno o a la parrilla",
      img: "/matambre.webp",
    },
    {
      name: "Picaña",
      desc: "Jugosa y popular en todo asado",
      img: "/picana.jpg",
    },
    {
      name: "Cuadril",
      desc: "Tierno y versátil, horno o parrilla",
      img: "/cuadril.jpg",
    },
    {
      name: "Colita de Cuadril",
      desc: "Magra, tierna y fácil de cocinar",
      img: "/colitaDeCuadril.jpg",
    },
    {
      name: "Roast Beef",
      desc: "Ideal para horno y cocción lenta",
      img: "/roastBeef.jpg",
    },
    {
      name: "Nalga",
      desc: "Versátil y tierna, ideal al horno",
      img: "/nalga.jpg",
    },
    {
      name: "Tapa de Nalga",
      desc: "Magra y versátil en la cocina",
      img: "/tapaDeNalga.jpg",
    },
    {
      name: "Bola de Lomo",
      desc: "La favorita para milanesas",
      img: "/bolaDeLomo.jpeg",
    },
    {
      name: "Peceto",
      desc: "Magro y tierno, perfecto al horno",
      img: "/peceto.jpeg",
    },
    {
      name: "Paleta",
      desc: "Sabrosa, ideal para guisos y estofados",
      img: "/paleta.webp",
    },
    {
      name: "Hamburguesas de Carne",
      desc: "Caseras, jugosas y listas para cocinar",
      img: "/hamburguesasDeVaca.jpg",
      tags: ["preparados"],
    },
    {
      name: "Palomita",
      desc: "Tierna y económica para guisos",
      img: "/palomita.jpg",
    },
    {
      name: "Bife Americano",
      desc: "Corte grueso y sabroso a la plancha",
      img: "/bifeAmericano.jpg",
    },
    {
      name: "Cuadrada",
      desc: "Magra y firme, buena para milanesas",
      img: "/cuadrada.jpeg",
    },
    {
      name: "Tortuguita",
      desc: "Tierna, ideal para milanesas y horno",
      img: "/tortuguita.jpg",
    },
    {
      name: "Cima",
      desc: "Económica y sabrosa para rellenos",
      img: "/cima.png",
    },
    {
      name: "Osobuco",
      desc: "Con hueso, ideal para caldos y guisos",
      img: "/osobuco.jpg",
    },
    {
      name: "Falda",
      desc: "Económica y sabrosa en cocción lenta",
      img: "/falda.png",
    },
    {
      name: "Espinazo",
      desc: "Con hueso, perfecto para pucheros",
      img: "/espinazo.webp",
    },
    {
      name: "Carne Picada Especial",
      desc: "Perfecta para empanadas y salsas",
      img: "/carnePicada.jpg",
      tags: ["preparados"],
    },
  ],
  cerdo: [
    {
      name: "1/2 Res de Cerdo",
      desc: "Media res fresca, lista para despostar",
      img: "/mediaResCerdo.jpg",
    },
    {
      name: "Lechón",
      desc: "Tierno y festivo, ideal para eventos",
      img: "/lechon.jpg",
    },
    {
      name: "Carre de Cerdo",
      desc: "Corte premium, jugoso y tierno",
      img: "/carre.webp",
    },
    {
      name: "Bondiola",
      desc: "Jugosa y llena de sabor",
      img: "/bondiola.jpg",
    },
    {
      name: "Bondiola en Caja",
      desc: "Bondiola al por mayor, calidad garantizada",
      img: "/bondiolaEnCaja.png",
    },
    {
      name: "Pernil (Jamón)",
      desc: "Ideal para reuniones y eventos",
      img: "/pernil.jpg",
    },
    {
      name: "Paleta",
      desc: "Versátil, ideal al horno o estofado",
      img: "/paletaDeCerdo.jpg",
    },
    {
      name: "Bife de Cerdo",
      desc: "Tierno y perfecto a la plancha",
      img: "/bifeDeCerdo.jpg",
    },
    {
      name: "Churrasquito",
      desc: "Pequeño, tierno y rápido a la parrilla",
      img: "/churrasquitos.png",
    },
    {
      name: "Hamburguesas de Cerdo",
      desc: "Caseras, jugosas y listas para cocinar",
      img: "/hamburguesasDeCerdo.jpg",
      tags: ["preparados"],
    },
    {
      name: "Pechito de Cerdo",
      desc: "Ideal para parrilla lenta y ahumados",
      img: "/pechitoDeCerdo.jpg",
    },
    {
      name: "Anqueta de Cerdo",
      desc: "Sabrosa, ideal para horno o parrilla",
      img: "/anquetaDeCerdo.png",
    },
    {
      name: "Chorizos",
      desc: "Infaltables en cualquier asado",
      img: "/chorizos.jpg",
      tags: ["embutidos"],
    },
    {
      name: "Chorizo Bombón",
      desc: "El bocado parrillero perfecto",
      img: "/chorizoBombon.webp",
      tags: ["embutidos"],
    },
    {
      name: "Salchichas Parrilleras",
      desc: "Frescas y listas para la parrilla",
      img: "/salchichaParrillera.jpg",
      tags: ["embutidos"],
    },
    {
      name: "Morcilla",
      desc: "Clásica y sabrosa en el asado",
      img: "/morcilla.jpg",
      tags: ["embutidos"],
    },
    {
      name: "Morcilla Vasca",
      desc: "Con verduras, suave y tradicional",
      img: "/morcillaVasca.jpg",
      tags: ["embutidos"],
    },
    {
      name: "Picada de Cerdo",
      desc: "Ideal para empanadas y rellenos",
      img: "/picadaDeCerdo.jpg",
      tags: ["preparados"],
    },
    {
      name: "Recorte",
      desc: "Económico, ideal para guisos y rellenos",
      img: "/recorteDeCerdo.png",
    },
    {
      name: "Patita de Cerdo",
      desc: "Ideal para caldos y gelatinas",
      img: "/patitaDeCerdo.jpg",
    },
    {
      name: "Huesito de Cerdo",
      desc: "Perfecto para caldos y guisos",
      img: "/huesitoDeCerdo.webp",
    },
    {
      name: "Cuero de Cerdo",
      desc: "Para chicharrón o dar sabor a guisos",
      img: "/cueroDeCerdo.jpg",
    },
    {
      name: "Grasa de Cerdo",
      desc: "Para frituras y preparaciones caseras",
      img: "/grasaDeCerdo.png",
    },
    {
      name: "Cabeza de Cerdo",
      desc: "Para queso de cerdo y preparados",
      img: "/cabezaDeCerdo.png",
    },
  ],
  pollo: [
    {
      name: "Cajón de Pollo",
      desc: "Pollos enteros frescos por mayor",
      img: "/cajonDePollo.png",
    },
    {
      name: "Pollo Entero",
      desc: "Fresco, natural y de calidad",
      img: "/polloEntero.jpg",
    },
    {
      name: "Supremas",
      desc: "Sin piel, tiernas y magras",
      img: "/supremas.jpg",
    },
    {
      name: "Caja de Supremas",
      desc: "Supremas al por mayor, sin piel",
      img: "/cajaSuprema.png",
    },
    {
      name: "Milanesas de Pollo",
      desc: "Listas para cocinar, rebozadas al momento",
      img: "/milanesasPollo.jpg",
      tags: ["preparados"],
    },
    {
      name: "Hamburguesas de Pollo",
      desc: "Caseras, jugosas y listas para cocinar",
      img: "/hamburguesasPollo.jpg",
      tags: ["preparados"],
    },
    {
      name: "Pata y Muslo",
      desc: "Rendidoras y jugosas, ideales al horno",
      img: "/pataYMuslo.jpg",
    },
    {
      name: "Caja de Pata y Muslo",
      desc: "Pata y muslo al por mayor",
      img: "/cajaPataYMuslo.png",
    },
    {
      name: "Alitas",
      desc: "Crocantes y sabrosas a la parrilla",
      img: "/alitasPollo.jpg",
    },
    {
      name: "Menudo de Pollo",
      desc: "Hígado, corazón y molleja frescos",
      img: "/menudoPollo.jpg",
    },
    {
      name: "Carcasa de Pollo",
      desc: "Ideal para caldos y sopas caseras",
      img: "/carcasaPollo.jpeg",
    },
  ],
  cordero:[
    {
      name: "Cordero",
      desc: "Producto fresco y exclusivo",
      img: "/cordero.jpg",
    }
  ],
};

// Genera dinámicamente las secciones cruzadas por tag.
// Para agregar un item a "embutidos" o "preparados", solo
// agregale tags: ["embutidos"] o tags: ["preparados"] en BASE_CUTS.
function getTaggedItems(tag) {
  return Object.values(BASE_CUTS)
    .flat()
    .filter((item) => item.tags?.includes(tag));
}

const cuts = {
  ...BASE_CUTS,
  embutidos: getTaggedItems("embutidos"),
  preparados: getTaggedItems("preparados"),
};

// ─────────────────────────────────────────────────────────────────────────────

const CARD_W = 160;
const CARD_GAP = 16;
const SCROLL_STEP = (CARD_W + CARD_GAP) * 2;

const WHATSAPP_CONTACTS = [
  {
    label: "Sucursal Luis Guillón",
    sub: "Av. Luciano Valette 1696",
    buildHref: (cut) =>
      `https://wa.me/541128353615?text=Hola!%20Me%20comunico%20desde%20la%20página%20web%20y%20quería%20consultar%20por%20*${encodeURIComponent(cut)}*%20en%20la%20sucursal%20Luis%20Guill%C3%B3n.`,
  },
  {
    label: "Sucursal Moreno",
    sub: "Av. Del Libertador 4200 — Mercado Modelo",
    buildHref: (cut) =>
      `https://wa.me/541128353615?text=Hola!%20Me%20comunico%20desde%20la%20página%20web%20y%20quería%20consultar%20por%20*${encodeURIComponent(cut)}*%20en%20la%20sucursal%20Moreno.`,
  },
  {
    label: "Atención personalizada",
    sub: "Mayoristas, comerciantes y pedidos especiales",
    buildHref: (cut) =>
      `https://wa.me/541128353615?text=Hola!%20Me%20comunico%20desde%20la%20página%20web%20y%20quería%20consultar%20por%20*${encodeURIComponent(cut)}*%20y%20me%20interesa%20la%20atenci%C3%B3n%20personalizada.`,
  },
];

// ─── HOOK: lock body scroll when a modal is open ─────────────────────────────
function useScrollLock(active) {
  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);
}

// ─── CUT CARD ─────────────────────────────────────────────────────────────────
function CutCard({ item, onSelect }) {
  return (
    <button
      onClick={() => onSelect(item.name)}
      className="flex-shrink-0 w-fit group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 shadow-sm rounded-lg overflow-hidden"
    >
      {/* Image */}
      <div className="h-[160px] w-full overflow-hidden aspect-square bg-white border border-gray-100 group-hover:shadow-md transition-shadow duration-300">
        <img
          src={item.img}
          alt={item.name}
          className="object-scale-down aspect-square max-w-[160px] mx-auto p-5 group-hover:scale-106 transition-transform duration-300"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1558030006-450675393462?w=300&q=80";
          }}
        />
      </div>
      {/* Label */}
      <div className="bg-[#1a2340] px-3 py-2 group-hover:bg-[#243060] transition-colors duration-200 flex flex-col w-full">
        <p className="text-white font-bold text-sm text-center leading-tight">
          {item.name}
        </p>
        <p className="text-neutral-300 text-xs text-center mt-0.5 leading-tight">
          {item.desc}
        </p>
      </div>
    </button>
  );
}

// ─── MEAT SECTION ─────────────────────────────────────────────────────────────
function MeatSection({ icon, title, subtitle, items, onSelectCut }) {
  const scrollRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [maxScroll, setMaxScroll] = useState(1);

  const onScroll = () => setScrollLeft(scrollRef.current?.scrollLeft ?? 0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const recalc = () => setMaxScroll(el.scrollWidth - el.clientWidth);
    recalc();
    const ro = new ResizeObserver(recalc);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scrollTo = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir * SCROLL_STEP,
      behavior: "smooth",
    });
  };

  const atStart = scrollLeft <= 8;
  const atEnd = scrollLeft >= maxScroll - 8;

  if (!items || items.length === 0) return null;

  return (
    <div className="w-full mb-6">
      {/* Section header card */}
      <div className="px-5 py-4 flex flex-row items-center gap-3 mb-4">
        <div className="text-[#C0392B] flex-shrink-0 flex">{icon}</div>
        <div className="sborder-l border-gray-200 pl-5">
          <h3 className="font-black text-[#1a2340] text-lg leading-tight">
            {title}
          </h3>
          <p className="text-gray-500 text-sm text-left mt-0.5 leading-snug">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative flex">
        {!atStart && (
          <button
            onClick={() => scrollTo(-1)}
            aria-label="Anterior"
            className="absolute left-1 top-1/2 -translate-y-1/2 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-[#1a2340] hover:bg-gray-50 active:scale-95 transition z-10"
          >
            <ChevronLeft size={18} />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="flex gap-4 overflow-x-auto px-4 sm:px-6 py-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {(items ?? []).map((item, i) => (
            <CutCard key={i} item={item} onSelect={onSelectCut} />
          ))}
        </div>

        {!atEnd && (
          <button
            onClick={() => scrollTo(1)}
            aria-label="Siguiente"
            className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-[#1a2340] hover:bg-gray-50 active:scale-95 transition z-10"
          >
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

// ─── CUT QUERY MODAL ──────────────────────────────────────────────────────────
function CutModal({ cutName, onClose }) {
  useScrollLock(!!cutName);

  if (!cutName) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-sm mx-0 sm:mx-4 p-6 shadow-2xl"
        style={{ animation: "slideUp .22s cubic-bezier(.22,1,.36,1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`@keyframes slideUp{from{transform:translateY(60px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>

        {/* Drag handle — mobile */}
        <div className="sm:hidden w-10 h-1 rounded-full bg-gray-200 mx-auto mb-4" />

        <div className="flex items-start justify-between mb-1">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#C0392B] mb-0.5">
              CONSULTA DE CORTE
            </p>
            <h3 className="font-black text-[#1a2340] text-lg leading-tight">
              {cutName}
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              ¿Con qué sucursal querés hacer la consulta?
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition-colors flex-shrink-0 ml-2"
          >
            <FaTimes size={14} />
          </button>
        </div>

        <div className="flex flex-col gap-3 mt-5">
          {WHATSAPP_CONTACTS.map((contact, i) => (
            <a
              key={i}
              href={contact.buildHref(cutName)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-[#25D366] hover:bg-green-50 active:scale-[.98] transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366]/20 transition-colors">
                <FaWhatsapp size={20} className="text-[#25D366]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#1a2340] text-sm leading-tight">
                  {contact.label}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 leading-tight">
                  {contact.sub}
                </p>
              </div>
              <FaChevronRight
                size={12}
                className="text-gray-300 group-hover:text-[#25D366] transition-colors flex-shrink-0"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT MODAL ────────────────────────────────────────────────────────────
function ContactModal({ onClose }) {
  useScrollLock(true);

  const contacts = [
    {
      label: "Sucursal Luis Guillón",
      sub: "Atención comercial",
      href: "https://wa.me/541128353615?text=Hola!%20Me%20comunico%20desde%20la%20página%20web%20por%20la%20sucursal%20Luis%20Guill%C3%B3n.",
    },
    {
      label: "Sucursal Moreno",
      sub: "Atención comercial",
      href: "https://wa.me/541128353615?text=Hola!%20Me%20comunico%20desde%20la%20página%20web%20por%20la%20sucursal%20Moreno.",
    },
    {
      label: "Atención personalizada",
      sub: "Asesoría y ventas para comerciantes y mayoristas",
      href: "https://wa.me/541128353615?text=Hola!%20Me%20comunico%20desde%20la%20página%20web,%20me%20interesa%20la%20venta%20mayorista.",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-sm mx-0 sm:mx-4 p-6 shadow-2xl"
        style={{ animation: "slideUp .22s cubic-bezier(.22,1,.36,1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sm:hidden w-10 h-1 rounded-full bg-gray-200 mx-auto mb-4" />

        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#C0392B] mb-0.5">
              WHATSAPP
            </p>
            <h3 className="font-black text-[#1a2340] text-lg leading-tight">
              ¿Con quién querés hablar?
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
          >
            <FaTimes size={14} />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {contacts.map((op, i) => (
            <a
              key={i}
              href={op.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-[#25D366] hover:bg-green-50 active:scale-[.98] transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366]/20 transition-colors">
                <FaWhatsapp size={20} className="text-[#25D366]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#1a2340] text-sm leading-tight">
                  {op.label}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{op.sub}</p>
              </div>
              <FaChevronRight
                size={12}
                className="ml-auto text-gray-300 group-hover:text-[#25D366] transition-colors"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── TROCEO SECTION ───────────────────────────────────────────────────────────
const TROCEOS = [
  {
    name: "Completo",
    desc: "La media res entera sin dividir, ideal para grandes volúmenes.",
  },
  {
    name: "Pistola",
    desc: "Cuarto trasero completo: pierna y lomo. El más solicitado por carnicerías.",
  },
  {
    name: "Barra de Bife",
    desc: "Lomo y bifes juntos, sin costillas. Ideal para cortes premium.",
  },
  {
    name: "Mocho",
    desc: "Parte trasera sin el cuarto delantero. Buena proporción de cortes nobles.",
  },
  {
    name: "Parrillero",
    desc: "Selección orientada al asado: asado, vacío y cortes de parrilla.",
  },
  {
    name: "Pecho",
    desc: "Parte delantera con hueso. Económica, ideal para pucheros y caldos.",
  },
];

function TroceoSection() {
  return (
    <section className="w-full py-10 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-row items-center gap-3 mb-6">
          <div className="text-[#C0392B]">
            <GiCow size={48} />
          </div>
          <div>
            <h3 className="font-black text-[#1a2340] text-lg leading-tight">
              TROCEO DE 1/2 RES
            </h3>
            <p className="text-gray-500 text-sm mt-0.5">
              Trozamos la media res según tu necesidad. <br /> Elegí el tipo de corte.
            </p>
          </div>
        </div>

        <div className="flex flex-col divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden">
          {TROCEOS.map((t, i) => (
            <div key={i} className="flex items-start gap-4 px-5 py-4 bg-white hover:bg-gray-50 transition-colors">
              <div className="w-2 h-2 rounded-full bg-[#C0392B] mt-2 flex-shrink-0" />
              <div>
                <p className="font-bold text-[#1a2340]">{t.name}</p>
                <p className="text-gray-500 text-sm mt-0.5 leading-snug">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-gray-400 mt-4 text-center">
          Consultá disponibilidad y precios por WhatsApp.
        </p>
      </div>
    </section>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedCut, setSelectedCut] = useState(null);

  const anyModalOpen = contactOpen || !!selectedCut;

  const sections = {
    vacuna: {
      icon: <GiCow size={60} />,
      title: "CARNE VACUNA",
      subtitle: "Los mejores cortes para asado, milanesas y cocina diaria.",
    },
    cerdo: {
      icon: <GiPig size={60} />,
      title: "CARNE DE CERDO",
      subtitle:
        "Cortes frescos y de excelente calidad, con criadero propio y cerdos de genética.",
    },
    pollo: {
      icon: <GiChicken size={60} />,
      title: "POLLO FRESCO",
      subtitle: "Tiernos, saludables y perfectos para todas tus comidas.",
    },
    embutidos: {
      icon: <GiSlicedSausage size={60} />,
      title: "EMBUTIDOS",
      subtitle: "Chorizos, morcillas y salchichas artesanales para tu asado.",
    },
    preparados: {
      icon: <MdOutlineFoodBank size={60} />,
      title: "PREPARADOS",
      subtitle: "Listos para cocinar: milanesas, hamburguesas y más.",
    },
    cordero: {
      icon: <GiSheep size={60} />,
      title: "CARNE DE CORDERO",
      subtitle: "Cortes especiales y de excelente calidad.",
    },
  };

  const navLinks = [
    { label: "Nuestras Carnes", href: "#nuestras-carnes" },
    { label: "Sucursales", href: "#nuestras-sucursales" },
    { label: "Venta Mayorista", href: "#venta-mayorista" },
  ];

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>Abastecedora Valette | Producción y venta de carnes.</title>
        <meta
          name="description"
          content="No pagues de más. Somos productores con criadero propio, la mejor hacienda y te vendemos directo, sin intermediarios. Todo lo que necesita tu comercio o tu hogar. Ahorrá sin sacrificar calidad"
        />
        <meta
          name="keywords"
          content="carnicería Luis Guillón, carniceria luis guillon, carne al por mayor GBA Sur, abastecedora Valette, cortes de carne Moreno, carnicerias, venta mayorista carne Buenos Aires, envios, carne de cerdo, carne de pollo, carne de vaca, carne para asado, carne para restaurantes"
        />
        <link
          rel="canonical"
          href="https://abastecedoravalette.com.ar/"
        />
        <meta
          property="og:title"
          content="Abastecedora Valette — Venta de carnes directo del productor"
        />
        <meta
          property="og:description"
          content="Productores de carne vacuna, cerdo y pollo con criadero propio. Venta mayorista y minorista para comercios y familias."
        />
        <meta property="og:type" content="business.business" />
        <meta
          property="og:url"
          content="https://abastecedoravalette.com.ar/"
        />
        <meta
          property="og:image"
          content="https://abastecedoravalette.com.ar/miniatura.jpg"
        />{" "}
        <script type="application/ld+json">{`
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "FoodEstablishment",
          "name": "Abastecedora Valette",
          "description": "Somos productores y comerciantes con atención mayorista y minorista de carne vacuna, de cerdo y pollo.",
          "url": "https://abastecedoravalette.com.ar/",
          "telephone": ["11-2835-3615", "11-2336-8224"],
          "email": "info@abastecedoravalette.com.ar",
          "openingHours": "Mo-Sa 07:00-15:00",
          "servesCuisine": "Carnicería",
          "priceRange": "$$",
          "location": 
          [
            {
              "@type": "LocalBusiness",
              "name": "Abastecedora Valette - Luis Guillón",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Av. Luciano Valette 1696",
                "addressLocality": "Luis Guillón",
                "addressRegion": "Provincia de Buenos Aires",
                "addressCountry": "AR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -34.792588,
                "longitude": -58.456931
              }
            },
            {
              "@type": "LocalBusiness",
              "name": "Abastecedora Valette - Moreno",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Av. Del Libertador 3910",
                "addressLocality": "Moreno",
                "addressRegion": "Provincia de Buenos Aires",
                "addressCountry": "AR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -34.612165,
                "longitude": -58.770520
              }
            },
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Cortes de carne",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Carne de Vaca" } },
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Carne de Cerdo" } },
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Carne de Pollo" } },
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Embutidos" } },
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Media Res" } }
            ]
          }
        }
      ]
    }
  `}</script>
      </Helmet>

      {/* ── MODALS ── */}
      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
      {selectedCut && (
        <CutModal cutName={selectedCut} onClose={() => setSelectedCut(null)} />
      )}
      {/* Overlay to close mobile menu */}
      {menuOpen && !anyModalOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div className="min-h-screen flex flex-col font-sans text-[#1a2340] bg-white">
        {/* ── NAVBAR ── */}
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm h-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
            {/* Logo */}
            <img
              src="/logoRound.svg"
              className="h-18 w-fit cursor-pointer flex-shrink-0"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              alt="Abastecedora Valette"
            />

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-[#1a2340] hover:text-[#C0392B] px-3 py-2 rounded-lg hover:bg-red-50 transition-colors whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <button
                onClick={() => setContactOpen(true)}
                className="flex items-center gap-2 bg-[#C0392B] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#a93226] active:scale-[.97] transition-all shadow-sm"
              >
                <FaWhatsapp className="size-4" />
                <span>Contactanos</span>
              </button>

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="md:hidden size-[25px] flex items-center justify-center text-[#1a2340] hover:bg-gray-100 rounded-xl transition-colors"
                aria-label="Menú"
              >
                {menuOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
              </button>
            </div>
          </div>

          {/* Mobile dropdown menu */}
          {menuOpen && (
            <div
              className="md:hidden absolute right-4 top-[68px] w-64 bg-white rounded-2xl border border-gray-100 shadow-xl p-2 z-50"
              style={{ animation: "slideUp .18s cubic-bezier(.22,1,.36,1)" }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-[#1a2340] hover:bg-gray-50 hover:text-[#C0392B] transition-colors"
                >
                  {link.label}
                  <FaChevronRight size={10} className="text-gray-300" />
                </a>
              ))}
            </div>
          )}
        </nav>

        {/* ── PAGE BODY ── */}
        <main className="flex-1 flex flex-col">
          {/* ── HERO ── */}
          <section className="relative overflow-hidden bg-[#1a2340] min-h-[400px] sm:min-h-[460px]">
            <div className="absolute inset-0">
              <img
                src="/hero.webp"
                alt="Carnes Valette"
                className="w-full h-full object-cover opacity-45"
                style={{ objectPosition: "center right" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a2340]/90 via-[#1a2340]/60 to-transparent" />
            </div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 flex flex-col md:flex-row md:items-center md:gap-16">
              {/* Left: headline + CTA */}
              <div className="flex-1 mb-10 md:mb-0">
                <h1 className="text-white font-black text-4xl sm:text-5xl leading-none uppercase mb-4 text-center">
                  ABASTECEDORA
                  <br />
                  VALETTE
                </h1>

                <p className="text-white/90 text-sm font-bold uppercase tracking-widest mb-3 text-center">
                  experiencia de compra directa, sin intermediarios.
                </p>

                <p className="text-gray-300 leading-relaxed max-w-sm my-8 sm:text-lg">
                  <b>No pagues de más.</b> Somos productores con criadero
                  propio, la mejor hacienda y te vendemos directo, sin
                  intermediarios. Todo lo que necesita tu comercio o tu hogar.{" "}
                  <br />{" "}
                  <b>
                    <u>Ahorrá sin sacrificar calidad</u>
                  </b>
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="#nuestras-carnes"
                    className="inline-flex items-center justify-center gap-2 bg-[#C0392B] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#a93226] active:scale-[.97] transition-all text-sm shadow-md"
                  >
                    Ver nuestros cortes <ChevronRight size={16} />
                  </a>
                  <button
                    onClick={() => setContactOpen(true)}
                    className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 active:scale-[.97] transition-all text-sm backdrop-blur-sm"
                  >
                    <FaWhatsapp size={16} /> Contactanos
                  </button>
                </div>

                <a
                  href="https://wa.me/541128353615?text=Hola!%20Me%20comunico%20desde%20la%20web,%20me%20interesa%20la%20venta%20mayorista."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex my-10 sm:my-2 w-fit px-4 mx-auto sm:ms-0 items-center uppercase gap-2 bg-main border border-white/40 text-white font-black text-sm py-3.5 rounded-xl hover:bg-main/90 active:scale-[.97] transition-all whitespace-nowrap shadow-md"
                >
                  <FaWhatsapp size={16} /> Atención personalizada para mayoristas
                </a>
              </div>

              {/* Right: value props */}
              <div className="flex flex-col gap-3 w-full md:w-[340px] flex-shrink-0">
                {[
                  {
                    icon: <PiCowFill className="size-8 shrink-0" />,
                    title: "Calidad garantizada",
                    desc: "Al ser productores, nos enfocamos en la selección y el control en cada proceso.",
                  },
                  {
                    icon: <PiTruckFill className="size-8 shrink-0" />,
                    title: "Carnes frescas, siempre.",
                    desc: "Reposición diaria en todas las sucursales, directo desde nuestros criaderos.",
                  },
                  {
                    icon: <PiHandshakeFill className="size-8 shrink-0" />,
                    title: "Ventas minoristas y mayoristas",
                    desc: "Familias, emprendedores, comercios y empresas confían en nuestra calidad.",
                  },
                ].map((p, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3"
                  >
                    <div className="text-white mt-0.5 p-2 rounded-xl bg-[#1a2340]/60 border border-white/10 flex-shrink-0">
                      {p.icon}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm leading-tight">
                        {p.title}
                      </p>
                      <p className="text-gray-400 text-xs leading-snug mt-0.5">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wave divider */}
            <div className="absolute bottom-0 left-0 right-0 -mt-[1px]">
              <svg viewBox="0 0 1440 60" fill="none" className="w-full block">
                <path
                  d="M0 60 Q360 0 720 30 Q1080 60 1440 20 L1440 60 Z"
                  fill="white"
                />
              </svg>
            </div>
          </section>

          {/* ── CORTES ── */}
          <div id="nuestras-carnes" className="h-1 mb-20 -mt-20" />

          <section className="w-full py-10">
            {/* Section header */}
            <div className="text-center mb-10 px-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-50 mb-4">
                <LuBeef className="size-7 text-[#C0392B] stroke-[1.5]" />
              </div>
              <p className="text-[#C0392B] text-xs font-bold uppercase tracking-widest mb-2">
                NUESTROS CORTES
              </p>
              <h2 className="text-[#1a2340] font-black text-3xl sm:text-4xl mb-3">
                Elegí lo que necesitás
              </h2>
              <div className="border-l-4 border-green-700 flex items-center gap-4 w-full rounded-r-md bg-green-100 mt-15 p-4">
                <FaWhatsapp className="size-11 shrink-0 p-1.5 rounded-full text-green-500 bg-white" />
                <p className="text-gray-700 font-semibold text-sm text-start sm:mx-auto">
                  Tocá cualquier corte para consultar por disponibilidad y
                  precio directamente a nuestro WhatsApp.
                </p>
              </div>
            </div>

            {/* Meat categories */}
            <div className="flex flex-col gap-2">
              {Object.entries(sections).map(([key, sec]) => (
                <div
                  key={key}
                  className="bg-gray-50 border-y border-gray-100 py-6"
                >
                  <MeatSection
                    icon={sec.icon}
                    title={sec.title}
                    subtitle={sec.subtitle}
                    items={cuts[key]}
                    onSelectCut={setSelectedCut}
                  />
                </div>
              ))}
            </div>

            {/* ── TROCEO ── */}
            <div className="w-full -mt-[0.5px]">
              <svg viewBox="0 0 1440 60" fill="none" className="w-full block">
                <path
                  d="M0 0 Q360 60 720 30 Q1080 0 1440 40 L1440 0 Z"
                  fill="#f9fafb"
                />
              </svg>
            </div>
            <TroceoSection />
          </section>

          {/* ── SUCURSALES ── */}
          <div id="nuestras-sucursales" className="h-1 mb-20 -mt-20" />

          <div className="w-full">
            <svg viewBox="0 0 1440 60" fill="none" className="w-full block">
              <path
                d="M0 60 Q360 0 720 30 Q1080 60 1440 20 L1440 60 Z"
                fill="#1a2340"
              />
            </svg>
          </div>

          <section className="bg-[#1a2340] pt-10 pb-16 px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-white font-black text-3xl sm:text-4xl mb-3">
                  Nuestras Sucursales
                </h2>
                <p className="text-neutral-400 max-w-xl mx-auto text-sm">
                  Visitanos y viví una experiencia de compra directa, con la
                  mejor atención y los cortes más frescos de la zona.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    name: "Luis Guillón",
                    address: "Av. Luciano Valette 1696",
                    detail: "A 4 cuadras de Camino de Cintura",
                    mapSrc:
                      "https://www.google.com/maps?q=Abastecedora+Valette+Av.+Luciano+Valette+1696,+Luis+Guillón,+Buenos+Aires&output=embed",
                    waHref:
                      "https://wa.me/541128353615?text=Hola!%20Me%20comunico%20desde%20la%20web%20por%20la%20sucursal%20Luis%20Guill%C3%B3n",
                    horarios: "Lunes a Sabado de 7 a 15hs",
                  },
                  {
                    name: "Moreno",
                    address: "Av. Del Libertador 3910",
                    detail: "Mercado Modelo Moreno",
                    mapSrc:
                      "https://www.google.com/maps?q=abastecedora+valette+Av.+Del+Libertador+3910,+Moreno,+Buenos+Aires&output=embed",
                    waHref:
                      "https://wa.me/541128353615?text=Hola!%20Me%20comunico%20desde%20la%20web%20por%20la%20sucursal%20Moreno",
                    horarios: "Lunes a Sabado de 06 a 15hs",
                  },
                ].map((branch) => (
                  <div
                    key={branch.name}
                    className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="h-44 relative">
                      <iframe
                        src={branch.mapSrc}
                        className="w-full h-full border-0 saturate-75 contrast-110"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Mapa sucursal ${branch.name}`}
                      />
                    </div>

                    <div className="px-5 pt-3 pb-5">
                      <p className="flex items-center text-xs text-neutral-500 gap-1 mb-3">
                        Click en el mapa para abrir Google Maps{" "}
                        <IoOpenOutline className="size-3.5" />
                      </p>
                      <h3 className="text-xl font-bold text-[#1a2340] mb-2">
                        {branch.name}
                      </h3>
                      <p className="text-gray-600 flex items-start gap-2.5 mb-1 text-sm">
                        <MapPin
                          className="mt-0.5 flex-shrink-0 text-[#C0392B]"
                          size={16}
                        />
                        <span>
                          <strong>{branch.address}</strong>
                          <br />
                          {branch.detail}
                        </span>
                      </p>
                      <div className="mt-5">
                        <a
                          href={branch.waHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 bg-gray-50 border-2 border-gray-100 hover:border-[#25D366] hover:bg-green-50 text-gray-700 hover:text-[#128C7E] font-bold py-3 px-4 rounded-xl transition-all text-sm active:scale-[.98]"
                        >
                          <FaWhatsapp className="size-5 text-[#25D366]" />
                          Contactar con Sucursal {branch.name}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── WHOLESALE ── */}
          <div id="venta-mayorista" className="h-1 mb-20 -mt-20" />
          <section className="bg-[#8B0000] py-10 sm:py-14 px-4 -mt-1">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center flex-shrink-0">
                  <FaHandshake size={30} className="text-white" />
                </div>
                <div className="text-white">
                  <p className="text-xs font-bold uppercase tracking-widest text-red-300 mb-1">
                    VENTA MAYORISTA
                  </p>
                  <h3 className="font-black text-2xl sm:text-3xl leading-tight mb-1">
                    ¿Tenés un comercio o<br />
                    sos distribuidor?
                  </h3>
                  <p className="text-sm text-red-200 max-w-sm">
                    Accedé a precios especiales por volumen y sumate a nuestra
                    red de clientes mayoristas. Te acompañamos y asesoramos en
                    el proceso.
                  </p>
                </div>
              </div>
              <a
                href="https://wa.me/541128353615?text=Hola!%20Me%20comunico%20desde%20la%20web,%20me%20interesa%20la%20venta%20mayorista."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white text-[#8B0000] font-black text-sm px-6 py-3.5 rounded-xl hover:bg-red-50 active:scale-[.97] transition-all whitespace-nowrap shadow-md"
              >
                ATENCIÓN PERSONALIZADA MAYORISTA <FaWhatsapp size={16} />
              </a>
            </div>
          </section>

          {/* ── FOOTER ── */}
          <footer className="bg-white text-white pt-12 pb-6 px-4 sm:px-20">
            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
              <img
                src="/logoRound.svg"
                className="h-50 sm:h-40 w-fit mx-auto sm:mx-0"
                alt="Abastecedora Valette"
              />
              <div className="flex flex-col items-center gap-3">
                <p className="font-bold text-xs text-gray-400 uppercase tracking-wider">
                  Seguinos en nuestras redes
                </p>
                <div className="flex flex-col gap-2 w-full max-w-xs">
                  <a
                    href="https://www.instagram.com/abastecedora.valette?igsh=a2MwbTM2dTl5dGhj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex bg-main items-center justify-center gap-2 h-9 rounded-xl border border-main/20 hover:bg-main/10 active:scale-[.98] transition-all text-sm px-4"
                  >
                    <FaInstagram size={15} /> @abastecedora.valette
                  </a>
                  <a
                    href="https://www.facebook.com/share/1D5Qyoawao/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex bg-main items-center justify-center gap-2 h-9 rounded-xl border border-main/20 hover:bg-main/10 active:scale-[.98] transition-all text-sm px-4"
                  >
                    <FaFacebookF size={15} /> Abastecedora Valette
                  </a>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-gray-600 mt-10">
              © {new Date().getFullYear()} Abastecedora Valette. Todos los
              derechos reservados.
            </p>
            <p className="text-center text-[10px] text-neutral-300 mt-2">
              - ESTUDIO NUNI -
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}
