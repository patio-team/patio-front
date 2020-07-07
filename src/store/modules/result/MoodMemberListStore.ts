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

import { Vote, PaginationRequest, PaginationResult } from "@/domain";
import { Action, getModule, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store";
import api from "@/services/api";

const moduleName = "results:mood-member-list";

export interface MoodMemberListInput {
  votingId: string;
  pagination: PaginationRequest;
}

@Module({ stateFactory: true, dynamic: true, namespaced: true, name: moduleName, store })
export class MoodMemberListStore extends VuexModule {
  public moodMemberList: Vote[] = [];

  @Mutation
  public setMoodMemberResult(result: PaginationResult<Vote>) {
    this.moodMemberList.push(...result.data);
  }

  @Mutation
  public clearMoodMemberResult(result: PaginationResult<Vote>) {
    this.moodMemberList = result.data;
  }

  @Action({ commit: "clearMoodMemberResult" })
  public async resetMoodMemberResult(input: MoodMemberListInput) {
    if (!input.votingId) {
      return {data: [], pagination: input.pagination};
    }

    return await api.results.listMembersMood(input.votingId, input.pagination);
  }

  @Action({ commit: "setMoodMemberResult" })
  public async fetchMoodMemberList(input: MoodMemberListInput) {
    if (!input.votingId) {
      return {data: [], pagination: input.pagination};
    }

    return await api.results.listMembersMood(input.votingId, input.pagination);
  }
}

export default getModule(MoodMemberListStore);
