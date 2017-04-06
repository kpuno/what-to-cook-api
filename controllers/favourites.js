const User = require('../models/user');
// const config = require('./config');

exports.addFavourite = function (req, res, next) {

	User.find({
		email: req.body.email, favourites: {
			$elemMatch: {
				id: req.body.id,
				likes: req.body.likes,
				title: req.body.title,
				image: req.body.image
			}
		}
	},
		function (err, existingFavourite) {
			console.log(existingFavourite);
			console.log("HERE IS LENGTH !!!" + existingFavourite.length)
			// If current favourites exist return an error
			if (existingFavourite.length === 1) {
				return res.status(422).send({ error: 'Already in favourites' });
			} else {
				User.update({ email: req.body.email }, {
					$push:
					{
						"favourites": {
							"id": req.body.id,
							"title": req.body.title,
							"likes": req.body.likes,
							"image": req.body.image
						}
					}
				}, { upsert: true }, function (err) {
					if (err) {
						res.json({ "text": err });
					} else {
						res.json({ "text": "added to favourites!" });
					}
				});
			}
		});
}

exports.removeFavourites = function (req, res, next) {
	User.update({ email: req.body.email}, {
		$pull: {
			"favourites": {
				id: req.body.id,
				likes: req.body.likes,
				title: req.body.title,
				image: req.body.image
			}
		}
	}, function (err) {
		if (err) {
			res.json({ "text": err });
		} else {
			res.json({ "text": "removed from favourites!" });
		}
	});
}

exports.getFavourites = function (req, res, next) {
	User.find({ email: req.body.email }, function(err, getFavourites) {
		res.json(getFavourites);
	});
}