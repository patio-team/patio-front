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

<template src="./ChangePasswordForm.pug" lang="pug"></template>
<style src="./ChangePasswordForm.css" scoped></style>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required, min } from "vee-validate/dist/rules";
import { sameAsProperty, isPassword } from "@/utils/validation";

// store namespace
const Auth = namespace("auth");

// validation rules
extend("required", required);
extend("min", min);
extend("isPassword", isPassword);
extend("sameAsProperty", sameAsProperty);

@Component({
  components: {
   ValidationProvider,
   ValidationObserver,
  },
})
export default class ChangePasswordForm extends Vue {
  private input = { password: "", repeatPassword: "" };

  @Auth.Getter("changePasswordIsLoading")
  private isLoading!: boolean;

  @Auth.Getter("changePasswordError")
  private error!: boolean | string;

  @Auth.Action("changePassword")
  private changePassword: any;

  private async handleSubmit() {
    const otp = this.$router.currentRoute.query.otp;
    const changed = await this.changePassword({
      password: this.input.password,
      otp,
    });

    if (changed) {
      this.$router.push({ name: "security:change-password:success"});
    }
  }

  private mounted() {
    const otp = this.$router.currentRoute.query.otp;

    if (!otp) {
      this.$router.push({ name: "login" });
    }
  }

  @Watch("error")
  private onErrorChanged(val: boolean | string, oldval: boolean | string) {
    if (val === "API_ERRORS.OTP_EXPIRED_FOR_USER") {
      this.$router.push({ name: "security:change-password:expired" });
    }
  }
}
</script>
