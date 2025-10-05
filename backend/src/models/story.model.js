

import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  journalEntryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JournalEntry',
  },
  title: String,
  content: String,
  emotion: String,
  genre: String,
  duration: String, 
  rating: { type: Number, default: 0 },
  isCompleted: { type: Boolean, default: false }, 
  theme: String,
}, { timestamps: true });

export const Story = mongoose.model('Story', storySchema);