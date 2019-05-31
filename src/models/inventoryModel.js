var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InventorySchema = new Schema({
  name: {
  	type: String,
  	required: true,
  	trim: true
  },
  category: {
  	type: String,
  	required: true,
  	trim: true
  },
  quantity:{
  	type: Number,
  	default: 0
  },
  cost: {
  	type: Number,
  	default: 0
  },
  expiry: {
    type: Date
  },
  thresholdQuantity: {
    type: Number,
    default: 0
  },
  user: {
  	type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
  	required: true,
  	trim: true
  }
});

module.exports = mongoose.model('Inventory', InventorySchema);