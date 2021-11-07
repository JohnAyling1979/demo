const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		minlength: 3,
	}
});

module.exports = mongoose.model('List', ListSchema);
