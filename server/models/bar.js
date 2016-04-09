import mongoose from 'mongoose';

const BarSchema = mongoose.Schema({ //eslint-disable-line
  location: String,
  bars: {},
});

module.exports = mongoose.model('Bar', BarSchema);
