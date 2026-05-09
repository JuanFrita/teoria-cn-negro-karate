<template>
  <div class="relative z-10 w-full max-w-[480px] mx-auto px-4 py-8 pb-16">
    <header class="text-center mb-8 pt-4">
      <div class="font-noto text-5xl text-gold-dim tracking-[0.3em] mb-2 opacity-60">空手道</div>
      <h1 class="font-bebas text-[clamp(2.8rem,8vw,4rem)] tracking-[0.12em] text-app-text leading-none mb-1.5">
        CN Negro
      </h1>
      <p class="text-xs text-muted tracking-[0.25em] uppercase">Selecciona sección</p>
      <div class="w-[60px] h-px bg-gold mx-auto mt-6 opacity-50" />
    </header>

    <nav class="flex gap-2 mb-8 bg-surface border border-theme rounded-full p-1" aria-label="Secciones">
      <RouterLink
        v-for="tab in tabs"
        :key="tab.to"
        :to="tab.to"
        class="flex-1 py-3 px-5 rounded-full font-bebas text-base tracking-[0.15em] transition-colors duration-200 text-center no-underline"
        :class="isActive(tab.to) ? 'bg-gold text-[#0A0A0A]' : 'text-muted hover:text-app-text'"
      >
        {{ tab.label }}
      </RouterLink>
    </nav>

    <slot />

    <footer class="mt-12 text-center text-xs text-muted tracking-[0.1em]">
      <p>Repite hasta dominar el temario · OSU</p>
    </footer>
  </div>
</template>

<script setup>
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()

function isActive(to) {
  if (to === '/') return route.path === '/'
  return route.path === to || route.path.startsWith(to + '/')
}

const tabs = [
  { to: '/', label: 'Tests' },
  { to: '/teoria', label: 'Teoría' },
]
</script>
