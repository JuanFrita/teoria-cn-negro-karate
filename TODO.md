# TODO — contenido pendiente

Todo lo que la Normativa RFEK 2026 v1.2.1 marca como **«a desarrollar por el aspirante»** o que
depende del estilo/kata concreto de cada uno. No se puede convertir en pregunta tipo test con una
respuesta única, así que lo dejo listado para que lo rellenes tú.

Los 10 temas afectados llevan `develop: true` en `src/data/teoria.js` y salen en la web con el aviso
«Desarrollar por el aspirante», para que nadie se piense que se le ha olvidado la respuesta.

Cuando añadas preguntas a `src/data/tests.json`, ejecuta `npm run check` antes de subir.

---

## 1. Estilos distintos de Shito Ryu y Shotokan

**Dónde:** `src/data/teoria.js` → constante `referenceStyles` (arriba del todo)

El material adjunto al formulario solo traía Shito Ryu y Shotokan, así que son los dos que están
metidos. Si en el club se practica otro estilo, basta con añadirlo a esa lista:

```js
{ name: 'Goju Ryu', founder: '…', meaning: '…', stances: ['…', '…'] }
```

`referenceStyles` se usa en dos sitios a la vez, así que lo que añadas aparece en los dos:

- **CN Negro pregunta 1** — el estilo que practica el aspirante.
- **3.er DAN pregunta 1** — el segundo estilo que debe elegir (quien practica uno ya tiene el otro
  estudiado: características técnicas, posiciones fundamentales y fundador).

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

Lo elige el propio aspirante, así que no hay respuesta única. En el test sí hay una pregunta sobre
**quién elige el kata** (`3dan-bunkai-2dan`), que eso sí es objetivo.

## 5. Explicación de una posición y de una técnica — 2.º DAN, preguntas 4 y 5

**Dónde:** `src/data/teoria.js` → `2dan.topics[3]` y `2dan.topics[4]`

En el test están cubiertos los **criterios** que hay que citar (`2dan-explicar-posicion`,
`2dan-explicar-tecnica`), pero no el contenido concreto de cada posición o técnica.

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
