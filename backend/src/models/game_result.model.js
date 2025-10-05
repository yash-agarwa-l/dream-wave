import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const gameResultSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  gameId: {
    type: Schema.Types.ObjectId,
    ref: 'Game',
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  timeCompleted: { // in seconds
    type: Number,
    required: true,
  },
  wasSuccessful: {
    type: Boolean,
    required: true,
  },
}, { timestamps: true });

export const GameResult = mongoose.model('GameResult', gameResultSchema);
