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

import { User, Group } from "@/domain";
import Avatar from "@/components/shared/Avatar/Avatar.vue";

const AuthStore = namespace("auth");
const VotingStore = namespace("voting");

@Component({
  components: {
    "dw-avatar": Avatar,
  },
})
export default class Header extends Vue {

  get name() {
    return this.me ? this.me.name : undefined;
  }

  get email() {
    return this.me ? this.me.email : undefined;
  }

  get groups() {
    return this.me ? this.me.groups : undefined;
  }
  public isGroupsVisible: boolean = false;
  public isUserVisible: boolean = false;

  @AuthStore.Getter("myProfile")
  private me!: User;

  @AuthStore.Action("logout")
  private logout!: any;

  @AuthStore.Action("changeSelectedGroup")
  private changeSelectedGroup!: any;

  @AuthStore.Getter("selectedGroup")
  private selectedGroup!: Group;

  @VotingStore.Action("getLastVoting")
  private getLastVoting!: any;

  public nameInitials(fullName: string) {
    const splitedName = fullName.split(" ");
    if ( splitedName.length > 1) {
      return splitedName[0][0] + splitedName[1][0];
    } else {
      return splitedName[0][0];
    }
  }

  private async handleChangeSelectedGroup(groupId: string) {
    await this.changeSelectedGroup({groupId});
    const voting = await this.getLastVoting({groupId});

    this.$router.push({
      name: "team:result",
      params: {
        groupId: voting.group.id,
        votingId: voting.id,
      },
    });
  }

  private async handleClickLogout() {
    await this.logout();

    this.$router.push({ name: "login" });
  }

  private createNewGroup() {
    this.$router.push({ name: "groups:create" });
  }

  private toggleGroupDropdown() {
    this.isGroupsVisible = !this.isGroupsVisible;
    this.isUserVisible = false;
  }

  private toggleUserDropdown() {
    this.isUserVisible = !this.isUserVisible;
    this.isGroupsVisible = false;
  }
}
</script>
