const mongoose = require("mongoose");

const schema = mongoose.Schema;



const recordSchema = new schema ({
    patient:{
        type: schema.Types.ObjectId , ref: 'Patient' ,
        required : true 
    },
    title:{
        type:String,
        required:true
    },
    reason:{
        type:String,
        required:true
    },
    prescriptions:{
        type:Number ,
        required: true
    },
    appointments:{
        type:Number,
        required:true
    },
    tests:{
        type:Number,
        required:true
    },
    reports:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:mongoose.now
    }
    
    

})




const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
