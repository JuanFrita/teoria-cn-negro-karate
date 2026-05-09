<template>
  <HomeLayout>
    <div class="flex flex-col gap-4">
      <CardItem
        v-for="card in testCards"
        :key="card.title"
        :label="card.label"
        :title="card.title"
        :dans="card.dans"
        :href="card.href"
      />
    </div>
  </HomeLayout>
</template>

<script setup>
import HomeLayout from '../components/HomeLayout.vue'
import CardItem from '../components/CardItem.vue'

const testCards = [
  { label: 'Cinturón Negro', title: 'CN Negro', href: 'https://forms.gle/n87FYkBsotNK84pi8', dans: 0 },
  { label: 'Primer Grado', title: 'CN Negro 1.º DAN', href: 'https://forms.gle/m4QF3WxFHqVgqcXK8', dans: 1 },
  { label: 'Segundo Grado', title: 'CN Negro 2.º DAN', href: null, dans: 2 },
  { label: 'Tercer Grado', title: 'CN Negro 3.º DAN', href: null, dans: 3 },
]
</script>
