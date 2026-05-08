//client/src/App.jsx
import React, { useState } from "react";
import {
  X,
  Menu,
  MapPin,
  Store,
  Target,
  Eye,
  Handshake,
  ChevronRight,
  Check,
} from "lucide-react";
import {
    FaInstagram,
      FaFacebookF,
        FaWarehouse,
          FaShieldAlt,
            FaBoxes,
              FaTruckMoving,
              } from "react-icons/fa";

export default function App() {
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Icono SVG personalizado de WhatsApp para mantener el estilo original
  const WhatsAppIcon = ({ className = "w-6 h-6" }) => (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );

  return (
    <div className="font-sans text-[#222222] bg-[#F8F9FA] overflow-x-hidden min-h-screen hide-scrollbar">
      {/* Estilos globales inyectados para tipografía y animaciones personalizadas */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee { animation: marquee 25s linear infinite; }
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>

      {/* Top Announcement Bar */}
      {isTopBarVisible && (
        <div className="bg-black text-white text-sm font-semibold py-2 px-4 flex justify-between items-center relative overflow-hidden h-10 z-50">
          <div className="w-full overflow-hidden absolute left-0 flex items-center h-full">
            <div className="animate-marquee whitespace-nowrap">
              Sucursales en Luis Guillon y Morón - Servicio de Envios - Somos
              Productores
            </div>
          </div>
          <button
            onClick={() => setIsTopBarVisible(false)}
            className="absolute right-2 text-white z-10 bg-white/50 p-[4px] rounded-full"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Header / Navbar */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-3">
              <img src="iconAndText.png" className="h-20 w-fit object-cover" />
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8 items-center">
              <a
                href="#sucursales"
                className="text-gray-600 hover:text-[#E3343A] font-medium transition-colors"
              >
                Sucursales
              </a>
              <a
                href="#mayoristas"
                className="text-gray-600 hover:text-[#E3343A] font-medium transition-colors"
              >
                Mayoristas
              </a>
              <a
                href="#nosotros"
                className="text-gray-600 hover:text-[#E3343A] font-medium transition-colors"
              >
                Nosotros
              </a>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="bg-[#2B3175] text-white px-5 py-2.5 rounded-full font-bold hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-md"
              >
                <WhatsAppIcon className="w-5 h-5" /> Contacto
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="text-[#2B3175] hover:text-[#E3343A] focus:outline-none p-2"
              >
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar (Off-canvas) */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar Content */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[80vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-[#2B3175] font-bold text-xl">Contacto</h3>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-400 hover:text-[#E3343A]"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 flex-grow overflow-y-auto no-scrollbar space-y-8">
          <p className="text-gray-600 text-sm mb-6">
            Comunicate directamente con nuestras sucursales para atención
            personalizada, pedidos o consultas mayoristas.
          </p>

          {/* Contacto Luis Guillon */}
          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#2B3175] text-white flex items-center justify-center">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#2B3175]">
                  Sucursal Luis Guillón
                </h4>
                <p className="text-xs text-gray-500">
                  Av. Luciano Valette 1686
                </p>
              </div>
            </div>
            <a
              href="https://wa.me/541128353615"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5" /> +54 11 2835 3615
            </a>
          </div>

          {/* Contacto Morón */}
          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#E3343A] text-white flex items-center justify-center">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#2B3175]">Sucursal Morón</h4>
                <p className="text-xs text-gray-500">Atención personalizada</p>
              </div>
            </div>
            <a
              href="https://wa.me/541128353615"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5" /> +54 11 2835 3615
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100">
            <h4 className="font-bold text-[#2B3175] mb-4">¿Qué ofrecemos?</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Check size={16} className="text-[#E3343A]" /> Cortes Vacunos,
                Cerdo y Pollo
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-[#E3343A]" /> Venta por Mayor y
                Menor
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-[#E3343A]" /> Precios de
                Productor Directo
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-[#2B3175] text-white pb-20 pt-28 lg:pt-40 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Carnicería moderna"
            className="w-full h-full object-cover opacity-30 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2B3175] via-[#2B3175]/90 to-transparent"></div>
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center">
          <div className="md:w-3/5">
            <div className="inline-block bg-[#E3343A] text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide shadow-lg">
              Calidad desde el origen
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight mb-6 tracking-tight">
              ABASTECEDORA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                VALETTE
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-8 border-l-4 border-[#E3343A] pl-4 text-gray-100 max-w-2xl">
              Una experiencia de compra directa;{" "}
              <br className="hidden md:block" />
              <span className="font-bold text-white">sin intermediarios.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#sucursales"
                className="bg-white text-[#2B3175] px-8 py-4 rounded-full font-bold text-center hover:bg-gray-100 hover:scale-105 transition-all shadow-xl"
              >
                Ver Sucursales
              </a>
              <a
                href="#mayoristas"
                className="bg-[#E3343A] text-white px-8 py-4 rounded-full font-bold text-center hover:bg-[#c92a30] hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <Store size={20} /> Soy Comercio
              </a>
            </div>

            {/* Features tags */}
            <div className="mt-10 flex flex-wrap gap-3">
              <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 border border-white/20">
                Criadero propio
              </span>
              <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 border border-white/20">
                Hacienda directa
              </span>
              <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 border border-white/20">
                Mayorista y Minorista
              </span>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute -bottom-[1px] left-0 w-full overflow-hidden leading-none">
          <svg
            className="relative block w-full h-[50px] md:h-[100px]"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C80.29,114.93,198.81,81.42,321.39,56.44Z"
              fill="#F8F9FA"
            ></path>
          </svg>
        </div>
      </section>

      {/* Nuestras Sucursales (Mapas) */}
      <section
        id="sucursales"
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

              <div className="absolute inset-0 bg-[#2B3175]/10 pointer-events-none"></div>
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
                  <WhatsAppIcon className="w-5 h-5" /> Contactar Sucursal
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
                  <WhatsAppIcon className="w-5 h-5" /> Contactar Sucursal
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mayoristas CTA (Destacado) */}
      <section
        id="mayoristas"
        className="bg-[#2B3175] py-20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E3343A] rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
          <Store className="w-16 h-16 text-[#E3343A] mb-6" />
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            ¿Querés abrir tu comercio?
          </h2>
          <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto font-medium">
            Te acompañamos en el crecimiento de tu negocio. Al ser productores
            directos y contar con criadero propio, te garantizamos frescura
            continua, abastecimiento seguro y los precios más competitivos del
            mercado en vacuno, cerdo y pollo.
          </p>

          <div className="bg-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-md border border-white/20 inline-block">
            <p className="text-white mb-6 font-bold text-lg">
              Si tenés una carnicería, restaurante o supermercado, hablemos:
            </p>
            <a
              href="https://wa.me/541128353615"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#E3343A] text-white text-lg md:text-xl font-bold px-8 py-4 rounded-full hover:bg-[#c92a30] hover:scale-105 transition-all shadow-[0_0_20px_rgba(227,52,58,0.5)]"
            >
              Atención personalizada mayoristas
              <WhatsAppIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* Identidad de Marca (Misión, Visión, Valores) */}
      <section id="nosotros" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[#2B3175] mb-4">
              Nuestra Identidad
            </h2>
            <div className="w-24 h-1 bg-[#E3343A] mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Imagen */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group h-full min-h-[200px]">
              <img
                src="logistica.jpg"
                alt="Logística y Producción Abastecedora Valette"
                className="absolute inset-0 w-full h-fit object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B3175] via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <div className="bg-[#E3343A] text-white text-sm font-bold px-4 py-2 rounded-lg inline-block mb-3">
                  Productores Directos
                </div>
                <h3 className="text-3xl font-bold text-white leading-tight">
                  Del campo a<br />
                  tu mostrador.
                </h3>
              </div>
            </div>

            {/* Textos */}
            <div className="space-y-8">
              {/* Misión */}
              <div className="flex gap-5">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 rounded-full bg-[#2B3175]/10 flex items-center justify-center text-[#2B3175] border border-[#2B3175]/20">
                    <Target size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#2B3175] mb-2">
                    Nuestra Misión
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-justify">
                    Acercarte carne de calidad de forma directa, simple y
                    conveniente. Como productores, trabajamos sin intermediarios
                    para ofrecerte mejores precios, buena atención y una
                    experiencia de compra clara, tanto si venís por tu compra
                    diaria como si abastecés tu negocio.
                  </p>
                </div>
              </div>

              {/* Visión */}
              <div className="flex gap-5">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 rounded-full bg-[#E3343A]/10 flex items-center justify-center text-[#E3343A] border border-[#E3343A]/20">
                    <Eye size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#2B3175] mb-2">
                    Nuestra Visión
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-justify">
                    Seguir creciendo y consolidarnos como un referente en el
                    rubro, combinando nuestra experiencia como productores con
                    herramientas tecnológicas que nos permitan estar más cerca
                    de cada cliente y responder mejor a sus necesidades.
                  </p>
                </div>
              </div>

              {/* Valores */}
              <div className="flex gap-5">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-[#222222] border border-gray-200">
                    <Handshake size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#2B3175] mb-2">
                    Nuestros Valores
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-justify">
                    Nos guiamos por el compromiso, la responsabilidad y el
                    respeto en cada venta. Apostamos a una atención cercana y
                    personalizada, especialmente con nuestros clientes
                    mayoristas, construyendo relaciones de confianza a largo
                    plazo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por que elegirnos / Diferenciales */}
      {/* Por que elegirnos / Diferenciales */}
<section className="py-16 bg-gray-50 border-t border-gray-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

      <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-50 flex items-center justify-center">
          <FaWarehouse className="text-[#E3343A] text-3xl" />
        </div>

        <h4 className="font-bold text-[#2B3175] mb-2">
          Criadero Propio
        </h4>

        <p className="text-xs text-gray-500">
          Control total de calidad en nuestra línea de cerdos.
        </p>
      </div>

      <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-50 flex items-center justify-center">
          <FaShieldAlt className="text-[#E3343A] text-3xl" />
        </div>

        <h4 className="font-bold text-[#2B3175] mb-2">
          Hacienda Directa
        </h4>

        <p className="text-xs text-gray-500">
          Compramos sin intermediarios para asegurar el mejor precio.
        </p>
      </div>

      <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-50 flex items-center justify-center">
          <FaBoxes className="text-[#E3343A] text-3xl" />
        </div>

        <h4 className="font-bold text-[#2B3175] mb-2">
          Variedad Total
        </h4>

        <p className="text-xs text-gray-500">
          Cortes vacunos, cerdos y pollos frescos todos los días.
        </p>
      </div>

      <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-50 flex items-center justify-center">
          <FaTruckMoving className="text-[#E3343A] text-3xl" />
        </div>

        <h4 className="font-bold text-[#2B3175] mb-2">
          Mayor y Menor
        </h4>

        <p className="text-xs text-gray-500">
          Abastecemos al público general y a grandes comercios.
        </p>
      </div>

    </div>
  </div>
</section>

{/* Footer */}
<footer className="bg-white text-neutral-900 pt-16 pb-8 border-t border-neutral-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid md:grid-cols-3 gap-12 mb-12">
      {/* Logo & Info */}
      <div className="col-span-1">
        <img
          src="iconAndText.png"
          className="h-20 w-fit object-cover mb-4"
        />

        <p className="text-neutral-600 text-sm mb-6">
          Una experiencia de compra directa; sin intermediarios. Somos
          productores y tu mejor opción en carnes.
        </p>

        <div className="flex space-x-4">
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-[#E3343A] hover:text-white transition-colors"
          >
            <FaInstagram size={18} />
          </a>

          <a
            href="#"
            className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-[#E3343A] hover:text-white transition-colors"
          >
            <FaFacebookF size={18} />
          </a>
        </div>
      </div>

      {/* Enlaces Rápidos */}
      <div>
        <h4 className="text-lg font-bold mb-6 border-b border-neutral-300 pb-2">
          Navegación
        </h4>

        <ul className="space-y-3">
          <li>
            <a
              href="#sucursales"
              className="text-neutral-600 hover:text-[#E3343A] transition-colors flex items-center gap-2"
            >
              <ChevronRight size={14} className="text-[#E3343A]" />
              Sucursales
            </a>
          </li>

          <li>
            <a
              href="#mayoristas"
              className="text-neutral-600 hover:text-[#E3343A] transition-colors flex items-center gap-2"
            >
              <ChevronRight size={14} className="text-[#E3343A]" />
              Venta Mayorista
            </a>
          </li>

          <li>
            <a
              href="#nosotros"
              className="text-neutral-600 hover:text-[#E3343A] transition-colors flex items-center gap-2"
            >
              <ChevronRight size={14} className="text-[#E3343A]" />
              Quiénes Somos
            </a>
          </li>
        </ul>
      </div>

      {/* Contacto Rápido */}
      <div>
        <h4 className="text-lg font-bold mb-6 border-b border-neutral-300 pb-2">
          Contacto Directo
        </h4>

        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <MapPin
              className="text-[#E3343A] mt-1 flex-shrink-0"
              size={18}
            />

            <div>
              <strong className="block text-sm text-neutral-900">
                Luis Guillón
              </strong>

              <span className="text-neutral-600 text-sm">
                Av. Luciano Valette 1686
              </span>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <MapPin
              className="text-[#E3343A] mt-1 flex-shrink-0"
              size={18}
            />

            <div>
              <strong className="block text-sm text-neutral-900">
                Moreno
              </strong>

              <span className="text-neutral-600 text-sm">
                Av. Libertador 3910
              </span>
            </div>
          </li>

          <li className="flex items-center gap-3 pt-2">
            <WhatsAppIcon className="text-[#25D366] w-6 h-6" />

            <a
              href="https://wa.me/541128353615"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 hover:text-[#25D366] font-bold transition-colors"
            >
              +54 11 2835 3615
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="border-t border-neutral-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-neutral-500 text-xs text-center md:text-left">
        &copy; {new Date().getFullYear()} Abastecedora Valette. Todos los
        derechos reservados.
      </p>

      <div className="text-neutral-500 text-xs flex gap-4">
        <span>Desarrollo de calidad mayorista.</span>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
} 
