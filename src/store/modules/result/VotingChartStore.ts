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

import { VotingStats, PaginationResult } from "@/domain";
import { ChartState, TimeWindow } from "@/store/modules/result/VotingChartStoreTypes";
import { VotingStatsInput } from "@/services/api/types/results";

const moduleName = "results:chart-statistics";

@Module({ stateFactory: true, dynamic: true, namespaced: true, name: moduleName, store })
export class VotingChartStore extends VuexModule {
  public chartState: ChartState = {
    data: [] as VotingStats[],
    nextPage: 0,
    prevPage: 0,
    hasPrev: false,
    hasNext: false,
  };

  @Mutation
  public updateChartState(state: ChartState) {
    if (state.data && state.data.length > 0) {
      this.chartState = state;
    }
  }

  @Action({ commit: "updateChartState" })
  public async fetchVotingStats(input: VotingStatsInput) {
    // getting data from backend
    const statistics: PaginationResult<VotingStats> = await api.results.getVotingChartStatistics(input);

    // resolving pagination info
    const hasPrev = statistics.page < statistics.lastPage;
    const hasNext = statistics.page > 0;
    const prevPage = statistics.page + 1;
    const nextPage = statistics.page - 1;

    // adding one empty element at the end if there're no more elements forwards
    if (!hasNext) {
      const lastRecord = statistics.data[statistics.data.length - 1];

      statistics.data = [
        ...statistics.data,
        { createdAtDateTime: lastRecord.createdAtDateTime.plus({days: 1}) },
      ];
    }

    // adding one empty element at the beggining if there're no more elements backwards
    if (!hasPrev) {
      const firstRecord = statistics.data[0];

      statistics.data = [
        { createdAtDateTime: firstRecord.createdAtDateTime.minus({days: 1}) },
        ...statistics.data,
      ];
    }

    // #TODO back should control this
    statistics.data = statistics.data.sort((a: VotingStats, b: VotingStats) => {
      return a.createdAtDateTime === b.createdAtDateTime
        ? 0
        : a.createdAtDateTime > b.createdAtDateTime ? 1 : -1;
    });

    return { data: statistics.data, nextPage, prevPage, hasPrev, hasNext };
  }
}

export default getModule(VotingChartStore);
