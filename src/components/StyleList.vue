<template>
  <div class="flex flex-col gap-4 mt-4">
    <article
      v-for="style in styles"
      :key="style.name"
      class="bg-surface2 border border-theme rounded-lg px-4 py-3"
    >
      <h3 class="font-bebas text-xl tracking-[0.08em] text-gold leading-none mb-2">{{ style.name }}</h3>

      <dl class="flex flex-col gap-1.5 text-[0.9375rem]">
        <div>
          <dt class="inline text-xs tracking-[0.12em] uppercase text-gold-dim">Fundador · </dt>
          <dd class="inline">{{ style.founder }}</dd>
        </div>
        <div>
          <dt class="inline text-xs tracking-[0.12em] uppercase text-gold-dim">Significado · </dt>
          <dd class="inline">{{ style.meaning }}</dd>
        </div>
        <div>
          <dt class="text-xs tracking-[0.12em] uppercase text-gold-dim mb-0.5">Posiciones características</dt>
          <dd class="leading-relaxed">{{ style.stances.join(' · ') }}</dd>
        </div>
      </dl>
    </article>
  </div>
</template>

<script setup>
defineProps({
  styles: { type: Array, required: true },
})
</script>
