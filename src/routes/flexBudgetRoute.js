const express = require("express")
const { check, validationResult } = require("express-validator/check");

const flexBudget = require("../models/flexBudgetModel")
const { isUserLoggedIn } = require("../middleware/auth.js")

const router = new express.Router()

router.route("/add").post(isUserLoggedIn, [
        check("name").not().isEmpty().withMessage("Please provide 'name'!").trim().escape(),
        check("type").not().isEmpty().withMessage("Please provide 'type'!").custom((value) => ["fixed", "variable"].includes(value)).withMessage("'type' can be 'fixed' or 'variable'!").trim().escape()
    ], async function (req, res) {

        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).send({
                error: "Bad request!",
                message: errors.array()
            })
        }

        let name = req.body.name.toLowerCase()
        let type = req.body.type.toLowerCase()
        let costPerUnit, cost

        const entry = await flexBudget.findOne({ name, type, user: req.session.user._id })

        if(entry) {
            return res.status(302).send({message: "Entry already exists!"})
        }
        
        if(type == "fixed") {
            if(Number(req.body.cost) && !req.body.costPerUnit) {
                cost = req.body.cost
            } else {
                return res.status(400).send({ message: "Fixed expenses can have only fixed cost!"})
            }
        } else if(type == "variable") {
            if(Number(req.body.costPerUnit) && !req.body.cost) {
                costPerUnit = req.body.costPerUnit
            } else {
                return res.status(400).send({ message: "Variable expenses can have only costPerUnit!"})
            }
        }

        var newEntry = new flexBudget({
            name,
            type,
            cost,
            costPerUnit,
            user: req.session.user._id
        });

        await newEntry.save()

        res.send({ success: "New expense inserted in flexible budget successfully!"})
});

router.route("/").post(isUserLoggedIn, [
        check("units").not().isEmpty().withMessage("Please provide 'units'!").custom((value) => Number(value)).withMessage("'units' can be a number only!").trim().escape()
    ], async function (req, res) {

        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).send({
                error: "Bad request!",
                message: errors.array()
            })
        }

        let units = Number(req.body.units)
        let totalCostPerUnit = 0, totalCost = 0, cPU, cost

        const entries = await flexBudget.find({ user: req.session.user._id }).select("-_id -__v -user")

        for (const entry of entries) {
            if(entry.type == "fixed") {
                totalCost += entry.cost
                cPU = entry.cost / units
                totalCostPerUnit += cPU
            } else if(entry.type == "variable") {
                totalCostPerUnit += entry.costPerUnit
                cost = entry.costPerUnit * units
                totalCost += cost
            }
        }

        res.send({ totalCost, totalCostPerUnit, entries })
});

module.exports = router
