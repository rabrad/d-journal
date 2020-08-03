const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    note: {
      type: String,
      trim: true,
    },

    link: {
      type: String,
      required: true,
    },

    reminder: {
      type: Date,
    },

    kindOfReminder: {
      type: String,
    },

    displayReminderNote: {
      type: Boolean,
      default: false,
    },

    tags: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model('Note', PostSchema);
