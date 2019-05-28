const helmet = require("helmet")
const express = require("express")
const db = require("./db/mongoose.js")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)

const journalRoute = require("./routes/journalRoute")
const ledgerRoute = require("./routes/ledgerRoute")
const trialRoute = require("./routes/trialRoute")
const finalRoute = require("./routes/finalAccRoute")
const userRoute = require("./routes/userRoute")
const budgetRoute = require("./routes/budgetRoute")
const inventoryRoute = require("./routes/inventoryRoute")

const app = express()

const port = process.env.PORT || 3000

app.enable('trust proxy');

app.use(helmet())

app.use(express.urlencoded({ extended: true }))

//setup express-session middleware
app.use(session({
  secret: 'Xy12MIbneRt Weasd3',
  resave: true,
  saveUninitialized: true,
  cookie: {
  	expires: new Date(Date.now() + 60 * 60 * 3000)
  },
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.get("/", (req, res) => {
	res.status(200).send({
		message: "Welcome!"
	})
})

app.use("/budget", budgetRoute)
app.use("/inventory", inventoryRoute)
app.use("/journal", journalRoute)
app.use("/ledger", ledgerRoute)
app.use("/trial", trialRoute)
app.use("/final", finalRoute)
app.use("/user", userRoute)

app.listen(port, () => {
	console.log(`Server started at port ${port}.`)
})
