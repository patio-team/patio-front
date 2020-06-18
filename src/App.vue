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

<template src="./App.pug" lang="pug"></template>
<style src="./App.css"></style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { Notifications } from "@/plugins/notifications";
import Header from "@/views/Header/Header.vue";

@Component({
  components: {
    "notifications": Notifications,
    "dw-header": Header,
  },
})
export default class App extends Vue {
  public mounted() {
    const vh = window.innerHeight;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", () => {
      const vhStyle = window.innerHeight;
      document.documentElement.style.setProperty("--vh", `${vhStyle}px`);
    });
  }
}
</script>
