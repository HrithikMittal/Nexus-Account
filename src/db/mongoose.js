const mongoose = require("mongoose")

const localDB = 'mongodb://localhost:27017/accountApp'
mongoose.connect(remoteDB, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
})	
	
const db = mongoose.connection

module.exports = db

