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
    expect(gravatarImage("4f64c9f81bb0d4ee969aaf7b4a5a6f40")).toEqual(
      "https://www.gravatar.com/avatar/4f64c9f81bb0d4ee969aaf7b4a5a6f40?s=50&d=robohash");
  });
  it("return a gravatar url with 150px size", () => {
    expect(gravatarImage("4f64c9f81bb0d4ee969aaf7b4a5a6f40", {size: 150})).toEqual(
      "https://www.gravatar.com/avatar/4f64c9f81bb0d4ee969aaf7b4a5a6f40?s=150&d=robohash");
  });
});
