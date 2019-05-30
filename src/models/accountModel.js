const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const accountSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}
}, {
	timestamps: true
})

const Account = mongoose.model("Account", accountSchema)

module.exports = Account