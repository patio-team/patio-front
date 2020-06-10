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
<style src="./Header.css" scoped></style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import { User } from "@/domain";
import Avatar from "../Avatar/Avatar.vue";

const AuthStore = namespace("auth");

@Component({
  components: {
    "dw-avatar": Avatar,
  },
})
export default class Header extends Vue {
  public isDropdownVisible: boolean = false;

  @AuthStore.Getter("myProfile")
  private me!: User;

  @AuthStore.Action("logout")
  private logout!: any;

  get name() {
    return this.me ? this.me.name : undefined;
  }

  get email() {
    return this.me ? this.me.email : undefined;
  }

  get groups() {
    return this.me ? this.me.groups : undefined;
  }

  private async handleClickLogout() {
    await this.logout();

    this.$router.push({ name: "login" });
  }

  private createNewGroup() {
    this.$router.push({ name: "groups:create" });
  }

  private toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
}
</script>
