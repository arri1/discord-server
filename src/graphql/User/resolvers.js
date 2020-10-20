const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = {
  Query: {
    user: async (_parent, args, {prisma, access}) => {
      const {id} = await access.user()
      return prisma.user.findOne({where: {id}})
    },
    findOneUser: (_parent, args, { prisma }) => {
      return prisma.user.findOne(args)
    },
    findFirstUser: (_parent, args, { prisma }) => {
      return prisma.user.findFirst(args)
    },
    findManyUser: (_parent, args, { prisma }) => {
      return prisma.user.findMany(args)
    },
    findManyUserCount: (_parent, args, { prisma }) => {
      return prisma.user.count(args)
    },
    aggregateUser: (_parent, args, { prisma }) => {
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
      const {password, email} = data
      const user = await prisma.user.findOne({where: {email}})
      const compare = bcrypt.compareSync(password, user.password)
      if (!compare) throw new Error("Incorrect password")
      const token = await jwt.sign({id: user.id}, process.env.USER_SECRET)
      return {
        token,
        user
      }
    },
    createOneUser: (_parent, args, { prisma }) => {
      return prisma.user.create(args)
    },
    updateOneUser: (_parent, args, { prisma }) => {
      return prisma.user.update(args)
    },
    deleteOneUser: async (_parent, args, { prisma }) => {
      return prisma.user.delete(args)
    },
    upsertOneUser: async (_parent, args, { prisma }) => {
      return prisma.user.upsert(args)
    },
    deleteManyUser: async (_parent, args, { prisma }) => {
      return prisma.user.deleteMany(args)
    },
    updateManyUser: (_parent, args, { prisma }) => {
      return prisma.user.updateMany(args)
    },
  },
}

module.exports = {
  User,
}
