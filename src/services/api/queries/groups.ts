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

export const ListMyGroupsQuery = `
query {
  listMyGroups {
    id
    name
    visibleMemberList
    anonymousVote
    members {
      id
      name
    }
    isCurrentUserAdmin
  }
}`;

export const GetGroupQuery = `
query GetGroup(
  $id: ID!
) {
  getGroup(id: $id) {
    id
    name
    visibleMemberList
    anonymousVote
    votingDays
    votingTime
    members {
      id
      name
    }
    isCurrentUserAdmin
  }
}`;

export const GetGroupWithNoMembersQuery = `
query GetGroup(
  $id: ID!
) {
  getGroup(id: $id) {
    id
    name
    visibleMemberList
    anonymousVote
    votingDays
    votingTime
    isCurrentUserAdmin
  }
}`;

export const CreateGroupMutation = `
mutation CreateGroup(
  $name: String!,
  $visibleMemberList: Boolean!,
  $anonymousVote: Boolean!,
  $votingTime: Time!,
  $votingDays: [DayOfWeek]!
) {
  createGroup(
    name: $name,
    visibleMemberList: $visibleMemberList,
    anonymousVote: $anonymousVote,
    votingTime: $votingTime,
    votingDays: $votingDays
  ) {
    id
    name
    visibleMemberList
    anonymousVote
    isCurrentUserAdmin
  }
}`;
