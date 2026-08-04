<template>
  <div class="noise" aria-hidden="true" />

  <!-- Mueve el foco al contenido sin tocar el historial: una navegación por
       ancla dispararía el scrollBehavior del router y volvería arriba. -->
  <a class="skip-link" href="#contenido" @click.prevent="focusMain">Saltar al contenido</a>

  <RouterView v-slot="{ Component, route }">
    <!-- Keyed by path so per-page state (quiz progress) resets between grades -->
    <component :is="Component" :key="route.path" />
  </RouterView>
</template>

<script setup>
function focusMain() {
  const main = document.getElementById('contenido')
  if (!main) return
  main.focus()
  main.scrollIntoView()
}
</script>
