const mongoose = require("mongoose")

const JournalSchema = new mongoose.Schema({
	from: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Account"
	},
	to: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Account"
	},
	date: {
		type: Date,
		required: true
	},
	debit: {
		type: Number,
		required: true
	},
	credit: {
		type: Number,
		required: true
	},
	narration: [{
		type: String,
		trim: true
	}]
}, {
	timestamps: true
})

const Journal = mongoose.model("Journal", JournalSchema)

module.exports = Journal