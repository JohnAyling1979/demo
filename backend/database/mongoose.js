const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://backend:123123@mongo:27017/taskmanager?authSource=admin', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log('Database connected'))
	.catch(error => console.log(error));

module.exports = mongoose;