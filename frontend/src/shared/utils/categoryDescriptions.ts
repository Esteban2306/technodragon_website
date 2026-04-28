type Rule = {
  match: string[];
  description: string;
};

export const categoryDescriptionRules: Rule[] = [
  {
    match: ['laptop', 'portatil', 'notebook', 'pc'],
    description: 'Equipos portátiles para trabajo, estudio y gaming',
  },
  {
    match: ['telefono', 'movil', 'celular', 'smartphone'],
    description: 'Dispositivos móviles de última generación',
  },
  {
    match: ['reloj', 'watch', 'smartwatch'],
    description: 'Tecnología wearable para tu día a día',
  },
  {
    match: ['audio', 'auricular', 'audifono'],
    description: 'Sonido envolvente y accesorios de audio',
  },
  {
    match: ['teclado', 'keyboard'],
    description: 'Teclados para productividad y gaming',
  },
  {
    match: ['mouse', 'raton'],
    description: 'Precisión y control en cada movimiento',
  },
  {
    match: ['monitor', 'pantalla'],
    description: 'Pantallas de alta calidad y rendimiento',
  },
  {
    match: ['procesador', 'cpu'],
    description: 'Potencia y rendimiento para tu equipo',
  },
  {
    match: ['disco', 'ssd', 'hdd'],
    description: 'Almacenamiento rápido y seguro',
  },
  {
    match: ['gaming', 'consola'],
    description: 'Accesorios y equipos para gamers',
  },
  {
    match: ['camara'],
    description: 'Captura momentos con calidad profesional',
  },
];

export function getCategoryDescription(categoryName: string) {
  const name = categoryName.toLowerCase();

  for (const rule of categoryDescriptionRules) {
    if (rule.match.some((keyword) => name.includes(keyword))) {
      return rule.description;
    }
  }

  return 'Explora productos disponibles en esta categoría';
}