

export function obtenerIniciales(nombreCompleto) {
  const ignorar = ['de', 'del', 'la', 'los', 'las', 'y', 'el'];
  const palabras = nombreCompleto
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(p => !ignorar.includes(p));

  const primera = palabras[0] || '';
  const segunda = palabras[1] || '';
  return (primera[0] || '').toUpperCase() + (segunda[0] || '').toUpperCase();
}
