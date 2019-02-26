<template src="./GroupList.pug" lang="pug"></template>
<style src="./GroupList.css" scoped></style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GroupsTable from "@/components/shared/GroupsTable/GroupsTable.vue";

@Component({
  components: {
    "dw-groups-table": GroupsTable,
  },
})
export default class GroupList extends Vue {}
</script>
