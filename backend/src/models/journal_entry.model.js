import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const journalEntrySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sleepSessionId: {
    type: Schema.Types.ObjectId,
    ref: 'SleepSession',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  userRating: {
    type: Number,
    min: 0,
    max: 5,
  },
  dreamsCount: Number,
  totalRem: Number, // in minutes
  dominantEmotion: String,
  themes: [String],
  contentGenerated: {
    stories: { type: Number, default: 0 },
    games: { type: Number, default: 0 },
    images: { type: Number, default: 0 },
  },
}, { timestamps: true });


export const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);
