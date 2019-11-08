/*!
 * Copyright (C) 2019 Kaleidos Open Source SL
 *
 * This file is part of Dont Worry Be Happy (DWBH).
 * DWBH is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * DWBH is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with DWBH.  If not, see <https://www.gnu.org/licenses/>.
 */

import ClientOAuth2 from "client-oauth2";

/**
 * Oauth2 options and client
 */
const options: ClientOAuth2.Options = {
  clientId: process.env.VUE_APP_OAUTH2_CLIENT_ID,
  accessTokenUri: process.env.VUE_APP_TOKEN_URI,
  authorizationUri: process.env.VUE_APP_AUTH_URI,
  redirectUri: process.env.VUE_APP_REDIRECT_URI,
  scopes: [`${process.env.VUE_APP_SCOPE}`],
};

export const oauth2Client = new ClientOAuth2(options);

/**
 * Returns the URL of the authentication provider where the
 * user will be redirected when trying to authenticate itself.
 *
 */
export const getAuthURL = () => {
  return oauth2Client.code.getUri();
};

/**
 * In order to render the Google Oauth2 login or not we need
 * to know whether the configuration has been set or not
 *
 * @return true if oauth2 configuration has been set, false otherwise
 */
export const isEnabled = () => {
  const requiredEntries = [
    process.env.VUE_APP_OAUTH2_CLIENT_ID,
    process.env.VUE_APP_AUTH_URI,
    process.env.VUE_APP_REDIRECT_URI,
    process.env.VUE_APP_SCOPE,
  ];

  return requiredEntries.every((next) => typeof next !== "undefined");
};
