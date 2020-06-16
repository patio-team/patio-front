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
import { Vote } from "@/domain/votings";
import { PaginationRequest } from "@/domain";
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

  @Prop(String)
  private groupId!: string;

  public get moodMemberList() {
    return store.moodMemberList;
  }

  public async infiniteHandler() {
    await this.paginate(this.groupId, this.pagination);
  }

  @Watch("groupId")
  public async whenGroupIdChanges(val: string, old: string) {
    if (val !== old) {
      this.pagination = {max: 20, page: 0};
      await store.resetMoodMemberResult({pagination: this.pagination, groupId: val});
    }
  }

  public async paginate(groupId: string, pagination: PaginationRequest) {
      const result = await store.fetchMoodMemberList({groupId, pagination});

      if (result.data.length) {
        this.pagination.page++;
      }
  }
}
</script>
