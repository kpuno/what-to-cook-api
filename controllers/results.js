const jwt = require('jwt-simple');
const Results = require('../models/results');

exports.addResults = function (req, res, next) {
	const title = req.body.title;
	const results = req.body.results;
	const email = req.body.email;

	const newresults = new Results({
		title: title,
		results: results,
		email: email
	});

	newresults.save(function (err) {
		if (err) { return next(err); }

		res.json({ text: "results Added" });
	});
}

exports.searchResults = function (req, res, next) {
	const title = req.body.title;
	const email = req.body.email;
	Results.find({ title: title, email: email }, function (err, surveys) {
		if (err) { return next(err); }
		res.json(surveys);
	})
}