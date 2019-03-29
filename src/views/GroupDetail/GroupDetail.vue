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

<template src="./GroupDetail.pug" lang="pug"></template>
<style src="./GroupDetail.css" scoped></style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter, namespace } from "vuex-class";

import { formatToTime24Simple } from "@/utils/datetime";

import ConfirmDialog from "@/components/shared/ConfirmDialog/ConfirmDialog.vue";
import GroupStats from "./GroupStats/GroupStats.vue";
import GroupMemberList from "./GroupMemberList/GroupMemberList.vue";

import { Group } from "@/domain";

const GroupsStore = namespace("group");

@Component({
  components: {
    "dw-group-stats": GroupStats,
    "dw-group-member-list": GroupMemberList,
    "dw-confirm-dialog": ConfirmDialog,
  },
})
export default class GroupDetail extends Vue {
  @GroupsStore.Getter("group")
  private group!: Group;

  @GroupsStore.Getter("getGroupIsLoading")
  private isLoading!: boolean;

  @GroupsStore.Getter("getGroupError")
  private error!: boolean | string;

  @GroupsStore.Action("getGroup")
  private getGroup: any;

  @GroupsStore.Getter("leaveIsLoading")
  private leaveIsLoading!: boolean;

  @GroupsStore.Getter("leaveError")
  private leaveError!: boolean | string;

  @GroupsStore.Action("leave")
  private leave: any;

  public mounted() {
    const input = {
      id: this.$route.params.id,
    };
    this.getGroup(input);
  }

  private handleLeaveButton() {
    this.$modal.push("confirm-leave-group");
  }

  private async handleLeaveAcept() {
    const hasLeft = await this.leave({ groupId: this.group.id });

    this.$modal.pop();

    if (hasLeft) {
      this.$notify.success(
        this.$t("VIEWS.GROUP_DETAIL.NOTIFICATIONS.LEAVE_GROUP.SUCCESS", {name: this.group.name}) as string,
      );
      this.$router.push({ name: "groups:list" });
    } else {
      this.$notify.error({
        title: this.$t("VIEWS.GROUP_DETAIL.NOTIFICATIONS.LEAVE_GROUP.ERROR.TITLE") as string,
        message: this.leaveError === "API_ERRORS.UNIQUE_ADMIN"
          ? this.$t("VIEWS.GROUP_DETAIL.NOTIFICATIONS.LEAVE_GROUP.ERROR.MESSAGE_UNIQUE_ADMIN") as string
          : undefined,
      });
    }
  }

  private handleLeaveReject() {
    this.$modal.pop();
  }
}
</script>
