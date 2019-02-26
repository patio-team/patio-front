<template src="./GroupsTable.pug" lang="pug"></template>
<style src="./GroupsTable.css" scoped></style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter, namespace } from "vuex-class";

import { Group } from "@/domain";

const GroupsStore = namespace("groups");

@Component
export default class GroupsTable extends Vue {
  @GroupsStore.Getter("groupList")
  private groupList!: Group[];

  @GroupsStore.Getter("groupListIsLoading")
  private isLoading!: boolean;

  @GroupsStore.Getter("groupListError")
  private error!: boolean | string;

  @GroupsStore.Action("getGroupList")
  private getGroupList: any;

  public mounted() {
    this.getGroupList();
  }
}
</script>
