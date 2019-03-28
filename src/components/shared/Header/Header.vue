<!--
 Copyright (C) 2019 Kaleidos Open Source SL

 This file is part of Dont Worry Be Happy (DWBH).
 DWBH is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 DWBH is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with DWBH.  If not, see <https://www.gnu.org/licenses/>.
-->

<template src="./Header.pug" lang="pug"></template>
<style src="./Header.css"></style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter, namespace } from "vuex-class";

import { User } from "@/domain";

import md5 from "md5";

const AuthStore = namespace("auth");
@Component
export default class Header extends Vue {
  @AuthStore.Getter("myProfile")
  private me!: User;

  @AuthStore.Action("logout")
  private logout!: any;

  get gravatarImageSrc() {
    if (!this.me || !this.me.email) {
      return "";
    }

    const hash = md5(this.me.email.trim().toLowerCase());

    return `https://www.gravatar.com/avatar/${hash}?s=50&d=robohash`;
  }

  private handleClickLogout() {
    this.logout();
  }
}
</script>
