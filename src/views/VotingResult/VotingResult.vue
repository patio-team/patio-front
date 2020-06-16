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
import store from "@/store/modules/result/FavouriteGroupStore";
import VoteList from "./VoteList/VoteList.vue";

@Component({
  components: {
    VoteList,
  },
})
export default class VotingResult extends Vue {

  @Prop(String)
  private selectedGroupId!: string;

  public get groupId() {
    return this.selectedGroupId || store.groupId;
  }

  private async mounted() {
    if (!this.selectedGroupId) {
      await store.fetchFavouriteGroupId();
    }
  }
}
</script>
