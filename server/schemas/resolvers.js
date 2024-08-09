const User = require('../models/User');
const Build = require('../models/Build');
const { AuthenticationError } = require('@apollo/server');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (_, { id }) => {
      try {
        return await User.findById(id);
      } catch (error) {
        throw new Error('Error fetching user');
      }
    },
    builds: async (_, { userId }) => {
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
    createBuild: async (_, { userId, name, cpu, gpu, ram, storage, motherboard, powerSupply, caseName, cooling }, context) => {
      try {
        // Check if user is authenticated
        if (!context.user) {
          throw new AuthenticationError('You need to be logged in to create a build');
        }

        const build = new Build({ 
          user: userId, 
          name, 
          cpu, 
          gpu, 
          ram, 
          storage, 
          motherboard, 
          powerSupply, 
          case: caseName, 
          cooling 
        });
        return await build.save();
      } catch (error) {
        throw new Error('Error creating build');
      }
    },
  },
};

module.exports = resolvers;