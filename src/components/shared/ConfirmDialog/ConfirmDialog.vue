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

<template src="./ConfirmDialog.pug" lang="pug"></template>
<style src="./ConfirmDialog.css" scoped></style>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import Dialog from "@/components/shared/Dialog/Dialog.vue";

@Component({
  components: {
    "dw-dialog": Dialog,
  },
})
export default class ConfirmDialog extends Vue {
  @Prop({ type: String, required: true })
  private name!: string;

  @Prop(String)
  private title!: string;

  @Prop(String)
  private message!: string;

  @Prop({ type: String, default: "Accept" })
  private aceptButtonText!: string;

  @Prop({ type: String, default: "Reject" })
  private rejectButtonText!: string;

  @Prop({ type: Boolean, default: false })
  private isLoading!: boolean;

  private handleClose() {
    this.$emit("reject");
    return;
  }

  @Emit("acept")
  private handleAcept() {
    return;
  }

  @Emit("reject")
  private handleReject() {
    return;
  }
}
</script>
