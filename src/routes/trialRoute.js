const express = require("express")

const Ledger = require("../models/ledgerModel")
const Trial = require("../models/trialModel")
const { isUserLoggedIn } = require("../middleware/auth.js")

const router = new express.Router()

router.get("/", isUserLoggedIn, async (req, res) => {
	try{
		let ledger = await Ledger.find({}).select("account balance -_id")
		let creditBalance = 0
		let debitBalance = 0

 		for (const account of ledger) {
 			await account.populate("account", "name -_id").execPopulate()

 			if(account.balance.type === "debit") {
 				debitBalance += account.balance.amount
 			} else if(account.balance.type === "credit"){
 				creditBalance += account.balance.amount
 			}
 		}
 			
 		const newTrial = new Trial({
 			creditBalance,
 			debitBalance,
 			ledger
 		})

 		await newTrial.save()

		res.status(200).send({
			creditBalance,
			debitBalance,
			ledger
		})

	} catch(e) {
		res.status(500).send({
			error: e
		})
	}

})

module.exports = router
