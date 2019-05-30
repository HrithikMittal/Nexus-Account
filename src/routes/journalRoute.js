const express = require("express")
const validator = require("validator")
const moment = require("moment")
const mongoose = require("mongoose")

const Journal = require("../models/journalModel")
const Ledger = require("../models/ledgerModel")
const Account = require("../models/accountModel")
const { isUserLoggedIn } = require("../middleware/auth.js")
const { check, validationResult } = require("express-validator/check");

const router = new express.Router()

router.get("/", isUserLoggedIn, async (req, res) => {
	try{
		let journal = await Journal.find({ user: req.session.user._id }).sort({ date: -1})
 		
 		let journalData = []

 		for (const record of journal) {
 			await record.populate("from", "name").execPopulate()
 			await record.populate("to", "name").execPopulate()

 			journalData.push({
 				from: record.from.name,
 				to: record.to.name,
 				date: record.date.toDateString(),
 				debit: record.debit,
 				credit: record.credit,
 				narration: record.narration
 			})
 		}

		res.status(200).send({
			journalData
		})

	} catch(e) {
		res.status(500).send({
			error: e
		})
	}

})

router.post("/add", isUserLoggedIn, [
		check("from").not().isEmpty().withMessage("Provide 'from' field!").isAlpha().withMessage("'from' field must be a name!").trim().escape(),
		check("to").not().isEmpty().withMessage("Provide 'to' field!").isAlpha().withMessage("'to' field must be a name!").trim().escape(),
		check("date").not().isEmpty().withMessage("Provide 'date' field!").custom((value) => moment(value, "MM/DD/YYYY", true).isValid()).withMessage("'date' must be in 'MM/DD/YYYY' format!").trim() ,
		check("debit").not().isEmpty().withMessage("Provide 'debit' field!").custom((value) => Number(value)).withMessage("'debit' must be a number!").trim().escape(),
		check("credit").not().isEmpty().withMessage("Provide 'credit' field!").custom((value) => Number(value)).withMessage("'credit' must be a number!").trim().escape(),
		check("narration").not().isEmpty().withMessage("Provide 'narration' field!").trim().escape()
	], async (req, res) =>  {
	try{
		const errors = validationResult(req)

		if(!errors.isEmpty()) {
			return res.status(400).send({
				error: "Bad request!",
				message: errors.array()
			})
		}

		let from = req.body.from.toLowerCase()
		let to = req.body.to.toLowerCase()
		let date = new Date(req.body.date)
		let debit = req.body.debit
		let credit = req.body.credit
		let narration = req.body.narration

		const fromAccount = await Account.findOne({ name: from, user: req.session.user._id })

		if(!fromAccount) {
			let newAccount = new Account({
				name: from,
				user: req.session.user._id
			})
			await newAccount.save()
			from = newAccount
		} else {
			from = fromAccount
		}

		const toAccount = await Account.findOne({ name: to, user: req.session.user._id })

		if(!toAccount) {
			let newAccount = new Account({
				name: to,
				user: req.session.user._id
			})
			await newAccount.save()
			to = newAccount
		} else {
			to = toAccount
		}

		let newEntry = new Journal({
			from: from._id,
			to: to._id,
			date,
			debit,
			credit,
			narration: [narration + ` (Amount = ${debit} on date = ${date.toDateString()})`],
			user: req.session.user._id
		})

		await newEntry.save()

		res.status(200).send({
			message: "Entry added to Journal!",
			entry: {
				from: from.name,
				to: to.name,
				date: newEntry.date.toDateString(),
				debit: newEntry.debit,
				credit: newEntry.credit,
				narration: newEntry.narration
			}
		})

	} catch(e) {
		res.status(500).send({
			error: e
		})
	}
})

router.post("/update", isUserLoggedIn, [
		check("from").not().isEmpty().withMessage("Provide 'from' field!").isAlpha().withMessage("'from' field must be a name!").trim().escape(),
		check("to").not().isEmpty().withMessage("Provide 'to' field!").isAlpha().withMessage("'to' field must be a name!").trim().escape(),
		check("entryDate").not().isEmpty().withMessage("Provide 'entryDate' field!").custom((value) => moment(value, "MM/DD/YYYY", true).isValid()).withMessage("'entryDate' must be in 'MM/DD/YYYY' format!").trim(),
		check("updateDate").not().isEmpty().withMessage("Provide 'updateDate' field!").custom((value) => moment(value, "MM/DD/YYYY", true).isValid()).withMessage("'updateDate' must be in 'MM/DD/YYYY' format!").trim(),
		check("action").not().isEmpty().withMessage("Provide 'action' field!").custom((value) => ["increase", "decrease"].includes(value)).withMessage("'action' must be a either 'decrease', 'increase'!").trim().escape(),
		check("amount").not().isEmpty().withMessage("Provide 'amount' field!").custom((value) => Number(value)).withMessage("'amount' must be a number!").trim().escape(),
		check("narration").not().isEmpty().withMessage("Provide 'narration' field!").trim().escape()
	], async (req, res) =>  {
	try{
		const errors = validationResult(req)

		if(!errors.isEmpty()) {
			return res.status(400).send({
				error: "Bad request!",
				message: errors.array()
			})
		}

		let from = req.body.from.toLowerCase()
		let to = req.body.to.toLowerCase()
		let entryDate = new Date(req.body.entryDate)
		let updateDate = new Date(req.body.updateDate)
		let action = req.body.action
		let amount = Number(req.body.amount)
		let narration = req.body.narration


		const fromAccount = await Account.findOne({ name: from, user: req.session.user._id })

		if(!fromAccount) {
			return res.status(404).send({
				error: "From account does not exisit!"
			})
		}

		const toAccount = await Account.findOne({ name: to, user: req.session.user._id })

		if(!toAccount) {
			return res.status(404).send({
				error: "To account does not exisit!"
			})
		}

		const entry = await Journal.findOne({ from: fromAccount._id , to: toAccount._id , date: entryDate.toDateString(), user: req.session.user._id })

		if(!entry) {
			return res.status(404).send({
				error: "Journal entry does not exisit!"
			})
		}

		if(action === "increase") {
			entry.debit = entry.credit = entry.debit + amount
		} else if(action === "decrease"){
			entry.debit = entry.credit = entry.debit - amount
		}

		narration =  `${narration} Amount = ${amount} ${action} on date = ${updateDate.toDateString()}`

		entry.narration.push(narration)

		await entry.save()

		res.status(200).send({
			message: "Updated Journal Entry!",
			entry: {
				from: from.name,
				to: to.name,
				date: entry.date.toDateString(),
				debit: entry.debit,
				credit: entry.credit,
				narration: entry.narration
			}
		})

	} catch(e) {
		res.status(500).send({
			error: e
		})
	}
})



module.exports = router
