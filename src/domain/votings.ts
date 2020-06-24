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

import { Group, User, PaginationResult } from "@/domain";
import { DateTime } from "@/utils/datetime";

type score = 1 | 2 | 3 | 4 | 5;

export interface Vote {
  id: string;
  createdAtDateTime: DateTime;
  createdBy: User;
  score: score;
  comment: string;
  hueMood: string;
  voting?: Voting;
}

export interface MoodCounter {
  mood: number;
  count: number;
}

export interface VotingStats {
  votesByMood: [MoodCounter];
  voteCount: number;
  maxVoteCountExpected: number;
  voteCountAverage: number;
  voteAveragePercentile: number;
  average: number;
  movingAverage: number;
}

export interface Voting {
  id: string;
  group: Group;
  createdAtDateTime: DateTime;
  createdBy: User;
  votes?: PaginationResult<Vote>;
  stats?: VotingStats;
}
