<template>
  <RouterLink :to="to" class="back-link">{{ label }}</RouterLink>
</template>

<script setup>
defineProps({
  to: { type: [String, Object], default: '/teoria' },
  label: { type: String, default: '← Volver' },
})
</script>

<style scoped>
.back-link {
  @apply inline-flex items-center gap-2 text-muted no-underline text-sm tracking-[0.15em] uppercase mb-8 transition-colors duration-200 hover:text-gold py-2;
}
</style>
