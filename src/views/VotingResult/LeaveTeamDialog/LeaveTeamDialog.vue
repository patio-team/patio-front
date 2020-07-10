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

<template src="./LeaveTeamDialog.pug" lang="pug">

</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ConfirmDialog from "@/components/shared/ConfirmDialog/ConfirmDialog.vue";
import { namespace } from "vuex-class";
import { Group } from "@/domain";
import { AddUserToGroupInput } from "@/services/api/types";

const GroupStore = namespace("group");

@Component({
  components: {
    "dw-confirm-dialog": ConfirmDialog,
  },
})
export default class LeaveTeamDialog extends Vue {

  @Prop()
  public group!: Group;

  @GroupStore.Action("leave")
  public leaveTeam: any;

  @GroupStore.Getter("leaveIsLoading")
  private leaveIsLoading!: boolean;

  @GroupStore.Getter("leaveError")
  private leaveError!: boolean | string;

  public handleLeaveReject() {
    this.$modal.pop();
  }

  public async handleLeaveAcept() {
    const hasLeft = await this.leaveTeam({ groupId: this.group.id });

    if (hasLeft) {
      this.$notify.success(
        this.$t("GROUP_DETAIL_ACTIONS.NOTIFICATIONS.LEAVE_GROUP.SUCCESS", {name: this.group.name}) as string,
      );
      this.$router.push({ name: "team" });
    } else {
      this.$notify.error({
        title: this.$t("GROUP_DETAIL_ACTIONS.NOTIFICATIONS.LEAVE_GROUP.ERROR.TITLE") as string,
        message: this.leaveError === "API_ERRORS.UNIQUE_ADMIN"
          ? this.$t("GROUP_DETAIL_ACTIONS.NOTIFICATIONS.LEAVE_GROUP.ERROR.MESSAGE_UNIQUE_ADMIN") as string
          : undefined,
      });
    }
  }
}
</script>
