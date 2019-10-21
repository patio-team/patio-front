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

<template src="./VoteForm.pug" lang="pug"></template>
<style src="./VoteForm.css" scoped></style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import { CreateVoteInput } from "@/services/api/types";
import { Group, Voting } from "@/domain";

const Votings = namespace("votings");

@Component
export default class VoteForm extends Vue {
  private input = {
    score: 0,
    comment: "",
    anonymous: false,
    votingId: "",
    groupId: "",
  } as CreateVoteInput;

  @Prop(Object)
  private readonly group!: Group;

  @Prop(Object)
  private voting!: Voting;

  @Votings.Getter("createVoteIsLoading")
  private isLoading!: boolean;

  @Votings.Getter("createVoteError")
  private error!: boolean | string;

  @Votings.Action("createVote")
  private createVote: any;

  private async handleSubmit() {
    const isCreated = await this.createVote({
      ...this.input,
      votingId: this.voting.id,
      groupId: this.group.id,
    });

    if(isCreated) {
      this.$router.push({
        name: "groups:votings:detail",
        params: {
          votingId: this.voting.id,
          groupId: this.group.id,
        },
      });
    }
  }
}
</script>
