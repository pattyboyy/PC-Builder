const User = require('../models/User');
const Build = require('../models/Build');

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
    createUser: async (_, { username, email, password }) => {
      try {
        const user = new User({ username, email, password });
        return await user.save();
      } catch (error) {
        throw new Error('Error creating user');
      }
    },
    createBuild: async (_, { userId, name, cpu, gpu, ram, storage, motherboard, powerSupply, caseName, cooling }) => {
      try {
        const build = new Build({ user: userId, name, cpu, gpu, ram, storage, motherboard, powerSupply, case: caseName, cooling });
        return await build.save();
      } catch (error) {
        throw new Error('Error creating build');
      }
    },
  },
};

module.exports = resolvers;