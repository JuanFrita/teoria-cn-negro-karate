<template>
  <HomeLayout>
    <div class="flex flex-col gap-4">
      <CardItem
        v-for="card in teoriaCards"
        :key="card.title"
        :label="card.label"
        :title="card.title"
        :dans="card.dans"
        :badge="card.badge"
        :to="card.to"
      />
    </div>
  </HomeLayout>
</template>

<script setup>
import HomeLayout from '../components/HomeLayout.vue'
import CardItem from '../components/CardItem.vue'
import { teoriaData } from '../data/teoria.js'

const teoriaCards = [
  { label: 'Cinturón Negro', title: 'CN Negro', grade: 'cn', dans: 0 },
  { label: 'Primer Grado', title: 'CN Negro 1.º DAN', grade: '1dan', dans: 1 },
  { label: 'Segundo Grado', title: 'CN Negro 2.º DAN', grade: '2dan', dans: 2 },
  { label: 'Tercer Grado', title: 'CN Negro 3.º DAN', grade: '3dan', dans: 3 },
].map(card => ({
  ...card,
  to: { name: 'teoria-grade', params: { grade: card.grade } },
  badge: `Teoría · ${teoriaData[card.grade].topics.length} preguntas`,
}))
</script>
