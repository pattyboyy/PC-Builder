const User = require('../models/User');
const Build = require('../models/Build');
const { AuthenticationError } = require('@apollo/server');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    user: async (_, { id }) => {
      try {
        return await User.findById(id);
      } catch (error) {
        throw new Error('Error fetching user');
      }
    },
    builds: async () => {
      return await Build.find({}).populate('user');
    },
    buildsByUserId: async (_, { userId }) => {
      try {
        return await Build.find({ user: userId });
      } catch (error) {
        throw new Error('Error fetching builds');
      }
    },
  },
  Mutation: {
    addUser: async (_, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw new Error('Error creating user');
      }
    },
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }

        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw new Error('Error logging in');
      }
    },
    addBuild: async (parent, { user, name, cpu, gpu, ram, storage, motherboard, powerSupply, caseName, cooling }) => {
      try {
        console.log(`user:${user}`);
        const result = await Build.create({ user, name, cpu, gpu, ram, storage, motherboard, powerSupply, caseName, cooling });
        console.log(result);
      } catch (error) {
        console.log(error);
        throw new Error('Error creating build');
      }
    },
  },
};

module.exports = resolvers;