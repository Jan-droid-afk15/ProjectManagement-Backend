const { Schema, model } = require('mongoose');

const listSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'projects',
    },
  ],
  archived: {
    type: Boolean,
    required: true,
    default: false,
  },
});


module.exports = model('List', listSchema);