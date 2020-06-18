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

<template lang="pug"></template>

<script lang="ts">
import { namespace } from "vuex-class";
import { Component, Vue } from "vue-property-decorator";

const Auth = namespace("auth");

@Component
export default class Oauth2Callback extends Vue {

  @Auth.Action("storeJWTToken")
  private storeJWTToken: any;

  public async mounted() {
    const authCode = this.$route.query.code;

    if (authCode) {

      const success = await this.storeJWTToken(authCode);

        /**
         * If authentication token's been obtained successfully
         * we can redirect to any url because all subsequent
         * requests should carry the JWT token in the HTTP Authorization
         * header
         */
      if (success) {
        // Try to get `next` query param from the oauth state param.
        const state = JSON.parse(this.$route.query.state as string);

        const next = state.next || { name: "team" };
        this.$router.push(next);
      }
    }
  }
}
</script>
