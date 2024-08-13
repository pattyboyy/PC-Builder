const mongoose = require('mongoose');

const buildSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  cpu: {
    type: String,
    required: true
  },
  gpu: {
    type: String,
    required: true
  },
  ram: {
    type: String,
    required: true
  },
  storage: {
    type: String,
    required: true
  },
  motherboard: {
    type: String,
    required: true
  },
  powerSupply: {
    type: String,
    required: true
  },
  caseName: {
    type: String,
    required: true
  },
  cooling: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Build = mongoose.model('Build', buildSchema);

module.exports = Build;