const {PrismaClient} = require('@prisma/client')
const {GraphQLServer} = require('graphql-yoga')
const {generateGraphQlSDLFile, PrismaSelect} = require('@paljs/plugins')
const {applyMiddleware} = require('graphql-middleware')
const {makeExecutableSchema} = require('graphql-tools')
const {typeDefs} = require('./graphql/typeDefs')
const {resolvers} = require('./graphql/resolvers')
const {checkRole} = require('./utils/auth')
require('dotenv').config()

const prisma = new PrismaClient()

let schema = makeExecutableSchema({typeDefs, resolvers});

// Build one sdl file have all types you can delete if you not need
generateGraphQlSDLFile(schema);

const middleware = async (resolve, root, args, context, info) => {
    const result = new PrismaSelect(info).value;
    if (Object.keys(result.select).length > 0) {
        args = {
            ...args,
            ...result,
        };
    }
    return resolve(root, args, context, info);
};

schema = applyMiddleware(schema, middleware);

const server = new GraphQLServer({
    schema,
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
    }
})
const PORT = process.env.PORT || process.env.SERVER_PORT

server.start({port: PORT}, () => {
    console.log(`Server is running on localhost:${PORT}`)
})
