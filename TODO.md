# TODO — contenido pendiente

Todo lo que la Normativa RFEK 2026 v1.2.1 marca como **«a desarrollar por el aspirante»** o que
depende del estilo/kata concreto de cada uno. No se puede convertir en pregunta tipo test con una
respuesta única, así que lo dejo listado para que lo rellenes tú.

Los 10 temas afectados llevan `develop: true` en `src/data/teoria.js` y salen en la web con el aviso
«Desarrollar por el aspirante», para que nadie se piense que se le ha olvidado la respuesta.

Cuando añadas preguntas a `src/data/tests.json`, ejecuta `npm run check` antes de subir.

---

## 1. Estilos distintos de Shito Ryu y Shotokan

**Dónde:** `src/data/styles.js`

El material adjunto a la Normativa solo traía **Shito Ryu** y **Shotokan**, así que son los dos que
hay. Si en el club se practica otro (Goju Ryu, Wado Ryu…), se añade aquí:

```js
{ id: 'goju-ryu', name: 'Goju Ryu', founder: '…', meaning: '…', stances: ['…', '…'] }
```

Ojo con las `stances`: contrástalas contra el material de la escuela antes de darlas por buenas. Por
eso el test solo pregunta **fundador y significado**, que no admiten discusión, y no las posiciones.

`styles.js` es la fuente única y se usa en tres sitios, así que lo que toques sale en los tres:

- **CN Negro pregunta 1** — el estilo que practica el aspirante.
- **3.er DAN pregunta 1** — el segundo estilo que debe elegir (quien practica uno ya tiene el otro
  estudiado: características técnicas, posiciones fundamentales y fundador).
- **Selector «Tu estilo»** del test, que filtra las preguntas marcadas con `"style"`.

Para meter un estilo nuevo: añádelo a `styles.js` y crea sus preguntas en `tests.json` con
`"style": "<id>"`. `npm run check` avisa si un estilo deja algún bloque sin preguntas.

## 2. Características técnicas del propio estilo — 1.º DAN, pregunta 1

**Dónde:** `src/data/teoria.js` → `1dan.topics[0]`

Ahora mismo tiene una respuesta genérica. Convendría desarrollar las características técnicas
concretas del estilo del club (trabajo de cadera, respiración, transiciones, señas de identidad…).
Si acabas escribiéndolo, se puede sacar alguna pregunta de test.

## 3. Conocimiento del propio estilo en profundidad — 2.º DAN, pregunta 1

**Dónde:** `src/data/teoria.js` → `2dan.topics[0]`

Mismo caso que el anterior, pero con más nivel de detalle: historia, linaje, katas propios.

## 4. Bunkai del kata superior — 2.º DAN, pregunta 2

**Dónde:** `src/data/teoria.js` → `2dan.topics[1]`

Lo elige el propio aspirante, así que no hay respuesta única.

## 5. Explicación de una posición y de una técnica — 2.º DAN, preguntas 4 y 5

**Dónde:** `src/data/teoria.js` → `2dan.topics[3]` y `2dan.topics[4]`

El test no cubre el contenido concreto de cada posición o técnica.

Si quieres que esto sea estudiable de verdad, lo suyo sería una ficha por posición
(zenkutsu dachi, kokutsu dachi, kiba dachi, shiko dachi, nekoashi dachi…) con: superficie de
asentamiento, distribución del peso, situación del tronco y aplicación práctica. Eso da para una
sección nueva y bastantes preguntas.

## 6. Explicación y finalidad de los movimientos de un kata — 2.º DAN, pregunta 6

**Dónde:** `src/data/teoria.js` → `2dan.topics[5]`

Depende del kata que presente el aspirante.

## 7. Kata voluntario — 3.er DAN, pregunta 2

**Dónde:** `src/data/teoria.js` → `3dan.topics[1]`

Aspectos históricos, técnicos y de aplicación práctica del kata que presenta. Personal.

## 8. Las tres preguntas que la Normativa marca literalmente como «desarrollar por el aspirante» — 3.er DAN

**Dónde:** `src/data/teoria.js` → `3dan.topics[2]`, `[3]` y `[4]` (ya salen con el badge
«Desarrollar por el aspirante»)

- **¿Qué se consigue con el trabajo de los katas?**
- **Explicación de un tipo de kumite**
- **¿Cuáles son las ventajas y desventajas del trabajo de kumite de competición?**

Son preguntas de desarrollo y razonamiento propio: el tribunal valora el criterio del aspirante, no
una respuesta memorizada. Si quieres, se les puede añadir un guion de puntos a tocar sin darles la
respuesta hecha.
