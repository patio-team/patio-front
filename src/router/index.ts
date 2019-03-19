/*!
 * Copyright (C) 2019 Kaleidos Open Source SL
 *
 * This file is part of Dont Worry Be Happy (DWBH).
 * DWBH is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * DWBH is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with DWBH.  If not, see <https://www.gnu.org/licenses/>.
 */

import Vue from "vue";
import Router from "vue-router";

import i18n from "@/i18n";

import CreateGroup from "@/views/CreateGroup/CreateGroup.vue";
import GroupDetail from "@/views/GroupDetail/GroupDetail.vue";
import GroupList from "@/views/GroupList/GroupList.vue";
import Login from "@/views/Login/Login.vue";
import Vote from "@/views/Vote/Vote.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/groups/:id/edit",
      name: "groups:edit",
      // TODO
    },
    {
      path: "/groups/create",
      name: "groups:create",
      component: CreateGroup,
    },
    {
      path: "/groups/:id",
      name: "groups:detail",
      component: GroupDetail,
    },
    {
      path: "/groups",
      name: "groups:list",
      component: GroupList,
    },
    {
      path: "/groups/:group/votings/:voting",
      name: "groups:votings:detail",
    },
    {
      path: "/groups/:group/votings/:voting/vote",
      name: "votings:vote",
      component: Vote,
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

router.beforeEach((to, from, next) => {
   // For dev purpose. Change current locale with an url query param, 'lang'.
   // E.g. 'http://localhost:9000/?lang=es'
  const lang: string = to.query.lang as string;
  if (lang && i18n.availableLocales.includes(lang) && lang !== i18n.locale) {
    i18n.locale = lang;
  }
  return next();
});

export default router;
