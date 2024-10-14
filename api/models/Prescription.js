const mongoose = require("mongoose");

const schema = mongoose.Schema;



const prescriptionSchema = new schema ({
    text: {
        type: String ,
        required : true 
    },
    appointment: {
        type: schema.Types.ObjectId , ref: 'Appointment' ,
        required : true 
    },
    date:{
        type:Date,
        default: mongoose.now
    },
    patient:{
        type: schema.Types.ObjectId , ref: 'Patient' ,
        required : true 
    }
    

})




const Prescription = mongoose.model("Prescription", prescriptionSchema);

module.exports = Prescription;
