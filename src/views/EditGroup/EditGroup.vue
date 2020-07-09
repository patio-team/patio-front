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

<template src="./EditGroup.pug" lang="pug"></template>
<style src="./EditGroup.css" scoped></style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import { Group } from "@/domain";
import { EditGroupInput } from "@/services/api/types";

import GroupForm from "@/components/shared/GroupForm/GroupForm.vue";
import GroupMembers from "./GroupMembers/GroupMembers.vue";

const GroupStore = namespace("group");

@Component({
  components: {
    "dw-group-form": GroupForm,
    "dw-group-members": GroupMembers,
  },
})
export default class EditGroup extends Vue {
  @Prop(Object)
  private readonly group!: Group;

  @GroupStore.Getter("editIsLoading")
  private isLoading!: boolean;

  @GroupStore.Getter("editError")
  private error!: boolean | string;

  @GroupStore.Action("edit")
  private edit: any;

  public mounted() {
    this.$emit("set-subtitle", this.$t("VIEWS.EDIT_GROUP.SUBTITLE"));
  }

  private async handleSubmit(input: EditGroupInput) {
    const edittedGroup = await this.edit(input);

    if (edittedGroup) {
      this.$notify.success(this.$t("VIEWS.EDIT_GROUP.NOTIFICATIONS.EDIT.SUCCESS.TITLE"));
      this.$router.push({ name: "groups:detail", params: { id: edittedGroup.id } });
    } else {
      this.$notify.error(this.$t("VIEWS.EDIT_GROUP.NOTIFICATIONS.EDIT.ERROR.TITLE"));
    }
  }
}
</script>
