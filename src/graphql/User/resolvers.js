const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = {
    Query: {
        user: async (_parent, args, {prisma, access}) => {
            const {id} = await access.user()
            return prisma.user.findOne({where: {id}})
        },
        findOneUser: (_parent, args, {prisma}) => {
            return prisma.user.findOne(args)
        },
        findFirstUser: (_parent, args, {prisma}) => {
            return prisma.user.findFirst(args)
        },
        findManyUser: (_parent, args, {prisma}) => {
            return prisma.user.findMany(args)
        },
        findManyUserCount: (_parent, args, {prisma}) => {
            return prisma.user.count(args)
        },
        aggregateUser: (_parent, args, {prisma}) => {
            return prisma.user.aggregate(args)
        },
    },
    Mutation: {
        registerUser: async (_parent, {data}, {prisma}) => {
            const {password} = data
            passwordBcrypt = await bcrypt.hash(password, 10)
            data.password = passwordBcrypt
            const user = await prisma.user.create({data})
            const token = jwt.sign({id: user.id}, process.env.USER_SECRET)
            return {
                user,
                token
            }
        },
        authUser: async (_parent, {data}, {prisma}) => {
            const {password, login} = data
            const user = await prisma.user.findOne({where: {login}})
            const compare = bcrypt.compareSync(password, user.password)
            if (!compare) throw new Error("Incorrect password")
            const token = await jwt.sign({id: user.id}, process.env.USER_SECRET)
            return {
                token,
                user
            }
        },
        updateUser: async (_parent, args, {prisma, access}) => {
            const {id} = await access.user()
            args.where = {id}
            if (args.data.password && args.data.password.set) {
                args.data.password.set = await bcrypt.hash(args.data.password.set, 10)
            }
            return prisma.user.update(args)
        },
        createOneUser: (_parent, args, {prisma}) => {
            throw new Error('Not access')
            return prisma.user.create(args)
        },
        updateOneUser: (_parent, args, {prisma}) => {
            throw new Error('Not access')
            return prisma.user.update(args)
        },
        deleteOneUser: async (_parent, args, {prisma}) => {
            throw new Error('Not access')
            return prisma.user.delete(args)
        },
        upsertOneUser: async (_parent, args, {prisma}) => {
            throw new Error('Not access')
            return prisma.user.upsert(args)
        },
        deleteManyUser: async (_parent, args, {prisma}) => {
            throw new Error('Not access')
            return prisma.user.deleteMany(args)
        },
        updateManyUser: (_parent, args, {prisma}) => {
            throw new Error('Not access')
            return prisma.user.updateMany(args)
        },
    },
}

module.exports = {
    User,
}
