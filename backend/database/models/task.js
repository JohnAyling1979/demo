const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		minlength: 3,
	},
	_listId: {
		type: mongoose.Types.ObjectId,
		required: true,
	},
	completed: {
		type: Boolean,
		default: false,
	}
});

module.exports = mongoose.model('Task', TaskSchema);
