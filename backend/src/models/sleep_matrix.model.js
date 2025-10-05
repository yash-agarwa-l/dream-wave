const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sleepMetricsSchema = new Schema({
  heartRate: Number,
  respiration: Number,
  bodyTemperature: Number,
}, { _id: false });

const sleepSessionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  date: {
    type: Date,
    required: true,
  },
  currentStatus: {
    stage: String, // "Deep", "Light", "REM", "Awake"
    stageDuration: Number, // in minutes
  },
  liveMetrics: sleepMetricsSchema,
  sleepQuality: {
    score: Number, // Out of 10
    disruptions: Number,
  },
  dreamData: {
    isDreaming: Boolean,
    confidence: Number, // 0 to 1
    dreamScore: Number,
  },
}, { timestamps: true });

module.exports = mongoose.model('SleepSession', sleepSessionSchema);
