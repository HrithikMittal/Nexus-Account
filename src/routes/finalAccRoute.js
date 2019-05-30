const express = require("express")

const Ledger = require("../models/ledgerModel")
const Trial = require("../models/trialModel")
const { isUserLoggedIn } = require("../middleware/auth.js")

const router = new express.Router()

router.get("/pnl", isUserLoggedIn, async (req, res) => {
	try{
		let ledger = await Ledger.find({ user: req.session.user._id }).select("account balance -_id")
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
 		
 		let profit, loss

 		if(creditBalance > debitBalance) {
 			profit = creditBalance - debitBalance
 			loss = 0
 		} else if(debitBalance > creditBalance){
 			loss = debitBalance - creditBalance
 			profit = 0
 		} else {
 			profit = loss = 0
 		}

		res.status(200).send({
			profit,
			loss,
			ledger
		})

	} catch(e) {
		res.status(500).send({
			error: e
		})
	}

})

router.get("/balance", isUserLoggedIn, async (req, res) => {
	try{
		let ledger = await Ledger.find({ user: req.session.user._id }).select("account balance -_id")
		let assets = [], liabilities = []
		let creditBalance = 0
		let debitBalance = 0


 		for (const account of ledger) {
 			await account.populate("account", "name -_id").execPopulate()

 			if(account.balance.type === "debit") {
 				assets.push(account)
 				debitBalance += account.balance.amount
 			} else if(account.balance.type === "credit"){
 				liabilities.push(account)
 				creditBalance += account.balance.amount

 			}
 		}

 		let profit, loss

 		if(creditBalance > debitBalance) {
 			profit = creditBalance - debitBalance
 			loss = 0
 		} else if(debitBalance > creditBalance){
 			loss = debitBalance - creditBalance
 			profit = 0
 		} else {
 			profit = loss = 0
 		}

		res.status(200).send({
			assets,
			liabilities,
			profit,
			loss
		})

	} catch(e) {
		res.status(500).send({
			error: e
		})
	}

})


module.exports = router
