import { useState, useRef, useEffect, useCallback } from "react";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaBars,
  FaTimes,
  FaChevronRight,
} from "react-icons/fa";
import { ChevronRight, ChevronLeft, ArrowUpRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { PiCowFill, PiHandshakeFill, PiTruckFill } from "react-icons/pi";
import { GiCow, GiPig, GiChicken, GiSheep, GiSlicedSausage } from "react-icons/gi";
import { MdOutlineFoodBank } from "react-icons/md";

// ─── DATA ────────────────────────────────────────────────────────────────────

const BASE_CUTS = {
  vacuna: [
    { name: "1/2 Res", desc: "Fresca y lista para despostar", img: "/mediaRes.png" },
    { name: "Lomo", desc: "El corte más tierno y premium", img: "/lomoVaca.jpg" },
    { name: "Bife Ancho", desc: "Jugoso y marmolado, estrella del asado", img: "/bifeAncho.jpeg" },
    { name: "Bife Angosto", desc: "Tierno y magro, ideal a la parrilla", img: "/bifeAngosto.jpeg" },
    { name: "Bife de Chorizo", desc: "Clásico jugoso con su tapa de grasa", img: "/bifeDeChorizo.jpg" },
    { name: "Entraña", desc: "Sabor intenso, imperdible en la parrilla", img: "/entrana.png" },
    { name: "Asado", desc: "El clásico argentino infaltable", img: "/asado.jpg" },
    { name: "Tapa de Asado", desc: "Sabrosa y tradicional a la parrilla", img: "/tapaDeAsado.jpg" },
    { name: "Vacío", desc: "Jugoso y sabroso a la parrilla", img: "/vacio.jpg" },
    { name: "Matambre", desc: "Fino y versátil, relleno o a la parrilla", img: "/matambre.webp" },
    { name: "Picaña", desc: "Jugosa y popular en todo asado", img: "/picana.jpg" },
    { name: "Cuadril", desc: "Tierno y versátil, horno o parrilla", img: "/cuadril.jpg" },
    { name: "Colita de Cuadril", desc: "Magra, tierna y fácil de cocinar", img: "/colitaDeCuadril.jpg" },
    { name: "Roast Beef", desc: "Ideal para horno y cocción lenta", img: "/roastBeef.jpg" },
    { name: "Nalga", desc: "Versátil y tierna, ideal al horno", img: "/nalga.jpg" },
    { name: "Tapa de Nalga", desc: "Magra y versátil en la cocina", img: "/tapaDeNalga.jpg" },
    { name: "Bola de Lomo", desc: "La favorita para milanesas", img: "/bolaDeLomo.jpeg" },
    { name: "Peceto", desc: "Magro y tierno, perfecto al horno", img: "/peceto.jpeg" },
    { name: "Paleta", desc: "Sabrosa, ideal para guisos y estofados", img: "/paleta.webp" },
    { name: "Hamburguesas de Carne", desc: "Caseras, jugosas y listas para cocinar", img: "/hamburguesasDeVaca.jpg", tags: ["preparados"] },
    { name: "Palomita", desc: "Tierna y económica para guisos", img: "/palomita.jpg" },
    { name: "Bife Americano", desc: "Corte grueso y sabroso a la plancha", img: "/bifeAmericano.jpg" },
    { name: "Cuadrada", desc: "Magra y firme, buena para milanesas", img: "/cuadrada.jpeg" },
    { name: "Tortuguita", desc: "Tierna, ideal para milanesas y horno", img: "/tortuguita.jpg" },
    { name: "Cima", desc: "Económica y sabrosa para rellenos", img: "/cima.png" },
    { name: "Osobuco", desc: "Con hueso, ideal para caldos y guisos", img: "/osobuco.jpg" },
    { name: "Falda", desc: "Económica y sabrosa en cocción lenta", img: "/falda.png" },
    { name: "Espinazo", desc: "Con hueso, perfecto para pucheros", img: "/espinazo.webp" },
    { name: "Carne Picada Especial", desc: "Perfecta para empanadas y salsas", img: "/carnePicada.jpg", tags: ["preparados"] },
  ],
  cerdo: [
    { name: "1/2 Res de Cerdo", desc: "Media res fresca, lista para despostar", img: "/mediaResCerdo.jpg" },
    { name: "Lechón", desc: "Tierno y festivo, ideal para eventos", img: "/lechon.jpg" },
    { name: "Carré de Cerdo", desc: "Corte premium, jugoso y tierno", img: "/carre.webp" },
    { name: "Bondiola", desc: "Jugosa y llena de sabor", img: "/bondiola.jpg" },
    { name: "Bondiola en Caja", desc: "Bondiola al por mayor, calidad garantizada", img: "/bondiolaEnCaja.png" },
    { name: "Pernil (Jamón)", desc: "Ideal para reuniones y eventos", img: "/pernil.jpg" },
    { name: "Paleta", desc: "Versátil, ideal al horno o estofado", img: "/paletaDeCerdo.jpg" },
    { name: "Bife de Cerdo", desc: "Tierno y perfecto a la plancha", img: "/bifeDeCerdo.jpg" },
    { name: "Churrasquito", desc: "Pequeño, tierno y rápido a la parrilla", img: "/churrasquitos.png" },
    { name: "Hamburguesas de Cerdo", desc: "Caseras, jugosas y listas para cocinar", img: "/hamburguesasDeCerdo.jpg", tags: ["preparados"] },
    { name: "Pechito de Cerdo", desc: "Ideal para parrilla lenta y ahumados", img: "/pechitoDeCerdo.jpg" },
    { name: "Anqueta de Cerdo", desc: "Sabrosa, ideal para horno o parrilla", img: "/anquetaDeCerdo.png" },
    { name: "Chorizos", desc: "Infaltables en cualquier asado", img: "/chorizos.jpg", tags: ["embutidos"] },
    { name: "Chorizo Bombón", desc: "El bocado parrillero perfecto", img: "/chorizoBombon.webp", tags: ["embutidos"] },
    { name: "Salchichas Parrilleras", desc: "Frescas y listas para la parrilla", img: "/salchichaParrillera.jpg", tags: ["embutidos"] },
    { name: "Morcilla", desc: "Clásica y sabrosa en el asado", img: "/morcilla.jpg", tags: ["embutidos"] },
    { name: "Morcilla Vasca", desc: "Con verduras, suave y tradicional", img: "/morcillaVasca.jpg", tags: ["embutidos"] },
    { name: "Picada de Cerdo", desc: "Ideal para empanadas y rellenos", img: "/picadaDeCerdo.jpg", tags: ["preparados"] },
    { name: "Recorte", desc: "Económico, ideal para guisos y rellenos", img: "/recorteDeCerdo.png" },
    { name: "Patita de Cerdo", desc: "Ideal para caldos y gelatinas", img: "/patitaDeCerdo.jpg" },
    { name: "Huesito de Cerdo", desc: "Perfecto para caldos y guisos", img: "/huesitoDeCerdo.webp" },
    { name: "Cuero de Cerdo", desc: "Para chicharrón o dar sabor a guisos", img: "/cueroDeCerdo.jpg" },
    { name: "Grasa de Cerdo", desc: "Para frituras y preparaciones caseras", img: "/grasaDeCerdo.png" },
    { name: "Cabeza de Cerdo", desc: "Para queso de cerdo y preparados", img: "/cabezaDeCerdo.png" },
  ],
  pollo: [
    { name: "Cajón de Pollo", desc: "Pollos enteros frescos por mayor", img: "/cajonDePollo.png" },
    { name: "Pollo Entero", desc: "Fresco, natural y de calidad", img: "/polloEntero.jpg" },
    { name: "Supremas", desc: "Sin piel, tiernas y magras", img: "/supremas.jpg" },
    { name: "Caja de Supremas", desc: "Supremas al por mayor, sin piel", img: "/cajaSuprema.png" },
    { name: "Milanesas de Pollo", desc: "Listas para cocinar, rebozadas al momento", img: "/milanesasPollo.jpg", tags: ["preparados"] },
    { name: "Hamburguesas de Pollo", desc: "Caseras, jugosas y listas para cocinar", img: "/hamburguesasPollo.jpg", tags: ["preparados"] },
    { name: "Pata y Muslo", desc: "Rendidoras y jugosas, ideales al horno", img: "/pataYMuslo.jpg" },
    { name: "Caja de Pata y Muslo", desc: "Pata y muslo al por mayor", img: "/cajaPataYMuslo.png" },
    { name: "Alitas", desc: "Crocantes y sabrosas a la parrilla", img: "/alitasPollo.jpg" },
    { name: "Menudo de Pollo", desc: "Hígado, corazón y molleja frescos", img: "/menudoPollo.jpg" },
    { name: "Carcasa de Pollo", desc: "Ideal para caldos y sopas caseras", img: "/carcasaPollo.jpeg" },
  ],
  cordero:[
    { name: "Cordero", desc: "Producto fresco y exclusivo", img: "/cordero.jpg" }
  ],
};

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
    sub: "Av. Del Libertador 3910 — Mercado Modelo",
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

// ─── HOOK: lock body scroll ──────────────────────────────────────────────────
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
      className="flex-shrink-0 w-fit group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 shadow-sm rounded-lg overflow-hidden select-text cursor-auto"
    >
      <div className="h-[160px] w-full overflow-hidden aspect-square bg-white border border-gray-100 group-hover:shadow-md transition-shadow duration-300">
        <img
          src={item.img}
          alt={item.name}
          className="object-scale-down aspect-square max-w-[160px] mx-auto p-5 group-hover:scale-106 transition-transform duration-300"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1558030006-450675393462?w=300&q=80";
          }}
        />
      </div>
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
      <div className="px-5 py-4 flex flex-row items-center gap-3 mb-4">
        <div className="text-[#C0392B] flex-shrink-0 flex">{icon}</div>
        <div className="border-l border-gray-200 pl-5">
          <h3 className="flex flex-row items-center gap-2 font-black text-[#1a2340] text-lg leading-tight">
            {title} <FaWhatsapp className="size-5" />
          </h3>
          <p className="text-gray-500 text-sm text-left mt-0.5 leading-snug">
            {subtitle}
          </p>
        </div>
      </div>

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
          {items.map((item, i) => (
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
function CutModal({ cutName, onClose, label = "CONSULTA DE CORTE" }) {
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
        <div className="sm:hidden w-10 h-1 rounded-full bg-gray-200 mx-auto mb-4" />
        <div className="flex items-start justify-between mb-1">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#C0392B] mb-0.5">
              {label}
            </p>
            <h3 className="font-black text-[#1a2340] text-lg leading-tight">
              {cutName}
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              ¿A qué sucursal le queres hacer la consulta?
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
      label: "Atención personalizada mayoristas",
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
  { name: "Completo", img: "/troceos/troceoCompleto.png", desc: "La media res entera sin dividir, ideal para grandes volúmenes." },
  { name: "Pistola", img: "/troceos/troceoPistola.png", desc: "Cuarto trasero completo: pierna y lomo. El más solicitado por carnicerías." },
  { name: "Barra de Bife", img: "/troceos/troceoBarraDeBife.png", desc: "Lomo y bifes juntos, sin costillas. Ideal para cortes premium." },
  { name: "Mocho", img: "/troceos/troceoMocho.png", desc: "Parte trasera sin el cuarto delantero. Buena proporción de cortes nobles." },
  { name: "Parrillero", img: "/troceos/troceoParrillero.png", desc: "Selección orientada al asado: asado, vacío y cortes de parrilla." },
  { name: "Pecho", img: "/troceos/troceoPecho.png", desc: "Parte delantera con hueso. Económica, ideal para pucheros y caldos." },
];

function TroceoSection({ onSelectCut }) {
  return (
    <section className="w-full py-10 px-4 bg-white" id="troceos">
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
              Trozamos la media res según tu necesidad. <br /> Elegí el tipo de troceo que buscás.
            </p>
          </div>
        </div>
        <p className="text-neutral-800 font-semibold bg-green-500/20 select-none px-4 py-2 border border-green-700 rounded my-4 text-center text-sm">
          Tocá el tipo de troceo que quieras para consultar por WhatsApp.
          <FaWhatsapp className="inline size-4 ml-1 align-text-bottom" /> 
        </p>

        <div className="flex flex-col divide-y divide-gray-400 border border-gray-400 rounded-2xl overflow-hidden">
          {TROCEOS.map((t, i) => (
            <button
              key={i}
              onClick={() => onSelectCut(`Troceo ${t.name}`)}
              className="flex items-start gap-4 px-5 py-4 bg-white text-left w-full group hover:cursor-pointer select-none"
            >
              <img src={t.img} className="aspect-square size-25 my-auto flex-shrink-0 group-hover:scale-110 transition-transform" />
              <div className="flex-1">
                <p className="font-bold text-[#1a2340]">{t.name}</p>
                <p className="text-gray-500 text-sm mt-0.5 leading-snug">
                  {t.desc}
                </p>
              </div>
              <ArrowUpRight
                className="size-6 self-center text-gray-400 group-hover:text-[#C0392B] mt-1.5 flex-shrink-0 transition-colors"
              />
            </button>
          ))}
        </div>
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

  const closeModals = useCallback(() => {
    setContactOpen(false);
    setSelectedCut(null);
  }, []);

  // ─── BACK BUTTON HANDLER ──────────────────────────────────────────────────
  useEffect(() => {
    if (anyModalOpen) {
      window.history.pushState({ modalOpen: true }, "");
    }

    const handlePopState = (e) => {
      if (anyModalOpen) {
        closeModals();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [anyModalOpen, closeModals]);

  const sections = {
    vacuna: {
      icon: <GiCow size={60} />,
      title: "CARNE VACUNA",
      subtitle: "Los mejores cortes para asado, milanesas y cocina diaria.",
    },
    cerdo: {
      icon: <GiPig size={60} />,
      title: "CARNE DE CERDO",
      subtitle: "Cortes frescos y de excelente calidad, con criadero propio y cerdos de genética.",
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
    { label: "Troceos", href: "#troceos" },
    { label: "Sucursales", href: "#nuestras-sucursales" },
    { label: "Venta Mayorista", href: "#venta-mayorista" },
  ];

  return (
    <div className="cursor-pointer select-none">
      <Helmet>
        <title>Abastecedora Valette | Producción y venta de carnes.</title>
        <meta name="description" content="No pagues de más. Somos productores con criadero propio, la mejor hacienda y te vendemos directo, sin intermediarios." />
        <link rel="canonical" href="https://abastecedoravalette.com.ar/" />
      </Helmet>

      {contactOpen && <ContactModal onClose={closeModals} />}
      {selectedCut && (
        <CutModal 
          cutName={selectedCut} 
          onClose={closeModals} 
          label={selectedCut?.startsWith("Troceo") ? "CONSULTA DE TROCEO" : "CONSULTA DE CORTE"} 
        />
      )}

      {menuOpen && !anyModalOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
      )}

      <div className="min-h-screen flex flex-col font-sans text-[#1a2340] bg-white">
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm h-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
            <img 
              src="/logoRound.svg" 
              className="h-18 w-fit flex-shrink-0" 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
              alt="Abastecedora Valette" 
            />
            <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-sm font-semibold text-[#1a2340] hover:text-[#C0392B] px-3 py-2 rounded-lg hover:bg-red-50 transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <button onClick={() => setContactOpen(true)} className="flex items-center gap-2 bg-[#C0392B] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#a93226] active:scale-[.97] transition-all shadow-sm">
                <FaWhatsapp className="size-4" /> <span>Contactanos</span>
              </button>
              <button onClick={() => setMenuOpen((v) => !v)} className="md:hidden text-[#1a2340]">
                {menuOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
              </button>
            </div>
          </div>
        </nav>

        <main className="flex-1 flex flex-col">
          <section className="relative overflow-hidden bg-[#1a2340] min-h-[400px]">
            <div className="absolute inset-0">
              <img src="/hero.webp" alt="Carnes Valette" className="w-full h-full object-cover opacity-45" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a2340]/90 via-[#1a2340]/60 to-transparent" />
            </div>
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 flex flex-col md:flex-row md:items-center">
              <div className="flex-1">
                <h1 className="text-white font-black text-4xl sm:text-5xl uppercase mb-4 text-center md:text-left"> ABASTECEDORA <br /> VALETTE </h1>
                <p className="text-gray-300 leading-relaxed max-w-sm my-8 sm:text-lg text-center md:text-left">
                  <b>No pagues de más.</b> Somos productores con criadero propio y te vendemos directo.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="#nuestras-carnes" className="inline-flex items-center justify-center gap-2 bg-[#C0392B] text-white font-bold px-6 py-3 rounded-xl text-sm">
                    Ver cortes <ChevronRight size={16} />
                  </a>
                  <button onClick={() => setContactOpen(true)} className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl text-sm backdrop-blur-sm">
                    <FaWhatsapp size={16} /> Contactanos
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section id="nuestras-carnes" className="py-12 bg-white">
            <div className="max-w-6xl mx-auto">
              {Object.entries(sections).map(([key, config]) => (
                <MeatSection 
                  key={key} 
                  {...config} 
                  items={cuts[key]} 
                  onSelectCut={setSelectedCut} 
                />
              ))}
            </div>
          </section>

          <TroceoSection onSelectCut={setSelectedCut} />
        </main>

        <footer className="bg-gray-50 py-10 px-4 border-t border-gray-200">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <img src="/logoRound.svg" className="h-16" alt="Logo" />
            <div className="flex gap-4">
              <a href="https://instagram.com/abastecedora.valette" target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full shadow-sm hover:text-[#C0392B] transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="https://facebook.com/share/1D5Qyoawao/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full shadow-sm hover:text-[#C0392B] transition-colors">
                <FaFacebookF size={20} />
              </a>
            </div>
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Abastecedora Valette.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
