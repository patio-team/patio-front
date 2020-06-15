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

import Markdown from "@/components/shared/Markdown/Markdown.vue";

import { CreateVoteInput } from "@/services/api/types";
import { Group, Voting } from "@/domain";

const Votings = namespace("votings");

@Component({
  components: {
    "dw-markdown": Markdown,
  },
})
export default class VoteForm extends Vue {
  private showPreview = false;

  @Prop(Object)
  private readonly group!: Group;

  @Prop(Number)
  private readonly voteScore!: number;

  @Prop(Object)
  private voting!: Voting;

  @Prop(Number)
  private initScore!: number;

  @Votings.Getter("createVoteIsLoading")
  private isLoading!: boolean;

  @Votings.Getter("createVoteError")
  private error!: boolean | string;

  @Votings.Action("createVote")
  private createVote: any;

  private input = {
    score: (this.voteScore) ? this.voteScore : 3,
    comment: "",
    anonymous: false,
    votingId: "",
    groupId: "",
    hueMood: "",
  } as CreateVoteInput;

  public handleClickPreviewButton() { this.showPreview = true; }

  public handleClickEditButton() { this.showPreview = false; }

  public mounted() {
    if (this.initScore) {
      this.input.score = this.initScore;
    }
  }

  private async handleSubmit() {
    if (this.voteScore) {
      this.input.score = this.voteScore;
    }
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
