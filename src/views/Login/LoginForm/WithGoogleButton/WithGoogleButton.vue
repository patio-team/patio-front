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

<template src="./WithGoogleButton.pug" lang="pug"></template>
<style src="./WithGoogleButton.css" scoped></style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import ClientOAuth2 from "client-oauth2";

@Component
export default class WithGoogleButton extends Vue {
  public url = "";

  public mounted() {
    if (!this.isGoogleAuthEnabled) {
      return;
    }

    // Calculate redirect url
    const redirectUrl = this.$router.resolve({ name: "oauth2:callback" }).href;

    // Send query params (`next` p. x.) in the  oauth state param.
    const state = JSON.stringify(this.$route.query);

    const oauth2Client = new ClientOAuth2({
      clientId: process.env.VUE_APP_OAUTH2_CLIENT_ID,
      accessTokenUri: process.env.VUE_APP_TOKEN_URI,
      authorizationUri: process.env.VUE_APP_AUTH_URI,
      redirectUri: `${location.origin}${redirectUrl}`,
      scopes: [`${process.env.VUE_APP_SCOPE}`],
      state,
    });
    this.url = oauth2Client.code.getUri();
  }

  get isGoogleAuthEnabled(): boolean {
    const requiredEntries = [
      process.env.VUE_APP_OAUTH2_CLIENT_ID,
      process.env.VUE_APP_TOKEN_URI,
      process.env.VUE_APP_AUTH_URI,
      process.env.VUE_APP_SCOPE,
    ];

    return requiredEntries.every((next) => next);
  }
}
</script>
