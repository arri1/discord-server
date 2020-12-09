const { default: gql } = require('graphql-tag')

const Post = gql`
  type Post {
    id: String!
    user: User!
    userId: String!
    text: String
    title: String!
  }

  type Query {
    findOnePost(where: PostWhereUniqueInput!): Post
    findFirstPost(
      where: PostWhereInput
      orderBy: [PostOrderByInput!]
      cursor: PostWhereUniqueInput
      distinct: PostDistinctFieldEnum
      skip: Int
      take: Int
    ): [Post!]
    findManyPost(
      where: PostWhereInput
      orderBy: [PostOrderByInput!]
      cursor: PostWhereUniqueInput
      distinct: PostDistinctFieldEnum
      skip: Int
      take: Int
    ): [Post!]
    findManyPostCount(
      where: PostWhereInput
      orderBy: [PostOrderByInput!]
      cursor: PostWhereUniqueInput
      distinct: PostDistinctFieldEnum
      skip: Int
      take: Int
    ): Int!
    aggregatePost(
      where: PostWhereInput
      orderBy: [PostOrderByInput!]
      cursor: PostWhereUniqueInput
      distinct: PostDistinctFieldEnum
      skip: Int
      take: Int
    ): AggregatePost
  }
  type Mutation {
    createOnePost(data: PostCreateInput!): Post!
    updateOnePost(where: PostWhereUniqueInput!, data: PostUpdateInput!): Post!
    deleteOnePost(where: PostWhereUniqueInput!): Post
    upsertOnePost(
      where: PostWhereUniqueInput!
      create: PostCreateInput!
      update: PostUpdateInput!
    ): Post
    deleteManyPost(where: PostWhereInput): BatchPayload
    updateManyPost(
      where: PostWhereInput
      data: PostUpdateManyMutationInput
    ): BatchPayload
  }
`

module.exports = {
  Post,
}
