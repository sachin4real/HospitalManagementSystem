const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderSchema = new Schema ({
    order_id :{
        type : String,
        required : true
    },
    supplier :{
        type : String,
        required : true
    },
    date :{
        type : Date,
        required :true
    },
    destination :{
        type : String,
        required : true
    },
    quantity :{
        type : Number,
        required : true
    }
})
const OrderI = mongoose.model("order", OrderSchema);
module.exports = OrderI;