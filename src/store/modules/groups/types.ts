import { Group } from "@/domain";

export interface GroupsState {
  groupList: Group[];
  groupListIsLoading: boolean;
  groupListError: boolean | string;
}
