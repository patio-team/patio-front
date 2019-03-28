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

<template src="./Dialog.pug" lang="pug"></template>
<style src="./Dialog.css"></style>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

/*
 * This component is a wrapper over vue-thin-modal component.
 * You can use its events 'before-open', 'opened', 'before-close', 'closed'
 *
 *     <dw-modal
 *       name="dialog-sample"
 *       @before-open="log('before-open')"
 *       @opened="log('opened')"
 *       @before-close="log('before-close')"
 *       @closed="log('closed')"
 *     >
 *       // Your content should be here
 *     </dw-dialog>
 *
 * To manage the modal using `this.$modal` with this methods:
 *    * push(name: string): void
 *        Show the modal that cooresponding with the name.
 *    * pop(): void
 *        Hide the modal that is appearing.
 *    * replace(name: string): void
 *        Hide the modal that is appearing and show a new modal.
 *
 * More info at https://github.com/ktsn/vue-thin-modal
 */
@Component({
  inheritAttrs: false,
})
export default class Dialog extends Vue {
  @Prop({type: String, required: true})
  private name!: string;

  @Emit("close")
  private close() {
    this.$modal.pop();
    return;
  }
}
</script>
