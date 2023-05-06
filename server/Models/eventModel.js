const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	startDate: {
		type: Date,
	},
	dueDate: {
		type: Date,
	},
	dueTime: {
		type: String,
	},
	reminder: {
		type: Boolean,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	members: [
		{
			_id: false,
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'user',
			},
			name: {
				type: String,
			},
			color:{
				type:String,
			}
		},
	],
    card: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'card',
		required: true,
	},
});

module.exports = mongoose.model('event', eventSchema);
