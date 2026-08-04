<template>
  <TheoryPage
    grade-tag="Sobre esto"
    title="El proyecto"
    meta="Quién lo hace y cómo está hecho"
    back-to="/"
    back-label="← Volver"
  >
    <section class="about-section">
      <h2 class="about-heading">Qué es esto</h2>
      <p>
        Una ayuda para estudiarse la teoría de los exámenes de cinturón negro y grados DAN de karate,
        con el temario a mano y tests para repasarlo hasta que salga solo.
      </p>
      <p>
        Empezó siendo una idea simple: que nadie tenga que pelearse con un PDF de cincuenta páginas
        para preparar el examen.
      </p>
    </section>

    <section class="about-section">
      <h2 class="about-heading">Quién lo hace</h2>
      <p>
        Me llamo <strong>Juan Francisco Sánchez García</strong>. Soy ingeniero informático con cuatro
        años de oficio a las espaldas y, mientras tanto, ando estudiándome un
        <strong>máster en ciencia de datos</strong> <span role="img" aria-label="con gafas de sol">😎</span>.
        Aunque, para qué nos vamos a engañar: en casa sigo siendo el que imprime los papeles, el que
        vuelve a enchufar el cable que alguien había desenchufado y el que resucita el router los
        domingos.
      </p>
      <p>
        En el tatami soy <strong>3.er DAN</strong>, con el cuarto ya en el punto de mira. Así que esto
        no nació de una idea abstracta: nació de estudiarme yo mismo el temario, grado tras grado, y
        pensar que tenía que haber una forma mejor que releer un PDF hasta que te sangran los ojos.
      </p>
      <p>
        Lo mantengo yo solo, en mis ratos libres y sin ánimo de lucro: ni anuncios, ni registro, ni
        datos que vender. Si te sirve para sacarte el cinturón, ya ha merecido la pena.
      </p>
      <p class="text-muted text-[0.8rem]">
        ¿Has visto una errata o falta algo del temario? Se agradece el aviso… si me tienes en los
        contactos, claro, que por aquí no dejo ninguno <span role="img" aria-label="ninja">🥷</span>
      </p>
    </section>

    <section class="about-section">
      <h2 class="about-heading">Cómo está hecho</h2>
      <p>
        Es una web estática, sin servidor detrás. Todo —temario y preguntas— vive en dos archivos de
        texto dentro del propio proyecto, así que añadir o corregir contenido es editar un archivo,
        no tocar código.
      </p>
      <dl class="about-list">
        <div v-for="item in stack" :key="item.label">
          <dt>{{ item.label }}</dt>
          <dd>{{ item.value }}</dd>
        </div>
      </dl>
    </section>

    <section class="about-section">
      <h2 class="about-heading">Cómo lo construyo</h2>
      <p>
        Trabajo con asistentes de IA, pero con método y con red. No es «hazme una web»: es un proceso
        con fases, revisiones y verificación, montado sobre tres piezas.
      </p>

      <h3 class="about-subheading">SDD · desarrollo guiado por especificación</h3>
      <p>
        Nada de código a la primera. Primero se acota la idea, luego se escribe la especificación y un
        plan por fases, y solo entonces se implementa. Así el asistente no improvisa: ejecuta algo
        acordado.
      </p>
      <ol class="flow">
        <li v-for="step in flowSdd" :key="step"><span>{{ step }}</span></li>
      </ol>

      <h3 class="about-subheading">Superpowers + plugins LSP</h3>
      <p>
        Un conjunto de habilidades que imponen la disciplina: explorar antes de crear, depurar de forma
        sistemática antes de proponer arreglos, escribir la prueba antes que el código y verificar de
        verdad antes de dar nada por terminado. Los plugins LSP le dan al asistente la misma comprensión
        del proyecto que tiene el editor —definiciones, referencias, errores de tipos— en vez de buscar
        texto a ciegas.
      </p>

      <h3 class="about-subheading">ECC · calidad y seguridad</h3>
      <p>
        Un paquete de reglas siempre activas —estilo, pruebas, seguridad, convenciones de git— más
        agentes revisores especializados que entran solos cuando toca. Nada se da por bueno sin pasar
        por la revisión de código y la de seguridad.
      </p>
      <ol class="flow">
        <li v-for="step in flowEcc" :key="step"><span>{{ step }}</span></li>
      </ol>

      <p class="text-muted text-[0.8rem]">
        El temario, en cambio, está contrastado a mano contra el PDF de la normativa, pregunta a
        pregunta. La IA acelera el trabajo; la responsabilidad de lo que pone aquí es mía.
      </p>
    </section>

    <section class="about-section">
      <h2 class="about-heading">Tus datos</h2>
      <p>
        No hay cuentas, ni cookies, ni publicidad. Para saber si esto le sirve a alguien uso
        <strong>Umami</strong>: una analítica anónima y sin cookies que cuenta visitas y páginas vistas,
        pero no te identifica ni te sigue por otras webs. Si tu navegador pide no ser rastreado, ni
        siquiera eso se cuenta.
      </p>
      <p>
        El tema que elijas y tus mejores marcas de cada test se guardan <strong>solo en tu navegador</strong>:
        no salen de tu dispositivo, no los veo yo, y se borran si limpias los datos de navegación.
      </p>
    </section>

    <section class="about-section">
      <h2 class="about-heading">La fuente</h2>
      <p>
        Todo el temario sale de la <strong>Normativa Nacional de Grados de la RFEK y DA</strong>,
        edición de enero de 2026, versión 1.2.1.
      </p>
      <p class="text-muted text-[0.8rem]">
        Esto es material de estudio no oficial. Ante cualquier duda, manda siempre la normativa
        publicada por la federación y lo que te diga tu maestro.
      </p>
    </section>

    <a
      class="about-link"
      href="https://github.com/JuanFrita/teoria-cn-negro-karate"
      target="_blank"
      rel="noopener noreferrer"
    >
      Ver el código en GitHub ↗
      <span class="sr-only">(se abre en una pestaña nueva)</span>
    </a>

    <p class="text-center text-xs text-muted tracking-[0.15em] mt-8">OSU</p>
  </TheoryPage>
