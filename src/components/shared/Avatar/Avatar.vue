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

<template src="./Avatar.pug" lang="pug"></template>
<style src="./Avatar.css" scoped></style>

<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import { namespace } from "vuex-class";

import { User } from "@/domain";

const AuthStore = namespace("auth");

@Component
export default class Avatar extends Vue {
  @Prop({ default: ""})
  private name!: string;

  @Prop({ default: 0})
  private mood!: number;

  @Prop(String)
  private avatar!: string;

  @Ref("holder")
  private readonly holder!: HTMLDivElement;

  private holderHeight: number = 0;
  private fontWidth: number = 0;

  public mounted() {
    this.getDimensions();
    window.addEventListener("resize", this.getDimensions);
  }

  public nameInitials(fullName: string) {
    const splitedName = fullName.split(" ");
    if ( splitedName.length > 1) {
      return splitedName[0][0] + splitedName[1][0];
    } else {
      return splitedName[0][0];
    }
  }

  public getMood(vote: number) {
    if (vote) {
      return "mood" + vote;
    } else {
      return "mood0";
    }
  }

  public getDimensions() {
    const element = this.$refs.holder as HTMLElement;
    const text = this.$refs.text as HTMLElement;
    const holderWidth = element.clientWidth;
    requestAnimationFrame(() => {
      this.holderHeight = holderWidth;
      this.fontWidth = this.holderHeight  / 2.5;
    });
  }
}
</script>
