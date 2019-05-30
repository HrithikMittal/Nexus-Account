	const mongoose = require("mongoose")

const ledgerSchema = new mongoose.Schema({
	account: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		unique: true,
		ref: "Account"
	},
	debits: [{
		_id: false,
		to: {
			_id: false,
			type: mongoose.Schema.Types.ObjectId,
			ref: "Account"
		},
		amount: {
			type: Number
		}
	}],
	credits: [{
		_id: false,	
		from: {
			_id: false,
			type: mongoose.Schema.Types.ObjectId,
			ref: "Account"
		},
		amount: {
			type: Number
		}
	}],
	balance: {
		_id: false,
		type: {
			type: String,
			default: undefined
		},
		amount: {
			type: Number,
			default: 0
		}
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}
})

const Ledger = mongoose.model("Ledger", ledgerSchema)

module.exports = Ledger