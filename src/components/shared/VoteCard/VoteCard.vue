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

<template src="./VoteCard.pug" lang="pug"></template>
<style src="./VoteCard.css"></style>

<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import Avatar from "@/components/shared/Avatar/Avatar.vue";
import Smiley from "../Smiley/Smiley.vue";
import { Viewer } from "@toast-ui/vue-editor";
import { User, Group } from "@/domain";
import { DateTime } from "@/utils/datetime";

@Component({
  components: {
    Avatar,
    "dw-smiley": Smiley,
    Viewer,
  },
})
export default class VoteCard extends Vue {

  @Prop()
  private vote!: any;

  @Prop()
  private user!: User;

  @Prop()
  private group!: Group;

  @Prop(Number)
  private mood!: number;

  @Prop(String)
  private hue!: string;

  @Prop(DateTime)
  private date!: DateTime;

  @Prop()
  private comment!: any;

  @Ref("toastuiViewer")
  private viewer!: Viewer;

  private mounted() {
    if (this.viewer && this.comment) {
      this.viewer.invoke("setMarkdown", this.comment);
    }
  }

  private updated() {
    if (this.viewer && this.comment) {
      this.viewer.invoke("setMarkdown", this.comment);
    }
  }

}
</script>