</template>

<script setup>
import TheoryPage from '../components/TheoryPage.vue'

const flowSdd = ['Idea', 'Se acota', 'Especificación', 'Plan por fases', 'Implementación', 'Verificación']
const flowEcc = ['Código', 'Revisión de código', 'Revisión de seguridad', 'Puerta de calidad', 'Commit']

const stack = [
  { label: 'Interfaz', value: 'Vue 3 y Tailwind CSS' },
  { label: 'Construcción', value: 'Vite' },
  { label: 'Alojamiento', value: 'GitHub Pages, desplegado solo en cada cambio' },
  { label: 'Contenido', value: 'Dos archivos de datos: la teoría y las preguntas de los tests' },
  { label: 'Corrección', value: 'Se hace entera en tu navegador, sin enviar nada a ningún sitio' },
  { label: 'Analítica', value: 'Umami: anónima, sin cookies y respetando «no rastrear»' },
]
</script>

<style scoped>
.about-section {
  @apply border-b border-theme py-6 first:pt-0 last:border-b-0;
}

.about-heading {
  @apply font-bebas text-xl tracking-[0.12em] text-gold mb-3;
}

.about-section p {
  @apply text-[0.9375rem] text-muted leading-relaxed;
}

.about-section p + p {
  @apply mt-3;
}

.about-section strong {
  @apply text-app-text font-normal;
}

.about-subheading {
  @apply font-bebas text-base tracking-[0.14em] text-app-text mt-5 mb-2;
}

.flow {
  @apply flex flex-wrap items-center gap-x-2 gap-y-2 list-none p-0 mt-3 mb-1;
}

.flow li {
  @apply flex items-center gap-2 text-[0.75rem] tracking-[0.06em];
}

.flow li span {
  @apply bg-surface2 border border-theme rounded-md px-2.5 py-1 text-muted;
}

.flow li:not(:last-child)::after {
  content: '→';
  @apply text-gold-dim;
}

.about-list {
  @apply flex flex-col gap-2.5 mt-4;
}

.about-list > div {
  @apply grid grid-cols-[6.5rem_1fr] gap-3 items-baseline;
}

.about-list dt {
  @apply text-[0.75rem] tracking-[0.12em] uppercase text-gold-dim;
}

.about-list dd {
  @apply text-[0.9375rem] text-muted leading-snug;
}

.about-link {
  @apply flex items-center justify-center w-full mt-8 bg-surface border border-strong rounded-xl px-5 py-3.5 font-bebas text-lg tracking-[0.12em] text-app-text no-underline transition-[transform,background-color,border-color,color] duration-300 ease-fluid;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}

.about-link:hover,
.about-link:focus-visible {
  @apply bg-surface2 text-gold;
  border-color: var(--border-hover);
  transform: translate3d(0, -3px, 0);
}
</style>
