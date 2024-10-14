const router =require("express").Router();
let Pharmcy=require("../models/PharmacyIn");

//http://localhost:8070/PharmacyIn/add
router.route("/add").post((req,res)=>{

    const ProductName = req.body.ProductName;
    const GenericName = req.body.GenericName;
    const ReferenceNo =Number(req.body.ReferenceNo);
    const Category =req.body.Category;
    const Type = req.body.Type;
    const MfgDate =req.body.MfgDate;
    const ExpDate = req.body.ExpDate;
    const Description = req.body.Description;
    const Quantity =req.body.Quantity;
    const Image = req.body.Image;

    const newPharmcy= new Pharmcy({
        ProductName,
        GenericName,
        ReferenceNo,
        Category,
        Type,
        MfgDate,
        ExpDate,
        Description,
        Quantity,
        Image
    })

    newPharmcy.save().then(()=>{
        res.json("Item added")
    }).catch((err)=>{
        console.log(err);
    })

})
//http://localhost:8070/PharmacyIn/
router.route("/").get((req,res)=>{

    Pharmcy.find().then((items)=>{
        res.json(items)
    }).catch((err)=>{
        console.log(err)
    })

})

//http://localhost:8070/PharmacyIn/update/6509d95e5f350c5fdfa76eb6
router.route("/update/:id").put(async(req,res)=>{
    let itemId = req.params.id;

    const{
        ProductName,
        GenericName,
        ReferenceNo,
        Category,
        Type,
        MfgDate,
        ExpDate,
        Description,
        Quantity,
        Image
    } = req.body;
    
    const updateItem= {
        ProductName,
        GenericName,
        ReferenceNo,
        Category,
        Type,
        MfgDate,
        ExpDate,
        Description,
        Quantity,
        Image
    }
    const update = await Pharmcy.findByIdAndUpdate(itemId, updateItem).then(()=>{
        res.status(200).send({status: "updated successfully"})
    }).catch ((error)=>{
        console.log(error);
        res.status(500).send({status:"update error"})
    })

})

//http://lacalhost:8070/stock/delete/6509d95e5f350c5fdfa76eb6
router.route("/delete/:id").delete(async(req,res)=>{
    let itemId = req.params.id;

    await Pharmcy.findByIdAndDelete(itemId).then(()=>{
        res.status(200).send({ststus:"Deleted Successfully"})
    }).catch((err)=>{
    console.log(err.message);
    res.status(500).send({status:"Error Delete"})
    })
})

router.route("/getByName/:name").get(async(req,res)=>{
    let productName=req.params.name;
    await Pharmcy.findOne({ProductName: productName}).then((stock)=>{
        res.status(200).send({status:"Item fetched",stock})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get Item"});
    })
})

router.route("/search").get(async (req, res) => {
    const searchQuery = req.query.q; // Get the search query from the request query parameters
  
    try {
      const items = await Pharmcy.find({
        $or: [
          { ProductName: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search for ProductName
          { Category: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search for Category (you can add more fields)
        ],
      });
  
      res.status(200).json({ status: "Items found", items });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "Error searching items" });
    }
  });

module.exports = router;