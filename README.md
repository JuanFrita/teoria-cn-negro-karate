# Karate · CN Negro

Teoría y tests para preparar los exámenes de cinturón negro y grados DAN de karate, según la
**Normativa Nacional de Grados de la RFEK y DA (enero 2026, v1.2.1)**.

Web estática, sin servidor, sin cuentas y sin ánimo de lucro.

🔗 **[teoria-cn-negro-karate](https://juanfrita.github.io/teoria-cn-negro-karate/)**

> Material de estudio no oficial. Ante cualquier duda manda la normativa publicada por la federación
> y lo que te diga tu maestro.

---

## Qué tiene

**Temario completo** de los cuatro grados (CN Negro, 1.º, 2.º y 3.er DAN), con el glosario japonés-español
que entra en cada uno y una marca visible en los puntos que la normativa deja «a desarrollar por el
aspirante».

**Tests de repaso** con 102 preguntas, en dos modos:

- **Estudio** — corrige al instante. Si fallas, te marca tu respuesta, la correcta y la explicación oficial.
- **Examen** — preguntas en orden aleatorio, sin pistas, y la nota al terminar.

En ambos modos **las opciones se barajan siempre**, para que no se aprenda la posición de la respuesta
en vez de la respuesta.

Además: bloques temáticos para estudiar por partes, repesca de solo los fallos, mejor marca guardada
por grado y por bloque, tema claro/oscuro y atajos de teclado.

**Preguntas según tu estilo.** El temario pregunta por el estilo *que tú practicas*, así que en el
CN Negro eliges el tuyo (de momento Shito Ryu o Shotokan) y las preguntas de fundador y significado
se ajustan solas. La elección se recuerda entre visitas.

| Grado | Preguntas | Bloques |
|---|---|---|
| CN Negro | 15 (+ variantes por estilo) | 3 |
| 1.º DAN | 27 | 3 |
| 2.º DAN | 42 | 5 |
| 3.er DAN | 12 | 2 |

## Desarrollo

Requiere Node 20 o superior.

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # compila a dist/
npm run preview  # sirve dist/ como en producción
npm run check    # valida los tests — pásalo antes de subir nada
```

`npm run check` es el importante. Todo el cuestionario se genera desde un archivo de datos, así que un
índice de respuesta mal puesto daría por fallada la opción correcta sin avisar. El script comprueba
ids duplicados, opciones repetidas, índices fuera de rango, bloques huérfanos, estilos desconocidos,
que ningún estilo deje un bloque sin preguntas y que el barajado nunca pierda la respuesta buena.

## Cómo añadir o corregir contenido

Todo el contenido vive en tres archivos. No hace falta tocar componentes.

### Estilos — `src/data/styles.js`

La lista de estilos, con `id`, nombre, fundador, significado y posiciones características. Es fuente
única: de aquí salen las fichas de la teoría **y** el selector «Tu estilo» del test. Para añadir uno,
mételo en la lista y crea sus preguntas en `tests.json` con `"style": "<id>"`.

### Teoría — `src/data/teoria.js`

Un objeto por grado (`cn`, `1dan`, `2dan`, `3dan`). Cada tema se pinta según los campos que tenga:

```js
{ num: 4, question: '¿Qué significa CHAKUGAN?', answer: 'Mirada.' }              // texto
{ num: 2, question: '…', terms: [{ jp: 'KARA', es: 'Vacío' }] }                  // glosario
{ num: 1, question: '…', styles: referenceStyles }                              // fichas de estilo
{ num: 3, question: '…', develop: true, answer: '…' }                           // + aviso al aspirante
```

`develop: true` es independiente del resto: un tema puede llevar aviso **y** contenido.

### Tests — `src/data/tests.json`

```jsonc
{
  "1dan": {
    "gradeTag": "Test · Primer Grado",
    "title": "CN Negro 1.º DAN",
    "source": "Normativa RFEK 2026 v1.2.1",
    "blocks": [{ "id": "saludos", "label": "Saludos y MOKUSO" }],
    "questions": [{
      "id": "1dan-za-rei",         // único en todo el archivo
      "block": "saludos",          // obligatorio si el grado declara bloques
      "style": "shito-ryu",        // opcional: sin él, la pregunta es común a todos los estilos
      "question": "¿Qué es ZA REI?",
      "options": ["Saludo al maestro", "Saludo de ceremonia", "Saludo al frente"],
      "answer": 1,                 // índice, empezando en 0
      "explanation": "ZA REI es el saludo de ceremonia."
    }]
  }
}
```

Dos reglas al escribir preguntas:

1. **Un término por pregunta.** Nada de «X e Y son, respectivamente…»: si el distractor es el par
   invertido, sabiendo uno de los dos ya se acierta.
2. **Cuidado con la longitud.** Si la opción correcta es siempre la más larga, se acierta sin leer.
3. **Nada de preguntar por el examen.** «¿Qué debe detallar el aspirante al explicar una posición?»
   evalúa el procedimiento, no el karate. Pregunta por el contenido.

Al terminar, `npm run check`.

## Analítica

Usa [Umami](https://umami.is): anónima, sin cookies y respetando la señal «no rastrear» del navegador.

La configuración no está en el repo. En producción llega desde los secretos del repositorio
(*Settings → Secrets and variables → Actions*):

| Secreto | Variable de build | Para qué |
|---|---|---|
| `UMAMI_WEBSITE_ID` | `VITE_UMAMI_WEBSITE_ID` | Id del sitio en Umami |
| `UMAMI_SRC` | `VITE_UMAMI_SRC` | Solo si te autoalojas; vacío usa la nube |

Para desarrollo local, `cp .env.example .env.local` y rellena lo que necesites. Todos los `.env` están
en `.gitignore` menos el `.example`.

**Sin identificador no se compila nada de analítica.** No es que quede apagada: Vite elimina la
función entera del bundle. Se comprueba con `grep umami dist/assets/*.js` después de compilar.

## Despliegue

Cada push a `master` dispara `.github/workflows/deploy.yml`, que valida los tests, compila y publica
`dist/` en la rama `gh-pages`.

Al servirse desde una subcarpeta hay tres piezas que deben ir a la una, o las rutas profundas
devuelven 404 al recargar:

1. `base` en `vite.config.js` — el nombre del repo.
2. `public/404.html` — codifica la ruta pedida en la query.
3. El script de `index.html` — la descodifica antes de arrancar el router.

Si tocas una, comprueba las tres con `npm run build && npm run preview` y recarga a pelo en una ruta
como `/teoria/1dan`.

## Estructura

```
src/
├── data/          teoria.js · tests.json      ← el contenido
├── lib/           lógica pura: barajado, corrección, almacenamiento
├── composables/   estado del test y del tema
├── components/    UI, con quiz/ aparte
└── views/         una por ruta
scripts/           check-tests.mjs
```

Rutas: `/` (tests), `/teoria`, `/teoria/:grado`, `/test/:grado`, `/sobre`.

## Documentación

- **[TODO.md](TODO.md)** — contenido pendiente, sobre todo lo que la normativa deja a desarrollar por
  el aspirante y depende del estilo o el kata de cada uno.
- **[CLAUDE.md](CLAUDE.md)** — notas de arquitectura y decisiones, para trabajar con asistentes de IA.

## Créditos

Hecho por **Juan Francisco Sánchez García** — ingeniero informático con cuatro años de oficio,
estudiando un máster en ciencia de datos y 3.er DAN de karate.

OSU 🥋
