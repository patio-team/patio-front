import { AxiosInstance } from "axios";

import { Group } from "@/domain";

import {
  ListGroupsQuery,
} from "./queries/groups";

export default (client: AxiosInstance) => ({
  list() {
    return client
      .post("", { query: ListGroupsQuery })
      .then((data: any): Group[] => {
        return data.listGroups;
      });
  },
});
