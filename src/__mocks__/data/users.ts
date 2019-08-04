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

import md5 from "md5";
import faker from "faker";
faker.seed(161803);


import { User } from "@/domain";

export function generateUser(params: any = {}): User {
  const email = faker.internet.email();
  const hash = md5(email.trim().toLowerCase());

  return Object.assign(
    {
      id: faker.random.uuid(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email,
      hash,
    },
    params,
  );
}

export function generateUserList(): User[] {
  const users = [] as User[];

  for (let i = 0; i < faker.random.number(4); i++) {
    users.push(generateUser());
  }
  return users;
}
