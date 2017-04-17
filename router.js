const Authentication = require('./controllers/authentication');
const UserInfo = require('./controllers/userinfo');
const passportService = require('./services/passport');
const passport = require('passport');
const Favourites = require('./controllers/favourites');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

// add authorization to favourite routes?

module.exports = function (app) {
	app.get('/', requireAuth, function(req, res) {
		res.send({ message: 'Super secret code is ABC123' });
	});
	app.post('/signin', requireSignin, Authentication.signin);
	app.post('/signup', Authentication.signup);

	app.post('/addfavourites', Favourites.addFavourite);
	app.post('/removefavourites', Favourites.removeFavourites);
	app.post('/getfavourites', Favourites.getFavourites);
}