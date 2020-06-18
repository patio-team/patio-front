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

<template src="./LoginForm.pug" lang="pug"></template>
<style src="./LoginForm.css" scoped></style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import WithGoogleButton from "./WithGoogleButton/WithGoogleButton.vue";

const Auth = namespace("auth");

@Component({
  components: {
    "dw-with-google-button": WithGoogleButton,
  },
})
export default class LoginForm extends Vue {
  private input = { email: "", password: "" };

  @Auth.Getter("loginIsLoading")
  private isLoading!: boolean;

  @Auth.Getter("loginError")
  private error!: boolean | string;

  @Auth.Action("login")
  private login: any;

  private async handleSubmit() {
    const isLogin = await this.login(this.input);

    if (isLogin) {
      const next = this.$route.query.next as string
        || { name: "voting:result" };
      this.$router.push(next);
    }
  }

  private forgotPassword() {
    this.$router.push({ name: "security:reset"});
  }
}
</script>
