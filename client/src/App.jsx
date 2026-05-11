import { useState, useRef } from "react";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaShieldAlt, FaTruck, FaHandshake, FaHome, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaBars, FaTimes, FaChevronRight } from "react-icons/fa";
import { MdOutlineShoppingCart, MdOutlineSevereCold } from "react-icons/md";
import { GiCow, GiPig, GiChicken } from "react-icons/gi";
import { ChevronRight, ChevronLeft, MapPin } from "lucide-react";
import { LuBeef } from "react-icons/lu";

// ─── DATA ────────────────────────────────────────────────────────────────────

const cuts = {
  vacuna: [
    {
      name: "Bifé Angosto",
      desc: "Ideal para parrilla",
      img: "work14.jpg"
    },
    {
      name: "Asado",
      desc: "Clásico argentino",
      img: "work11.jpg"
    },
    {
      name: "Nalga",
      desc: "Tierna y sabrosa",
      img: "work10.jpg"
    },
    {
      name: "Vacío",
      desc: "Jugoso y sabroso",
      img: "work12.jpg"
    },
    {
      name: "Lomo",
      desc: "Corte premium y tierno",
      img: "work8.jpg"
    },
    {
      name: "Roast Beef",
      desc: "Ideal para horno y guisos",
      img: "work7.jpg"
    },
    {
      name: "Picaña",
      desc: "Muy jugosa y popular",
      img: "work3.jpg"
    },
    {
      name: "Colita de Cuadril",
      desc: "Magra y muy tierna",
      img: "work5.jpg"
    },
    {
      name: "Carne Picada",
      desc: "Perfecta para comidas caseras",
      img: "work13.jpg"
    },
    {
      name: "Bola de Lomo",
      desc: "Ideal para milanesas",
      img: "work14.jpg"
    },
    {
      name: "Tapa de Nalga",
      desc: "Magra y versátil",
      img: "work15.jpg"
    },
    {
      name: "Tapa de Asado",
      desc: "Clásico y tradicional",
      img: "work9.jpg"
    },
  ],

  cerdo: [
    {
      name: "Bondiola",
      desc: "Jugosa y llena de sabor",
      img: "work2.jpg"
    },
    {
      name: "Bife de Cerdo",
      desc: "Tierno y perfecto a la plancha",
      img: "work1.jpg"
    },
    {
      name: "Pechito de Cerdo",
      desc: "Ideal para parrilla lenta",
      img: "work6.jpg"
    },
    {
      name: "Chorizos",
      desc: "Infaltables en cualquier asado",
      img: "work19.jpg"
    },
    {
      name: "Salchichas Parrilleras",
      desc: "Doradas y súper sabrosas",
      img: "work20.jpg"
    },
    {
      name: "Pernil",
      desc: "Ideal para reuniones y eventos",
      img: "work21.jpg"
    },
    {
      name: "Cerdo",
      desc: "Frescura y calidad todos los días",
      img: "work22.jpg"
    },
  ],

  pollo: [
    {
      name: "Pollo Fresco",
      desc: "Fresco y natural",
      img: "work16.jpg"
    },
    {
      name: "Pata y muslo",
      desc: "Rendidor y versátil",
      img: "work17.jpg"
    },
    {
      name: "Supremas",
      desc: "Sin piel",
      img: "work18.jpg"
    },
  ],
};
const features = [
  { icon: <FaHome size={32} />, title: "PRODUCCIÓN PROPIA EN CERDOS", desc: "Controlamos todo el proceso, desde el origen hasta tu mesa." },
  { icon: <FaShieldAlt size={32} />, title: "CALIDAD GARANTIZADA", desc: "Selección y controles en cada etapa para asegurar lo mejor." },
  { icon: <FaTruck size={32} />, title: "ENVÍOS Y SUCURSALES", desc: "Llegamos a nuestros clientes con rapidez y en frío." },
  { icon: <FaHandshake size={32} />, title: "ATENCIÓN PERSONALIZADA", desc: "Te asesoramos, incluyendo a mayoristas y comerciantes." },
];

const CARD_W = 152; // px, must match w-[152px] below
const CARD_GAP = 12;
const SCROLL_STEP = (CARD_W + CARD_GAP) * 2;

// ─── SUBCOMPONENTS ────────────────────────────────────────────────────────────


