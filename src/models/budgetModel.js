var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BudgetSchema = new Schema({
	payementOfFixedAssets: String,
	payementToCreditors: String,
	recievedOfDebators: String,
	payementOfExpenses: String,
	payementOfDividend: String,
	saleOfInvestments: String,
	saleOfFixedAsset: String,
	payementOfBonus: String,
	payementOfWages: String,
	clossingStock: String,
	payementOfTax: String,
	openingStock: String,
	saleOfShares: String,
  	budgetMonth: String,
	cashSales: String,
	dividends: String,
	interest: String,
	borrowing: String
});

module.exports = mongoose.model('Budget', BudgetSchema);