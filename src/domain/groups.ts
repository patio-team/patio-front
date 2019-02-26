import { User } from "./users";

export interface Group {
  uuid: string;
  visibleMemberList: boolean;
  anonymousVote: boolean;
  name: string;
  members?: User[];
}
