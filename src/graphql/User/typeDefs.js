const { default: gql } = require('graphql-tag')

const User = gql`
  type User {
    id: String!
    login: String!
    name: String
    group: String
  }
  input AuthUserInput {
    login: String!
    password: String!
  }

  input RegistrationUserInput {
    login: String!
    password: String!
    name: String
  }

  type AuthUserOutput {
    token: String!
    user: User!
  }

  type Query {
    user: User
    findOneUser(where: UserWhereUniqueInput!): User
    findFirstUser(
      where: UserWhereInput
      orderBy: [UserOrderByInput!]
      cursor: UserWhereUniqueInput
      distinct: UserDistinctFieldEnum
      skip: Int
      take: Int
    ): [User!]
    findManyUser(
      where: UserWhereInput
      orderBy: [UserOrderByInput!]
      cursor: UserWhereUniqueInput
      distinct: UserDistinctFieldEnum
      skip: Int
      take: Int
    ): [User!]
    findManyUserCount(
      where: UserWhereInput
      orderBy: [UserOrderByInput!]
      cursor: UserWhereUniqueInput
      distinct: UserDistinctFieldEnum
      skip: Int
      take: Int
    ): Int!
    aggregateUser(
      where: UserWhereInput
      orderBy: [UserOrderByInput!]
      cursor: UserWhereUniqueInput
      distinct: UserDistinctFieldEnum
      skip: Int
      take: Int
    ): AggregateUser
  }
  type Mutation {
    registerUser(data: RegistrationUserInput!): AuthUserOutput
    authUser(data: AuthUserInput!): AuthUserOutput
    updateUser(data: UserUpdateInput!): User!
    createOneUser(data: UserCreateInput!): User!
    updateOneUser(where: UserWhereUniqueInput!, data: UserUpdateInput!): User!
    deleteOneUser(where: UserWhereUniqueInput!): User
    upsertOneUser(
      where: UserWhereUniqueInput!
      create: UserCreateInput!
      update: UserUpdateInput!
    ): User
    deleteManyUser(where: UserWhereInput): BatchPayload
    updateManyUser(
      where: UserWhereInput
      data: UserUpdateManyMutationInput
    ): BatchPayload
  }
`

module.exports = {
  User,
}
