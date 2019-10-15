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

import {
  DateTime,
  DateTimeFormatOptions,
  Duration,
  DurationObject,
} from "luxon";

export { DateTime } from "luxon";

export const toDateTime = (text: string): DateTime =>
  DateTime.fromISO(text);

export const now = (): DateTime =>
  DateTime.local();

export const plus = (duration: Duration | number | DurationObject): DateTime =>
  DateTime.local().plus(duration);

export const plusTo = (datetime: DateTime, duration: Duration | number | DurationObject): DateTime =>
  datetime.plus(duration);

export const minus = (duration: Duration | number | DurationObject): DateTime =>
  DateTime.local().minus(duration);

export const minusTo = (datetime: DateTime, duration: Duration | number | DurationObject): DateTime =>
  datetime.minus(duration);

export const getListOfDays = (from: DateTime, to: DateTime): DateTime[] => {
  const list = [] as DateTime[];
  const end = from > to ? from : to;
  let current = from < to ? from : to;

  while(!current.hasSame(end, "day")) {
    current = current.plus({days: 1});
    list.push(current);
  }

  return list;
};

export const isToday = (datetime?: DateTime): boolean =>
  datetime ? DateTime.local().hasSame(datetime, "day") : false;

// Utils to work with the API
export const formatUTCtoISO = (text: string): string =>
  toDateTime(text).toUTC().toISO();

export const formatUTCtoISODate = (text: string): string =>
  toDateTime(text).toUTC().toISODate();

export const formatUTCtoISOTime = (text: string): string =>
  toDateTime(text).toUTC().toFormat("HH:mm:ss.SSS'Z'");

// Utils to work with HTML inputs
export const formatToDate = (datetime: DateTime): string =>
  datetime.toLocaleString(DateTime.DATE_SHORT);

export const formatToDateSimpleWithWeekDay = (datetime: DateTime): string =>
  datetime.toLocaleString({ weekday: "long", month: "long", day: "2-digit" });

export const formatToDateTimeWithWeekDay = (datetime: DateTime): string =>
  datetime.toLocaleString({
    weekday: "short", month: "short", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit",
  });

export const formatToTime24Simple = (datetime: DateTime): string =>
  datetime.toLocaleString(DateTime.TIME_24_SIMPLE);

export const formatToTimeSimple = (datetime: DateTime): string =>
  datetime.toLocaleString(DateTime.TIME_SIMPLE);


