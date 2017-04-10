const jwt = require('jwt-simple');
const Survey = require('../models/survey');

exports.addSurvey = function (req, res, next) {
	const title = req.body.title;
	const survey = req.body.survey;
	const email = req.body.email;

	const newSurvey = new Survey({
		title: title,
		survey: survey,
		email: email
	});

	newSurvey.save(function (err) {
		if (err) { return next(err); }

		res.json({ text: "Survey Added" });
	});
}

exports.changeSurveyEmail = function (req, res, next) {
	const email = req.body.email;
	const currentEmail = req.body.currentEmail;
	Survey.update(
		{ email: currentEmail },
		{ $set: { email: email } },
		{ upsert: true, multi: true }
		, function (err, results) {
			if (err) { return next(err); }
			res.json(results);
		})
}

exports.findAllSurveys = function (req, res, next) {
	Survey.find({}, function (err, surveys) {
		if (err) { return next(err); }
		res.json(surveys);
	})
}

exports.findUserSurveys = function (req, res, next) {
	const email = req.body.email;
	Survey.find({ email: email }, function (err, surveys) {
		if (err) { return next(err); }
		res.json(surveys);
	})
}

exports.searchSurveys = function (req, res, next) {
	const title = req.body.title;
	Survey.find({ title: {$regex: /title/, $options: 'i'} }, function (err, surveys) {
		if (err) { return next(err); }
		res.json(surveys);
	})
}
