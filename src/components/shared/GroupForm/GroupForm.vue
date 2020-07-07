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

<template src="./GroupForm.pug" lang="pug"></template>
<style src="./GroupForm.css" scoped></style>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

import { Group } from "@/domain";

import { toDateTime, formatToTime24Simple } from "@/utils/datetime";

@Component
export default class GroupForm extends Vue {
  public input = {
    name: "",
    votingDays: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
    votingTime: toDateTime("12:00"),
  };

  @Prop(Object)
  private readonly group!: Group;

  @Prop(Boolean)
  private readonly isLoading!: boolean;

  @Prop([String, Boolean])
  private readonly error!: string | boolean;

  @Prop(Function)
  private readonly onSubmit: any;

  get votingTime() {
    return formatToTime24Simple(this.input.votingTime);
  }

  set votingTime(value) {
    this.input.votingTime = toDateTime(value);
  }

  private mounted() {
    if (this.group) {
      this.input = Object.assign(
        {},
        this.input,
        this.group,
      );
    }
  }

  @Emit("submit")
  private handleSubmit() {
    return this.input;
  }
}
</script>
