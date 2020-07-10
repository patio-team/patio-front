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

<template lang="pug">
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Group, Voting } from "@/domain";
import VoteList from "./VoteList/VoteList.vue";
import AverageMood from "@/components/shared/AverageMood/AverageMood.vue";
import MoodSorter from "@/components/shared/MoodSorter/MoodSorter.vue";

const AuthStore = namespace("auth");
const VotingStore = namespace("voting");

@Component
export default class VotingTeam extends Vue {

  @AuthStore.Getter("selectedGroup")
  private selectedGroup!: Group;

  @VotingStore.Action("getLastVoting")
  private getLastVoting: any;

  @AuthStore.Action("changeSelectedGroup")
  private changeSelectedGroup!: any;

  @Prop(String)
  private groupId!: string;

  public async mounted() {
    if (this.groupId || this.selectedGroup) {
      const groupId = this.groupId || this.selectedGroup.id;

      await this.changeSelectedGroup({groupId});
      const voting = await this.getLastVoting({ groupId });

      this.$router.push({
        name: "team:result",
        params: {
          groupId,
          votingId: voting ? voting.id : null,
        },
      });
    } else {
      this.$router.push({ name: "noteam" });
    }
  }
}
</script>
