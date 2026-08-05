/**
 * Los estilos que puede practicar el aspirante. Fuente única: de aquí salen
 * las fichas de la teoría y el filtro de las preguntas que dependen del estilo.
 *
 * De momento solo los dos del material adjunto a la Normativa. Para añadir otro,
 * mételo aquí y crea sus preguntas en tests.json con "style": "<id>" — ver TODO.md.
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
]

export const styleIds = styles.map(style => style.id)

/** Siempre hay un estilo elegido: no existe la opción «todos». */
export const DEFAULT_STYLE = styles[0].id
