// IconoHamburguesaMinimal.jsx
const IconoMenu = ({ className = "w-6 h-6", stroke = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke={stroke}
    className={className}
  >
    <line x1="4" y1="8" x2="20" y2="8" strokeLinecap="round" />
    <line x1="10" y1="16" x2="20" y2="16" strokeLinecap="round" />
  </svg>
);

export default IconoMenu; 
