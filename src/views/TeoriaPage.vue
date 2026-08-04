<template>
  <TheoryPage
    v-if="grade"
    :grade-tag="grade.gradeTag"
    :title="grade.title"
    :meta="grade.meta"
    back-label="← Toda la teoría"
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
      <!-- `develop` is orthogonal to the content type: a topic can both be
           developed by the candidate and carry terms or reference material. -->
      <DevelopBadge v-if="topic.develop" />

      <template v-if="topic.styles">
        <p>{{ topic.answer }}</p>
        <StyleList :styles="topic.styles" />
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
      <p v-else>{{ topic.answer }}</p>
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
import StyleList from '../components/StyleList.vue'
import NoteBox from '../components/NoteBox.vue'
import DevelopBadge from '../components/DevelopBadge.vue'

const route = useRoute()
const grade = computed(() => teoriaData[route.params.grade] ?? null)
</script>
