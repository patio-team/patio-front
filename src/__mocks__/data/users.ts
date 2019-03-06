import faker from "faker";
faker.seed(161803);

import { User } from "@/domain";

export function generateUser(...params: any): User {
  return Object.assign(
    {
      uuid: faker.random.uuid(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
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
