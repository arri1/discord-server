const { Post } = require('./Post/resolvers')
const { User } = require('./User/resolvers')

const resolvers = [User, Post]

module.exports = { resolvers }
