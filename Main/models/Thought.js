const { Schema, model } = require('mongoose');
const ReactionSchema = require('./Reaction');

// Define the Thought schema
const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [ReactionSchema], 
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;