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

import {
  DateTime,
  formatToDate,
  formatToDateSimpleWithWeekDay,
  formatToDateTimeWithWeekDay,
  formatToTimeSimple,
} from "@/utils/datetime";

import i18n from "@/i18n";

import { Day } from "@/domain";

export const toTime = (dt: DateTime) =>
  formatToTimeSimple(dt);
Vue.filter("toTime", toTime);

export const toDate = (dt: DateTime) =>
  formatToDate(dt);
Vue.filter("toDate", toDate);

export const toDateSimpleWithWeekDay = (dt: DateTime) => {
  return formatToDateSimpleWithWeekDay(dt);
};
Vue.filter("toDateSimpleWithWeekDay", toDateSimpleWithWeekDay);

export const toDateTimeWithWeekDay = (dt: DateTime) => {
  return formatToDateTimeWithWeekDay(dt);
};
Vue.filter("toDateTimeWithWeekDay", toDateTimeWithWeekDay);

export const toListOfDays = (votingDays: Day[]) =>
  votingDays
    .map((d) => i18n.t(`COMMON.DAYS.${d}`))
    .join(", ");
Vue.filter("toListOfDays", toListOfDays);
