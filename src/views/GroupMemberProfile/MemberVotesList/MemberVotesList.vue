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

<template src="./MemberVotesList.pug" lang="pug"></template>
<style src="./MemberVotesList.css" scoped></style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import Markdown from "@/components/shared/Markdown/Markdown.vue";

import { Group, User, Vote } from "@/domain";
import { DateTime, now, minusTo } from "@/utils/datetime";

const ProfileStore = namespace("profile");

@Component({
  components: {
    "dw-markdown": Markdown,
  },
})
export default class MemberVotesList extends Vue {
  @Prop(Object)
  private readonly group!: Group;

  @Prop(Object)
  private readonly profile!: User;

  @ProfileStore.Getter("votes")
  private votes!: Vote[];

  @ProfileStore.Action("getVotes")
  private getVotes: any;

  private endDateTime: DateTime = now();
  private pageSize = 7;
  private showMoreButton = false;

  public mounted() {
    this.loadMoreVotes();
  }

  public async handleClickMoreVotes() {
    this.loadMoreVotes();
  }

  public getVoteClasses(vote: Vote) {
    return [
      // v1 v2 v3 v4 v5
      `v${ vote.score }`,
    ];
  }

  private async loadMoreVotes() {
    const startDateTime = minusTo(this.endDateTime, { days: this.pageSize });
    const newVotes = await this.getVotes({
      groupId: this.group.id,
      userId: this.profile.id,
      startDateTime,
      endDateTime: this.endDateTime,
    });
    this.showMoreButton = newVotes && newVotes.length > 0;
    this.endDateTime = startDateTime;
  }
}
</script>
