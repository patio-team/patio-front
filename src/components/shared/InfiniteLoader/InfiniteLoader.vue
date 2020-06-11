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

<template lang="pug">
  .infinite-loader
</template>
<style lang="postcss" scoped>
  .infinite-loader {
    height: 1px;
    width: 100%;
  }
</style>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class InfiniteLoader extends Vue {
  private observer!: IntersectionObserver;

  private mounted() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$emit("intersect");
      }
    });

    this.observer.observe(this.$el);
  }
}
</script>
