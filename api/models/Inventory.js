const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const InventorySchema = new Schema({
    item_id :{
        type : String,
        required : true
    },
    item_name : {
        type : String,
        required : true
    },
    category :{
        type : String,
        required : true
    },
    quantity :{
        type : Number,
        required : true
    }
});
const Inventory = mongoose.model("inventory", InventorySchema);
module.exports = Inventory;