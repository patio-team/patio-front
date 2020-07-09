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

<template src="./MyProfile.pug" lang="pug"></template>
<style src="./MyProfile.css"></style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, namespace } from "vuex-class";
import Avatar from "@/components/shared/Avatar/Avatar.vue";

import { User } from "@/domain";

import md5 from "md5";

const AuthStore = namespace("auth");
@Component({
  components: {
    Avatar,
  },
})
export default class MyProfile extends Vue {
  @AuthStore.Getter("myProfile")
  private me!: User;
}
</script>
