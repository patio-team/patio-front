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

<template src="./GroupStats.pug" lang="pug"></template>
<style src="./GroupStats.css" scoped></style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";

import { DateTime, getListOfDays, isToday } from "@/utils/datetime";

import { Group, VotingStat } from "@/domain";

const GroupStore = namespace("group");

@Component
export default class GroupStats extends Vue {
  @Prop(Object)
  private readonly group!: Group;

  @Prop(Object)
  private readonly startDateTime!: DateTime;

  @Prop(Object)
  private readonly endDateTime!: DateTime;

  @GroupStore.Getter("stats")
  private stats!: VotingStat[];

  @GroupStore.Action("getGroupStats")
  private getGroupStats: any;

  get votings() {
    const groupVotings = this.stats;
    const votingsMap = new Map();
    let votings = [] as any[];

    if (!groupVotings) {
      return votings;
    }

    // Add current votings
    groupVotings.forEach((voting) => {
      votingsMap.set(voting.createdAtDateTime.toISODate(), voting);
    });

    // Add null for days withoy vottings
    getListOfDays(this.startDateTime, this.endDateTime).forEach((day) => {
      if (!votingsMap.get(day.toISODate())) {
        votingsMap.set(day.toISODate(), { createdAtDateTime: day });
      }
    });

    // Sort
    votings = [...votingsMap];
    votings.sort((a, b) => a[0] === b[0]? 0: a[0] > b[0]? 1: -1);

    return votings.map((d) => d[1]);
  }

  public mounted() {
    this.loadStats();
  }

  @Watch("group")
  public whenGroupChanged(val: Group, old: Group) {
    if (val.id === old.id) {
      return;
    }

    this.loadStats();
  }

  public loadStats() {
    const input = {
      id: this.group.id,
      startDateTime: this.startDateTime,
      endDateTime: this.endDateTime,
    };
    this.getGroupStats(input);
  }

  public getVotingClasses(voting?: VotingStat) {
    return voting
      ? [
        // vote
        "vote",
        // v1 v2 v3 v4 v5 ve
        `v${voting.average || "e"}`,
        // last
        isToday(voting.createdAtDateTime) ? "last" : "",
      ]
    : ["vote", "ve"];
  }
}
</script>
