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

<template src="./GroupLayout.pug" lang="pug"></template>
<style src="./GroupLayout.css" scoped></style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import { now, minus, formatToTime24Simple } from "@/utils/datetime";

import { Group } from "@/domain";
import AverageMood from "../../components/shared/AverageMood/AverageMood.vue";

const GroupStore = namespace("group");

@Component
export default class GroupLayout extends Vue {
  @GroupStore.Getter("group")
  private group!: Group;

  @GroupStore.Getter("getGroupIsLoading")
  private isLoading!: boolean;

  @GroupStore.Getter("getGroupError")
  private error!: boolean | string;

  @GroupStore.Action("getGroup")
  private getGroup: any;

  @GroupStore.Mutation("resetState")
  private resetState: any;

  private subtitle = "";

  public mounted() {
    const input = {
      id: this.$route.params.groupId,
    };
    this.getGroup(input);
  }

  public destroyed() {
    this.resetState();
  }

  public setSubtitle(newSubtitle: string) {
    this.subtitle = newSubtitle;
  }
}
</script>
