var mongoose = require('mongoose');

var userSchema = mongoose.Schema({ //eslint-disable-line
	id: { type: String, required: true },
	displayName: { type: String },
	image: { type: String },
	twitter: {},
})

module.exports = mongoose.model('User', userSchema);
