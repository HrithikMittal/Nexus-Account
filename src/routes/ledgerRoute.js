const express = require("express")

const Ledger = require("../models/ledgerModel")
const Journal = require("../models/journalModel")
const { isUserLoggedIn } = require("../middleware/auth.js")
const router = new express.Router()

router.get("/", isUserLoggedIn, async (req, res) => {
	try{

		let ledger = await Ledger.find({ user: req.session.user._id }).select("account debits credits")
		let creditBalance = 0
		let debitBalance = 0
		let balance = {}

 		for (const account of ledger) {
 			await account.populate("account", "name -_id").execPopulate()
 			await account.populate("debits.to", "name -_id").execPopulate()
 			await account.populate("credits.from", "name -_id").execPopulate()

 			for await (const entry of account.debits) {
 				debitBalance += entry.amount
 			}

 			for await (const entry of account.credits) {
 				creditBalance += entry.amount
 			}

 			account.balance = {
				type : (creditBalance > debitBalance) ? "credit" : "debit",
				amount: (creditBalance > debitBalance) ? creditBalance - debitBalance : debitBalance - creditBalance,
			}

 			await account.save()

			delete account._doc._id
			
 			creditBalance = debitBalance = 0
 		}



		res.status(200).send({
			ledger
		})

	} catch(e) {
		res.status(500).send({
			error: e
		})
	}

})


router.get("/update", isUserLoggedIn, async (req, res) => {
	try{
		const journal = await Journal.find({ user: req.session.user._id })

		let ledgerFrom, ledgerTo

		for (const entry of journal) {
			ledgerFrom = await Ledger.findOne({ account: entry.from._id, user: req.session.user._id })

			if(!ledgerFrom) {
				let newLedgerAcc = new Ledger({
					account: entry.from._id,
					user: req.session.user._id
				})
				await newLedgerAcc.save()
				ledgerFrom = newLedgerAcc
			}

			ledgerFrom.debits.push({
				record: entry._id,
				to: entry.to._id,
				amount: entry.debit
			})

			await ledgerFrom.save()

			let ledgerTo = await Ledger.findOne({ account: entry.to._id, user: req.session.user._id })

			if(!ledgerTo) {
				let newLedgerAcc = new Ledger({
					account: entry.to._id,
					user: req.session.user._id
				})
				await newLedgerAcc.save()
				ledgerTo = newLedgerAcc
			}

			ledgerTo.credits.push({
				record: entry._id,
				from: entry.from._id,
				amount: entry.credit
			})

			await ledgerTo.save()
		}

		let ledger = await Ledger.find({ user: req.session.user._id }).select("account debits credits")
		let creditBalance = 0
		let debitBalance = 0
		let balance = {}

 		for (const account of ledger) {
 			await account.populate("account", "name -_id").execPopulate()
 			await account.populate("debits.to", "name -_id").execPopulate()
 			await account.populate("credits.from", "name -_id").execPopulate()

 			for await (const entry of account.debits) {
 				debitBalance += entry.amount
 			}

 			for await (const entry of account.credits) {
 				creditBalance += entry.amount
 			}

 			account.balance = {
				type : (creditBalance > debitBalance) ? "credit" : "debit",
				amount: (creditBalance > debitBalance) ? creditBalance - debitBalance : debitBalance - creditBalance,
			}

 			await account.save()

			delete account._doc._id
			
 			creditBalance = debitBalance = 0
 		}



		res.status(200).send({
			ledger
		})

	} catch(e) {
		res.status(500).send({
			error: e
		})
	}

})
module.exports = router