const User = require('../models/user');

exports.getUserInfo = function (req, res, next) {
	const email = req.body.email
	User.findOne({ email: email }, function (err, results) {
		if (err) { return next(err); }
		res.json(results);
	});
}

exports.editUserInfo = function (req, res, next) {
	const email = req.body.email;
	const displayName = req.body.displayName;
	const currentEmail = req.body.currentEmail;
	User.findOneAndUpdate(
		{ email: currentEmail },
		{ $set: { email: email, displayName: displayName } },
		{ upsert: true }
		, function (err, results) {
			if (err) { return next(err); }
			res.json(results);
		})
}