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

import Vue from "vue";
import VueI18n, { LocaleMessages, DateTimeFormats } from "vue-i18n";
import { configure } from "vee-validate";

Vue.use(VueI18n);

const loadLocaleMessages = (): LocaleMessages => {
  const messages: LocaleMessages = {};
  if (process.env.NODE_ENV === "test") {
    return messages;
  }

  const locales = require.context("./locales/general", true, /[A-Za-z0-9-_,\s]+\.json$/i);
  return processMessages(locales, messages);
};

const loadDateFormats = (): DateTimeFormats => {
  const messages: DateTimeFormats = {};

  if (process.env.NODE_ENV === "test") {
    return messages;
  }

  const locales = require.context("./locales/dates", true, /[A-Za-z0-9-_,\s]+\.json$/i);
  return processMessages(locales, messages);
};

const processMessages = (locales: any, messages: any): any => {
  locales.keys().forEach((key: string) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
};

const i18n = new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || "en",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  messages: loadLocaleMessages(),
  dateTimeFormats: loadDateFormats(),
  silentTranslationWarn: process.env.NODE_ENV !== "development",
});

configure({
  defaultMessage: (field, values = {}) => {
    const fieldName: string = `fields.${field.toString()}`.toString();
    const validationKey: string = `VALIDATIONS.${values._rule_}`;

    values._field_ = i18n.t(fieldName);
    return i18n.t(validationKey, values).toString();
  },
});

export default i18n;
