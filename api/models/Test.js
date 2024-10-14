const mongoose = require("mongoose");

const schema = mongoose.Schema;



const testSchema = new schema ({
    patient:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number ,
        required: true
    },
    type:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:mongoose.now
    },
    status:{
        type:String,
        default: "Sample Provided"
    }
    
    

})




const Test = mongoose.model("Test", testSchema);

module.exports = Test;
