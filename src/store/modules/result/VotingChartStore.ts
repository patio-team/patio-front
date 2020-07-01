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

import { Action, getModule, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store";
import api from "@/services/api";

import { VotingStatsResult, VotingStats } from "@/domain";
import { ChartState, TimeWindow } from "@/store/modules/result/VotingChartStoreTypes";
import { VotingStatsInput } from "@/services/api/types/results";
import { DateTime } from "luxon";

const moduleName = "results:chart-statistics";

@Module({ stateFactory: true, dynamic: true, namespaced: true, name: moduleName, store })
export class VotingChartStore extends VuexModule {
  public chartState: ChartState = {
    statistics:  {
      totalCount: 0,
      lastPage: 0,
      page: 0,
      data: [] as VotingStats[],
    },
    prevWindow: {
      startDateTime: DateTime.local(),
      endDateTime: DateTime.local(),
    },
    nextWindow: {
      startDateTime: DateTime.local(),
      endDateTime: DateTime.local(),
    },
    hasPrev: false,
    hasNext: false,
  };

  @Mutation
  public updateChartState(state: ChartState) {
    if (state.statistics.data && state.statistics.data.length > 0) {
      this.chartState = state;
    }
  }

  @Action({ commit: "updateChartState" })
  public async fetchVotingStats(input: VotingStatsInput) {
    const widerInput: VotingStatsInput = {
      ...input,
      startDateTime: input.startDateTime.minus({days: 7}).startOf("day"),
      endDateTime: input.endDateTime.plus({days: 7}).endOf("day"),
    };

    const statistics: VotingStatsResult = await api.results.getVotingChartStatistics(widerInput);
    const data: VotingStats[] = statistics.data;

    // although we've requested a wider window frame we only are asked to paint
    // just the entries within the input request
    const chartData: VotingStats[] = data
      .filter((stat: VotingStats) =>
        stat.createdAtDateTime.startOf("day") >= input.startDateTime.startOf("day") &&
        stat.createdAtDateTime.endOf("day") <= input.endDateTime.endOf("day"));
    statistics.data = chartData;

    const hasPrev = data.filter((stat: VotingStats) => stat.createdAtDateTime < input.startDateTime).length > 0;
    const hasNext = data.filter((stat: VotingStats) => stat.createdAtDateTime > input.endDateTime).length > 0;

    const prevWindow: TimeWindow = {
      startDateTime: input.startDateTime.minus({days: 7}).startOf("day"),
      endDateTime: input.endDateTime.minus({days: 7}).endOf("day"),
    };

    const nextWindow: TimeWindow = {
      startDateTime: input.startDateTime.plus({days: 7}).startOf("day"),
      endDateTime: input.endDateTime.plus({days: 7}).endOf("day"),
    };

    return { statistics, prevWindow, nextWindow, hasPrev, hasNext };
  }
}

export default getModule(VotingChartStore);
