import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './main.css';
import './assets/tailwind.css';

const app = createApp(App);

// Register the router
app.use(router);

// Mount the app
app.mount('#app');
