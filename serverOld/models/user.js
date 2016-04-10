import mongoose from 'mongoose';

const userSchema = mongoose.Schema({ //eslint-disable-line

	id: { type: String, required: true },
	displayName: { type: String },
	image: { type: String },
	twitter: {},
})

module.exports = mongoose.model('User', userSchema);
