import faker from "faker";
faker.seed(161803);

import { generateUserList } from "./users";
import { Group } from "@/domain";

export function generateGroup(...params: any): Group {
  return Object.assign(
    {
      uuid: faker.random.uuid(),
      name: faker.company.companyName(),
      visibleMemberList: true,
      anonymousVote: true,
      members: faker.random.boolean() ? generateUserList() : undefined,
    },
    params,
  );
}

export function generateGroupList(): Group[] {
  const groups = [] as Group[];

  for (let i = 0; i < faker.random.number(4); i++) {
    groups.push(generateGroup());
  }
  return groups;
}
