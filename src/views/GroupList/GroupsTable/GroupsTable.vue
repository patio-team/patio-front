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

<template src="./GroupsTable.pug" lang="pug"></template>
<style src="./GroupsTable.css" scoped></style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import { Group } from "@/domain";

const GroupsStore = namespace("groups");

@Component
export default class GroupsTable extends Vue {
  @GroupsStore.Getter("groupList")
  private groupList!: Group[];

  @GroupsStore.Getter("groupListIsLoading")
  private isLoading!: boolean;

  @GroupsStore.Getter("groupListError")
  private error!: boolean | string;

  @GroupsStore.Action("getGroupList")
  private getGroupList: any;

  public mounted() {
    this.getGroupList();
  }

  private handleClickRow(groupId: string) {
    this.$router.push({ name: "voting:result", params: { selectedGroupId: groupId } });
  }
}
</script>
