const mongoose = require("mongoose");

const schema = mongoose.Schema;



const adminSchema = new schema ({
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
        required:false
    },
    roleName: {
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    allocatedWork: {
        type:String,
        required:true
    }
    
    

})




const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
