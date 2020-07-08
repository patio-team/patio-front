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

import { VotingStats, PaginationResult, OffsetPaginationResult } from "@/domain";
import { ChartState, TimeWindow } from "@/store/modules/result/VotingChartStoreTypes";
import { VotingStatsInput } from "@/services/api/types/results";

const moduleName = "results:chart-statistics";

@Module({ stateFactory: true, dynamic: true, namespaced: true, name: moduleName, store })
export class VotingChartStore extends VuexModule {
  public chartState: ChartState = {
    data: [] as VotingStats[],
    next: 1,
    previous: 1,
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
    const MAX = 10;
    const OVERLAP = 3;

    let statistics: OffsetPaginationResult<VotingStats> = {offset: 0, totalCount: 0, data: []};

    try {
      statistics = await api.results.getVotingChartStatistics(input);
    } catch (error) {
      // nothing to do here
    }

    if (statistics.totalCount === 0) {
      return {
        data: [],
        next: 1,
        previous: 1,
        hasPrev: false,
        hasNext: false,
      };
    }

    const previous = statistics.offset + (MAX - OVERLAP);
    const next = statistics.offset - (MAX - OVERLAP);
    const hasRecords = statistics.totalCount > 0;
    const hasPrev = hasRecords && statistics.totalCount >= (statistics.offset + MAX);
    const hasNext = hasRecords && (statistics.offset - (MAX - OVERLAP)) >= 0;

    // console.log({previous, hasPrev, next, hasNext, offset: statistics.offset, totalCount: statistics.totalCount})

    statistics.data = statistics.data.sort((a: VotingStats, b: VotingStats) => {
      return a.createdAtDateTime === b.createdAtDateTime
        ? 0
        : a.createdAtDateTime > b.createdAtDateTime ? 1 : -1;
    });

    if (!hasNext) {
      const lastRecord = statistics.data[statistics.data.length - 1];

      statistics.data = [
        ...statistics.data,
        { createdAtDateTime: lastRecord.createdAtDateTime.plus({days: 1}) },
      ];
    }

    if (!hasPrev) {
      const firstRecord = statistics.data[0];

      statistics.data = [
        { createdAtDateTime: firstRecord.createdAtDateTime.minus({days: 1}) },
        ...statistics.data,
      ];
    }

    statistics.data = statistics.data.sort((a: VotingStats, b: VotingStats) => {
      return a.createdAtDateTime === b.createdAtDateTime
        ? 0
        : a.createdAtDateTime > b.createdAtDateTime ? 1 : -1;
    });



    return { data: statistics.data, next, previous, hasPrev, hasNext };
  }
}

export default getModule(VotingChartStore);
