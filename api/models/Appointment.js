const mongoose = require("mongoose") ;

const schema = mongoose.Schema ;

const appointmentSchema = new schema ( {
    channel : {
        type : schema.Types.ObjectId , ref: 'Doctor',
        required: true 
    }, 
    patient : {
        type:  schema.Types.ObjectId , ref: 'Patient',
        required : true 
    },
    appointmentNo : {
        type:  Number,
        required : true 
    },
    
    notes : {
        type : String ,
        required : true 
    }
    ,
    consulted:{
        type: Boolean,
        required :true ,
        default: false
    } ,
    arrivalTime : {
        type : Date ,
        required :  true
    },
    name : {
        type :String ,
        required: false 
    }, 

    contact : {
        type: Number ,
        required : false
    },
    age : {
        type: Number ,
        required : false
    },
    gender : {
        type: String ,
        required : false
    }



})

const Appointment = mongoose.model("Appointment" , appointmentSchema) ;

module.exports = Appointment ;