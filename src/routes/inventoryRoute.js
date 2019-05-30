const express = require("express")
const moment = require("moment")
const { check, validationResult } = require("express-validator/check");

const Inventory = require("../models/inventoryModel")
const { isUserLoggedIn } = require("../middleware/auth.js")

const router = new express.Router()

router.route("/add").post(isUserLoggedIn, [
        check("name").not().isEmpty().withMessage("Please provide inventory 'name' !").trim().escape(),
        check("category").not().isEmpty().withMessage("Please provide 'category' !").trim().escape(),
        check("quantity").not().isEmpty().withMessage("Please provide 'quantity' !").custom((value) => Number(value)).withMessage("'quantity' must be a number!").trim().escape(),
        check("thresholdQuantity").not().isEmpty().withMessage("Please provide 'quantity' !").custom((value) => Number(value)).withMessage("'thresholdQuantity' must be a number!").trim().escape(),
        check("expiry").not().isEmpty().withMessage("Provide 'expiry' field!").trim(),
        check("cost").not().isEmpty().withMessage("Please provide 'cost' !").custom((value) => Number(value)).withMessage("'cost' must be a number!").trim().escape()
    ], async function (req, res) {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).send({
                error: "Bad request!",
                message: errors.array()
            })
        }

        let expiry = new Date(req.body.expiry)

        if(isNaN(expiry)) {
            return res.status(400).send({ message: "Bad request!", error: "Invalid expiry date, use format like '05 September 2019'"})
        }

        let name = req.body.name.toLowerCase()
        let category = req.body.category.toLowerCase()
        let quantity = Number(req.body.quantity)
        let thresholdQuantity = Number(req.body.thresholdQuantity)
        let cost = Number(req.body.cost)
        let user = req.session.user._id

        let item = await Inventory.findOne({ name, category, user })

        if(item) {
            return res.status(400).send({ message: "Item already present in the given category!"})
        }

        item = new Inventory({
            name,
            category,
            quantity,
            thresholdQuantity,
            expiry,
            cost,
            user
        })

        await item.save()

        item = item.toObject()

        item.expiry = item.expiry.toDateString()

        delete item._id
        delete item.user
        delete item.__v

        res.status(200).send({ message: "Item added to inventory!", item })

    } catch(e) {
        res.status(400).send({ message: "Something went wrong!", error: e })
    }
});

router.route("/update").post(isUserLoggedIn, [
        check("name").not().isEmpty().withMessage("Please provide inventory 'name' !").trim().escape(),
        check("category").not().isEmpty().withMessage("Please provide 'category' !").trim().escape(),
        check("usedQuantity").not().isEmpty().withMessage("Please provide 'quantity' !").custom((value) => Number(value)).withMessage("'quantity' must be a number!").trim().escape()
    ], async function (req, res) {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).send({
                error: "Bad request!",
                message: errors.array()
            })
        }

        let name = req.body.name.toLowerCase()
        let category = req.body.category.toLowerCase()
        let usedQuantity = Number(req.body.usedQuantity)
        let user = req.session.user._id

        let item = await Inventory.findOne({ name, category, user })

        if(!item) {
            return res.status(404).send({ message: "No such item in inventory found!"})
        }

        if(usedQuantity > item.quantity) {
            return res.status(400).send({ message: "Used quantity is more than present quantity!", quantity: item.quantity, usedQuantity })
        }

        item.quantity -= usedQuantity

        await item.save()

        item = item.toObject()

        delete item._id
        delete item.user
        delete item.__v

        res.status(200).send({ message: "Item updated successfully!", item })

    } catch(e) {
        res.status(400).send({ message: "Something went wrong!", error: e })
    }
    res.send({ success: "Budget inserted successfully!"})
});

router.route("/").get(isUserLoggedIn, async function (req, res) {
    try{
        const inventory = await Inventory.find({ user: req.session.user._id }).select("-user -__v -_id")

        for (const item of inventory) {
            item.expiry = item.expiry.toDateString()
        }
        
        res.status(200).send({ inventory })
    } catch(e) {
        res.status(500).send({ message: "Something went wrong!", error: e })
    }
})

module.exports = router
