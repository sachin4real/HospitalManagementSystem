const router = require ("express").Router();
//const user = require("../models/user.js");
let Inventory = require("../models/Inventory.js");


//data insert

router.route("/add").post((req,res)=>{
    const item_id = req.body.item_id;
    const item_name = req.body.item_name;
    const category = req.body.category;
    const quantity = Number(req.body.quantity);

    const newInventory = new Inventory({
        item_id,
        item_name,
        category,
        quantity
    })
  
      
    newInventory.save().then(()=>{
        res.json("Data is saved by the db");
    }).catch((error)=>{
        console.log(error);
    })
});

//data read

router.route("/").get((req,res)=>{
    Inventory.find().then((user)=>{
        res.json(user);
    }).catch((error)=>{
        console.log(error)
    })
});

//data update
router.route("/update/:id").put(async(req,res)=>{
    let userID = req.params.id;
    const {item_id,item_name,category,quantity} = req.body;

    const updateUser = {
        item_id,item_name,category,quantity
    }
    const update = await Inventory.findByIdAndUpdate(userID,updateUser).then(()=>{
        res.status(200).send({status:"Inventory update"});
    }).catch((error)=>{
        console.log(error);
        res.status(500).send({status:"error updating data!", error:error.message});
    });
});

//data delete

router.route("/delete/:id").delete(async(req,res)=>{
    let userID = req.params.id;
    
    await Inventory.findByIdAndDelete(userID).then(()=>{
        res.status(200).send({status:"inventory delete"});
    }).catch((error)=>{
        console.log(error.message);
        res.status(500).send({status:"error with delete user!",error:error.message});
    })
})

router.route("/get/:id").get(async(req,res)=>{
    let userID = req.params.id;
    const user = await Inventory.findById(userID).then(()=>{
        res.status(200).send({status: "Inventory fetched", user})
    }).catch((error)=>{
        console.log(error.message);
        res.status(500).send({status:"error with get Inventory!",error:error.message})
    })
})
module.exports = router;