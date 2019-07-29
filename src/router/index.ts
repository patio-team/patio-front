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
import EditGroup from "@/views/EditGroup/EditGroup.vue";
import GroupDetail from "@/views/GroupDetail/GroupDetail.vue";
import GroupList from "@/views/GroupList/GroupList.vue";
import Vote from "@/views/Vote/Vote.vue";
import MyProfile from "@/views/MyProfile/MyProfile.vue";
import Login from "@/views/Login/Login.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      redirect: { name: "groups:list" },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/me",
      name: "my-profile",
      component: MyProfile,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/groups",
      name: "groups:list",
      component: GroupList,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/groups/create",
      name: "groups:create",
      component: CreateGroup,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/groups/:groupId",
      name: "groups:detail",
      component: GroupDetail,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/groups/:groupId/edit",
      name: "groups:edit",
      component: EditGroup,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/groups/:group/votings/:voting",
      name: "groups:votings:detail",
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/groups/:groupId/votings/:votingId/vote",
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

router.beforeEach(async (to, from, next) => {
   // For dev purpose. Change current locale with an url query param, 'lang'.
   // E.g. 'http://localhost:9000/?lang=es'
  const lang: string = to.query.lang as string;
  if (lang && i18n.availableLocales.includes(lang) && lang !== i18n.locale) {
    i18n.locale = lang;
  }

  // Check authentication requirements
  const store = require("@/store").default; // Noto: To prevent circular dependency
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    if (!await store.dispatch("auth/getMyProfile")) {
      return next({
        name: "login",
        query: { next: window.location.pathname },
      });
    }
  }

  return next();
});

export default router;
