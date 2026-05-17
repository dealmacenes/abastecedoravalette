import { useState } from "react";

const items = [
  "Pedidos por WhatsApp",
  "Sucursales en Luis Guillón",
  "Envíos a todo el país",
  "Descuentos en bultos",
];

export default function AnnouncementBar() {
  const [paused, setPaused] = useState(false);

  // Duplicamos los items para que el loop sea continuo y sin cortes
  const repeated = [...items, ...items];

  return (
    <div className="relative flex items-center bg-red-600 text-white text-sm font-medium overflow-hidden h-9 select-none">
      {/* Track animado */}
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: "marquee 18s linear infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-1 opacity-60">-</span>
            <span className="px-2">{item}</span>
          </span>
        ))}
      </div>

      {/* Botón pausar / reanudar */}
      <button
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? "Reanudar anuncio" : "Pausar anuncio"}
        className="
          absolute right-2 flex items-center justify-center
          w-6 h-6 rounded-full
          bg-white/20 hover:bg-white/35 transition-colors
          text-white shrink-0 z-10
        "
      >
        {paused ? (
          /* Play icon */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-3 h-3"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        ) : (
          /* Pause icon */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-3 h-3"
          >
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        )}
      </button>

      {/* Keyframe inyectado inline — sin necesidad de tocar CSS global */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
