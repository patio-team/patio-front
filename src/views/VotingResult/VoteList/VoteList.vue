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

<template src="./VoteList.pug" lang="pug"></template>
<style src="./VoteList.css"></style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Vote, Voting } from "@/domain/votings";
import { PaginationRequest, Group } from "@/domain";
import { masonry, masonryTile } from "@/components/directives/MasonryDirectives";
import store from "@/store/modules/result/MoodMemberListStore";
import VoteCard from "@/components/shared/VoteCard/VoteCard.vue";
import InfiniteLoader from "@/components/shared/InfiniteLoader/InfiniteLoader.vue";

@Component({
  components: {
    VoteCard,
    InfiniteLoader,
  },
  directives: {
    masonry,
    masonryTile,
  },
})
export default class VoteList extends Vue {
  private pagination: PaginationRequest = {max: 20, page: 0};

  @Prop()
  private voting!: Voting;

  public get moodMemberList() {
    return store.moodMemberList;
  }

  public async mounted() {
    await this.reset(this.voting);
  }

  public async infiniteHandler() {
    if (this.pagination.page !== 0) {
      await this.paginate(this.voting, this.pagination);
    }
  }

  @Watch("voting")
  public async whenVotingChanges(val: Voting, old: Voting) {
    if (val !== old) {
      await this.reset(val);
    }
  }

  public async reset(voting: Voting) {
    this.pagination = {max: 20, page: 0};
    const votingId = voting.id;
    const result = await store.resetMoodMemberResult({pagination: this.pagination, votingId});

    if (result.data.length) {
      this.pagination.page = 1;
    }
  }

  public async paginate(voting: Voting, pagination: PaginationRequest) {
    const votingId = voting.id;
    const result = await store.fetchMoodMemberList({votingId, pagination});

    if (result.data.length) {
      this.pagination.page++;
    }
  }
}
</script>
