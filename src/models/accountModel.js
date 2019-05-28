const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const accountSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true,
		trim: true
	}
}, {
	timestamps: true
})

const Account = mongoose.model("Account", accountSchema)

module.exports = Account