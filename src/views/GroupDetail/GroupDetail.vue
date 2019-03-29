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

<template src="./GroupDetail.pug" lang="pug"></template>
<style src="./GroupDetail.css" scoped></style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter, namespace } from "vuex-class";

import { formatToTime24Simple } from "@/utils/datetime";

import GroupStats from "./GroupStats/GroupStats.vue";
import GroupMemberList from "./GroupMemberList/GroupMemberList.vue";

import { Group } from "@/domain";

const GroupsStore = namespace("group");

@Component({
  components: {
    "dwbh-group-stats": GroupStats,
    "dwbh-group-member-list": GroupMemberList,
  },
})
export default class GroupDetail extends Vue {
  @GroupsStore.Getter("group")
  private group!: Group;

  @GroupsStore.Getter("getGroupIsLoading")
  private isLoading!: boolean;

  @GroupsStore.Getter("getGroupError")
  private error!: boolean | string;

  @GroupsStore.Action("getGroup")
  private getGroup: any;

  public mounted() {
    const input = {
      id: this.$route.params.id,
    };
    this.getGroup(input);
  }
}
</script>
