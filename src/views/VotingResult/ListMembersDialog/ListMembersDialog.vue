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

<template src="./ListMembersDialog.pug" lang="pug">

</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import ConfirmDialog from "@/components/shared/ConfirmDialog/ConfirmDialog.vue";
import { namespace } from "vuex-class";
import { Group, User } from "@/domain";
import Dialog from "@/components/shared/Dialog/Dialog.vue";

const GroupStore = namespace("group");

@Component({
  components: {
    "dw-dialog": Dialog,
  },
})
export default class ListMembersDialog extends Vue {

  @Prop()
  public group!: Group;

  @GroupStore.Getter("members")
  public memberList!: [User];

  @GroupStore.Action("getGroupMembers")
  public getMembers: any;

  public async mounted() {
      await this.getMembers({id: this.group.id});
  }

  public handleMemberSelection(memberId: string) {
    // closes modal
    this.$modal.pop();

    // goes to user vote list of the group
    this.$router.push({ name: "team:members:profile", params: { groupId: this.group.id, userId: memberId }});
  }

  @Watch("group")
  public async onGroupChanged(val: Group, old: Group) {
    if (val.id !== old.id) {
      await this.getMembers({id: this.group.id});
    }
  }
}
</script>
