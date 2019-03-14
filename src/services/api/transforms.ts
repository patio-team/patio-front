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
  toDateTime,
  formatUTCtoISO,
  formatUTCtoISODate,
  formatUTCtoISOTime,
} from "@/utils/datetime";


export const stringifyRequest = (data: any, headers?: any) =>
  JSON.stringify(data, (key, value) => {
    if (typeof value === "string") {
      if (key) {
        if (key.endsWith("DateTime")) {
          return formatUTCtoISO(value);
        }
        if (key.endsWith("Date")) {
          return formatUTCtoISODate(value);
        }
        if (key.endsWith("Time")) {
          return formatUTCtoISOTime(value);
        }
      }
    }
    return value;
  });

export const parseResponse = (data: any) =>
  JSON.parse(data, (key, value) => {
    if (typeof value === "string") {
      if (key) {
        if (key.endsWith("DateTime")) {
          return toDateTime(value);
        }
        if (key.endsWith("Date")) {
          return toDateTime(value);
        }
        if (key.endsWith("Time")) {
          return toDateTime(value);
        }
      }
    }
    return value;
  });

export const transformRequest = [
  stringifyRequest,
];

export const transformResponse = [
  parseResponse,
];
