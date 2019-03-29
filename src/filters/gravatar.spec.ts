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

import { gravatarImage } from "./gravatar";


describe("filters: gravatar/gravatarImage", () => {
  it("return a gravatar url with default size", () => {
    expect(gravatarImage("email@email.com")).toEqual(
      "https://www.gravatar.com/avatar/4f64c9f81bb0d4ee969aaf7b4a5a6f40?s=50&d=robohash");
  });
  it("return a gravatar url with 150px size", () => {
    expect(gravatarImage("email@email.com", {size: 150})).toEqual(
      "https://www.gravatar.com/avatar/4f64c9f81bb0d4ee969aaf7b4a5a6f40?s=150&d=robohash");
  });
  it("return the same gravatar url with an email with uppercase letters", () => {
    expect(gravatarImage("email@email.com")).toEqual(gravatarImage("eMAil@emaIL.Com"));
  });
  it("return the same gravatar url with an email with extra spaces", () => {
    expect(gravatarImage("email@email.com")).toEqual(gravatarImage("    email@email.com              "));
  });
  it("return the same gravatar url with an email with extra spaces and upper case letters", () => {
    expect(gravatarImage("email@email.com")).toEqual(gravatarImage("    eMAil@emaIL.Com              "));
  });
});
