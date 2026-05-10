import { useState } from "react";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaShieldAlt, FaTruck, FaHandshake, FaHome, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaBars, FaTimes, FaChevronRight } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GiCow, GiPig, GiChicken } from "react-icons/gi";
import { ChevronRight, ChevronLeft } from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const cuts = {
  vacuna: [
    { name: "Bifé de Chorizo", desc: "Ideal para parrilla", img: "https://images.unsplash.com/photo-1558030006-450675393462?w=300&q=80" },
    { name: "Asado", desc: "Clásico argentino", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&q=80" },
    { name: "Nalga", desc: "Tierna y sabrosa", img: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=300&q=80" },
    { name: "Vacío", desc: "Jugoso y sabroso", img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&q=80" },
    { name: "Tapa de Asado", desc: "Clásico y tradicional", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&q=80" },
  ],
  cerdo: [
    { name: "Bondiola", desc: "Jugosa y sabrosa", img: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=300&q=80" },
    { name: "Costeleta", desc: "Ideal para la parrilla", img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=300&q=80" },
    { name: "Matambrito", desc: "Tierno y jugoso", img: "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=300&q=80" },
    { name: "Panceta", desc: "Para mil recetas", img: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=300&q=80" },
    { name: "Carré", desc: "Tierno y magro", img: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?w=300&q=80" },
  ],
  pollo: [
    { name: "Pechuga", desc: "Magra y saludable", img: "https://images.unsplash.com/photo-1604503468506-a8da13d11d36?w=300&q=80" },
    { name: "Muslo", desc: "Jugoso y sabroso", img: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=300&q=80" },
    { name: "Alitas", desc: "Perfectas para compartir", img: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=300&q=80" },
    { name: "Suprema", desc: "Sin piel", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&q=80" },
    { name: "Pollo Entero", desc: "Fresco y natural", img: "https://images.unsplash.com/photo-1501200291289-c5a76c232e5f?w=300&q=80" },
  ],
};

const features = [
  { icon: <FaHome size={32} />, title: "PRODUCCIÓN PROPIA", desc: "Controlamos todo el proceso, desde el origen hasta tu mesa." },
  { icon: <FaShieldAlt size={32} />, title: "CALIDAD GARANTIZADA", desc: "Selección y controles en cada etapa para asegurar lo mejor." },
  { icon: <FaTruck size={32} />, title: "ENVÍOS Y SUCURSALES", desc: "Llegamos a tus clientes con rapidez y en frío." },
  { icon: <FaHandshake size={32} />, title: "ATENCIÓN PERSONALIZADA", desc: "Te asesoramos para que siempre tengas lo que necesitás." },
];

// ─── SUBCOMPONENTS ────────────────────────────────────────────────────────────

function Logo({ small = false }) {
  return (
    <div className={`flex items-center gap-2 ${small ? "" : ""}`}>
      <div className="relative">
        <svg width={small ? 38 : 44} height={small ? 38 : 44} viewBox="0 0 44 44" fill="none">
          <path d="M22 4 C10 4 4 12 4 20 C4 30 12 38 22 40 C32 38 40 30 40 20 C40 12 34 4 22 4Z" fill="#C0392B" opacity="0.15" />
          <path d="M8 18 Q14 10 22 12 Q30 10 36 18 Q30 16 22 18 Q14 16 8 18Z" fill="#C0392B" />
          <path d="M10 22 Q16 28 22 26 Q28 28 34 22" stroke="#C0392B" strokeWidth="2" fill="none" />
          <circle cx="16" cy="14" r="2" fill="#C0392B" />
          <circle cx="28" cy="14" r="2" fill="#C0392B" />
        </svg>
      </div>
      <div>
        <p className={`font-light tracking-widest uppercase ${small ? "text-[9px]" : "text-[10px]"} text-[#C0392B]`}>ABASTECEDORA</p>
        <p className={`font-black uppercase leading-none ${small ? "text-lg" : "text-xl"} text-[#1a2340]`}>VALETTE</p>
      </div>
    </div>
  );
}

function CutCard({ item }) {
  return (
    <div className="flex-shrink-0 w-[150px] sm:w-[170px] group cursor-pointer">
      <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-square mb-2">
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1558030006-450675393462?w=300&q=80"; }}
        />
      </div>
      <p className="font-bold text-[13px] text-[#1a2340]">{item.name}</p>
      <p className="text-[11px] text-gray-500 mb-2">{item.desc}</p>
      <button className="w-7 h-7 bg-[#C0392B] rounded-full flex items-center justify-center text-white hover:bg-[#a93226] transition-colors">
        <FaChevronRight size={10} />
      </button>
    </div>
  );
}

function MeatSection({ icon, title, subtitle, items }) {
  const [start, setStart] = useState(0);
  const visible = 5;

  const prev = () => setStart((s) => Math.max(0, s - 1));
  const next = () => setStart((s) => Math.min(items.length - visible, s + 1));

  return (
    <div className="border border-gray-200 rounded-2xl p-4 sm:p-6 mb-6">
      <div className="flex gap-4 sm:gap-6">
        {/* Left info */}
        <div className="w-[120px] sm:w-[150px] flex-shrink-0">
          <div className="text-[#C0392B] mb-2">{icon}</div>
          <h3 className="font-black text-lg sm:text-xl text-[#1a2340] uppercase leading-tight mb-2">{title}</h3>
          <p className="text-[11px] text-gray-500 mb-4 leading-relaxed">{subtitle}</p>
          <button className="flex items-center gap-1 border border-[#1a2340] text-[#1a2340] text-[11px] font-semibold px-3 py-1.5 rounded-lg hover:bg-[#1a2340] hover:text-white transition-colors">
            VER TODOS <FaChevronRight size={8} />
          </button>
        </div>

        {/* Cards + arrow */}
        <div className="flex-1 relative flex items-center">
          <div className="overflow-hidden w-full">
            <div
              className="flex gap-3 transition-transform duration-300"
              style={{ transform: `translateX(-${start * (150 + 12)}px)` }}
            >
              {items.map((item, i) => <CutCard key={i} item={item} />)}
            </div>
          </div>
          {start < items.length - visible && (
            <button
              onClick={next}
              className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full shadow flex items-center justify-center text-[#1a2340] hover:bg-gray-50 z-10"
            >
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Dots */}
      <div className="flex gap-1.5 mt-4 ml-[136px] sm:ml-[162px]">
        {Array.from({ length: Math.ceil(items.length / visible) }).map((_, i) => (
          <button
            key={i}
            onClick={() => setStart(i * visible)}
            className={`w-2 h-2 rounded-full transition-colors ${Math.floor(start / visible) === i ? "bg-[#C0392B]" : "bg-gray-300"}`}
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

  const tabs = [
    { key: "vacuna", label: "VACUNA", icon: <GiCow size={18} /> },
    { key: "cerdo", label: "CERDO", icon: <GiPig size={18} /> },
    { key: "pollo", label: "POLLO", icon: <GiChicken size={18} /> },
  ];

  const sections = {
    vacuna: {
      icon: <GiCow size={40} />,
      title: "CARNE\nVACUNA",
      subtitle: "Los mejores cortes para asado, milanesas y cocina diaria.",
    },
    cerdo: {
      icon: <GiPig size={40} />,
      title: "CARNE\nDE CERDO",
      subtitle: "Cortes frescos y de excelente calidad, todos los días.",
    },
    pollo: {
      icon: <GiChicken size={40} />,
      title: "POLLO\nFRESCO",
      subtitle: "Tiernos, saludables y perfectos para todas tus comidas.",
    },
  };

  return (
    <div className="font-sans text-[#1a2340] bg-white">

      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/541128353615"
              className="flex items-center gap-2 bg-[#C0392B] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#a93226] transition-colors"
            >
              <FaWhatsapp size={16} /> Contacto
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 flex items-center justify-center text-[#1a2340] hover:bg-gray-100 rounded-lg transition-colors"
            >
              {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3 text-sm font-semibold text-[#1a2340]">
            {["Sucursales", "Venta Mayorista", "Quiénes Somos"].map((item) => (
              <a key={item} href="#" className="hover:text-[#C0392B] transition-colors py-1">{item}</a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#1a2340] min-h-[380px] sm:min-h-[420px]">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558030006-450675393462?w=1200&q=80"
            alt="Carne de calidad"
            className="w-full h-full object-cover opacity-40"
            style={{ objectPosition: "center right" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a2340] via-[#1a2340]/80 to-transparent" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-[#C0392B] text-xs font-bold uppercase tracking-widest mb-3">CARNE DE CALIDAD</p>
            <h1 className="text-white font-black text-4xl sm:text-5xl leading-none uppercase mb-4">
              VARIEDAD PARA<br />TODOS LOS DÍAS
            </h1>
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm mb-8">
              Ofrecemos una amplia selección de cortes frescos y de calidad para tu mesa, con el respaldo de nuestra producción.
            </p>

            {/* 3 pillars */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <FaShieldAlt size={18} />, title: "Calidad garantizada", desc: "Selección y control en cada proceso." },
                { icon: <MdOutlineShoppingCart size={18} />, title: "Siempre frescas", desc: "Reposición diaria en todas las sucursales." },
                { icon: <MdOutlineShoppingCart size={18} />, title: "Mayor y menor", desc: "Ventas por unidad o por volumen." },
              ].map((p, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                  <div className="text-[#C0392B] mb-1">{p.icon}</div>
                  <p className="text-white text-[11px] font-bold leading-tight mb-1">{p.title}</p>
                  <p className="text-gray-400 text-[10px] leading-tight">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60 Q360 0 720 30 Q1080 60 1440 20 L1440 60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Heart divider */}
      <div className="flex justify-center -mt-4 relative z-10">
        <div className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center">
          <svg width="16" height="14" viewBox="0 0 16 14" fill="#C0392B">
            <path d="M8 13s-7-4.5-7-8.5A4 4 0 0 1 8 2.5 4 4 0 0 1 15 4.5C15 8.5 8 13 8 13Z" />
          </svg>
        </div>
      </div>

      {/* ── CORTES SECTION ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-12">
        <div className="text-center mb-8">
          <p className="text-[#C0392B] text-xs font-bold uppercase tracking-widest mb-1">NUESTROS CORTES</p>
          <h2 className="text-[#1a2340] font-black text-3xl sm:text-4xl">Elegí lo que necesitás</h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 sm:gap-3 mb-8 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === tab.key
                  ? "bg-[#C0392B] text-white shadow-md"
                  : "border-2 border-gray-200 text-[#1a2340] hover:border-[#C0392B]"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* All three sections always shown (like the design) */}
        {Object.entries(sections).map(([key, sec]) => (
          <MeatSection
            key={key}
            icon={sec.icon}
            title={sec.title}
            subtitle={sec.subtitle}
            items={cuts[key]}
          />
        ))}
      </section>

      {/* ── WHOLESALE BANNER ── */}
      <section className="bg-[#8B0000] py-10 sm:py-12 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full border-2 border-white/40 flex items-center justify-center flex-shrink-0">
              <FaHandshake size={32} className="text-white" />
            </div>
            <div className="text-white">
              <p className="text-xs font-bold uppercase tracking-widest text-red-300 mb-1">VENTA MAYORISTA</p>
              <h3 className="font-black text-2xl sm:text-3xl leading-tight mb-1">¿Tenés un comercio o<br />sos distribuidor?</h3>
              <p className="text-sm text-red-200 max-w-sm">
                Accedé a precios especiales por volumen y sumate a nuestra red de clientes mayoristas en todo el país.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/541128353615"
            className="flex items-center gap-2 bg-white text-[#8B0000] font-black text-sm px-6 py-3 rounded-xl hover:bg-red-50 transition-colors whitespace-nowrap"
          >
            CONTACTANOS <FaWhatsapp size={16} />
          </a>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="text-[#C0392B]">{f.icon}</div>
              <p className="font-black text-[11px] sm:text-xs tracking-wide text-[#1a2340]">{f.title}</p>
              <p className="text-[11px] text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1a2340] text-white pt-10 pb-6 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-white/10">
          {/* Brand */}
          <div>
            <Logo small />
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
                <FaInstagram size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
                <FaFacebookF size={14} />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="font-bold text-sm mb-4 text-gray-300 uppercase tracking-wider">NAVEGACIÓN</p>
            <ul className="space-y-2 text-sm text-gray-400">
              {["Sucursales", "Venta Mayorista", "Quiénes Somos"].map((item) => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">• {item}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-bold text-sm mb-4 text-gray-300 uppercase tracking-wider">CONTACTO</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2"><FaPhoneAlt size={11} className="text-[#C0392B]" /> +54 11 2835 3615</li>
              <li className="flex items-start gap-2"><FaEnvelope size={11} className="text-[#C0392B] mt-0.5" /> <span className="break-all">ventas@abastecedoravalette.com.ar</span></li>
            </ul>
            <p className="text-xs text-gray-500 mt-4">Seguinos en nuestras redes</p>
          </div>

          {/* Branches */}
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

        <p className="text-center text-xs text-gray-500 mt-6">
          © 2025 Abastecedora Valette. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
