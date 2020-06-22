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

<template src="./VotingResult.pug" lang="pug"></template>
<style src="./VotingResult.css" scoped></style>


<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Group, Voting } from "@/domain";
import VoteList from "./VoteList/VoteList.vue";
import AverageMood from "@/components/shared/AverageMood/AverageMood.vue";
import MoodSorter from "@/components/shared/MoodSorter/MoodSorter.vue";

const AuthStore = namespace("auth");
const VotingStore = namespace("voting");

@Component({
  components: {
    VoteList,
    AverageMood,
    MoodSorter,
  },
})
export default class VotingResult extends Vue {

  @AuthStore.Getter("selectedGroup")
  private selectedGroup!: Group;

  @VotingStore.Getter("voting")
  private voting!: Voting;

  @VotingStore.Action("getVoting")
  private getVoting: any;

  @VotingStore.Action("getLastVoting")
  private getLastVoting: any;

  @Prop(String)
  private votingId!: string;

  @Prop(String)
  private groupId!: string;

  public get stats() {
    return this.voting ? this.voting.stats : null;
  }

  public get nobodyHasVotedYet() {
    if (this.stats && this.stats.votesByMood && this.stats.votesByMood.length > 0) {
      return this.stats.votesByMood.map((next) => next.count).reduce((a, b) => a + b) === 0;
    } else {
      return true;
    }
  }

  public async mounted() {
    await this.updateVoting();
  }

  private async updateVoting() {
    if (this.votingId) {
      await this.getVoting({id: this.votingId});
    }
  }
}
</script>
