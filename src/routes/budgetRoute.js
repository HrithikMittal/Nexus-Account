const express = require("express")

const Budget = require("../models/budgetModel")
const { isUserLoggedIn } = require("../middleware/auth.js")

const router = new express.Router()

router.route("/add").post(isUserLoggedIn, async function (req, res) {

    var budgetNew = new Budget();
    budgetNew.budgetMonth = req.body.budgetMonth;
    budgetNew.openingStock = req.body.openingStock;
    budgetNew.clossingStock = req.body.clossingStock;
    budgetNew.cashSales = req.body.cashSales;
    budgetNew.recievedOfDebators = req.body.recievedOfDebators;
    budgetNew.dividends = req.body.dividends;
    budgetNew.interest = req.body.interest;
    budgetNew.saleOfFixedAsset = req.body.saleOfFixedAsset;
    budgetNew.saleOfShares = req.body.saleOfShares;
    budgetNew.borrowing = req.body.borrowing;
    budgetNew.saleOfInvestments = req.body.saleOfInvestments;
    budgetNew.payementToCreditors = req.body.payementToCreditors;
    budgetNew.payementOfWages = req.body.payementOfWages;
    budgetNew.payementOfExpenses = req.body.payementOfExpenses;
    budgetNew.payementOfDividend = req.body.payementOfDividend;
    budgetNew.payementOfFixedAssets = req.body.payementOfFixedAssests;
    budgetNew.payementOfTax = req.body.payementOfTax;
    budgetNew.payementOfBonus = req.body.payementOfBonus;

    await budgetNew.save()

    res.send({ success: "Budget inserted successfully!"})
});

router.route("/list").get(isUserLoggedIn, async function (req, res) {
  const budgets = await Budget.find()

  res.send({ budgets })
})

module.exports = router
