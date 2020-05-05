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

<template src="./ChangePasswordForm.pug" lang="pug"></template>
<style src="./ChangePasswordForm.css" scoped></style>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { toDateTime, formatToTime24Simple } from "@/utils/datetime";

@Component
export default class ChangePasswordForm extends Vue {
  public input = {
    password: "",
  };

  @Prop(Object)
  private readonly password!: string;

  @Prop(Boolean)
  private readonly isLoading!: boolean;

  @Prop([String, Boolean])
  private readonly error!: string | boolean;

  @Prop(Function)
  private readonly onSubmit: any;

  @Emit("submit")
  private handleSubmit() {
    return this.input;
  }
}
</script>
