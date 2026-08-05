/**
 * Los estilos que puede practicar el aspirante. Fuente única: de aquí salen
 * las fichas de la teoría y el filtro de las preguntas que dependen del estilo.
 *
 * Shito Ryu y Shotokan vienen del material adjunto a la Normativa. Goju Ryu y
 * Wado Ryu se han añadido con fundador y significado (que no admiten discusión);
 * sus posiciones características están pendientes de contrastar contra el
 * material de cada escuela — ver TODO.md.
 */
export const styles = [
  {
    id: 'shito-ryu',
    name: 'Shito Ryu',
    founder: 'Kenwa Mabuni',
    meaning:
      'SHI representa a Itosu y TO representa a Higaonna, los dos maestros de Mabuni. RYU significa escuela.',
    stances: ['Moto dachi', 'Nekoashi dachi', 'Sanchin dachi', 'Zenkutsu dachi', 'Shiko dachi'],
  },
  {
    id: 'shotokan',
    name: 'Shotokan',
    founder: 'Gichin Funakoshi',
    meaning:
      '«La casa de Shoto». SHOTO era el pseudónimo con el que el maestro Funakoshi firmaba sus escritos y significa «pinos oscilantes»; KAN significa casa.',
    stances: ['Zenkutsu dachi', 'Kokutsu dachi', 'Kiba dachi', 'Hangetsu dachi', 'Sochin dachi'],
  },
  {
    id: 'goju-ryu',
    name: 'Goju Ryu',
    founder: 'Chojun Miyagi',
    meaning:
      '«La escuela de lo duro y lo blando». GO significa duro y JU significa blando; RYU significa escuela. Miyagi tomó el nombre de un precepto del Bubishi.',
    stances: ['Sanchin dachi', 'Shiko dachi', 'Nekoashi dachi', 'Zenkutsu dachi', 'Han zenkutsu dachi'],
  },
  {
    id: 'wado-ryu',
    name: 'Wado Ryu',
    founder: 'Hironori Otsuka',
    meaning:
      '«La escuela del camino de la armonía». WA significa armonía y DO significa camino; RYU significa escuela.',
    stances: ['Junzuki dachi', 'Gyakuzuki dachi', 'Nekoashi dachi', 'Shiko dachi', 'Seishan dachi'],
  },
]

/** Valor del selector cuando el aspirante no ha elegido estilo: entran todos. */
export const ALL_STYLES = 'all'

export const styleIds = styles.map(style => style.id)

export const findStyle = id => styles.find(style => style.id === id) ?? null
