const mongoose = require("mongoose")

const trialSchema = new mongoose.Schema({
	creditBalance: {
		type: Number,
		required: true
	},
	debitBalance: {
		type: Number,
		required: true
	},
	ledger: [{
		account: {
			name: {
				type: String
			}
		},
		balance: {
			type: {
				type: String,
				default: undefined
			},
			amount: {
				type: Number,
				default: 0
			}
		}
	}]
})

const Trial = mongoose.model("Trial", trialSchema)

module.exports = Trial