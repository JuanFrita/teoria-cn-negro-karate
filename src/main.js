import { createApp } from 'vue'
import router from './router/index.js'
import App from './App.vue'
import { loadAnalytics } from './lib/analytics.js'
import './assets/main.css'

createApp(App).use(router).mount('#app')

// Umami tracks SPA navigation on its own; it just needs to be on the page.
loadAnalytics()
