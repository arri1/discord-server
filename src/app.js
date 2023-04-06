const {PrismaClient} = require('@prisma/client')
const {GraphQLServer} = require('graphql-yoga')
const {PrismaSelect} = require('@paljs/plugins')
const {typeDefs} = require('./graphql/typeDefs')
const {resolvers} = require('./graphql/resolvers')
const {checkRole} = require('./utils/auth')
require('dotenv').config()

const prisma = new PrismaClient()

const middleware = async (resolve, root, args, context, info) => {
    const result = new PrismaSelect(info).value
    if (Object.keys(result.select).length > 0) {
        args = {
            ...args,
            ...result
        }
    }
    return resolve(root, args, context, info)
}
const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: (req) => {
        const {authorization} = req.request.headers
        const access = {
            user: () => checkRole(authorization, 'user', prisma, true),
            or: async (...roles) => {
                const checks = await Promise.all(roles.map(async role => {
                    return await checkRole(authorization, role, prisma, false)
                }))
                const find = checks.find(object => object)

                if (find) {
                    return find
                } else {
                    throw new Error('Not access')
                }
            }
        }
        return {
            prisma,
            access
        }
    },
    introspection: true,
    playground: true,
    middlewares: [middleware]
})
const PORT = process.env.PORT || process.env.SERVER_PORT || 80

server.start({port: PORT}, () => {
    console.log(`Server is running on localhost:${PORT}`)
})

