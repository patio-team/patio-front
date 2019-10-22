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

<script lang="ts">

import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { KeycloakError } from "keycloak-js";

import keycloak from "@/services/security";

const Auth = namespace("auth");

@Component
export default class Login extends Vue {

  @Auth.Action("login")
  private login: any;

  @Auth.Mutation("loginRequest")
  private loginRequest: any;

  @Auth.Mutation("loginSuccess")
  private loginSuccess: any;

  @Auth.Mutation("loginError")
  private loginError: any;

  public async mounted() {
    this.loginRequest();
    keycloak
      .init({onLoad: "login-required"})
      .success((ok) => {
        const login = {
          token: keycloak.token as string,
        };
        this.loginSuccess(login);
        const next = this.$route.query.next as string
          || { name: "groups:list" };
        this.$router.push(next);
      }).error((error) => {
        this.loginError(error.error);
        this.$notify.error(error.error);
      });
  }

  public render() {
    return;
  }
}
</script>
