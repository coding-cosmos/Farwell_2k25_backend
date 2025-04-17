import mongoose from 'mongoose';

const roundSchema = new mongoose.Schema({
  number: Number,
  status: { type: String, enum: ['in-progress', 'completed','locked'], default: 'locked' }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  rounds: [roundSchema],
  currentRound: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
export default User;