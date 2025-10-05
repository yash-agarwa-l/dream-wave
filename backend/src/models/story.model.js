const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  journalEntryId: {
    type: Schema.Types.ObjectId,
    ref: 'JournalEntry',
  },
  title: String,
  content: String,
  emotion: String,
  genre: String,
  duration: String, // e.g., "15 min read"
  rating: { type: Number, default: 0 },
  isCompleted: { type: Boolean, default: false }, // If user has read it
  theme: String,
}, { timestamps: true });

module.exports = mongoose.model('Story', storySchema);
