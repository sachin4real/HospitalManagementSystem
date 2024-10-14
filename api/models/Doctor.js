const mongoose = require("mongoose");

const schema = mongoose.Schema;



const doctoSchema = new schema ({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    specialization: {
        type:String,
        required:true
    },
    qualifications:{
        type:String,
        required:true
    }
    

})




const Doctor = mongoose.model("Doctor", doctoSchema);

module.exports = Doctor;
