const jwt = require('jwt-simple');
const Survey = require('../models/survey');

exports.addSurvey = function(req, res, next) {
	const title = req.body.title;
	const survey = req.body.survey;
	const email = req.body.email;

	console.log(title);
	console.log(survey);
	console.log(email);

	const newSurvey = new Survey({
		title: title,
		survey: survey,
		email: email
	});

	newSurvey.save(function (err) {
			if (err) { return next(err); }

			res.json({text: "Survey Added"});
		});
}

