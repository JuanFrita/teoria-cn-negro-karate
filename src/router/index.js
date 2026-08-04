import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '../views/IndexPage.vue'
import TeoriaListPage from '../views/TeoriaListPage.vue'
import TeoriaPage from '../views/TeoriaPage.vue'
import TestPage from '../views/TestPage.vue'
import AboutPage from '../views/AboutPage.vue'
import { teoriaData } from '../data/teoria.js'
import testsData from '../data/tests.json'

const SITE = 'Karate · CN Negro'

const STATIC_TITLES = {
  home: 'Tests',
  teoria: 'Teoría',
  sobre: 'Sobre esto',
}

function sectionTitle(route) {
  if (route.name === 'teoria-grade') {
    return `Teoría · ${teoriaData[route.params.grade]?.title ?? 'Grado no encontrado'}`
  }
  if (route.name === 'test-grade') {
    return `Test · ${testsData[route.params.grade]?.title ?? 'Grado no encontrado'}`
  }
  return STATIC_TITLES[route.name] ?? null
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', name: 'home', component: IndexPage },
    { path: '/teoria', name: 'teoria', component: TeoriaListPage },
    { path: '/teoria/:grade', name: 'teoria-grade', component: TeoriaPage },
    { path: '/test/:grade', name: 'test-grade', component: TestPage },
    { path: '/sobre', name: 'sobre', component: AboutPage },
  ],
})

// En una SPA el título no cambia solo, y es la primera pista que da un lector
// de pantalla al llegar a una página.
router.afterEach(to => {
  const section = sectionTitle(to)
  document.title = section ? `${section} · ${SITE}` : SITE
})

export default router
