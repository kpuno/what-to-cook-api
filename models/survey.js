const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const surveySchema = new Schema({
	title: {
		type: String,
		required: true
	},
	survey: {
		type: Object,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	exipryDate: {
    type: Date,
		required: true
  }
})

// Create the model class
const ModelClass = mongoose.model('survey', surveySchema);

// Export the model
module.exports = ModelClass;