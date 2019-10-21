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

<template src="./Vote.pug" lang="pug"></template>
<style src="./Vote.css" scoped></style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import VoteForm from "./VoteForm/VoteForm.vue";

import { Group, Voting } from "@/domain";
import { formatToDate } from "@/utils/datetime";

const VotingsStore = namespace("voting");

@Component({
  components: {
    "dw-vote-form": VoteForm,
  },
})
export default class Vote extends Vue {
  @Prop(Object)
  private readonly group!: Group;

  @VotingsStore.Getter("voting")
  private voting!: Voting;

  @VotingsStore.Getter("getVotingIsLoading")
  private isLoading!: boolean;

  @VotingsStore.Getter("getVotingError")
  private error!: boolean | string;

  @VotingsStore.Action("getVoting")
  private getVoting: any;

  public async mounted() {
    const input = {
      id: this.$route.params.votingId,
    };
    const voting = await this.getVoting(input);
    this.$emit("set-subtitle", formatToDate(voting.createdAtDateTime));
  }
}
</script>
