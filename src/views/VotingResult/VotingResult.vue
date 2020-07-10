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
import { Group, Voting, Day } from "@/domain";
import { translateDays } from "@/filters/days";
import VoteList from "./VoteList/VoteList.vue";
import VoteChart from "./VoteChart/VoteChart.vue";
import LeaveTeamDialog from "./LeaveTeamDialog/LeaveTeamDialog.vue";
import ListMembersDialog from "./ListMembersDialog/ListMembersDialog.vue";
import AverageMood from "@/components/shared/AverageMood/AverageMood.vue";
import MoodSorter from "@/components/shared/MoodSorter/MoodSorter.vue";
import Loader from "@/components/shared/Loader/Loader.vue";
import { DateTime } from "luxon";

const AuthStore = namespace("auth");
const VotingStore = namespace("voting");

@Component({
  components: {
    VoteList,
    VoteChart,
    AverageMood,
    MoodSorter,
    Loader,
    "dialog-team-leave": LeaveTeamDialog,
    "dialog-team-members": ListMembersDialog,
  },
})
export default class VotingResult extends Vue {

  @AuthStore.Getter("selectedGroup")
  private selectedGroup!: Group;

  @VotingStore.Getter("voting")
  private voting!: Voting | undefined;

  @VotingStore.Action("getVoting")
  private getVoting: any;

  @VotingStore.Action("getLastVoting")
  private getLastVoting: any;

  @VotingStore.Getter("getVotingIsLoading")
  private isLoading!: boolean;

  @Prop(String)
  private votingId!: string;

  @Prop(String)
  private groupId!: string;

  public get stats() {
    return this.voting ? this.voting.stats : null;
  }

  public get votes() {
    return this.voting ? this.voting.votes : null;
  }

  public get isExpired() {
    return this.voting && this.voting.expired;
  }

  public get didIVote() {
    return this.voting && this.voting.didIVote;
  }

  public get imFirst() {
    return this.voting && this.votes ? !this.isExpired && this.votes.totalCount === 0 : false;
  }

  public get imAdmin() {
    return this.selectedGroup && this.selectedGroup.isCurrentUserAdmin;
  }

  public get canShareMood() {
    return !this.isExpired && !this.didIVote && !this.imFirst;
  }

  public get votingDateTime() {
    return this.voting ? this.voting.createdAtDateTime : DateTime.local();
  }

  public get hasVotingDays() {
    if (this.selectedGroup && this.selectedGroup.votingDays) {
      return this.selectedGroup.votingDays.length > 0;
    }
    return false;
  }

  public get nextVotingId() {
    return this.voting && this.voting.nextVoting ? this.voting.nextVoting.id : null;
  }

  public get previousVotingId() {
    return this.voting && this.voting.previousVoting ? this.voting.previousVoting.id : null;
  }

  public async mounted() {
    await this.updateVoting();
  }

  @Watch("votingId")
  public async onVotingIdChanged(val: string, old: string) {
    if (val !== old) {
      this.updateVoting();
    }
  }

  private async updateVoting() {
    if (this.votingId) {
      await this.getVoting({id: this.votingId});
    }
  }

  private async navigateToAnotherVoting(votingId: string | null) {
    if (votingId) {
      await this.getVoting({id: votingId});
    }
  }

  private swipeHandler(direction: any) {
    const WindowWidth = window.innerWidth;
    if (direction === "left" && WindowWidth <= 750) {
      this.handlePreviousVotingClick();
    }
    if (direction === "right" && WindowWidth <= 750) {
      this.handleNextVotingClick();
    }
  }

  private handlePreviousVotingClick() {
      this.navigateToAnotherVoting(this.previousVotingId);
  }

  private handleNextVotingClick() {
    this.navigateToAnotherVoting(this.nextVotingId);
  }

  private handleLeaveTeam() {
    this.$modal.push("confirm-leave-group");
  }

  private handleTeamMembers() {
    this.$modal.push("dialog-team-members");
  }

  private translateDays(days: Day[]) {
    return translateDays(days);
  }
}
</script>
