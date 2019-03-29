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

import { mount, RouterLinkStub } from "@vue/test-utils";

import { generateGroup } from "@/__mocks__/data/groups";

import GroupStats from "./GroupStats.vue";

const getWrapper = (...params: any) => {
  return mount(
    GroupStats,
    Object.assign(
      { stubs: { RouterLink: RouterLinkStub } },
      ...params,
    ),
  );
};

describe("Component: shared/GroupStats", () => {
  it("show render group stats", () => {
    const group = generateGroup();
    const props = { group };
    const wrapper = getWrapper({ propsData: props });

    expect(wrapper.contains("[data-testid='stats']")).toBe(true);
  });
});

