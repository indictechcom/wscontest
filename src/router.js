import { createRouter, createWebHistory } from 'vue-router';

import Home from './components/Home.vue';
import Contest from './components/Contest.vue';
import Graph from './components/Graph.vue';
import Createcontest from './components/Createcontest.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/Contest',
            name: 'Contest',
            component: Contest
        },
        {
            path: '/Graph',
            name: 'Graph',
            component: Graph
        },
        {
            path: '/Createcontest',
            name: 'Createcontest',
            component: Createcontest
        },
    ]
});

export default router;