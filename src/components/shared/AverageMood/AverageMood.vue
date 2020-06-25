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

<template src="./AverageMood.pug" lang="pug"></template>
<style src="./AverageMood.css" scoped></style>
<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";

@Component
export default class AverageMood extends Vue {

  @Prop({ default: 0})
  private moodAverage!: number;

  @Prop({ default: 0})
  private averagePercentil!: number;

  private mood: number = 0;

  private getMood() {
    if (this.moodAverage) {
      if (this.moodAverage >= 0.1 && this.moodAverage <= 1.5) {
        return "mood1";
      } else if (this.moodAverage > 1.5 && this.moodAverage <= 2.5) {
        return "mood2";
      } else if (this.moodAverage > 2.5 && this.moodAverage <= 3.5) {
        return "mood3";
      } else if (this.moodAverage > 3.5 && this.moodAverage <= 4.5) {
        return "mood4";
      } else if (this.moodAverage >= 4.5 && this.moodAverage <= 5) {
        return "mood5";
      }
    }
    return "mood0";
  }

  private previousDay() {
    // TODO
    const previous = 1;
  }

  private lastDay() {
    // TODO
    const last = 1;
  }

}
</script>
