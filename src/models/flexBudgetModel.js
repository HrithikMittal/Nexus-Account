var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var flexBudgetSchema = new Schema({
	name: String,
	type: String,
	cost: {
		type: Number,
		default: undefined
	},
	costPerUnit: {
		type: Number,
		default: undefined
	},
	user: {
	  	type: mongoose.Schema.Types.ObjectId,
	  	required: true,
	  	trim: true
	}
});

module.exports = mongoose.model('flexBudget', flexBudgetSchema);