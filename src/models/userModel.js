const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
	id: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	}
})

userSchema.methods.toJSON = function () {
	const user = this

	const userObject = user.toObject()

	delete userObject.password

	return userObject
}

userSchema.statics.authenticate = async (id, password) => {
	const user = await User.findOne({ id })

	if(!user){
		return null
	}

	const isMatch = await bcrypt.compare(password, user.password)

	if(!isMatch){
		return null
	}

	return user
}

userSchema.pre("save", async function(next) {
	const user = this

	if(user.isModified("password"))
	{
		user.password = await bcrypt.hash(user.password, 8)
	}

	next()
})

const User = mongoose.model("User", userSchema)

module.exports = User