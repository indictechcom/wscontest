import { createRouter, createWebHistory } from "vue-router";

import Home from "./components/Home.vue";
import Contest from "./components/Contest.vue";
import Graph from "./components/Graph.vue";
import Createcontest from "./components/Createcontest.vue";
import Contestdetails from "./components/Contestdetails.vue";
import Judging from "./components/Judging.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/Contest",
      name: "Contest",
      component: Contest,
    },
    {
      path: "/Graph",
      name: "Graph",
      component: Graph,
    },
    {
      path: "/Createcontest",
      name: "Createcontest",
      component: Createcontest,
    },
    {
      path: "/Contestdetails",
      name: "Contestdetails",
      component: Contestdetails,
    },
    {
      path: "/Judging",
      name: "Judging",
      component: Judging,
    },
  ],
});

export default router;
