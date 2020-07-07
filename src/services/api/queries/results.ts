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

export const ListMembersMood = `
query ListMembersMood($votingId: ID!, $page: Int, $max: Int) {
  getVoting(id: $votingId) {
    id
    didIVote
    group {
      id
    }
    votes(page: $page, max: $max) {
      totalCount
      page
      lastPage
      data {
        score
        hueMood
        comment
        createdBy {
          id
          name
        }
      }
    }
  }
}
`;

export const GetFavouriteGroup = `
query GetFavouriteGroup {
  getMyFavouriteGroup {
    id
    name
    isCurrentUserAdmin
  }
}
`;

export const GetVotingChartStatistics = `
query GetVotingStats($groupId: ID!, $offset: Int, $max: Int) {
  getStatsByGroup(
    groupId: $groupId,
    max: $max,
    offset: $offset
  ) {
    offset
    totalCount
    data {
      average
      movingAverage
      voting {
        id
        createdAtDateTime
      }
      createdAtDateTime
    }
  }
}
`;
