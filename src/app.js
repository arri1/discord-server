const {PrismaClient} = require('@prisma/client')
const {typeDefs} = require('./graphql/typeDefs')
const {resolvers} = require('./graphql/resolvers')

const prisma = new PrismaClient()
