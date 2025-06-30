const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    trim: true
  },
  done: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    enum: ['Personal', 'Work', 'Others'],
    default: 'Personal'
  },
  dueDate: {
    type: Date,
    default: null
  },
  createdBy: {
    type: String, // user email
    required: true
  },
  sharedWith: {
    type: [String], // list of user emails
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Todo', TodoSchema);
