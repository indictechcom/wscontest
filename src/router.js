import { createRouter, createWebHistory } from "vue-router";

import Home from "./components/Home.vue";
import Contestlist from "./components/Contestlist.vue";
import Createcontest from "./components/Createcontest.vue";
import Contestdetails from "./components/Contestdetails.vue";
import Judging from "./components/Judging.vue";
import { list } from "postcss";

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
      redirect: "/Contestlist"
    },
    {
      path: "/Contestlist",
      name: "Contestlist",
      component: Contestlist,
    },
    {
      path: "/Createcontest",
      name: "Createcontest",
      component: Createcontest,
    },
    {
      path: "/Contestdetails/:id",
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
