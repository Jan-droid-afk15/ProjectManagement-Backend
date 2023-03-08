const { Schema, model } = require('mongoose');

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    lists: [
      {
        type: Schema.Types.ObjectId,
        ref: 'lists',
      },
    ],
    activity: [
      {
        text: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    backgroundURL: {
      type: String,
    },
    members: [
      {
        _id: false,
        user: {
          type: Schema.Types.ObjectId,
          ref: 'users',
        },
        name: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          default: 'admin',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model('Board', boardSchema);