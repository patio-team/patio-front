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

<template src="./GroupMembers.pug" lang="pug"></template>
<style src="./GroupMembers.css" scoped></style>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Group, User } from "@/domain";
import { namespace } from "vuex-class";
import Avatar from "@/components/shared/Avatar/Avatar.vue";

const GroupStore = namespace("group");

@Component({
  components: {
    Avatar,
  },
})
export default class GroupMembers extends Vue {
  public input = {email: ""};

  @Prop()
  public group!: Group;

  @GroupStore.Getter("members")
  public memberList!: [User];

  @GroupStore.Action("getGroupMembers")
  public loadMembers: any;

  @GroupStore.Action("addUserToGroup")
  public addUserToGroup: any;

  public get isAdmin() {
    return this.group ? this.group.isCurrentUserAdmin : false;
  }

  public get disableAddButton() {
    // TODO proper validation
    return !this.input.email.length || this.input.email.length < 2;
  }

  public async mounted() {
    await this.loadMembers({id: this.group.id});
  }

  public async handleAddUserToGroup() {
    await this.addUserToGroup({groupId: this.group.id, email: this.input.email});
    await this.loadMembers({id: this.group.id});

    this.input.email = "";
  }
}
</script>
