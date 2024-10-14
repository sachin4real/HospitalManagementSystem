const router = require ("express").Router();
//const user = require("../models/user.js");
let OrderI = require("../models/Order.js");


//data insert

router.route("/add").post((req,res)=>{
    const order_id = req.body.order_id;
    const supplier = req.body.supplier;
    const date = req.body.date;
    const destination = req.body.destination;
    const quantity = Number(req.body.quantity);

    const newOrderI = new OrderI({
        order_id,
        supplier,
        date,
        destination,
        quantity
    })
  
      
    newOrderI.save().then(()=>{
        res.json("Data is saved by the db");
    }).catch((error)=>{
        console.log(error);
    })
});

//data read

router.route("/").get((req,res)=>{
    OrderI.find().then((user)=>{
        res.json(user);
    }).catch((error)=>{
        console.log(error)
    })
});

//data update
router.route("/update/:id").put(async(req,res)=>{
    let userID = req.params.id;
    const {order_id,supplier,date,destination,quantity} = req.body;

    const updateUser = {
        order_id,supplier,date,destination,quantity
    }
    const update = await OrderI.findByIdAndUpdate(userID,updateUser).then(()=>{
        res.status(200).send({status:"Inventory update"});
    }).catch((error)=>{
        console.log(error);
        res.status(500).send({status:"error updating data!", error:error.message});
    });
});

//data delete

router.route("/delete/:id").delete(async(req,res)=>{
    let userID = req.params.id;
    
    await OrderI.findByIdAndDelete(userID).then(()=>{
        res.status(200).send({status:"Order delete"});
    }).catch((error)=>{
        console.log(error.message);
        res.status(500).send({status:"error with delete Order!",error:error.message});
    })
})

router.route("/get/:id").get(async(req,res)=>{
    let userID = req.params.id;
    const user = await OrderI.findById(userID).then(()=>{
        res.status(200).send({status: "Inventory fetched", user})
    }).catch((error)=>{
        console.log(error.message);
        res.status(500).send({status:"error with get Inventory!",error:error.message})
    })
})
module.exports = router;