// Las fichas de estilo salen de src/data/styles.js, que es también lo que filtra
// las preguntas del test. CN Negro las usa para el estilo propio del aspirante;
// 3.er DAN, para el segundo estilo que debe elegir.
import { styles as referenceStyles } from './styles.js'

export const teoriaData = {
  cn: {
    gradeTag: 'Teoría · Cinturón Negro',
    title: 'CN Negro',
    meta: '12 preguntas · Normativa RFEK 2026 v1.2.1',
    note: null,
    topics: [
      {
        num: 1,
        question: 'Nombre, significado del estilo, fundador y posiciones características',
        answer: 'El aspirante deberá conocer el nombre y significado del estilo que practica, su fundador y las posiciones características del mismo.',
        styles: referenceStyles,
      },
      {
        num: 2,
        question: '¿Qué significa KARATE?',
        terms: [
          { jp: 'KARA', es: 'Vacío' },
          { jp: 'TE', es: 'Mano' },
        ],
      },
      {
        num: 3,
        question: '¿Qué significa ZANSHIN?',
        answer: 'Alerta continua. Estado de compromiso continuado en el cual el contendiente mantiene la alerta ante la potencialidad del oponente para contraatacar.',
      },
      {
        num: 4,
        question: '¿Qué significa CHAKUGAN?',
        answer: 'Mirada.',
      },
      {
        num: 5,
        question: '¿Qué es KIME?',
        answer: 'El aprovechamiento de la energía física y mental en el momento del impacto. La fuerza.',
      },
      {
        num: 6,
        question: '¿Qué es KI?',
        answer: 'La energía interior.',
      },
      {
        num: 7,
        question: '¿Qué es KIAI?',
        answer: 'La liberación de la energía interna mediante un grito.',
      },
      {
        num: 8,
        question: '¿Qué significa REI?',
        answer: 'Saludo.',
      },
      {
        num: 9,
        question: '¿Por qué se saluda y cuál es la finalidad del saludo?',
        answer: 'El saludo (REI) se hace por cortesía, para demostrar respeto, humildad y gentileza.',
      },
      {
        num: 10,
        question: 'Diferentes alturas o niveles para golpear',
        terms: [
          { jp: 'JODAN', es: 'Nivel alto (cabeza)' },
          { jp: 'CHUDAN', es: 'Nivel medio (abdomen, costados, espalda, pecho, hombros)' },
          { jp: 'GEDAN', es: 'Nivel bajo (desde la cintura a los pies)' },
        ],
      },
      {
        num: 11,
        question: '¿Qué significa KATA?',
        answer: 'Forma. Se puede definir como una serie de técnicas (en defensa y ataque, de puño y pierna) realizadas con un orden preestablecido contra adversarios imaginarios.',
      },
      {
        num: 12,
        question: '¿Qué significa KUMITE?',
        answer: 'Combate.',
      },
    ],
  },

  '1dan': {
    gradeTag: 'Teoría · Primer Grado',
    title: 'CN Negro 1.º DAN',
    meta: '12 preguntas · Incluye temario CN Negro · Normativa RFEK 2026 v1.2.1',
    note: 'El aspirante deberá conocer el temario del grado anterior (CN Negro).',
    topics: [
      {
        num: 1,
        question: 'Características técnicas del estilo que practica',
        develop: true,
        answer: 'El aspirante deberá conocer las características técnicas específicas del estilo que practica.',
      },
      {
        num: 2,
        question: 'Puntos importantes en las técnicas de brazo',
        terms: [
          { jp: 'TSUKITE', es: 'El que ejecuta la acción' },
          { jp: 'HIKITE', es: 'El que recoge hacia atrás' },
          { jp: 'KOSHI KAITEN', es: 'La acción de la cadera' },
        ],
      },
      {
        num: 3,
        question: 'Puntos importantes en las técnicas de pierna',
        terms: [
          { jp: 'KAKAE KOMI ASHI', es: 'Elevación de rodilla' },
          { jp: 'KERI HANASHI', es: 'Extensión de la pierna' },
          { jp: 'JIKU ASHI', es: 'Base de apoyo' },
          { jp: 'KOSHI', es: 'Acción de la cadera' },
          { jp: 'HIKI ASHI', es: 'Recogida de la pierna' },
        ],
      },
      {
        num: 4,
        question: 'Formas de realización de las técnicas de pierna',
        terms: [
          { jp: 'KEAGE', es: 'Ascendente' },
          { jp: 'KEBANASHI', es: 'Percutante' },
          { jp: 'KEKOMI', es: 'Penetrante' },
          { jp: 'FUMIKOMI', es: 'Aplastante' },
          { jp: 'FUMIKIRI', es: 'Cortante' },
        ],
      },
      {
        num: 5,
        question: 'Tipos de saludo (REI)',
        terms: [
          { jp: 'RITSU REI', es: 'Saludo de pie' },
          { jp: 'OTAGAINI REI', es: 'Saludo recíproco' },
          { jp: 'SENSEINI REI', es: 'Saludo al maestro' },
          { jp: 'SOMENI REI', es: 'Saludo al frente' },
          { jp: 'ZA REI', es: 'Saludo de ceremonia' },
        ],
      },
      {
        num: 6,
        question: '¿Qué es y para qué sirve el MOKUSO?',
        answer: 'Es el acto de meditación antes o después de la clase. Sirve, al empezar, para centrarnos en el trabajo a realizar y, al terminar, para relajarnos de la tensión mantenida y volver a la actividad normal.',
      },
      {
        num: 7,
        question: '¿Para qué sirve el trabajo de los KATAS?',
        answer: 'Sirve para desarrollar los elementos fundamentales del KARATE, pues en ellos están los principios básicos, las técnicas y la tradición de este Arte.',
      },
      {
        num: 8,
        question: 'Principales puntos en la ejecución de un KATA',
        terms: [
          { jp: 'CHAKUGAN', es: 'Mirada' },
          { jp: 'HYOSHI', es: 'Ritmo' },
          { jp: 'ZANSHIN', es: 'Alerta continua' },
          { jp: 'KI', es: 'Energía interna' },
          { jp: 'ENBUSEN', es: 'Línea de realización' },
          { jp: 'KIME', es: 'Fuerza' },
          { jp: 'KIAI', es: 'Grito de concentración' },
          { jp: 'KIHAKU', es: 'Vivencia' },
        ],
      },
      {
        num: 9,
        question: '¿Qué es BUNKAI KUMITE?',
        answer: 'Es la aplicación práctica de las técnicas del kata.',
      },
      {
        num: 10,
        question: '¿Qué es y para qué sirve el ENBUSEN?',
        answer: 'Son las líneas de ejecución y sirve para determinar las direcciones que se deben seguir al ejecutar el kata.',
      },
      {
        num: 11,
        question: '¿Para qué sirve el trabajo de KUMITE?',
        answer: 'Para demostrar la efectividad de las técnicas tanto en ataque como en defensa.',
      },
      {
        num: 12,
        question: 'Puntos importantes en el trabajo de KUMITE',
        answer: 'Distancia · Anticipación · Defensa · Ataque · Táctica',
      },
    ],
  },

  '2dan': {
    gradeTag: 'Teoría · Segundo Grado',
    title: 'CN Negro 2.º DAN',
    meta: '11 preguntas · Incluye temario CN Negro y 1.º DAN · Normativa RFEK 2026 v1.2.1',
    note: 'El aspirante deberá conocer el temario de los grados anteriores (CN Negro y 1.º DAN).',
    topics: [
      {
        num: 1,
        question: 'Conocimiento en profundidad del propio estilo',
        develop: true,
        answer: 'El aspirante deberá conocer su estilo en profundidad.',
      },
      {
        num: 2,
        question: 'Bunkai de un kata superior',
        develop: true,
        answer: 'Deberá conocer, al menos a nivel teórico, el bunkai de uno de los katas superiores que presente, determinado por el propio aspirante. El Tribunal, si lo estima oportuno, podrá pedir alguna aclaración.',
      },
      {
        num: 3,
        question: '¿Qué significa KARATE DO?',
        terms: [
          { jp: 'KARA', es: 'Vacío' },
          { jp: 'TE', es: 'Mano' },
          { jp: 'DO', es: 'Camino espiritual' },
        ],
      },
      {
        num: 4,
        question: 'Explicación completa de una posición',
        develop: true,
        answer: 'Nombre, superficie de asentamiento, distribución del peso, situación del tronco y demás características generales, así como las posibilidades en su aplicación práctica.',
      },
      {
        num: 5,
        question: 'Explicación completa de una técnica',
        develop: true,
        answer: 'De las presentadas en defensa, ataque o contraataque (puño, mano, codo o pierna): punto de partida, recorrido y terminación, así como las posibilidades en su aplicación práctica.',
      },
      {
        num: 6,
        question: 'Explicación y finalidad de los movimientos de un kata',
        develop: true,
        answer: 'El aspirante explicará la finalidad de los movimientos de cualquiera de los katas que presenta.',
      },
      {
        num: 7,
        question: 'Formas de utilización de la cadera',
        terms: [
          { jp: 'JYUN KAITEN', es: 'En el mismo sentido que la técnica' },
          { jp: 'GYAKU KAITEN', es: 'En sentido contrario a la técnica' },
          { jp: 'ZENPO', es: 'En avance' },
          { jp: 'KOHO', es: 'En retroceso' },
          { jp: 'JOHO', es: 'Ascendente' },
          { jp: 'KAHO', es: 'Descendente' },
        ],
      },
      {
        num: 8,
        question: 'Posiciones del tronco',
        terms: [
          { jp: 'SHOMEN (MAE)', es: 'Frontal' },
          { jp: 'SOKUMEN (YOKO)', es: 'Lateral' },
          { jp: 'HANMI', es: 'Semifrontal' },
          { jp: 'GYAKU HANMI', es: 'Inversa semifrontal' },
        ],
      },
      {
        num: 9,
        question: 'Partes de la mano y el brazo',
        terms: [
          { jp: 'HAIWAN / UDE', es: 'Antebrazo' },
          { jp: 'EMPI / HIJI', es: 'Codo' },
          { jp: 'SEIKEN', es: 'Puño frontal' },
          { jp: 'URAKEN', es: 'Puño del revés' },
          { jp: 'NUKITE', es: 'Punta de los dedos' },
          { jp: 'SEIRYUTO', es: 'Parte inferior de la muñeca' },
          { jp: 'KENTSUI / TETTSUI', es: 'Puño de martillo' },
          { jp: 'TEISHO / SHOTEI', es: 'Base de la palma de la mano' },
          { jp: 'NAKADAKA KEN', es: 'Puño del medio dedo' },
          { jp: 'NAKADAKA IPPON KEN', es: 'Puño del dedo índice' },
          { jp: 'KEITO', es: 'Extremo interior de la muñeca' },
          { jp: 'SHUTO', es: 'Borde externo de la mano' },
          { jp: 'HAITO', es: 'Borde interno de la mano' },
          { jp: 'KENTOS', es: 'Nudillos' },
          { jp: 'HAISU', es: 'Dorso de la mano' },
        ],
      },
      {
        num: 10,
        question: 'Partes del pie y la pierna',
        terms: [
          { jp: 'JO SOKUTEI', es: 'Base de los dedos' },
          { jp: 'KAKATO', es: 'Talón' },
          { jp: 'HEISOKU', es: 'Empeine' },
          { jp: 'HIZA', es: 'Rodilla' },
          { jp: 'SOKUTEI', es: 'Planta del pie' },
          { jp: 'SOKUTO', es: 'Canto externo del pie' },
          { jp: 'TSUMASAKI', es: 'Punta de los dedos' },
        ],
      },
      {
        num: 11,
        question: 'Tipos de desplazamiento por dirección',
        terms: [
          { jp: 'DE ASHI', es: 'Hacia delante' },
          { jp: 'HIRI ASHI', es: 'Hacia atrás' },
          { jp: 'YOKO ASHI', es: 'Lateral' },
          { jp: 'MAWARI ASHI', es: 'Circular' },
          { jp: 'TOBI ASHI', es: 'En salto' },
          { jp: 'YORI ASHI', es: 'De ambos pies' },
        ],
        matices: [
          { jp: 'HIDARI', es: 'izquierda' },
          { jp: 'MIGI', es: 'derecha' },
          { jp: 'NANAME', es: 'diagonal' },
        ],
      },
    ],
  },

  '3dan': {
    gradeTag: 'Teoría · Tercer Grado',
    title: 'CN Negro 3.º DAN',
    meta: '7 preguntas · Incluye temario CN Negro, 1.º y 2.º DAN · Normativa RFEK 2026 v1.2.1',
    note: 'El aspirante deberá conocer el temario de los grados anteriores (CN Negro, 1.º DAN y 2.º DAN).',
    topics: [
      {
        num: 1,
        question: 'Conocimiento de otro estilo y de la Normativa',
        answer: 'Además del propio estilo, el aspirante deberá conocer las características técnicas, posiciones fundamentales y fundador de cualquier otro estilo determinado por el propio aspirante. Así mismo, tendrá conocimiento del temario general de la Normativa de Grados.',
        styles: referenceStyles,
      },
      {
        num: 2,
        question: 'Kata voluntario: historia, técnica y aplicación',
        develop: true,
        answer: 'Deberá conocer, a nivel teórico y en profundidad, todos los aspectos históricos, técnicos y de aplicación práctica del kata voluntario que presenta.',
      },
      {
        num: 3,
        question: '¿Qué se consigue con el trabajo de los katas?',
        develop: true,
        answer: 'El aspirante elaborará una respuesta personal y razonada sobre los beneficios del trabajo de katas en el karate.',
      },
      {
        num: 4,
        question: 'Explicación de un tipo de kumite',
        develop: true,
        answer: 'El aspirante explicará en profundidad un tipo de kumite a su elección.',
      },
      {
        num: 5,
        question: 'Ventajas y desventajas del kumite de competición',
        develop: true,
        answer: 'El aspirante argumentará las ventajas e inconvenientes del trabajo de kumite en competición reglamentada.',
      },
      {
        num: 6,
        question: 'Tipos de respiración',
        terms: [
          { jp: 'DONTO', es: 'Normal' },
          { jp: 'IBUKI', es: 'Diafragmática con contracción abdominal sonora' },
          { jp: 'IBUKI NOGARE', es: 'Diafragmática con contracción abdominal sin ruido' },
          { jp: 'NOGARE', es: 'Diafragmática sin contracción abdominal' },
          { jp: 'IBUKI SANKAI', es: 'Profunda, concentrada, sonora' },
        ],
      },
      {
        num: 7,
        question: 'Tipos de kumite',
        terms: [
          { jp: 'IPPON KUMITE', es: 'Asalto a un paso y/o una técnica' },
          { jp: 'SANBON KUMITE', es: 'Asalto a tres pasos y/o tres técnicas' },
          { jp: 'GOHON KUMITE', es: 'Asalto a cinco pasos y/o cinco técnicas' },
          { jp: 'YAKUSOKU KUMITE', es: 'Asalto de estudio convencional entrelazado' },
          { jp: 'JYU IPPON KUMITE', es: 'Asalto libre a una técnica' },
          { jp: 'JYU KUMITE', es: 'Asalto libre' },
          { jp: 'SHIAI KUMITE', es: 'Asalto reglamentado' },
        ],
      },
    ],
  },
}
