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
	date: {
		_id: false,
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
    cards: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'card',
		}
	],
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = model('event', eventSchema);
