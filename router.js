const Authentication = require('./controllers/authentication');
const UserInfo = require('./controllers/userinfo');
const passportService = require('./services/passport');
const passport = require('passport');
const Survey = require('./controllers/survey');
const Results = require('./controllers/results');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

// add authorization to favourite routes?

module.exports = function (app) {
	// initial
	app.get('/', requireAuth, function(req, res) {
		res.send({ message: 'Super secret code is ABC123' });
	});

	// auth
	app.post('/signin', requireSignin, Authentication.signin);
	app.post('/signup', Authentication.signup);

	// user
	app.post('/getuserinfo', UserInfo.getUserInfo);
	app.post('/edituserinfo', UserInfo.editUserInfo);
	app.post('/changepassword', UserInfo.changePassword);
	// survey
	app.post('/addsurvey', Survey.addSurvey);
	app.post('/changesurveyemail', Survey.changeSurveyEmail);

	app.post('/getallsurveys', Survey.searchAllSurveys);
	app.post('/getusersurveys', Survey.findUserSurveys);
	app.post('/searchsurveys', Survey.searchSurveys);
	app.post('/deletesurvey', Survey.removeSurvey);
	app.post('/editexiprydate', Survey.editExipryDate);

	// results
	app.post('/addresults', Results.addResults);
	app.post('/searchresults', Results.searchResults);
}