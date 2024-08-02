const mongoose = require('mongoose');
const Build = require('./Build');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
    builds: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Build'
        // ? Might preferrably be used as 
        // builds: [Build.schema]
        // since it's being imported directly
        }
    ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;