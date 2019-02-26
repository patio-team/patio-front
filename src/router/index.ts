import Vue from "vue";
import Router from "vue-router";

import GroupList from "@/views/GroupList/GroupList.vue";
import Login from "@/views/Login/Login.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: GroupList,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    // NOTE: Don"t delete, useful to know how to create chunks of views
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ "./views/About.vue"),
    // },
  ],
});
