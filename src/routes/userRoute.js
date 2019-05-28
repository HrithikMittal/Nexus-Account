const express = require("express")
const validator = require("validator")
const mongoose = require("mongoose")

const User = require("../models/userModel")
const { isUserLoggedOut, isUserLoggedIn } = require("../middleware/auth.js")
const { check, validationResult } = require("express-validator/check");

const router = new express.Router()

router.post("/login", isUserLoggedOut, [
		check("id").not().isEmpty().withMessage("Please provide Id.").trim().escape(),
		check("password").not().isEmpty().withMessage("Please provide password.").trim().escape()
	], async (req, res) => {
		try {
			const errors = validationResult(req)

			if(!errors.isEmpty()){
				return res.status(400).send({
					error: "Bad request!",
					message: errors.array()
				})
			}

			let id = req.body.id
			let password = req.body.password

			const user = await User.authenticate(id, password)

			if(!user){
				return res.status(400).send({
					error: "Invalid Id or password!"
				})
			}

			req.session.user = user

			res.status(200).send({
				success: "User Logged In!"
			})

		} catch(e) {
			res.status(400).send({
				message: "Unable to login!",
				error: e
			})
		}
})

router.post("/register", isUserLoggedOut, [
		check("id").not().isEmpty().withMessage("Please provide Id.").trim().escape(),
		check("password").not().isEmpty().withMessage("Please provide password.").trim().escape()
	], async (req, res) => {
		try {
			const errors = validationResult(req)

			if(!errors.isEmpty()){
				return res.status(400).send({
					error: "Bad request!",
					message: errors.array()
				})
			}

			let id = req.body.id
			let password = req.body.password

			let user = await User.findOne({ id })

			if(user){
				return res.status(400).send({
					error: "User already exists!"
				})
			}

			user = new User()
			
			user.id = id
			user.password = password

			await user.save()

			req.session.user = user

			res.status(200).send({
				success: "User registered and Logged In!"
			})

		} catch(e) {
			res.status(400).send({
				message: "Unable to register!",
				error: e
			})
		}
})

router.post("/logout", isUserLoggedIn, async (req, res) => {
		try {
			req.session.destroy()

			res.status(200).send({
				success: "User Logged Out!"
			})

		} catch(e) {
			res.status(400).send({
				message: "Unable to logout!",
				error: e
			})
		}
})

module.exports = router
