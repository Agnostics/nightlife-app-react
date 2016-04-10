var mongoose = require('mongoose');

var BarSchema = mongoose.Schema({ //eslint-disable-line
  location: String,
  bars: Array,
});

module.exports = mongoose.model('Bar', BarSchema);