function CutCard({ item }) {
  return (
    <div className="flex-shrink-0 w-[152px] group cursor-pointer">
      <div className="overflow-hidden rounded-xl bg-white aspect-square mb-2">
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-full object-scale-down group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1558030006-450675393462?w=300&q=80"; }}
        />
      </div>
      <p className="font-bold text-[13px] text-[#1a2340]">{item.name}</p>
      <p className="text-[11px] text-gray-500 mb-2">{item.desc}</p>
    </div>
  );
}

function MeatSection({ icon, title, subtitle, items }) {
  const scrollRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onScroll = () => setScrollLeft(scrollRef.current?.scrollLeft ?? 0);

  const scrollTo = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * SCROLL_STEP, behavior: "smooth" });
  };

  const maxScroll = (items.length * (CARD_W + CARD_GAP)) - CARD_GAP;
  const atEnd = scrollLeft + 10 >= maxScroll - (scrollRef.current?.clientWidth ?? 0);
  const totalDots = Math.ceil(items.length / 2);
  const activeDot = Math.min(Math.round(scrollLeft / SCROLL_STEP), totalDots - 1);

  return (
    <div className="border border-gray-200 rounded-2xl p-4 sm:p-6 mb-6">
      <div className="flex flex-col gap-3 sm:gap-5">

        {/* Left info panel */}
        <div className="w-full flex-shrink-0">
          <div className= "flex gap-2 items-center w-full">
          <div className="text-[#C0392B] mb-2">{icon}</div>
          <h3 className="font-black text-[#1a2340] uppercase">{title}</h3>
          </div>
          <p className="text-normal text-gray-500 mb-4 leading-relaxed">{subtitle}</p>
        </div>

        {/* Carousel */}
        <div className="flex-1 min-w-0 relative flex items-center">

          {/* Prev arrow */}
          {scrollLeft > 8 && (
            <button
              onClick={() => scrollTo(-1)}
              className="absolute -left-3 top-[40%] -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-[#1a2340] hover:bg-gray-50 z-10"
            >
              <ChevronLeft size={16} />
            </button>
          )}

          {/* Scrollable track — native scroll, hidden scrollbar */}
          <div
            ref={scrollRef}
            onScroll={onScroll}
            className="flex gap-3 w-full overflow-x-auto"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <style>{`
              .hide-sb::-webkit-scrollbar { display: none; }
            `}</style>
            <div
              className="hide-sb flex gap-3"
              style={{ /* trick: apply hide class via ref parent */ }}
            >
              {/* inner trick not needed; apply on the outer div directly via inline ref */}
            </div>
            {items.map((item, i) => (
              <div key={i} style={{ scrollSnapAlign: "start", flexShrink: 0 }}>
                <CutCard item={item} />
              </div>
            ))}
          </div>

          {/* Next arrow */}
          {!atEnd && (
            <button
              onClick={() => scrollTo(1)}
              className="absolute -right-3 top-[40%] -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-[#1a2340] hover:bg-gray-50 z-10"
            >
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Dots */}
      <div className="flex gap-1.5 mt-4 pl-[120px] sm:pl-[158px]">
        {Array.from({ length: totalDots }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollRef.current?.scrollTo({ left: i * SCROLL_STEP, behavior: "smooth" })}
            className={`w-2 h-2 rounded-full transition-colors ${activeDot === i ? "bg-[#C0392B]" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("vacuna");


  const sections = {
    vacuna: { icon: <GiCow size={40} />, title: "CARNE VACUNA", subtitle: "Los mejores cortes para asado, milanesas y cocina diaria." },
    cerdo:  { icon: <GiPig size={40} />, title: "CARNE DE CERDO", subtitle: "Cortes frescos y de excelente calidad, todos los días." },
    pollo:  { icon: <GiChicken size={40} />, title: "POLLO FRESCO", subtitle: "Tiernos, saludables y perfectos para todas tus comidas." },
  };

  return (
    /*
      FIX: The root div must NOT be overflow-hidden or a scroll container.
      Using min-h-screen + flex-col ensures sticky works against the viewport,
      not a clipped ancestor. The page scrolls naturally on <html>/<body>.
    */
    <div className="min-h-screen flex flex-col font-sans text-[#1a2340] bg-white">

      {/* ── NAVBAR — sticky against viewport ── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <img src="iconAndText.png" className="h-15 w-fit events-pointer-none" />
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/541128353615"
              className="flex items-center gap-2 bg-[#C0392B] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#a93226] transition-colors"
            >
              <FaWhatsapp size={16} /> Contacto
            </a>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="w-9 h-9 flex items-center justify-center text-[#1a2340] hover:bg-gray-100 rounded-lg transition-colors"
            >
              {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>
          </div>
        </div>
        {menuOpen && (
  <div className="bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3 text-sm font-semibold">
    {["Nuestras Carnes", "Nuestras Sucursales", "Venta Mayorista", "Calidad de Servicios"].map((item) => (
      <a
        key={item}
        href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
        className="hover:text-[#C0392B] transition-colors py-1"
        onClick={()=> setMenuOpen(!menuOpen)}
      >
        {item}
      </a>
    ))}
  </div>
)}
      </nav>

      {/* ── PAGE BODY ── */}
      <main className="flex-1 flex flex-col">

        {/* HERO */}
        <section className="relative overflow-hidden bg-[#1a2340] min-h-[380px] sm:min-h-[420px]">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1558030006-450675393462?w=1200&q=80"
              alt="hero"
              className="w-full h-full object-cover opacity-40"
              style={{ objectPosition: "center right" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a2340] via-[#1a2340]/80 to-transparent" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <p className="text-[#C0392B] text-xs font-bold uppercase tracking-widest mb-3">UNA EXPERIENCIA DE COMPRA DIRECTA; SIN INTERMEDIARIOS</p>
            <h1 className="text-white font-black text-4xl sm:text-5xl leading-none uppercase mb-4">
              VARIEDAD PARA<br />TODOS LOS DÍAS
            </h1>
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm mb-8">
              Ofrecemos una amplia selección de cortes frescos y de calidad para tu mesa, con el respaldo de nuestra producción.
            </p>
            <div className="grid grid-cols-3 gap-3 max-w-md">
              {[
                { icon: <FaShieldAlt size={18} />, title: "Calidad garantizada", desc: "Selección y control en cada proceso." },
                { icon: <MdOutlineSevereCold size={18} />, title: "Siempre frescas", desc: "Reposición diaria en todas las sucursales." },
                { icon: <MdOutlineShoppingCart size={18} />, title: "Venta por Mayor y menor", desc: "Ventas por unidad o por volumen." },
              ].map((p, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                  <div className="text-[#C0392B] mb-1">{p.icon}</div>
                  <p className="text-white font-bold leading-tight mb-1">{p.title}</p>
                  <p className="text-gray-400 text-[11px] leading-tight">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" className="w-full">
              <path d="M0 60 Q360 0 720 30 Q1080 60 1440 20 L1440 60 Z" fill="white" />
            </svg>
          </div>
        </section>

        {/* Heart */}
        <div id="nuestras-carnes" className="flex justify-center -mt-4 relative z-10 scroll-margin-top-10">
          <div className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-red-500">
            <LuBeef />
          </div>
        </div>

        {/* CORTES */}
        <section className="max-w-6xl w-full mx-auto px-4 sm:px-6 pt-8 pb-12">
          <div className="text-center mb-8">
            <p className="text-[#C0392B] text-xs font-bold uppercase tracking-widest mb-1">NUESTROS CORTES</p>
            <h2 className="text-[#1a2340] font-black text-3xl sm:text-4xl">Elegí lo que necesitás</h2>
          </div>

          {Object.entries(sections).map(([key, sec]) => (
            <MeatSection key={key} icon={sec.icon} title={sec.title} subtitle={sec.subtitle} items={cuts[key]} />
          ))}
        </section>

        {/* Nuestras Sucursales (Mapas) */}
      <section
        id="nuestras-sucursales"
        className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-10 z-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-[#2B3175] mb-4">
            Nuestras Sucursales
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visitanos y viví una experiencia de compra directa, con la mejor
            atención y los cortes más frescos de la zona.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Card Luis Guillon */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(43,49,117,0.2)] transition-all duration-300 transform hover:-translate-y-1">
            <div className="h-48 relative overflow-hidden">
              <iframe
                src="https://www.google.com/maps?q=Abastecedora+Valette+Av.+Luciano+Valette+1696,+Luis+Guillón,+Buenos+Aires&output=embed"
                className="w-full h-full border-0 saturate-[0.8] contrast-110"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-[#2B3175] mb-3">
                Luis Guillon
              </h3>
              <p className="text-gray-600 flex items-start gap-3 mb-2">
                <MapPin
                  className="mt-1 flex-shrink-0 text-[#E3343A]"
                  size={18}
                />
                <span>
                  <strong>Av. Luciano Valette 1696</strong>
                  <br /> A 4 cuadras de camino de cintura
                </span>
              </p>
              <div className="mt-6">
                <a
                  href="https://wa.me/541128353615"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-gray-50 border-2 border-gray-100 hover:border-[#25D366] hover:bg-green-50 text-gray-700 hover:text-[#128C7E] font-bold py-3 px-4 rounded-xl transition-all"
                >
                  <FaWhatsapp className="w-5 h-5" /> Contactar Sucursal
                </a>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(43,49,117,0.2)] transition-all duration-300 transform hover:-translate-y-1">
            <div className="h-48 relative overflow-hidden">
              <iframe
                src="https://www.google.com/maps?q=abastecedora+valette+Av.+Del+Libertador+4200,+Moreno,+Buenos+Aires&output=embed"
                className="w-full h-full border-0 saturate-[0.8] contrast-110"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute inset-0 bg-[#2B3175]/10 pointer-events-none"></div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-[#2B3175] mb-3">Moreno</h3>
              <p className="text-gray-600 flex items-start gap-3 mb-2">
                <MapPin
                  className="mt-1 flex-shrink-0 text-[#E3343A]"
                  size={18}
                />
                <span>
                  <strong>Av. Del Libertador 4200</strong>
                  <br /> Mercado Modelo Moreno
                </span>
              </p>
              <div className="mt-6">
                <a
                  href="https://wa.me/541128353615"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-gray-50 border-2 border-gray-100 hover:border-[#25D366] hover:bg-green-50 text-gray-700 hover:text-[#128C7E] font-bold py-3 px-4 rounded-xl transition-all"
                >
                  <FaWhatsapp className="w-5 h-5" /> Contactar Sucursal
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
        <div id="venta-mayorista" className="flex w-full h-10"/>

        {/* WHOLESALE */}
        <section className="bg-[#8B0000] py-10 sm:py-12 px-4">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full border-2 border-white/40 flex items-center justify-center flex-shrink-0">
                <FaHandshake size={32} className="text-white" />
              </div>
              <div className="text-white">
                <p className="text-xs font-bold uppercase tracking-widest text-red-300 mb-1">VENTA MAYORISTA</p>
                <h3 className="font-black text-2xl sm:text-3xl leading-tight mb-1">¿Tenés un comercio o<br />sos distribuidor?</h3>
                <p className="text-sm text-red-200 max-w-sm">Accedé a precios especiales por volumen y sumate a nuestra red de clientes mayoristas en todo el país.</p>
              </div>
            </div>
            <a href="https://wa.me/541128353615" className="flex items-center gap-2 bg-white text-[#8B0000] font-black text-sm px-6 py-3 rounded-xl hover:bg-red-50 transition-colors whitespace-nowrap">
              ATENCIÓN PERSONALIZADA <FaWhatsapp size={16} />
            </a>
          </div>
        </section>

        {/* FEATURES */}
        <section id="calidad-de-nuestros-servicios" className="bg-white py-12 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
            {features.map((f, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="text-[#C0392B]">{f.icon}</div>
                <p className="font-black tracking-wide text-[#1a2340]">{f.title}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#1a2340] text-white pt-10 pb-6 px-4 mt-auto">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-white/10">
            <div>
              <div className="w-fit overflow-hidden px-2 py-1 rounded-md bg-white">
              <img src="iconAndText.png" className="h-15 overflow-hidden bg-white rounded-8 w-fit" />
              </div>
              <div className="flex gap-3 mt-4">
                <a href="#" className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"><FaInstagram size={14} /></a>
                <a href="#" className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"><FaFacebookF size={14} /></a>
              </div>
            </div>
            <div>
              <p className="font-bold text-sm mb-4 text-gray-300 uppercase tracking-wider">SUCURSALES</p>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <FaMapMarkerAlt size={12} className="text-[#C0392B] mt-0.5 flex-shrink-0" />
                  <div><p className="font-semibold text-gray-200">Luis Guillón</p><p>Av. Luciano Valette 1686</p></div>
                </li>
                <li className="flex items-start gap-2">
                  <FaMapMarkerAlt size={12} className="text-[#C0392B] mt-0.5 flex-shrink-0" />
                  <div><p className="font-semibold text-gray-200">Moreno</p><p>Av. Libertador 3910</p></div>
                </li>
              </ul>
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-6">© 2025 Abastecedora Valette. Todos los derechos reservados.</p>
        </footer>

      </main>
    </div>
  );
}
