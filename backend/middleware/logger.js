const logger = (req, res, next) => {
	console.log(`Method: ${req.method}`);
	console.log(`Path: ${req.url}`);

	next();
}

module.exports = logger;