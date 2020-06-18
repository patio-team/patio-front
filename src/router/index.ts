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

import GroupList from "@/views/GroupList/GroupList.vue";
import CreateGroup from "@/views/CreateGroup/CreateGroup.vue";
import GroupLayout from "@/views/GroupLayout/GroupLayout.vue";
import GroupDetail from "@/views/GroupDetail/GroupDetail.vue";
import GroupMemberProfile from "@/views/GroupMemberProfile/GroupMemberProfile.vue";
import GroupDetailActions from "@/views/GroupDetail/GroupDetailActions/GroupDetailActions.vue";
import EditGroup from "@/views/EditGroup/EditGroup.vue";

import MyProfile from "@/views/MyProfile/MyProfile.vue";
import Login from "@/views/Login/Login.vue";
import ResetPassword from "@/views/ResetPassword/ResetPassword.vue";
import ResetPasswordCheck from "@/views/ResetPasswordCheck/ResetPasswordCheck.vue";
import ResetPasswordLayout from "@/views/ResetPasswordLayout/ResetPasswordLayout.vue";
import ChangePassword from "@/views/ChangePassword/ChangePassword.vue";
import ChangePasswordSuccess from "@/views/ChangePasswordSuccess/ChangePasswordSuccess.vue";
import ChangePasswordLayout from "@/views/ChangePasswordLayout/ChangePasswordLayout.vue";
import ChangePasswordExpired from "@/views/ChangePasswordExpired/ChangePasswordExpired.vue";
import Oauth2Callback from "@/views/Oauth2Callback/Oauth2Callback.vue";
import VotingResult from "@/views/VotingResult/VotingResult.vue";
import Vote from "@/views/Vote/Vote.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      redirect: { name: "voting:result" },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/oauth2/callback",
      name: "oauth2:callback",
      component: Oauth2Callback,
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
      path: "/reset",
      component: ResetPasswordLayout,
      children: [
        {
          path: "",
          name: "security:reset",
          component: ResetPassword,
        },
        {
          path: "/reset/check",
          name: "security:reset:check",
          component: ResetPasswordCheck,
        },
      ],
    },
    {
      path: "/change-password",
      component: ChangePasswordLayout,
      children: [
        {
          path: "",
          name: "security:change-password",
          component: ChangePassword,
        },
        {
          path: "/change-password/success",
          name: "security:change-password:success",
          component: ChangePasswordSuccess,
        },
        {
          path: "/change-password/expired",
          name: "security:change-password:expired",
          component: ChangePasswordExpired,
        },
      ],
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
      path: "/result/:votingId?",
      name: "voting:result",
      component: VotingResult,
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/result/:votingId/vote",
      name: "voting:vote",
      component: Vote,
      props: (r) => {
        const vote: string = r.query.vote as string || "3";
        return {
          vote: Number.parseInt(vote, 10),
          votingId: r.params.votingId,
        };
      },
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/groups/:groupId/",
      component: GroupLayout,
      props: true,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          name: "groups:detail",
          components: {
            default: GroupDetail,
            actions: GroupDetailActions,
          },
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "edit",
          name: "groups:edit",
          component: EditGroup,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "members/:userId",
          name: "groups:members:profile",
          component: GroupMemberProfile,
          meta: {
            requiresAuth: true,
          },
        },
      ],
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
        query: { next: `${window.location.pathname}${window.location.search}` },
      });
    }
  }

  return next();
});

export default router;
