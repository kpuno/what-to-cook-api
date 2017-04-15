const jwt = require('jwt-simple');
const Survey = require('../models/survey');

exports.addSurvey = function (req, res, next) {
	const title = req.body.title;
	const survey = req.body.survey;
	const email = req.body.email;
	const date = req.body.date;

	const newSurvey = new Survey({
		title: title,
		survey: survey,
		email: email,
		expiryDate: date
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

exports.searchAllSurveys = function (req, res, next) {
	const title = req.body.title;
	Survey.find({ title: new RegExp(title, "i") }, function (err, surveys) {
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
	const email = req.body.email;
	Survey.find({ title: title, email: email }, function (err, surveys) {
		if (err) { return next(err); }
		res.json(surveys);
	})
}

exports.removeSurvey = function (req, res, next) {
	const title = req.body.title;
	const email = req.body.email;
	Survey.remove({ title: title, email: email }, function (err, surveys) {
		if (err) { return next(err); }
		res.json(surveys);
	})
}

exports.editExipryDate = function (req, res, next) {
	const email = req.body.email;
	const title = req.body.title;
	const expiryDate = req.body.expiryDate;
	Survey.findOneAndUpdate(
		{ email: email, title: title },
		{ $set: { expiryDate: expiryDate } },
		{ upsert: true }
		, function (err, results) {
			if (err) { return next(err); }
			res.json(results);
		})
}