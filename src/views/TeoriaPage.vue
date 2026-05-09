<template>
  <TheoryPage
    v-if="grade"
    :grade-tag="grade.gradeTag"
    :title="grade.title"
    :meta="grade.meta"
  >
    <template v-if="grade.note" #note>
      <NoteBox>{{ grade.note }}</NoteBox>
    </template>

    <TopicItem
      v-for="topic in grade.topics"
      :key="topic.num"
      :num="topic.num"
      :question="topic.question"
    >
      <template v-if="topic.develop">
        <DevelopBadge />
        <p>{{ topic.answer }}</p>
      </template>
      <template v-else-if="topic.terms">
        <TermList :terms="topic.terms" />
        <p v-if="topic.matices" class="mt-3 text-sm text-muted">
          Matices:
          <template v-for="(m, i) in topic.matices" :key="m.jp">
            <span class="text-gold font-bebas tracking-[0.05em]">{{ m.jp }}</span> ({{ m.es }})
            <template v-if="i < topic.matices.length - 1"> · </template>
          </template>
        </p>
      </template>
      <template v-else>{{ topic.answer }}</template>
    </TopicItem>
  </TheoryPage>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { teoriaData } from '../data/teoria.js'
import TheoryPage from '../components/TheoryPage.vue'
import TopicItem from '../components/TopicItem.vue'
import TermList from '../components/TermList.vue'
import NoteBox from '../components/NoteBox.vue'
import DevelopBadge from '../components/DevelopBadge.vue'

const route = useRoute()
const grade = computed(() => teoriaData[route.params.grade] ?? null)
</script>
