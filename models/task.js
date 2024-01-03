const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide title'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },

  description: {
    type: String,
    required: [true, 'must provide description'],
    trim: true,
    maxlength: [500, 'Description can not be more than 500 characters'],
  },

  status: {
    type: String,
    required: [true, 'must provide status'],
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do',
  },
})

module.exports = mongoose.model('Task', TaskSchema)