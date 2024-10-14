const mongoose = require("mongoose");

const schema = mongoose.Schema;



const reportSchema = new schema ({
    result: {
        type: Boolean ,
        required : true 
    },
    date:{
        type:Date,
        default: mongoose.now
    },
    test:{
        type: schema.Types.ObjectId , ref: 'Test' ,
        required : true 
    },
    details:{
        type: String,
        required: true,
    },
    patient:{
        type: schema.Types.ObjectId , ref: 'Patient' ,
        required : true 
    }
    

})




const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
