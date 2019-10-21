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

<template src="./VotingDetail.pug" lang="pug"></template>
<style src="./VotingDetail.css" scoped></style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import Markdown from "@/components/shared/Markdown/Markdown.vue";

import { Group, Voting, VotingStats, Vote } from "@/domain";
import { formatToDate } from "@/utils/datetime";

const VotingStore = namespace("voting");

@Component({
  components: {
    "dw-markdown": Markdown,
  },
})
export default class VotingDetail extends Vue {
  @Prop(Object)
  private readonly group!: Group;

  @VotingStore.Getter("voting")
  private voting!: Voting;

  @VotingStore.Getter("stats")
  private stats!: VotingStats;

  @VotingStore.Getter("getVotingIsLoading")
  private isLoading!: boolean;

  @VotingStore.Getter("getVotingError")
  private error!: boolean | string;

  @VotingStore.Action("getVoting")
  private getVoting: any;

  @VotingStore.Action("resetState")
  private resetState: any;

  public async mounted() {
    const input = {
      id: this.$route.params.votingId,
    };
    const voting = await this.getVoting(input);
    this.$emit("set-subtitle", formatToDate(voting.createdAtDateTime));
  }

  public destroyed() {
    this.resetState();
  }

  public getVotingClasses(voting: Voting) {
    return [
      // v1 v2 v3 v4 v5
      `v${ voting.average }`,
    ];
  }

  public getVoteClasses(vote: Vote) {
    return [
      // v1 v2 v3 v4 v5
      `v${ vote.score }`,
    ];
  }
}
</script>
