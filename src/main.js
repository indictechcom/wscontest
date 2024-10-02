import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './main.css';
import './assets/tailwind.css';


createApp(App).use(router).mount('#app')