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
import { Store } from "vuex-mock-store";
import { now, minus } from "@/utils/datetime";

import { generateGroup } from "@/__mocks__/data/groups";

import GroupStats from "./GroupStats.vue";

const getStore = () => {
  return new Store({
    state: {
      group: {},
    },
    getters: {
      "group/stats": undefined as any,
      "group/getGroupStatsError": false,
      "group/getGroupStatsIsLoading": false,
    },
  });
};

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
    const store = getStore();
    const wrapper = getWrapper({
      propsData: {
        group,
        startDateTime: minus({days: 6 * (3 * 7)}),
        endDateTime: now(),
      },
      mocks: {
        $store: store,
      },
    });
    const vm = wrapper.vm as any;

    store.getters["group/stats"] = group.votings;

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith("group/getGroupStats", {
      id: group.id,
      startDateTime: vm.startDateTime,
      endDateTime: vm.endDateTime,
    });
    expect(wrapper.contains("[data-testid='stats']")).toBe(true);
  });
});

