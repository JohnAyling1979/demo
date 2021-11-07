const express = require('express');
const coars = require('./middleware/coars');
const List = require('./database/models/list');
const Task = require('./database/models/task');
const logger = require('./middleware/logger');
require('./database/mongoose');
const port = 3000;

const app = express();

app.use(logger);
app.use(coars);
app.use(express.json());

app.post('/lists',  (req, res) => {
	(new List({'title': req.body.title}))
		.save()
		.then(list => res.send(list))
		.catch(error => res.send({error: true, message: error.message}));
});

app.get('/lists', (req, res) => {
	List.find({})
		.then(lists => res.send(lists))
		.catch(error => res.send({error: true, message: error.message}));
});

app.get('/lists/:listId', (req, res) => {
	List.findOne({_id: req.params.listId})
		.then(list => res.send(list))
		.catch(error => res.send({error: true, message: error.message}));
});

app.patch('/lists/:listId', (req, res) => {
	const {title} = req.body;

	List.findOneAndUpdate({_id: req.params.listId}, {$set: {title}}, {new: true})
		.then(list => res.send(list))
		.catch(error => res.send({error: true, message: error.message}));
});

app.delete('/lists/:listId', (req, res) => {
	const deleteTasks = (listId) => {
		Task.deleteMany({_listId: listId})
			.catch(error => console.log(error.message));
	}

	List.findOneAndDelete({_id: req.params.listId})
		.then(list => {
			deleteTasks(list._id);
			res.send(list);
		})
		.catch(error => res.send({error: true, message: error.message}));
});

app.post('/lists/:listId/tasks',  (req, res) => {
	(new Task({'title': req.body.title, '_listId': req.params.listId}))
		.save()
		.then(task => res.send(task))
		.catch(error => res.send({error: true, message: error.message}));
});

app.get('/lists/:listId/tasks', (req, res) => {
	Task.find({_listId: req.params.listId})
		.then(tasks => res.send(tasks))
		.catch(error => res.send({error: true, message: error.message}));
});

app.get('/lists/:listId/tasks/:taskId', (req, res) => {
	Task.findOne({_listId: req.params.listId, _id: req.params.taskId})
		.then(task => res.send(task))
		.catch(error => res.send({error: true, message: error.message}));
});

app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
	const {title, completed} = req.body;

	Task.findOneAndUpdate({_listId: req.params.listId, _id: req.params.taskId}, {$set: {title, completed}}, {new: true})
		.then(task => res.send(task))
		.catch(error => res.send({error: true, message: error.message}));
});

app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
	Task.findOneAndDelete({_listId: req.params.listId, _id: req.params.taskId})
		.then(task => res.send(task))
		.catch(error => res.send({error: true, message: error.message}));
});

app.listen(port, () => console.log(`Server running on port ${port}`));