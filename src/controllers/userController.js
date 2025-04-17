import User from '../models/User.js';

export const loginUser = async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ msg: "Username is required" });

  let user = await User.findOne({ username });
  if (!user) {
    user = new User({
      username,
      rounds: Array.from({ length: 5 }, (_, i) => ({
        number: i + 1,
        status: i === 0 ? 'in-progress' : 'locked',
      }))
    });
    await user.save();
  }

  res.json(user);
};

export const updateProgress = async (req, res) => {
  const { username, roundNumber, status} = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ msg: "User not found" });

  const round = user.rounds.find(r => r.number === roundNumber);
  if (!round) return res.status(404).json({ msg: "Round not found" });

  round.status = status;
  
  const nextRound = user.rounds.find(r => r.number === roundNumber + 1);
  if (nextRound) nextRound.status = 'in-progress';

  user.currentRound = Math.max(user.currentRound, roundNumber + 1);
  await user.save();

  res.json(user);
};
