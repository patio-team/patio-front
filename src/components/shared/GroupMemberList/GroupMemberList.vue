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

<template src="./GroupMemberList.pug" lang="pug"></template>
<style src="./GroupMemberList.css" scoped></style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter, namespace } from "vuex-class";

import Dialog from "@/components/shared/Dialog/Dialog.vue";
import AddMemberForm from "@/components/shared/AddMemberForm/AddMemberForm.vue";

import { Group } from "@/domain";

import { AddUserToGroupInput } from "@/services/api/types";

const GroupStore = namespace("group");

@Component({
  components: {
    "dw-dialog": Dialog,
    "dw-add-member-form": AddMemberForm,
  },
})
export default class GroupMemberList extends Vue {
  @GroupStore.Getter("group")
  private group!: Group;

  @GroupStore.Action("getGroup")
  private getGroup: any;

  @GroupStore.Getter("addUserToGroupIsLoading")
  private addUserToGroupIsLoading!: Group;

  @GroupStore.Getter("addUserToGroupError")
  private addUserToGroupError!: Group;

  @GroupStore.Mutation("addUserToGroupReset")
  private addUserToGroupReset: any;

  @GroupStore.Action("addUserToGroup")
  private addUserToGroup: any;

  private handleAddMemberButton() {
    this.$modal.push("add-member");
  }

  private handleAddMemberCancel() {
    this.$modal.pop();
    this.addUserToGroupReset();
  }

  private async handleAddMemberSubmit(input: AddUserToGroupInput) {
    const isAdded = await this.addUserToGroup(input);

    if (isAdded) {
      this.getGroup({id: this.group.id});
      this.$modal.pop();
      this.addUserToGroupReset();
      this.$notify.success({
        title: this.$t("GROUP_MEMBER_LIST.NOTIFICATIONS.ADD_MEMBER.SUCCESS.TITLE") as string,
        message: this.$t("GROUP_MEMBER_LIST.NOTIFICATIONS.ADD_MEMBER.SUCCESS.MESSAGE", {email: input.email}) as string,
      });
    } else {
      this.$notify.error({
        title: this.$t("GROUP_MEMBER_LIST.NOTIFICATIONS.ADD_MEMBER.ERROR.TITLE") as string,
        message: this.$t("GROUP_MEMBER_LIST.NOTIFICATIONS.ADD_MEMBER.ERROR.MESSAGE", {email: input.email}) as string,
      });
    }
  }
}
</script>
