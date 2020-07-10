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

import { Vue } from "vue-property-decorator";
import { Day } from "@/domain";
import i18n from "@/i18n";


export const translateDays = (days: Day[]): string => {
  const i18nDays = days.map((day: Day) => i18n.t("COMMON.DAYS_PLURAL." + day));

  if (i18nDays.length > 1) {
    const head = i18nDays.slice(0, -1).join(", ");
    const tail = i18nDays[i18nDays.length - 1];
    return  `${head} ` + i18n.t("and") + ` ${tail}`;
  }

  return i18nDays.join(",");
};

Vue.filter("translateDays", translateDays);
