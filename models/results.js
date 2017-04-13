const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultsSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	results: {
		type: Object,
		required: true
	},
	email: {
		type: String,
		required: true
	}
})

// Create the model class
const ModelClass = mongoose.model('results', resultsSchema);

// Export the model
module.exports = ModelClass;