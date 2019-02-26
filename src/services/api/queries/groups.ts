export const ListGroupsQuery: string = `
query{
  listGroups{
    uuid
    visibleMemberList
    anonymousVote
    name
    members {
      uuid
      name
    }
  }
}`;
