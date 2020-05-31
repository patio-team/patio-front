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

import { ValidationRule } from "vee-validate/dist/types/types";
import { regex } from "vee-validate/dist/rules";

/**
 * Compares the current validated property with another property
 * passed as an argument
 */
export const sameAsProperty: ValidationRule = {
  params: ["reference"],
  validate(val, { reference }: any) {
    return val === reference;
  },
};

/**
 * Checks that a given password follows certain basic rules
 *
 * - at least 8 characters long
 * - at least 1 uppercase letter
 * - at least 1 lowercase letter
 * - at least one special character
 */
export const isPassword: ValidationRule = {
  validate: (val, args) => {
    return regex.validate(
      val,
      {
        regex: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\,\$%\^&\*])(?=.{8,})"),
      },
    );
  },
};
