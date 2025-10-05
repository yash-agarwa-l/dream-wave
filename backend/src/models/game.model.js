import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const gameSchema = new Schema({
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
  type: String, // e.g., "puzzle_game"
  description: String,
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
  },
  duration: String, // e.g., "5-10 min"
  rating: { type: Number, default: 0 },
  isCompleted: { type: Boolean, default: false },
  emotion: String,
}, { timestamps: true });

export const Game = mongoose.model('Game', gameSchema);
