const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultsSchema = new Schema({
	title: {
		type: String
	},
	results: {
		type: Object
	},
	email: {
		type: String
	}
})

// Create the model class
const ModelClass = mongoose.model('results', resultsSchema);

// Export the model
module.exports = ModelClass;