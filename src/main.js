import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './main.css';
import './assets/tailwind.css';
import { useUser } from './stores/user.js'

const app = createApp(App)

// Initialize authentication before mounting
const { initializeAuth } = useUser()
initializeAuth().then(() => {
  app.use(router).mount('#app')
})