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

import { DateTime, DateTimeFormatOptions } from "luxon";

export { DateTime } from  "luxon";

export const toDateTime = (text: string): DateTime =>
  DateTime.fromISO(text);

// Utils to work with the API
export const formatUTCtoISO = (text: string): string =>
  toDateTime(text).toUTC().toISO();

export const formatUTCtoISODate = (text: string): string =>
  toDateTime(text).toUTC().toISODate();

export const formatUTCtoISOTime = (text: string): string =>
  toDateTime(text).toUTC().toFormat("HH:mm:ss.SSS'Z'");

// Utils to work with HTML inputs
export const formatToTime24Simple = (datetime: DateTime): string =>
  datetime.toLocaleString(DateTime.TIME_24_SIMPLE);

