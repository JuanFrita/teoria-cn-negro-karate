import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '../views/IndexPage.vue'
import TeoriaListPage from '../views/TeoriaListPage.vue'
import TeoriaPage from '../views/TeoriaPage.vue'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', name: 'home', component: IndexPage },
    { path: '/teoria', name: 'teoria', component: TeoriaListPage },
    { path: '/teoria/:grade', name: 'teoria-grade', component: TeoriaPage },
  ],
})
